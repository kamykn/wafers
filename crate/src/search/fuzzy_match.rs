use super::word_scoring_struct;
use super::cache;
use std::collections::HashMap;
use std::collections::HashSet;

const SCORE_NEXT_MATCH: u32  = 6;
const SCORE_AFTER_MATCH: u32 = 2;
const SCORE_MATCH: u32       = 1;

pub fn search(input_string: String) -> HashMap<u32, word_scoring_struct::WordScoring> {
    let mut return_word_scoring_map: HashMap<u32, word_scoring_struct::WordScoring> = HashMap::new();

    // HashSetを使ってUnique
    let uniq_input_word: HashSet<&str> = input_string.split_whitespace().collect();
    for input_word in uniq_input_word.iter() {
        let (mut word_scoring_map, is_matching_exactly) = cache::get_search_word_list(input_word.to_string());

        if !is_matching_exactly {
            let new_word_scoring_map = set_score_and_matched_index(word_scoring_map, input_word);

            // キャッシュに入れる
            cache::push(new_word_scoring_map.to_owned(), input_word.to_string());
            word_scoring_map = new_word_scoring_map;
        }

        // 1週目はそのまま全部入れる
        if return_word_scoring_map.is_empty() {
            return_word_scoring_map = word_scoring_map;
            continue;
        }

        // 2週目以降は返却リストを探してマージ
        merge_word_scoring_map(&mut return_word_scoring_map, &word_scoring_map);
    }

    return_word_scoring_map
}

fn set_score_and_matched_index(mut word_scoring_map: HashMap<u32, word_scoring_struct::WordScoring>, 
                               input_word: &str) -> HashMap<u32, word_scoring_struct::WordScoring> {
    // 全く同じマッチがなければスコア計算し直す
    let mut new_word_scoring_map = HashMap::new();

    for (_, mut word_scoring) in word_scoring_map.iter_mut() {
        let mut is_match = false;

        // 文字数が一緒なら == で比較しても良いかオプション化しても良さそう
        for (key, word) in &word_scoring.word_map {
            // すべて一致するもののみ表示するので、文字数が少なければ対象から外す
            // "_"から始まるkeyは無視する
            if key.as_str().find('_') == Some(0) || word.len() < input_word.len()  {
                continue;
            }

            let mut matched_index_list = find_exact_match(input_word, word);
            if matched_index_list.len() > 0 {
                word_scoring.score = matched_index_list.len() as u32 * SCORE_NEXT_MATCH;
                word_scoring.matched_index_list_map.insert(word.to_string(), matched_index_list);
                is_match = true;
            } else {
                let (matched_index_list, score, is_match_word) = find_match(input_word, &word);

                if is_match_word {
                    is_match = true;
                    word_scoring.score = score;
                    word_scoring.matched_index_list_map.insert(word.to_string(), matched_index_list);
                }
            }
        }

        if is_match {
            // マージ用Mapにセット
            new_word_scoring_map.insert(word_scoring.index, word_scoring.to_owned());
        }
    }

    new_word_scoring_map
}

fn find_exact_match(input_word: &str, word: &str) -> Vec<u32> {
    let mut matched_index_list_tmp = Vec::new();

    // findによるMatch
    let find_index_option = word.find(input_word);
    if find_index_option != None {
        let find_index = find_index_option.unwrap();
        let start_at = find_index;
        let end_at = find_index + input_word.len();
        for i in start_at..end_at {
            matched_index_list_tmp.push(i as u32);
        }
    }

    matched_index_list_tmp 
}

fn merge_word_scoring_map(return_word_scoring_map: &mut HashMap<u32, word_scoring_struct::WordScoring>,
                          word_scoring_map: &HashMap<u32, word_scoring_struct::WordScoring>) {

    for (_, mut word_scoring) in word_scoring_map.iter() {
        // なければそのままいれる
        if !return_word_scoring_map.contains_key(&word_scoring.index) {
            return_word_scoring_map.insert(word_scoring.index, word_scoring.to_owned());
            continue;
        }

        // あればscore合算、matched_index_listをmerge
        if let Some(return_word_scoring) = return_word_scoring_map.get_mut(&word_scoring.index) {
            return_word_scoring.score = return_word_scoring.score + word_scoring.score;

            for (word, matched_index_list) in &word_scoring.matched_index_list_map {
                if !return_word_scoring.matched_index_list_map.contains_key(word) {
                    return_word_scoring.matched_index_list_map.insert(word.to_string(), matched_index_list.to_owned());
                }

                if let Some(return_matched_index_list) = return_word_scoring.matched_index_list_map.get_mut(word) {
                    return_matched_index_list.extend_from_slice(&matched_index_list);
                }
            }
        }
    }
}

fn find_match(input_word: &str, word: &str) -> (Vec<u32>, u32, bool) {
    let mut score: u32 = 0;
    let mut is_match = true;
    let mut next_word_match_at = 0;
    let mut matched_index_list = Vec::new();

    // TODO: オプション化
    let check_word = word.to_lowercase();

    for input_char in input_word.chars() {
        let (add_score, mut word_matched_at, is_match_tmp) = 
            input_char_loop(input_char, &check_word, next_word_match_at, &matched_index_list);

        if is_match_tmp {
            // マッチしない文字が存在すれば対象としない
            score = score + add_score;
            matched_index_list.push(word_matched_at);
        } else {
            is_match = false;
        }

        next_word_match_at = word_matched_at + 1;
    }

    (matched_index_list, score, is_match)
}

fn input_char_loop(input_char: char,
                   check_word: &String,
                   next_word_match_at: u32,
                   matched_index_list: &Vec<u32>) -> (u32, u32, bool) {
    let mut add_score: u32 = 0;
    let mut index = 0;
    let mut is_match = false;

    // 最初にnext_word_match_atを探し、matchしなければ最初から探す
    if next_word_match_at >= 0 {
        let (add_score, next_word_match_at, is_match) = match check_word.chars().nth(next_word_match_at as usize) {
            Some(c) => {
                if input_char == c {
                    add_score = get_score(next_word_match_at, next_word_match_at);
                    return (add_score, next_word_match_at, true);
                }

                (0, next_word_match_at, false)
            },
            None => (0, next_word_match_at, false)
        };

        if is_match {
            return (add_score, next_word_match_at, is_match);
        }
    }

    for (i, search_char) in check_word.chars().enumerate()  {
        index = i as u32;
        
        // 元のワードのindexを詰めたくないのでループ中にskipしている
        // 次にマッチするワードはすでにチェック済みなのでcontinue
        if matched_index_list.contains(&index) || (next_word_match_at >= 0 && next_word_match_at == index) {
            continue;
        }

        // TODO FZFかなんかはスペースが来たら離れたところのほうをmatchさせるような仕様があるっぽい
        if input_char == search_char {
            add_score = get_score(index, next_word_match_at);
            is_match = true;
            break;
        }
    }

    (add_score, index.clone(), is_match)
}


fn get_score(index: u32, next_word_match_at: u32) -> u32 {
    if index == next_word_match_at {
        // 連続したMatchには加点
        return SCORE_NEXT_MATCH; // 2倍の3倍
    } else if index > next_word_match_at {
        // 順番通りのMatchには加点
        return SCORE_AFTER_MATCH; // 2倍
    }

    // 通常加点
    return SCORE_MATCH;
}
