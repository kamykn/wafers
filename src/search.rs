use std::cmp::Ordering;
use std::sync::Mutex;

lazy_static! {
    // 今までのwordはキャッシュ持つ
    // 一文字追加されただけなどの状況がわかればキャッシュの続きから検索する。
    // 例：l,lo,lov,loveの分のキャッシュを持ち、検索文字列の削除が発生したらそこまで消す。
    // 消される可能性があるのは単語末尾だけではない。単語真ん中もありうる。

    // key: 検索語のindex, value: 検索結果キャッシュ
    pub static ref SEARCH_RESULT_CACHE_LIST: Mutex<Vec<WordScoring>> = Mutex::new(vec![]);
    // 検索ワード
    pub static ref BEFORE_SEARCH_WORD_LIST: Mutex<Vec<String>> = Mutex::new(vec![]);

    pub static ref SEARCH_WORD_LIST: Mutex<Vec<String>> = Mutex::new(vec![]);
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

fn delete_cache() {

}

// FYI https://postd.cc/reverse-engineering-sublime-text-s-fuzzy-match/
pub fn search(mut input_word: String) -> Vec<WordScoring> {
    // 高速化アイデア
    // 毎回入力された値を頭から検索しているので、ワードが同じであればキャッシュに詰める

    // TODO: オプション化
    input_word = input_word.to_lowercase();

    let mut word_scoreing_list: Vec<WordScoring> = Vec::new();

    if input_word.len() == 0 {
        return word_scoreing_list;
    }

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

        // 文字数が一緒なら == で比較しても良いかオプション化しても良さそう

        // TODO: オプション化
        let mut word_for_search = word.to_lowercase();
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
            let len_diff = (word.len() - input_word.len()) as i32;
            score = score - len_diff;

            let word_scoring = WordScoring{
                score,
                word: word.to_string()
                // word: word.to_string() + &score.to_string() // for scoring debug
            };
            word_scoreing_list.push(word_scoring);
        }
    }

    // TODO: オプション化
    if word_scoreing_list.len() > 1 {
        sort(&mut word_scoreing_list);
    }

    //SEARCH_RESULT_CACHE_LIST.lock().unwrap().push(word_scoreing_list);
    //BEFORE_SEARCH_WORD_LIST.lock().unwrap().push(input_word);

    return word_scoreing_list;
}

// TODO: スコアがランクに満たない場合早々に切ってしまいたい
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
