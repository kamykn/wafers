use std::cmp::Ordering;
use std::collections::HashMap;

pub fn new(index: u32, word_map: HashMap<String, String>) -> WordScoring {
    WordScoring{
        index: index,
        score: 0,
        word_map: word_map.clone(),
        highlighted_word_map: word_map, 
        matched_index_list_map: HashMap::new()
    }
}

#[derive(Clone)]
pub struct WordScoring {
    pub index: u32,
    pub score: u32,
    pub word_map: HashMap<String, String>,
    pub highlighted_word_map: HashMap<String, String>,
    pub matched_index_list_map: HashMap<String, Vec<u32>>
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
