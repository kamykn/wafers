use super::word_scoring_struct;

pub fn set_highlight(return_word_scoring_map: &mut Vec<word_scoring_struct::WordScoring>) {
    // match部分をhighlight用の文字列で囲んだ文字列を生成
    for ref mut word_scoring in return_word_scoring_map {
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
