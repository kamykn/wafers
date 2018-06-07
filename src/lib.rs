#[macro_use]
extern crate stdweb;

static mut FOUND_WORD_LIST: &'static mut [&'static str] = &mut [];

#[no_mangle]
pub extern "C" fn search(inputWord: String, searchList: &'static [&'static str]) -> *const &str {
    let check = &inputWord;
    js! {
        console.log(@{check});
    }
    for inputChar in inputWord.chars() {
        let mut index = 0;
        for mut searchWord in searchList.iter() {
            for searchChar in searchWord.chars() {
                if inputChar == searchChar {
                    unsafe {
                        FOUND_WORD_LIST[index] = &searchWord;
                    }
                    index = index+1;
                    break;
                }
            }
        }
    }

    unsafe {
        &FOUND_WORD_LIST[0]
    }
}

