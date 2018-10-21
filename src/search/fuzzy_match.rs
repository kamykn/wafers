use super::word_scoring_struct;
use search::byte_index_struct;

pub fn fuzzy_match (mut search_word_list: Vec<word_scoring_struct::WordScoring>, input_word: String) -> Vec<word_scoring_struct::WordScoring> {
    let mut word_scoreing_list: Vec<word_scoring_struct::WordScoring> = Vec::new();

    for mut word_scoring in search_word_list.iter_mut() {

        // すべて一致するもののみ表示する前提の上で対象から外す
        if word_scoring.word.len() < input_word.len() {
            continue;
        }

        // 文字数が一緒なら == で比較しても良いかオプション化しても良さそう

        // TODO: オプション化
        let mut word_for_search = word_scoring.word.to_lowercase();

        let (word_score, is_all_match) = input_word_loop(input_word.clone(), word_for_search);
        word_scoring.score = word_score;

        if is_all_match {
            // TODO: 不要な気がしてきたので検討

            // 距離に対する減点
            let len_diff = (word_scoring.word.len() - input_word.len()) as i32;
            word_scoring.score = word_scoring.score - len_diff;

            word_scoreing_list.push(word_scoring.clone());
        }
    }

    word_scoreing_list 
}

fn input_word_loop(input_word: String, mut word_for_search: String) -> (i32, bool) {
    let mut word_score: i32 = 0;
    let mut is_all_match = true;
    let mut next_word_matched_at = 0;

    // 2重重複考慮のための削除のためのbyte_index管理
    let mut remove_byte_index = byte_index_struct::new();

    for input_char in input_word.chars() {

        let (add_score, new_next_word_matched_at, is_found) = imput_char_loop(input_char, &word_for_search, next_word_matched_at, &mut remove_byte_index);

        if !is_found {
            // どこにもマッチしなければ対象としない
            is_all_match = false;
            break;
        }

        word_score = word_score + add_score;
        next_word_matched_at = new_next_word_matched_at;

        // 2重matchをしないように考慮
        word_for_search.drain(remove_byte_index.start..remove_byte_index.end);
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

        // TODO: ココらへんはStructなどにして外に出す
        let remove_byte_index_end = remove_byte_index.end.clone();
        remove_byte_index.set_with_start_len(remove_byte_index_end, search_char.len_utf8());

        // TODO FZFかなんかはスペースが来たら離れたところのほうが加点高くする仕様があるっぽい
        if input_char == search_char && input_char != ' ' {
            if index == next_word_matched_at {
                // 連続したMatchには加点
                add_score = 3;
            } else if index > next_word_matched_at {
                // 順番通りのMatchには加点
                add_score = 2;
            } else {
                // 通常加点
                add_score = 1;
            }

            is_found = true;
            break;
        }
    }

    // drainでindexが詰められるので = で束縛しとく
    // 参照渡しへの借用はより大きいスコープが求められるので
    // 新しい値作って元の方で束縛し直してます
    let new_next_word_matched_at = index.clone();

    (add_score, new_next_word_matched_at, is_found)
}
