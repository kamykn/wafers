#![feature(repr_transparent)]
#![feature(const_vec_new)]
mod js_string_utils;

extern crate serde;
extern crate serde_json;

#[macro_use]
extern crate serde_derive;

#[macro_use]
extern crate lazy_static;

use std::os::raw::c_char;
use std::ffi::CString;
use std::sync::Mutex;
use std::str;

#[derive(Serialize, Deserialize)]
struct WordList {
    list: Vec<String>
}

lazy_static! {
    static ref SEARCH_WORD_LIST: Mutex<Vec<String>> = Mutex::new(vec![]);
    static ref SEARCH_RESULT_JSON_LEN: Mutex<u32> = Mutex::new(0);
}

#[no_mangle]
pub unsafe extern "C" fn setSearchList(word_list_i_str: js_string_utils::JsInteropString) {
    let word_list_json = word_list_i_str.into_boxed_string();
    let word_list_obj: WordList = serde_json::from_str(&word_list_json).unwrap(); 
    for word in word_list_obj.list {
        SEARCH_WORD_LIST.lock().unwrap().push(word);
    }
}

#[no_mangle]
pub unsafe extern "C" fn wazf(search_i_str: js_string_utils::JsInteropString) -> *mut c_char {
    let search_str = search_i_str.into_boxed_string();

    let result = search(search_str.to_string());
    let found_word_list = WordList{list: result};

    let found_word_list_json = serde_json::to_string(&found_word_list).unwrap();

    set_len(&found_word_list_json);
    let found_word_list_json_cstring = CString::new(found_word_list_json).unwrap();
    found_word_list_json_cstring.into_raw()
}


#[no_mangle]
pub unsafe extern "C" fn get_len() -> u32 {
    let search_result_json_len = SEARCH_RESULT_JSON_LEN.lock().unwrap();
    *search_result_json_len
}


#[no_mangle]
pub unsafe extern "C" fn stringPrepare(cap: usize) -> js_string_utils::JsInteropString {
    js_string_utils::JsInteropString::with_capacity(cap)
}

#[no_mangle]
pub unsafe extern "C" fn stringData(mut s: js_string_utils::JsInteropString) -> *mut u8 {
    s.as_mut_ptr()
}

#[no_mangle]
pub unsafe extern "C" fn stringLen(s: js_string_utils::JsInteropString) -> usize {
    s.as_string().len()
}

fn search(inputWord: String) -> Vec<String> {
    let mut found_word_list: Vec<String> = Vec::new();
    for inputChar in inputWord.chars() {
        for mut searchWord in SEARCH_WORD_LIST.lock().unwrap().iter() {
            let mut score = 0;
            for searchChar in searchWord.chars() {
                if inputChar == searchChar {
                    score = score + 1;
                }
            }

            if score > 1 {
                found_word_list.push(searchWord.to_string());
            }
        }
    }

    return found_word_list
}

fn set_len(str_for_set_len: &String) {
    let mut search_result_json_len = SEARCH_RESULT_JSON_LEN.lock().unwrap();
    let found_word_list_json_len = str_for_set_len.len() as u32;
    *search_result_json_len = found_word_list_json_len;
}
