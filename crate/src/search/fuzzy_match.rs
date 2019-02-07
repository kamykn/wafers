use super::word_scoring_struct;
use super::cache;
use std::collections::HashMap;
use std::collections::HashSet;

use ::js_utils;

pub fn search(input_string: String) -> Vec<word_scoring_struct::WordScoring> {
    let mut return_word_scoring_map: HashMap<u32, word_scoring_struct::WordScoring> = HashMap::new();

    // HashSetを使ってUnique
    let uniq_input_word: HashSet<&str> = input_string.split_whitespace().collect();
    for input_word in uniq_input_word.iter() {
        let (mut word_scoring_map, is_matching_exactly) = cache::get_search_word_list(input_word.to_string());

        if !is_matching_exactly {
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

                    // マッチ済み文字の管理
                    // TODO: 前のinput_wordでmatchしたワードのindexを除外したい
                    let (matched_index_list_tmp, score_tmp, is_match_tmp) = find_match(input_word, &word);

                    if is_match_tmp {
                        word_scoring.score = score_tmp;
                        word_scoring.matched_index_list_map.insert(word.to_string(), matched_index_list_tmp);
                        is_match = true;
                    }
                }

                if is_match {
                    // マージ用Mapにセット
                    new_word_scoring_map.insert(word_scoring.index, word_scoring.to_owned());
                }
            }

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
        for (_, mut word_scoring) in word_scoring_map.iter_mut() {
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

    // match部分をhighlight用の文字列で囲んだ文字列を生成
    for (_, ref mut word_scoring) in &mut return_word_scoring_map {
        for (key, word) in &word_scoring.word_map {

            let mut highlighted_word = word.to_string();

            if word_scoring.matched_index_list_map.contains_key(word) {
                let matched_index_list = word_scoring.matched_index_list_map[word].to_owned();
                highlighted_word = highlight_word(word.to_string(), matched_index_list);
            } 

            if let Some(mut_highlighted_word_map) = word_scoring.highlighted_word_map.get_mut(key) {
                *mut_highlighted_word_map = highlighted_word.to_string();
            }
        }
    }

    // HashMapからVecに変換してから返却
    return_word_scoring_map.iter().map(|(_, v)| v.to_owned()).collect()
}

fn find_match(input_word: &str, word: &str) -> (Vec<u32>, u32, bool) {
    let mut score: u32 = 0;
    let mut is_match = true;
    let mut next_word_match_at = 0;
    let mut matched_index_list = Vec::new();

    // TODO: オプション化
    let check_word = word.to_lowercase();

    for input_char in input_word.chars() {
        let (add_score, mut word_matched_at, is_match_tmp) = input_char_loop(input_char, &check_word, next_word_match_at, &matched_index_list);

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

fn input_char_loop(input_char: char, check_word: &String, next_word_match_at: u32, matched_index_list: &Vec<u32>) -> (u32, u32, bool) {
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

fn highlight_word(check_word: String, mut matched_index_list: Vec<u32>) -> String {
    let mut highlighted_word: Vec<char> = Vec::new();
    matched_index_list.sort_unstable();
    let mut is_continuous_match = false;

    let open_tag = "<b>";
    let close_tag = "</b>";
    let mut is_match = false;

    for (i, c)in check_word.chars().enumerate() {
        let index = i as u32;
        if matched_index_list.contains(&index) && !is_continuous_match {
            // 連続マッチでなければマッチしたワードの前に開始タグを追加
            for open_tag_char in  open_tag.chars() {
                highlighted_word.push(open_tag_char);
            }
            is_match = true;
        } else if is_continuous_match {
            // マッチが続いている場合閉じるかチェック
            if !matched_index_list.contains(&index) {
                for close_tag_char in  close_tag.chars() {
                    highlighted_word.push(close_tag_char);
                }
                is_match = false;
            }
        }

        highlighted_word.push(c);
        is_continuous_match = is_match;
    }

    if is_continuous_match {
        // マッチが続いている場合終了タグ追加
        for close_tag_char in  close_tag.chars() {
            highlighted_word.push(close_tag_char);
        }
    }

    highlighted_word.into_iter().collect()
}


fn get_score(index: u32, next_word_match_at: u32) -> u32 {
    if index == next_word_match_at {
        // 連続したMatchには加点
        return 6; // 2倍の3倍
    } else if index > next_word_match_at {
        // 順番通りのMatchには加点
        return 2; // 2倍
    }

    // 通常加点
    return 1;
}
