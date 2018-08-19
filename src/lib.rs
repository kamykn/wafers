#![feature(const_vec_new)]
mod js_utils;
mod search;

extern crate serde;
extern crate serde_json;

#[macro_use]
extern crate serde_derive;

#[macro_use]
extern crate lazy_static;

// import from js
// extern {
//     fn logout(n: i32);
// }

use std::os::raw::c_char;
use std::ffi::CString;
use std::str;

#[derive(Serialize, Deserialize)]
struct WordList {
    list: Vec<String>
}

#[no_mangle]
pub unsafe extern "C" fn setSearchWordList(word_list_i_str: js_utils::JsInteropString) {
    let word_list_json = word_list_i_str.into_boxed_string();
    let word_list_obj: WordList = serde_json::from_str(&word_list_json).unwrap(); 
    for word in word_list_obj.list {
        let word_scoring = search::word_scoring::new(word.to_string());
        search::SEARCH_WORD_LIST.lock().unwrap().push(word_scoring);
    }
}

#[no_mangle]
pub unsafe extern "C" fn setReturnMatchListNum(len: u32) {
    let mut return_match_list_num = search::RETURN_MATCH_LIST_NUM.lock().unwrap();
    *return_match_list_num = len;
}

#[no_mangle]
pub unsafe extern "C" fn wazf(search_i_str: js_utils::JsInteropString) -> *mut c_char {
    let search_str = search_i_str.into_boxed_string();
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
    let len = found_word_list_json.len() as u32;
    set_len(len);

    let found_word_list_json_cstring = CString::new(found_word_list_json).unwrap();
    found_word_list_json_cstring.into_raw()
}

#[no_mangle]
pub unsafe extern "C" fn get_len() -> u32 {
    let search_result_json_len = search::SEARCH_RESULT_JSON_LEN.lock().unwrap();
    *search_result_json_len
}


#[no_mangle]
pub unsafe extern "C" fn stringPrepare(cap: usize) -> js_utils::JsInteropString {
    js_utils::JsInteropString::with_capacity(cap)
}

#[no_mangle]
pub unsafe extern "C" fn stringData(mut s: js_utils::JsInteropString) -> *mut u8 {
    s.as_mut_ptr()
}

#[no_mangle]
pub unsafe extern "C" fn stringLen(s: js_utils::JsInteropString) -> usize {
    s.as_string().len()
}

fn set_len(len: u32) {
    let mut search_result_json_len = search::SEARCH_RESULT_JSON_LEN.lock().unwrap();
    let found_word_list_json_len = len;
    *search_result_json_len = found_word_list_json_len;
}
