use serde::Serialize;
use tauri::{Manager, Window};
use windows::Media::Control::{
    GlobalSystemMediaTransportControlsSession,
    GlobalSystemMediaTransportControlsSessionManager as MediaSessionManager,
};
use std::convert::TryInto;
use windows::core::HSTRING;

#[derive(Serialize)]
struct MusicInfo {
    title: String,
    artist: String,
    album_title: String,
    album_artist: String,
    track_number: u32,
}

#[tauri::command]
async fn music_g() -> Result<MusicInfo, String> {
    let session_manager = MediaSessionManager::RequestAsync().map_err(|e| e.to_string())?.get().map_err(|e| e.to_string())?;
    let sessions = session_manager.GetCurrentSession().map_err(|e| e.to_string())?;

    let info = sessions.TryGetMediaPropertiesAsync().map_err(|e| e.to_string())?.get().map_err(|e| e.to_string())?;
    let title: HSTRING = info.Title().map_err(|e| e.to_string())?;
    let artist: HSTRING = info.Artist().map_err(|e| e.to_string())?;
    let album_title: HSTRING = info.AlbumTitle().map_err(|e| e.to_string())?;
    let album_artist: HSTRING = info.AlbumArtist().map_err(|e| e.to_string())?;
    let track_number: i32 = info.TrackNumber().map_err(|e| e.to_string())?;

    Ok(MusicInfo {
        title: title.to_string(),
        artist: artist.to_string(),
        album_title: album_title.to_string(),
        album_artist: album_artist.to_string(),
        track_number: track_number.try_into().unwrap(),
    })
}

#[tauri::command]
fn set_always_on_top(window: Window, always_on_top: bool) {
    window.set_always_on_top(always_on_top).unwrap();
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![set_always_on_top, music_g])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}