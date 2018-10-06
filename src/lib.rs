#![feature(const_vec_new, proc_macro)]

extern crate serde;
extern crate serde_json;
extern crate cfg_if;
extern crate wasm_bindgen;

#[macro_use]
extern crate serde_derive;

#[macro_use]
extern crate lazy_static;

mod search;
mod utils;

use std::str;
use wasm_bindgen::prelude::*;

#[derive(Serialize, Deserialize)]
struct WordList {
    list: Vec<String>
}

#[wasm_bindgen]
pub fn setSearchWordList(word_list_json: &str) {
    let word_list_obj: WordList = serde_json::from_str(&word_list_json.to_string()).unwrap(); 

    let mut search_word_list = search::SEARCH_WORD_LIST.lock().unwrap();
    search_word_list.clear();
    for word in word_list_obj.list {
        let word_scoring = search::word_scoring::new(word.to_string());
        search_word_list.push(word_scoring);
    }
}

#[wasm_bindgen]
pub fn setReturnMatchListNum(len: u32) {
    let mut return_match_list_num = search::RETURN_MATCH_LIST_NUM.lock().unwrap();
    *return_match_list_num = len;
}

#[wasm_bindgen]
pub fn wazf(search_str: &str) -> String {
    let word_scoreing_list = search::search(search_str.to_string());
    let mut found_word_list = WordList{list: Vec::new()};

    // TODO デフォルト
    let mut return_match_list_num = *search::RETURN_MATCH_LIST_NUM.lock().unwrap() as usize;

    if word_scoreing_list.len() as i32 > 0 {
        if word_scoreing_list.len() < return_match_list_num {
            return_match_list_num = word_scoreing_list.len();
        }
        let mut word_list_list: Vec<String> = Vec::new();

        // TODO 無駄にsliceする場合あり(全範囲返すとか)
        let sliced_word_scoreling_list = &word_scoreing_list[..return_match_list_num];

        for word_scorering in sliced_word_scoreling_list {
            word_list_list.push(word_scorering.word.to_string());
        }

        found_word_list.list = word_list_list;
    }

    // TODO: 脱JSON http://ykicisk.hatenablog.com/entry/2017/04/30/195824
    let found_word_list_json = serde_json::to_string(&found_word_list).unwrap();

    found_word_list_json
}

#[wasm_bindgen]
pub fn get_len() -> u32 {
    let search_result_json_len = search::SEARCH_RESULT_JSON_LEN.lock().unwrap();
    *search_result_json_len
}

#[wasm_bindgen]
pub fn deleteCache() {
    search::delete_cache();
}

fn set_len(len: u32) {
    let mut search_result_json_len = search::SEARCH_RESULT_JSON_LEN.lock().unwrap();
    let found_word_list_json_len = len;
    *search_result_json_len = found_word_list_json_len;
}
