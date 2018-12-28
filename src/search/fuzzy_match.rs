use super::word_scoring_struct;

// 引数がWordScoringになっているのはキャッシュと同じ型を使わせるため
pub fn fuzzy_match_vec(mut word_scoring_vec: Vec<word_scoring_struct::WordScoring>, input_word: String) -> Vec<word_scoring_struct::WordScoring> {
    let mut return_word_scoreing_vec: Vec<word_scoring_struct::WordScoring> = Vec::new();

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

    for (index, word) in &word_scoring.word_map {
        // すべて一致するもののみ表示する前提の上で対象から外す
        if word.len() < input_word.len() {
            continue;
        }

        // 文字数が一緒なら == で比較しても良いかオプション化しても良さそう

        // TODO: オプション化
        let mut check_word = word.to_lowercase();
        let (highlighted_word, score, is_match) = input_word_loop(input_word.clone(), check_word);

        if is_match {
            word_scoring.score = score;
            word_scoring.highlighted_word_map[index] = highlighted_word;

            // 距離に対する減点
            // let len_diff = (word.len() - input_word.len()) as i32;
            // word_scoring.score = word_scoring.score - len_diff;
            break;
        }
    }

    (word_scoring, is_match)
}

fn input_word_loop(input_word: String, mut check_word: String) -> (String, i32, bool) {
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

        let (add_score, word_matched_at, is_found) = imput_char_loop(input_char, &check_word, next_word_matched_at, matched_index_list);

        if !is_found {
            // マッチしない文字が存在すれば対象としない
            is_match = false;
            break;
        }

        score = score + add_score;

        // match部分をhighlight用の文字列で囲んだ文字列を生成
        matched_index_list.push(word_matched_at);
        word_matched_at = word_matched_at + 1;
    }

    /////////////

    let mut highlighted_word: Vec<char> = Vec::new();
    let before_matched_index = 0;
    matched_index_list.sort_unstable();
    let mut is_continuous_match = false;

    let open_tag = "<b>";
    let close_tag = "</b>";

    for (i, c)in check_word.chars().enumerate() {
        if matched_index_list.contains(i as &i32) && is_continuous_match {
            // 連続マッチでなければマッチしたワードの前に開始タグを追加
            for open_tag_char in  open_tag.chars() {
                highlighted_word.push(open_tag_char);
            }
        } 

        highlighted_word.push(c);
        
        if is_continuous_match {
            // マッチが続いている場合閉じるかチェック
      
            if !matched_index_list.contains(i as &i32) || i != check_word.chars().count() as usize {
                // マッチでなければ || 最後のループなら終了タグ追加
                for close_tag_char in  close_tag.chars() {
                    highlighted_word.push(close_tag_char);
                }
            }
        }

        is_continuous_match = matched_index_list.contains(i as &i32);
        before_matched_index = i;
    }

    (String::from_iter(highlighted_word), score, is_match)
}

fn imput_char_loop(input_char: char, check_word: &String, next_word_matched_at: i32, mut matched_index_list: Vec<i32>) -> (i32, i32, bool) {
    // TODO: 最初にnext_word_matched_atを探し、matchしなければ最初から探す仕組みにしたい
    let mut add_score: i32 = 1;
    let mut is_found = false;
    let mut index = 0;

    for (i, search_char) in check_word.chars().enumerate()  {
        index = i as i32;
        
        // 元のワードのindexを詰めたくないのでループ中にskipしている
        if matched_index_list.contain(i) {
            continue;
        }

        // TODO FZFかなんかはスペースが来たら離れたところのほうが加点高くする仕様があるっぽい
        if input_char == search_char {
            add_score = get_score(index, next_word_matched_at);
            is_found = true;
            break;
        }
    }

    (add_score, index.clone(), is_found)
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
