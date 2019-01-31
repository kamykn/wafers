use std::sync::Mutex;
use super::word_scoring_struct;
use std::collections::HashMap;
use owning_ref::MutexGuardRef;

use ::js_utils;

lazy_static! {
    // 今までのwordはキャッシュ持つ
    // 一文字追加されただけなどの状況がわかればキャッシュの続きから検索する。
    // 例：l,lo,lov,loveの分のキャッシュを持ち、検索文字列の削除が発生したらそこまで消す。
    // 消される可能性があるのは単語末尾だけではない。単語真ん中もありうる。

    // key: 検索語のindex, value: 検索結果キャッシュ
    pub static ref SEARCH_RESULT_CACHE_LIST: Mutex<Vec<HashMap<u32, word_scoring_struct::WordScoring>>> = Mutex::new(vec![]);
    // 検索用文字列の履歴
    pub static ref BEFORE_SEARCH_WORD_LIST: Mutex<Vec<String>> = Mutex::new(vec![]);
}

// キャッシュ削除
pub fn delete_cache() {
    SEARCH_RESULT_CACHE_LIST.lock().unwrap().truncate(0);
    BEFORE_SEARCH_WORD_LIST.lock().unwrap().truncate(0);
}

pub fn push(word_scoreing_list: HashMap<u32, word_scoring_struct::WordScoring>, input_word: String) {
    let mut before_search_word_list_mutex = BEFORE_SEARCH_WORD_LIST.lock().unwrap();
    before_search_word_list_mutex.push(input_word);

    let mut search_result_cache_list_mutex = SEARCH_RESULT_CACHE_LIST.lock().unwrap();
    search_result_cache_list_mutex.push(word_scoreing_list);
}

// キャッシュを探す
pub fn get_search_word_list(input_word: String) -> (&'static mut HashMap<u32, word_scoring_struct::WordScoring>, bool) {
    let search_result_cache_list_mutex = SEARCH_RESULT_CACHE_LIST.lock().unwrap();
    let before_search_word_list_mutex = BEFORE_SEARCH_WORD_LIST.lock().unwrap();

    let mut is_cache_found = false;
    let mut cache_index = 0;
    let mut is_matching_exactly = false;

    if before_search_word_list_mutex.len() as u32 > 0 {
        let mut input_history = String::new();
        for input_char in input_word.chars() {
            input_history.push(input_char);
            for (index, before_search_word) in before_search_word_list_mutex.iter().enumerate() {
                if before_search_word == &input_history {
                    cache_index = index;
                    is_cache_found = true;

                    if before_search_word == &input_word {
                        is_matching_exactly = true
                    }
                }
            }
        }
    }

    if !is_cache_found {
        let search_word_list = MutexGuardRef::new(super::SEARCH_WORD_LIST.lock().unwrap());
        return (&mut search_word_list, is_matching_exactly);
    }

    let search_result_cache_list = search_result_cache_list_mutex;
    if cache_index < search_result_cache_list.len()  {
        let ref mut search_word_list = search_result_cache_list[cache_index as usize];
        return (search_word_list, is_matching_exactly);
    } 

    let search_word_list: HashMap<u32, word_scoring_struct::WordScoring> = HashMap::new();
    (&mut search_word_list, is_matching_exactly)
}
