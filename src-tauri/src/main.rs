#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::{Manager, Window};

#[tauri::command]
fn set_always_on_top(window: Window, always_on_top: bool) {
    window.set_always_on_top(always_on_top).unwrap();
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![set_always_on_top])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}