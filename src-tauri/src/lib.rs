use std::net::TcpStream;
pub mod error;
pub use error::Error;

#[tauri::command]
fn send_message() -> Result<String, Error> {
    let address = "192.168.1.240:65432";
    let mut stream = TcpStream::connect(address);
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
