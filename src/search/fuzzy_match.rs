use super::word_scoring_struct;
use search::byte_index_struct;

// 引数がWordScoringになっているのはキャッシュと同じ型を使わせるため
pub fn fuzzy_match_vec(mut word_scoring_vec: Vec<word_scoring_struct::WordScoring>, input_word: String) -> Vec<word_scoring_struct::WordScoring> {
    let mut return_word_scoreing_vec: Vec<word_scoring_struct::WordScoring> = Vec::new();

    for mut word_scoring in word_scoring_vec.iter_mut() {
        let is_all_match = fuzzy_match(input_word.clone(), &mut word_scoring);

        if is_all_match {
            return_word_scoreing_vec.push(word_scoring.clone());
        }
    }

    return_word_scoreing_vec 
}

fn fuzzy_match(input_word: String, word_scoring: &mut word_scoring_struct::WordScoring) -> bool {
    let mut return_is_all_match = false;
    for (_, word) in &word_scoring.wordMap {
        // すべて一致するもののみ表示する前提の上で対象から外す
        if word.len() < input_word.len() {
            return false;
        }

        // 文字数が一緒なら == で比較しても良いかオプション化しても良さそう

        // TODO: オプション化
        let mut word_for_search = word.to_lowercase();
        let (word_score, is_all_match) = input_word_loop(input_word.clone(), word_for_search);

        if is_all_match {
            word_scoring.score = word_score;

            // 距離に対する減点
            let len_diff = (word.len() - input_word.len()) as i32;
            word_scoring.score = word_scoring.score - len_diff;
            return_is_all_match = true;
            break;
        }
    }

    return_is_all_match
}

fn input_word_loop(input_word: String, mut word_for_search: String) -> (i32, bool) {
    let mut word_score: i32 = 0;
    let mut is_all_match = true;
    let mut next_word_matched_at = 0;

    for input_char in input_word.chars() {
        // 2重重複考慮のための削除のためのbyte_index管理
        let mut remove_byte_index = byte_index_struct::new();

        let (add_score, new_next_word_matched_at, is_found) = imput_char_loop(input_char, &word_for_search, next_word_matched_at, &mut remove_byte_index);

        if !is_found {
            // マッチしない文字が存在すれば対象としない
            is_all_match = false;
            break;
        }

        word_score = word_score + add_score;

        // 2重matchをしないように考慮
        word_for_search.drain(remove_byte_index.start..remove_byte_index.end);
        // drainでindexが詰められるので = で束縛しとく
        next_word_matched_at = new_next_word_matched_at;
    }

    (word_score, is_all_match)
}

fn imput_char_loop (input_char: char, word_for_search: &String, next_word_matched_at: i32, remove_byte_index: &mut byte_index_struct::ByteIndex) -> (i32, i32, bool){
    // TODO: 最初にnext_word_matched_atを探し、matchしなければ最初から探す仕組みにしたい
    let mut add_score: i32 = 1;
    let mut is_found = false;
    let mut index = 0;

    for (i, search_char) in word_for_search.chars().enumerate()  {
        index = i as i32;

        let remove_byte_index_end = remove_byte_index.end.clone();
        remove_byte_index.set_with_start_len(remove_byte_index_end, search_char.len_utf8());

        // TODO FZFかなんかはスペースが来たら離れたところのほうが加点高くする仕様があるっぽい
        if input_char == search_char && input_char != ' ' {
            add_score = get_score(index, next_word_matched_at);
            is_found = true;
            break;
        }
    }

    (add_score, index.clone(), is_found)
}

fn get_score(index: i32, next_word_matched_at: i32) -> i32 {
    if index == next_word_matched_at {
        // 連続したMatchには加点
        return 3;
    } else if index > next_word_matched_at {
        // 順番通りのMatchには加点
        return 2;
    }

    // 通常加点
    return 1;
}
