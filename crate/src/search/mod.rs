use std::sync::Mutex;
use std::collections::HashMap;

mod sort;
mod fuzzy_match;
pub mod cache;
pub mod word_scoring_struct;
pub mod byte_index_struct;

lazy_static! {
    // 検索対象文字列
    pub static ref SEARCH_WORD_LIST: Mutex<HashMap<u32, word_scoring_struct::WordScoring>> = Mutex::new(HashMap::new());
    // マッチした中から返す数の設定
    pub static ref RETURN_MATCH_LIST_LEN: Mutex<u32> = Mutex::new(30);
    // マッチした数
    pub static ref HIT_LIST_LEN: Mutex<u32> = Mutex::new(0);
}

// FYI https://postd.cc/reverse-engineering-sublime-text-s-fuzzy-match/
pub fn fuzzy_match(mut input_string: String) -> Vec<word_scoring_struct::WordScoring> {
    // lowercase照合
    // TODO: 大文字小文字区別してマッチさせるかはオプション化させたい
    input_string = input_string.to_lowercase();

    // 結果用変数
    let mut word_scoreing_list: Vec<word_scoring_struct::WordScoring> = Vec::new();
    if input_string.len() == 0 {
        return word_scoreing_list;
    }

    // 検索
    word_scoreing_list = fuzzy_match::search(input_string.clone());

    // ソート 
    // TODO: オプション化
    if word_scoreing_list.len() > 1 {
        // TODO: スコアが低いものは早々に切ってしまいたい
        sort::sort(&mut word_scoreing_list);
    }

    word_scoreing_list
}

