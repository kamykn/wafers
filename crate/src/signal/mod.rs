use std::sync::Mutex;
use ::js_utils;

// https://linuxjm.osdn.jp/html/LDP_man-pages/man7/signal.7.html
const SIG_NONE: u32 = 0;
const SIG_ABORT: u32 = 3;

lazy_static! {
    // abortの通知
    pub static ref ABORT_SIG: Mutex<u32> = Mutex::new(0);
}

fn get_sig_mut () -> u32 {
    let mut signal = ABORT_SIG.lock().unwrap();
    *signal
}

pub fn clear() {
    let mut signal = get_sig_mut();
    signal = SIG_NONE;
}

pub fn clear_with_message() {
    if is_abort() {
        js_utils::log("aborted");
    }

    clear();
}

pub fn abort() {
        js_utils::log("catch aborted");
    let mut signal = get_sig_mut();
    signal = SIG_ABORT;
}

pub fn is(check_sig: u32) -> bool {
    let mut signal = get_sig_mut();
    signal == check_sig
}

pub fn is_abort() -> bool {
    if is(SIG_ABORT) {
        js_utils::log("yes aborted");
    } else {
        js_utils::log("no aborted");
    }
    is(SIG_ABORT)
}
