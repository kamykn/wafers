use std::sync::Mutex;
use std::collections::HashMap;

mod sort;
mod fuzzy_match;
mod highlight;
pub mod cache;
pub mod word_scoring_struct;

lazy_static! {
    // 検索対象文字列
    pub static ref SEARCH_WORD_LIST: Mutex<HashMap<u32, word_scoring_struct::WordScoring>> = Mutex::new(HashMap::new());
    // マッチした中から返す数の設定
    pub static ref RETURN_MATCH_LIST_LEN: Mutex<u32> = Mutex::new(30);
    // マッチした数
    pub static ref HIT_LIST_LEN: Mutex<u32> = Mutex::new(0);
}

// FYI https://postd.cc/reverse-engineering-sublime-text-s-fuzzy-match/
pub fn fuzzy_match<'word_scoring>(mut input_string: String) -> Vec<word_scoring_struct::WordScoring> {
    // lowercase照合
    // TODO: 大文字小文字区別してマッチさせるかはオプション化させたい
    input_string = input_string.to_lowercase();

    if input_string.len() == 0 {
        return Vec::new();
    }

    // 検索
    let word_scoring_map = fuzzy_match::search(input_string.clone());

    // HashMapからVecに変換
    let mut word_scoring_vec: Vec<word_scoring_struct::WordScoring> = 
            word_scoring_map.iter().map(|(_, v)| v.to_owned()).collect();

    // ヒット数記憶
    let mut hit_list_len = HIT_LIST_LEN.lock().unwrap();
    *hit_list_len = word_scoring_vec.len() as u32;

    // ソート 
    if word_scoring_vec.len() > 1 {
        // TODO: スコアが低いものは早々に切ってしまいたい
        sort::sort(&mut word_scoring_vec);
    }

    // 設定返却件数にslice(drain)
    let mut return_match_list_num = *RETURN_MATCH_LIST_LEN.lock().unwrap() as usize;
    let mut return_word_scoring_vec = Vec::new();
    if (word_scoring_vec.len()) > return_match_list_num {
        return_word_scoring_vec = word_scoring_vec.drain(..return_match_list_num).collect();
    } else {
        return_word_scoring_vec = word_scoring_vec;
    }

    // ハイライトつけて返却
    highlight::set_highlight(&mut return_word_scoring_vec);
    return_word_scoring_vec.to_owned()
}

