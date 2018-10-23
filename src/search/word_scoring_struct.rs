use std::cmp::Ordering;
use std::collections::HashMap;

pub fn new(index: i32, wordMap: HashMap<String, String>) -> WordScoring {
    WordScoring{
        index: index,
        score: 0,
        wordMap: wordMap 
    }
}

#[derive(Clone)]
pub struct WordScoring {
    pub index: i32,
    pub score: i32,
    pub wordMap: HashMap<String, String>,
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
