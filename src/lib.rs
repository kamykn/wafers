static mut FOUND_WORD_LIST: &'static mut [&'static str] = &mut [];

#[no_mangle]
pub extern "C" fn search(inputWord: String, searchList: &'static [&'static str]) -> &'static str {
    let check = &inputWord;
    return &searchList[0];
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

