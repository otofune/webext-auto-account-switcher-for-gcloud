// for reading "window.pantheon_account_chooser_data" (global variable), need to exit from isolated environment
// see: https://developer.chrome.com/docs/extensions/mv3/content_scripts/#isolated_world

import browser from "webextension-polyfill"
const path = "/src/inject.js";
const script = document.createElement("script");
script.src = browser.runtime.getURL(path);
document.head.append(script);
