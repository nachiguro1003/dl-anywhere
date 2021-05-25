mod utils;
mod env;

use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use wasm_bindgen_futures::{JsFuture};
use web_sys::{Request, RequestMode, Response, UrlSearchParams};
use serde::{Serialize, Deserialize};
use web_sys::console::log_1;
use std::collections::HashMap;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern {
    fn alert(s: &str);
}

#[derive(Serialize, Deserialize)]
pub struct Translation {
    detected_source_language: String,
    text: String,
}

#[derive(Serialize, Deserialize)]
pub struct TranslationResponse {
    translations: Vec<Translation>,
}


#[wasm_bindgen]
pub async fn translate(msg: String, lang: String) -> JsValue {
    let e = env::init_env();
    let mut params = HashMap::new();
    params.insert("auth_key".to_string(), e.auth_key());
    params.insert("text".to_string(), msg);
    params.insert("target_lang".to_string(), lang);

    let body = build_body_by_url_search_params(params);


    let resp_value = fetch_translation_api(JsValue::from(body)).await;

    assert!(resp_value.is_instance_of::<Response>());

    get_result_translation(resp_value).await
}

#[wasm_bindgen]
pub fn trim_text(s: String) -> String {
    String::from(s.trim())
}

async fn fetch_translation_api(body: JsValue) -> JsValue {
    let window = web_sys::window().unwrap();
    let mut opts = web_sys::RequestInit::new();
    opts.method("POST");
    opts.mode(RequestMode::Cors);

    opts.body(Some(&body));

    let url = format!("https://api-free.deepl.com/v2/translate");
    let request: Request = Request::new_with_str_and_init(&url, &opts).unwrap();
    request
        .headers()
        .set("Content-Type", "application/x-www-form-urlencoded").unwrap();

    let resp_value = JsFuture::from(window.fetch_with_request(&request)).await;
    let result = match resp_value {
        Ok(res) => res,
        Err(err) => {
            let msg = format!("failed to fetch translation api. err: {:?}", &err);
            log_1(&JsValue::from(msg));
            err
        }
    };

    result
}

fn build_body_by_url_search_params(params: HashMap<String, String>) -> UrlSearchParams {
    let body = UrlSearchParams::new().unwrap();
    for (k, v) in params.iter() {
        body.append(k, v);
    }
    body
}

async fn get_result_translation(response: JsValue) -> JsValue {
    let resp: Response = response.dyn_into().unwrap();
    let json = JsFuture::from(resp.json().unwrap()).await.unwrap();

    let result: TranslationResponse = json.into_serde().unwrap();
    JsValue::from_serde(&result.translations[0]).unwrap()
}
