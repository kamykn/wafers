use std::sync::Mutex;

mod sort;
mod fuzzy_match;
pub mod word_scoring;

// import from js
extern {
    fn logout(n: i32);
}

lazy_static! {
    // 今までのwordはキャッシュ持つ
    // 一文字追加されただけなどの状況がわかればキャッシュの続きから検索する。
    // 例：l,lo,lov,loveの分のキャッシュを持ち、検索文字列の削除が発生したらそこまで消す。
    // 消される可能性があるのは単語末尾だけではない。単語真ん中もありうる。

    // key: 検索語のindex, value: 検索結果キャッシュ
    pub static ref SEARCH_RESULT_CACHE_LIST: Mutex<Vec<Vec<word_scoring::WordScoring>>> = Mutex::new(vec![]);
    // 検索ワード
    pub static ref BEFORE_SEARCH_WORD_LIST: Mutex<Vec<String>> = Mutex::new(vec![]);

    pub static ref SEARCH_WORD_LIST: Mutex<Vec<word_scoring::WordScoring>> = Mutex::new(vec![]);
    pub static ref SEARCH_RESULT_JSON_LEN: Mutex<u32> = Mutex::new(0);
    pub static ref RETURN_MATCH_LIST_NUM: Mutex<u32> = Mutex::new(30);
}

// FYI https://postd.cc/reverse-engineering-sublime-text-s-fuzzy-match/
pub fn search(mut input_word: String) -> Vec<word_scoring::WordScoring> {

    // lowercase照合
    // TODO: オプション化
    input_word = input_word.to_lowercase();

    // 結果用変数
    let mut word_scoreing_list: Vec<word_scoring::WordScoring> = Vec::new();
    if input_word.len() == 0 {
        return word_scoreing_list;
    }

    // 検索
    let mut search_result_cache_list_mutex = SEARCH_RESULT_CACHE_LIST.lock().unwrap();
    let mut before_search_word_list_mutex = BEFORE_SEARCH_WORD_LIST.lock().unwrap();
    let search_word_list = get_search_word_list(input_word.clone(), before_search_word_list_mutex.to_vec(), search_result_cache_list_mutex.to_vec());
    word_scoreing_list = fuzzy_match::fuzzy_match(search_word_list, input_word.clone());

    // ソート 
    // TODO: オプション化
    if word_scoreing_list.len() > 1 {
        // TODO: スコアがランクに満たない場合早々に切ってしまいたい
        sort::sort(&mut word_scoreing_list);
    }

    // キャッシュに入れる
    search_result_cache_list_mutex.push(word_scoreing_list.clone());
    before_search_word_list_mutex.push(input_word);

    word_scoreing_list
}

// TODO キャッシュ削除実装
fn delete_cache() {

}

// 検索対象文字列を取得
fn get_search_word_list(input_word: String, before_search_word_list: Vec<String>, search_result_cache_list: Vec<Vec<word_scoring::WordScoring>>) -> Vec<word_scoring::WordScoring> {
    // キャッシュ検索
    let (cache_index, is_cache_found) = search_cache(before_search_word_list, input_word.clone());

    // キャッシュがある場合はキャッシュを採用、無い場合はワードリストから作成
    let mut search_word_list: Vec<word_scoring::WordScoring> = Vec::new();
    if is_cache_found {
        search_word_list = search_result_cache_list[cache_index as usize].clone();
        unsafe { logout(search_word_list.len() as i32); }
    } else {
        search_word_list = SEARCH_WORD_LIST.lock().unwrap().to_vec();
    }

    search_word_list
}

// キャッシュを探す
fn search_cache(before_search_word_list_mutex: Vec<String>, input_word: String) -> (i32, bool) {
    let mut is_cache_found = false;
    let mut cache_index = 0;

    if before_search_word_list_mutex.len() as i32 > 0 {
        let mut input_history = String::new();
        for input_char in input_word.chars() {
            input_history.push(input_char);
            for (index, before_search_word) in before_search_word_list_mutex.iter().enumerate() {
                if before_search_word == &input_history {
                    cache_index = index;
                    is_cache_found = true;
                }
            }
        }
    }

    return (cache_index as i32, is_cache_found)
}