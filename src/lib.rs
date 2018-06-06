static mut FOUND_WORD_LIST: &'static mut [&'static str] = &mut [];

#[no_mangle]
pub extern "C" fn search(inputWord: String, searchList: &'static [&'static str]) -> *const &str {
    for inputChar in inputWord.chars() {
        let mut isFound = false;
        let mut index = 0;
        for mut searchWord in searchList.iter() {
            for searchChar in searchWord.chars() {
                if inputChar == searchChar {
                    isFound = true;
                }
            }

            if isFound {
                unsafe {
                    FOUND_WORD_LIST[index] = &searchWord;
                }
                index = index+1;
                break;
            }
        }

    }

    unsafe {
        &FOUND_WORD_LIST[0]
    }
}

