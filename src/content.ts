// for reading "window.pantheon_account_chooser_data" (global variable), need to exit from isolated environment
// see: https://developer.chrome.com/docs/extensions/mv3/content_scripts/#isolated_world
const path = "/src/inject.js";
try {
  const script = document.createElement("script");
  script.src = browser.runtime.getURL(path);
  document.head.append(script);
} catch (e) {
  const script = document.createElement("script");
  script.src = chrome.runtime.getURL(path);
  document.head.append(script);
}
