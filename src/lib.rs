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
use std::cmp::Ordering;
use std::ffi::CString;
use std::sync::Mutex;
use std::str;

#[derive(Serialize, Deserialize)]
struct WordList {
    list: Vec<String>
}

#[derive(Clone)]
struct WordScoring {
    score: u8,
    word: String,
}

impl PartialOrd for WordScoring {
    fn partial_cmp(&self, other: &WordScoring) -> Option<Ordering> {
        self.score.partial_cmp(&other.score)
    }
}

impl PartialEq for WordScoring {
    fn eq(&self, other: &WordScoring) -> bool {
        self.score == other.score
    }
}


lazy_static! {
    static ref SEARCH_WORD_LIST: Mutex<Vec<String>> = Mutex::new(vec![]);
    static ref SEARCH_RESULT_JSON_LEN: Mutex<u32> = Mutex::new(0);
}

#[no_mangle]
pub unsafe extern "C" fn setSearchWordList(word_list_i_str: js_string_utils::JsInteropString) {
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

fn search(input_word: String) -> Vec<String> {
    let mut word_scoreing_list: Vec<WordScoring> = Vec::new();

    for mut word in SEARCH_WORD_LIST.lock().unwrap().iter() {
        let mut score = 0;
        let mut before_word_matched_at = 0;

        for (i, input_char) in input_word.chars().enumerate() {
            for search_char in word.chars()  {
            let mut add_score = 1;
                if input_char == search_char {
                    if i == before_word_matched_at + 1 {
                        // 連続したMatchには加点
                        add_score = add_score + 1;
                    }

                    score = score + add_score;
                    before_word_matched_at = i;
                    break;
                }
            }

            // 見つからなかった
            before_word_matched_at = 0;
        }

        if score > 1 {
            let word_scoring = WordScoring{
                score,
                word: word.to_string()
            };
            word_scoreing_list.push(word_scoring);
        }
    }

    sort(&mut word_scoreing_list);
    let mut sorted_found_word_list: Vec<String> = Vec::new();
    for word_scoreing in word_scoreing_list {
        sorted_found_word_list.push(word_scoreing.word);
    }

    return sorted_found_word_list
}

// fn isRankin(score, current_ranking) {
//     // minをstaticにしたい
//     // min より低ければ圏外
//     if  {
// 
//     }
// 
//     // すでにランクがN件以上かつminと=なら圏外
//     
//     // ランクイン
//     (rank, current_ranking)
// 
// }

fn set_len(str_for_set_len: &String) {
    let mut search_result_json_len = SEARCH_RESULT_JSON_LEN.lock().unwrap();
    let found_word_list_json_len = str_for_set_len.len() as u32;
    *search_result_json_len = found_word_list_json_len;
}

fn sort<T: PartialOrd + Clone>(source: &mut [T]) {
    fn q_sort<TInner: PartialOrd + Clone>(source: &mut [TInner], left: usize, right: usize) {
        let pivot = source[(left + right) >> 1].clone();
        let mut l = left;
        let mut r = right;
        while l <= r {
            while pivot < source[r] && r > left {
                r -= 1;
            }
            while source[l] < pivot && l < right {
                l += 1;
            }
            if l <= r {
                source.swap(l, r);
                if r > 0 {
                    r -= 1;
                }
                l += 1;
            }
        }
        if left < r {
            q_sort(source, left, r);
        }
        if right > l {
            q_sort(source, l, right);
        }
    }

    let size = source.len() - 1;
    q_sort(source, 0, size);
}

