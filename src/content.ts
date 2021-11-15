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
