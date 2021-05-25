use dotenv::dotenv;
use std::{env};
use web_sys::console::log_1;
use wasm_bindgen::JsValue;
use std::path::Path;

pub struct Env {
    auth_key: String,
}

impl Env {
    pub fn auth_key(self) -> String {
        self.auth_key
    }

}

pub fn init_env() -> Env {
    let env_path = env::current_dir().unwrap();
    dotenv::from_path(env_path.as_path());
    let mut env: Env = Env {
        auth_key: "".to_string(),
    };

    env.auth_key = match env::var("AUTH_KEY") {
        Ok(val) => val,
        Err(err) => {
            let msg = format!("Failed to get auth_key from env. err: {}", err);
            log_1(&JsValue::from(&msg));
            "".to_string()
        }
    };

    env
}


