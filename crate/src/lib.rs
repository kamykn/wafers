#![feature(const_vec_new, proc_macro)]

extern crate serde;
extern crate serde_json;
extern crate cfg_if;
extern crate wasm_bindgen;
extern crate owning_ref;


#[macro_use]
extern crate serde_derive;

#[macro_use]
extern crate lazy_static;

mod search;
mod utils;
mod js_utils;

use wasm_bindgen::prelude::*;
use std::collections::HashMap;

#[derive(Serialize, Deserialize)]
struct ResultData {
    matches: HashMap<String, String>,
    highlighteds: HashMap<String, String>,
    score: u32
}

#[wasm_bindgen(js_name = setSearchWordList)]
pub fn set_search_word_list(word_list_json: &str) {
    utils::set_panic_hook();

    search::cache::delete_cache();
    let word_map_list: Vec<HashMap<String, String>> = serde_json::from_str(&word_list_json.to_string()).unwrap(); 

    let mut search_word_list = search::SEARCH_WORD_LIST.lock().unwrap();
    search_word_list.clear();

    for (index, mut word_map) in word_map_list.iter().enumerate() {
        let word_scoring = search::word_scoring_struct::new(index as u32, &mut word_map.clone());
        search_word_list.insert(index as u32, word_scoring);
    }
}

#[wasm_bindgen(js_name = setReturnListLength)]
pub fn set_return_list_length(len: u32) {
    utils::set_panic_hook();

    // 返り値としてほしい個数の設定
    let mut return_match_list_num = search::RETURN_MATCH_LIST_LEN.lock().unwrap();
    *return_match_list_num = len;
}

#[wasm_bindgen(js_name = fuzzyMatch)]
pub fn fuzzy_match(search_str: &str) -> String {
    utils::set_panic_hook();

    let word_scoreing_list = search::fuzzy_match(search_str.to_string());
    let mut hit_list_len = search::HIT_LIST_LEN.lock().unwrap();
    *hit_list_len = word_scoreing_list.len() as u32;

    // TODO デフォルト設定用意する
    let mut return_match_list_num = *search::RETURN_MATCH_LIST_LEN.lock().unwrap() as usize;

    let mut result_list = Vec::new();
    if word_scoreing_list.len() as u32 > 0 {
        if (word_scoreing_list.len()) < return_match_list_num {
            return_match_list_num = word_scoreing_list.len();
        }

        // NOTE: 無駄にsliceする場合あり(全範囲返すとか)
        let sliced_word_scoreling_list = &word_scoreing_list[..return_match_list_num];

        for word_scorering in sliced_word_scoreling_list {
            let result = ResultData {
                matches: word_scorering.word_map.clone(), 
                highlighteds: word_scorering.highlighted_word_map.clone(),
                score: word_scorering.score
            };

            result_list.push(result);
        }
    }

    let result_list_json = serde_json::to_string(&result_list).unwrap();

    result_list_json
}

#[wasm_bindgen(js_name = getHitLength)]
pub fn get_hit_length() -> u32 {
    utils::set_panic_hook();
    *search::HIT_LIST_LEN.lock().unwrap()
}

