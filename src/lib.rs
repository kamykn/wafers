#![feature(const_vec_new)]
mod js_string_utils;

extern crate serde;
extern crate serde_json;

#[macro_use]
extern crate serde_derive;

#[macro_use]
extern crate lazy_static;

// import from js
extern {
    fn logout(n: i32);
}

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
    score: i32,
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
    static ref RETURN_MATCH_LIST_NUM: Mutex<u32> = Mutex::new(30);
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
pub unsafe extern "C" fn setReturnMatchListNum(len: u32) {
    let mut return_match_list_num = RETURN_MATCH_LIST_NUM.lock().unwrap();
    *return_match_list_num = len;
}

#[no_mangle]
pub unsafe extern "C" fn wazf(search_i_str: js_string_utils::JsInteropString) -> *mut c_char {
    let search_str = search_i_str.into_boxed_string();
    let word_scoreing_list = search(search_str.to_string());

    let mut found_word_list = WordList{list: Vec::new()};

    // TODO デフォルト
    let mut return_match_list_num = *RETURN_MATCH_LIST_NUM.lock().unwrap() as usize;

    if word_scoreing_list.len() as i32 > 0 {
        if word_scoreing_list.len() < return_match_list_num {
            return_match_list_num = word_scoreing_list.len();
        }
        let mut word_list_list: Vec<String> = Vec::new();

        // TODO 無駄にsliceする場合あり
        let sliced_word_scoreling_list = &word_scoreing_list[..return_match_list_num];

        for word_scorering in sliced_word_scoreling_list {
            word_list_list.push(word_scorering.word.to_string());
        }

        found_word_list.list = word_list_list;
    }

    let found_word_list_json = serde_json::to_string(&found_word_list).unwrap();
    let len = found_word_list_json.len() as u32;
    set_len(len);

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

// FYI https://postd.cc/reverse-engineering-sublime-text-s-fuzzy-match/
fn search(input_word: String) -> Vec<WordScoring> {
    let mut word_scoreing_list: Vec<WordScoring> = Vec::new();

    let search_word_list = SEARCH_WORD_LIST.lock().unwrap();
    for mut word in search_word_list.iter() {
        let mut debug_str: String = "".to_string();
        let mut score: i32 = 0;
        let mut add_score: i32 = 1;
        let mut next_word_matched_at = 0;
        let mut is_all_match = true;

        if word.len() < input_word.len() {
            continue;
        }

        let mut word_for_search = word.to_string();
        for input_char in input_word.chars() {
            let mut is_found = false;

            for (i, search_char) in word_for_search.chars().enumerate()  {
                // TODO スペースが来たら離れたところのほうが加点高くする
                if input_char == search_char && input_char != ' ' {
                    if i == next_word_matched_at {
                        // 連続したMatchには加点
                        add_score = add_score + 1;
                    } else {
                        // 加点戻し
                        add_score = 1;
                    }

                    debug_str = debug_str + " + " + &i.to_string() + ":" + &next_word_matched_at.to_string() + ":" + &add_score.to_string();
                    score = score + add_score;
                    next_word_matched_at = i + 1;
                    is_found = true;
                    break;
                }
            }

            if !is_found {
                is_all_match = false;

                break;
            } else {
                // 2重matchをしないように考慮
                word_for_search.remove(next_word_matched_at - 1);
            }
        }

        if is_all_match {
            // 検索対象 - 入力で必ず自然数に
            let len_diff = (word.len() - input_word.len()) as i32;
            score = score - len_diff;

            let word_scoring = WordScoring{
                score,
                word: word.to_string()
            };
            word_scoreing_list.push(word_scoring);
        }
    }

    if word_scoreing_list.len() > 1 {
        sort(&mut word_scoreing_list);
    }

    return word_scoreing_list;
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

fn set_len(len: u32) {
    let mut search_result_json_len = SEARCH_RESULT_JSON_LEN.lock().unwrap();
    let found_word_list_json_len = len;
    *search_result_json_len = found_word_list_json_len;
}

// rustでクイックソート(逆順)
// FYI: https://qiita.com/chalharu/items/40b4da4d4a88d509a214
fn sort<T: PartialOrd + Clone>(source: &mut [T]) {
    fn qr_sort<TInner: PartialOrd + Clone>(source: &mut [TInner], left: usize, right: usize) {
        // シフト演算子について
        // https://teratail.com/questions/23803#reply-37553
        let pivot = source[(left + right) >> 1].clone();
        let mut l = left;
        let mut r = right;
        while l >= r {
            while pivot < source[r] && r > left {
                r += 1;
            }
            while source[l] < pivot && l < right {
                l -= 1;
            }
            if l <= r {
                source.swap(l, r);
                if r > 0 {
                    r += 1;
                }
                l -= 1;
            }
        }
        if left > r {
            qr_sort(source, left, r);
        }
        if right < l {
            qr_sort(source, l, right);
        }
    }

    let size = source.len() - 1;
    qr_sort(source, 0, size);
}

