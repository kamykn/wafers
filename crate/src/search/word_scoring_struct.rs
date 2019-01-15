use std::cmp::Ordering;
use std::collections::HashMap;

pub fn new(index: i32, word_map: HashMap<String, String>) -> WordScoring {
    WordScoring{
        index: index,
        score: 0,
        word_map: word_map.clone(),
        highlighted_word_map: word_map 
    }
}

#[derive(Clone)]
pub struct WordScoring {
    pub index: i32,
    pub score: i32,
    pub word_map: HashMap<String, String>,
    pub highlighted_word_map: HashMap<String, String>,
}

impl PartialOrd for WordScoring {
    fn partial_cmp(&self, other: &WordScoring) -> Option<Ordering> {
        // スコアが同じであればindex順
        if self.score == other.score {
            return self.index.partial_cmp(&other.index);
        }

        self.score.partial_cmp(&other.score)
    }
}

impl PartialEq for WordScoring {
    fn eq(&self, other: &WordScoring) -> bool {
        self.score == other.score
    }
}