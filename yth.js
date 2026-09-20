"use strict";

const request = indexedDB.open("youtubeprogressbarhider", 1);
let display;
let db;

function updateStyle() {
  const req = db.transaction("settings").objectStore("settings").get("display");
  req.onsuccess = () => {
    display = req.result ?? "none";
    document.querySelector(".ytp-progress-bar-container").style = `display: ${display} !important`;
    document.querySelector(".ytp-time-display").style = `display: ${display} !important`;
  }
}

request.onupgradeneeded = () => {
  request.result.createObjectStore("settings");
};

request.onsuccess = () => {
  db = request.result;
  updateStyle();
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "toggle") {
    display = display == "none" ? "block" : "none"
    db.transaction("settings", "readwrite").objectStore("settings").put(display, "display");
    updateStyle();
  }
  sendResponse(display);
});
