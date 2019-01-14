pub fn new() -> ByteIndex {
    ByteIndex{
        start: 0,
        end: 0,
        length: 0,
    }
}

pub struct ByteIndex {
    pub start: usize,
    pub end: usize,
    pub length: usize
}

impl ByteIndex {
    pub fn set_with_start_len(&mut self, tmp_start: usize, tmp_length: usize) {
        self.start = tmp_start;
        self.length = tmp_length;
        self.end = tmp_start + tmp_length;
    }
}

