#![feature(repr_transparent)]
mod js_string_utils;

extern crate serde;
extern crate serde_json;
#[macro_use]
extern crate serde_derive;

use serde_json::{Value, Error};
use std::os::raw::c_char;
use std::ffi::CString;
use std::str;

#[derive(Serialize, Deserialize)]
struct WordList {
    list: Vec<String>
}

#[no_mangle]
pub unsafe extern "C" fn wazf(search_i_str: js_string_utils::JsInteropString, word_list_i_str: js_string_utils::JsInteropString) -> *mut c_char {
    let search_str = search_i_str.into_boxed_string();
    let word_list_json = word_list_i_str.into_boxed_string();

    let word_list: WordList = serde_json::from_str(&word_list_json).unwrap(); 
    let result = search(search_str.to_string(), word_list);
    let found_word_list = WordList{list: result};

    let found_word_list_json = serde_json::to_string(&found_word_list);
    let found_word_list_json_cstring = CString::new(found_word_list_json.unwrap()).unwrap();
    found_word_list_json_cstring.into_raw()
}

pub fn sget_hello(somestring: &str ) -> *mut c_char {
    let s = CString::new(somestring).unwrap();
    s.into_raw()
}

#[no_mangle]
pub fn get_hello_len() -> usize {
    // HELLO.len()
    return 4;
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

fn search(inputWord: String, searchList: WordList) -> Vec<String> {
    let check = &inputWord;
    let mut found_word_list: Vec<String> = Vec::new();
    for inputChar in inputWord.chars() {
        for mut searchWord in searchList.list.iter() {
            for searchChar in searchWord.chars() {
                if inputChar == searchChar {
                    found_word_list.push(searchWord.to_string());
                }
            }
        }
    }

    return found_word_list
}

