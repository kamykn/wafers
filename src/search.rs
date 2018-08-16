use std::cmp::Ordering;
use std::sync::Mutex;

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
    pub static ref SEARCH_RESULT_CACHE_LIST: Mutex<Vec<Vec<WordScoring>>> = Mutex::new(vec![]);
    // 検索ワード
    pub static ref BEFORE_SEARCH_WORD_LIST: Mutex<Vec<String>> = Mutex::new(vec![]);

    pub static ref SEARCH_WORD_LIST: Mutex<Vec<WordScoring>> = Mutex::new(vec![]);
    pub static ref SEARCH_RESULT_JSON_LEN: Mutex<u32> = Mutex::new(0);
    pub static ref RETURN_MATCH_LIST_NUM: Mutex<u32> = Mutex::new(30);
}

#[derive(Clone)]
pub struct WordScoring {
    pub score: i32,
    pub word: String,
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

// TODO キャッシュ削除実装
fn delete_cache() {

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

// 検索対象文字列を取得
fn get_search_word_list(input_word: String, before_search_word_list: Vec<String>, search_result_cache_list: Vec<Vec<WordScoring>>) -> Vec<WordScoring> {
    // キャッシュ検索
    let (cache_index, is_cache_found) = search_cache(before_search_word_list, input_word.clone());

    // キャッシュがある場合はキャッシュを採用、無い場合はワードリストから作成
    let mut search_word_list: Vec<WordScoring> = Vec::new();
    if is_cache_found {
        search_word_list = search_result_cache_list[cache_index as usize].clone();
        unsafe { logout(search_word_list.len() as i32); }
    } else {
        search_word_list = SEARCH_WORD_LIST.lock().unwrap().to_vec();
    }

    search_word_list
}

// FYI https://postd.cc/reverse-engineering-sublime-text-s-fuzzy-match/
pub fn search(mut input_word: String) -> Vec<WordScoring> {

    // lowercase照合
    // TODO: オプション化
    input_word = input_word.to_lowercase();

    // 結果用変数
    let mut word_scoreing_list: Vec<WordScoring> = Vec::new();
    if input_word.len() == 0 {
        return word_scoreing_list;
    }

    // 検索
    let mut search_result_cache_list_mutex = SEARCH_RESULT_CACHE_LIST.lock().unwrap();
    let mut before_search_word_list_mutex = BEFORE_SEARCH_WORD_LIST.lock().unwrap();
    let search_word_list = get_search_word_list(input_word.clone(), before_search_word_list_mutex.to_vec(), search_result_cache_list_mutex.to_vec());
    word_scoreing_list = fazzy_match(search_word_list, input_word.clone());

    // ソート 
    // TODO: オプション化
    if word_scoreing_list.len() > 1 {
        sort(&mut word_scoreing_list);
    }

    // キャッシュに入れる
    search_result_cache_list_mutex.push(word_scoreing_list.clone());
    before_search_word_list_mutex.push(input_word);

    return word_scoreing_list;
}

// fazzy_matchのロジック部分
fn fazzy_match (mut search_word_list: Vec<WordScoring>, input_word: String) -> Vec<WordScoring> {
    let mut word_scoreing_list: Vec<WordScoring> = Vec::new();

    for mut word_scoring in search_word_list.iter_mut() {
        let mut debug_str: String = "".to_string();
        let mut add_score: i32 = 1;
        let mut next_word_matched_at = 0;
        let mut is_all_match = true;

        if word_scoring.word.len() < input_word.len() {
            continue;
        }

        // 文字数が一緒なら == で比較しても良いかオプション化しても良さそう

        // TODO: オプション化
        let mut word_for_search = word_scoring.word.to_lowercase();
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

                    // TODO: 削除デバッグ用文字列
                    debug_str = debug_str + " + " + &i.to_string() + ":" + &next_word_matched_at.to_string() + ":" + &add_score.to_string();
                    word_scoring.score = word_scoring.score + add_score;
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
            let len_diff = (word_scoring.word.len() - input_word.len()) as i32;
            word_scoring.score = word_scoring.score - len_diff;

            // word_scoring.word = word.to_string() + &score.to_string(); // for scoring debug
            word_scoreing_list.push(word_scoring.clone());
        }
    }

    word_scoreing_list 
}

// TODO: スコアがランクに満たない場合早々に切ってしまいたい

// rustでクイックソート(逆順)
// FYI: https://qiita.com/chalharu/items/40b4da4d4a88d509a214
fn sort<T: PartialOrd + Clone>(source: &mut [T]) {
    fn qr_sort<TInner: PartialOrd + Clone>(source: &mut [TInner], left: usize, right: usize) {
        // シフト演算子について
        // https://teratail.com/questions/23803#reply-37553
        let pivot = source[(left + right) >> 1].clone();
        let mut l = left;
        let mut r = right;
        while l <= r {
            while pivot > source[r] && r > left {
                r -= 1;
            }
            while source[l] > pivot && l < right {
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
            qr_sort(source, left, r);
        }
        if right > l {
            qr_sort(source, l, right);
        }
    }

    let size = source.len() - 1;
    qr_sort(source, 0, size);
}
