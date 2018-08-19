use super::word_scoring;

pub fn fuzzy_match (mut search_word_list: Vec<word_scoring::WordScoring>, input_word: String) -> Vec<word_scoring::WordScoring> {
    let mut word_scoreing_list: Vec<word_scoring::WordScoring> = Vec::new();

    for mut word_scoring in search_word_list.iter_mut() {
        // let mut debug_str: String = "".to_string();
        let mut add_score: i32 = 1;
        let mut next_word_matched_at = 0;
        let mut is_all_match = true;

        if word_scoring.word.len() < input_word.len() {
            continue;
        }

        // 文字数が一緒なら == で比較しても良いかオプション化しても良さそう

        // TODO: オプション化
        let mut word_for_search = word_scoring.word.to_lowercase();
        for input_char in input_word.chars() {
            let mut is_found = false;

            for (i, search_char) in word_for_search.chars().enumerate()  {
                // TODO スペースが来たら離れたところのほうが加点高くする
                if input_char == search_char && input_char != ' ' {
                    if i == next_word_matched_at {
                        // 連続したMatchには加点
                        add_score = add_score + 1;
                    } else {
                        // 加点戻し
                        add_score = 1;
                    }

                    // TODO: 削除 デバッグ用文字列
                    // debug_str = debug_str + " + " + &i.to_string() + ":" + &next_word_matched_at.to_string() + ":" + &add_score.to_string();
                    word_scoring.score = word_scoring.score + add_score;
                    next_word_matched_at = i + 1;
                    is_found = true;
                    break;
                }
            }

            if !is_found {
                is_all_match = false;
                break;
            } else {
                // 2重matchをしないように考慮
                word_for_search.remove(next_word_matched_at - 1);
            }
        }

        if is_all_match {
            let len_diff = (word_scoring.word.len() - input_word.len()) as i32;
            word_scoring.score = word_scoring.score - len_diff;

            // TODO: 削除 デバッグ用文字列
            // word_scoring.word = word.to_string() + &score.to_string();
            word_scoreing_list.push(word_scoring.clone());
        }
    }

    word_scoreing_list 
}
