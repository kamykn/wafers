use super::word_scoring_struct;

// 引数がWordScoringになっているのはキャッシュと同じ型を使わせるため
pub fn fuzzy_match_vec(mut word_scoring_vec: Vec<word_scoring_struct::WordScoring>, input_word: String) -> Vec<word_scoring_struct::WordScoring> {
    let mut return_word_scoreing_vec: Vec<word_scoring_struct::WordScoring> = Vec::new();
    let mut is_match = false;

    for mut word_scoring in word_scoring_vec.iter_mut() {
        let (word_scoring, is_match) = fuzzy_match(input_word.clone(), &mut word_scoring);

        if is_match {
            return_word_scoreing_vec.push(word_scoring.clone());
        }
    }

    return_word_scoreing_vec 
}

fn fuzzy_match(input_word: String, word_scoring: &mut word_scoring_struct::WordScoring) -> (&mut super::word_scoring_struct::WordScoring, bool) {
    let mut is_match = false;
    let mut highlighted_word = "".to_string();
    let mut score = 0;

    for (key, word) in &word_scoring.word_map {
        // すべて一致するもののみ表示する前提の上で対象から外す
        if word.len() < input_word.len() {
            continue;
        }

        // 文字数が一緒なら == で比較しても良いかオプション化しても良さそう

        // TODO: オプション化
        let mut check_word = word.to_lowercase();
        let (highlighted_word, score, is_match_tmp) = input_word_loop(input_word.clone(), check_word);

        if is_match_tmp {
            is_match = is_match_tmp;
            word_scoring.score = score;

            // https://doc.rust-lang.org/std/collections/struct.HashMap.html#method.get_mut
            if let Some(mut_highlighted_word_map) = word_scoring.highlighted_word_map.get_mut(key) {
                *mut_highlighted_word_map = highlighted_word.to_string();
            }

            break;
        }
    }

    (word_scoring, is_match)
}

fn input_word_loop(input_word: String, check_word: String) -> (String, i32, bool) {
    let mut score: i32 = 0;
    let mut is_match = true;
    let mut next_word_matched_at = 0;
    let mut matched_index_list: Vec<i32> = Vec::new();

    for input_char in input_word.chars() {
        if input_char.is_whitespace() {
            // 連続matchのボーナスをクリアする
            next_word_matched_at = -1;
            continue;
        }

        let (add_score, mut word_matched_at, is_match_tmp) = input_char_loop(input_char, &check_word, next_word_matched_at, &matched_index_list);

        if !is_match_tmp {
            // マッチしない文字が存在すれば対象としない
            is_match = false;
            break;
        }

        score = score + add_score;

        matched_index_list.push(word_matched_at.clone());
        next_word_matched_at = word_matched_at + 1;
    }

    let mut highlighted_word = "".to_string();
    if is_match {
        // match部分をhighlight用の文字列で囲んだ文字列を生成
        highlighted_word = highlight_word(check_word, matched_index_list);
    }

    (highlighted_word, score, is_match)
}

fn highlight_word(check_word: String, mut matched_index_list: Vec<i32>) -> String {
    let mut highlighted_word: Vec<char> = Vec::new();
    matched_index_list.sort_unstable();
    let mut is_continuous_match = false;

    let open_tag = "<b>";
    let close_tag = "</b>";
    let mut is_match = false;

    for (i, c)in check_word.chars().enumerate() {
        let index = i as i32;
        if matched_index_list.contains(&index) && !is_continuous_match {
            // 連続マッチでなければマッチしたワードの前に開始タグを追加
            for open_tag_char in  open_tag.chars() {
                highlighted_word.push(open_tag_char);
            }
            is_match = true;
        } else if is_continuous_match {
            // マッチが続いている場合閉じるかチェック
            if !matched_index_list.contains(&index) {
                for close_tag_char in  close_tag.chars() {
                    highlighted_word.push(close_tag_char);
                }
                is_match = false;
            }
        }

        highlighted_word.push(c);
        is_continuous_match = is_match;
    }

    if is_continuous_match {
        // マッチが続いている場合終了タグ追加
        for close_tag_char in  close_tag.chars() {
            highlighted_word.push(close_tag_char);
        }
    }

    highlighted_word.into_iter().collect()
}

fn input_char_loop(input_char: char, check_word: &String, next_word_matched_at: i32, matched_index_list: &Vec<i32>) -> (i32, i32, bool) {
    let mut add_score: i32 = 1;
    let mut index = 0;
    let mut is_match = false;

    // 最初にnext_word_matched_atを探し、matchしなければ最初から探す
    if next_word_matched_at >= 0 {
        let (add_score, next_word_matched_at, is_match) =  match check_word.chars().nth(next_word_matched_at as usize) {
            Some(c) => {
                if input_char == c {
                    add_score = get_score(next_word_matched_at, next_word_matched_at);
                    return (add_score, next_word_matched_at, true);
                }

                (0, next_word_matched_at, false)
            },
            None => (0, next_word_matched_at, false)
        };

        if is_match {
            return (add_score, next_word_matched_at, is_match);
        }
    }

    for (i, search_char) in check_word.chars().enumerate()  {
        index = i as i32;
        
        // 元のワードのindexを詰めたくないのでループ中にskipしている
        // 次にマッチするワードはすでにチェック済みなのでcontinue
        if matched_index_list.contains(&index) || (next_word_matched_at >= 0 && next_word_matched_at == index) {
            continue;
        }

        // TODO FZFかなんかはスペースが来たら離れたところのほうをmatchさせるような仕様があるっぽい
        if input_char == search_char {
            add_score = get_score(index, next_word_matched_at);
            is_match = true;
            break;
        }
    }

    (add_score, index.clone(), is_match)
}

fn get_score(index: i32, next_word_matched_at: i32) -> i32 {
    if index == next_word_matched_at {
        // 連続したMatchには加点
        return 3;
    } else if index > next_word_matched_at {
        // 順番通りのMatchには加点
        return 2;
    }

    // 通常加点
    return 1;
}
