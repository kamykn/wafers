#[no_mangle]
pub extern "C" fn search<'a> (inputWord: &str, searchList: Vec<&str>) -> &'a str {
    let mut foundWordList = Vec::<&str>::new();
    let aaa = &"Hello";
    for inputChar in inputWord.chars() {
        let mut isFound = false;
        for searchWord in &searchList {
            for searchChar in searchWord.chars() {
                if inputChar == searchChar {
                    isFound = true;
                }
            }

            if isFound {
                foundWordList.push("aaaa");
                break;
            }
        }

    }

    // &foundWordList[0]
    aaa
}

