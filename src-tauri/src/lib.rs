use std::{
    io::{BufRead, BufReader, Write},
    net::TcpStream,
    thread,
    time::Duration,
};
pub mod error;
pub use error::Error;
use tauri::{AppHandle, Emitter};
use tauri_plugin_store::StoreExt;

#[tauri::command]
fn send_message(app: AppHandle, address: &str, message: &str) -> Result<(), Error> {
    let mut stream = TcpStream::connect(address)?;
    stream.write_all(message.as_bytes())?;

    thread::spawn(move || {
        let mut reader = BufReader::new(stream);
        let mut buffer = String::new();

        loop {
            buffer.clear();

            // Read the response from the server
            match reader.read_line(&mut buffer) {
                Ok(0) => {
                    // Connection closed by the server
                    println!("Connection closed by the server.");
                    break;
                }
                Ok(_) => {
                    // Print the received message
                    println!("Received: {}", buffer.trim_end());
                    app.emit("tcp-response", buffer.trim_end().to_string())
                        .unwrap();
                }
                Err(e) => {
                    // Handle any read errors
                    eprintln!("Error reading from server: {}", e);
                    break;
                }
            }

            // Sleep briefly to prevent busy waiting
            std::thread::sleep(Duration::from_millis(100));
        }
    });

    Ok(())
}

#[tauri::command]
fn listen_for_response(address: &str, app: AppHandle) -> Result<(), Error> {
    let stream = TcpStream::connect(address)?;
    let reader = BufReader::new(stream);

    thread::spawn(move || {
        for line in reader.lines() {
            match line {
                Ok(response) => {
                    app.emit("tcp-response", response).unwrap();
                }
                Err(e) => {
                    eprintln!("Error reading from TCP stream: {:?}", e);
                    break;
                }
            }
        }
    });

    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::default().build())
        .invoke_handler(tauri::generate_handler![send_message, listen_for_response])
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }

            app.handle().store_builder("store.bin").build();

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
