extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

// 使い方
// [lib.rs] =========
// mod js_utils; 
//
// [other.rs] =========
// use ::js_utils;
// {...}
// unsafe {js_utils::log("string")}

#[wasm_bindgen]
extern {
    pub fn alert(s: &str);

    #[wasm_bindgen(js_namespace = console)]
    pub fn log(s: &str);
}
