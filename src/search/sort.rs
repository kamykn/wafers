// rustでクイックソート(逆順)
// FYI: https://qiita.com/chalharu/items/40b4da4d4a88d509a214
pub fn sort<T: PartialOrd + Clone>(source: &mut [T]) {
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

