use std::cmp::Ordering;

pub fn new(word: String) -> WordScoring{
    WordScoring{
        score: 0,
        word: word
    }
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
