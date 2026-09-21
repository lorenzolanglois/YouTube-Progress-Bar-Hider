"use strict";

const request = indexedDB.open("youtubeprogressbarhider", 1);
let display;
let displayTime;
let db;

function updateStyle() {
  const req = db.transaction("settings").objectStore("settings").get("display");
  req.onsuccess = () => {
    display = req.result ?? "none";
    document.querySelector(".ytp-progress-bar-container").style = `display: ${display} !important`;
    document.querySelector(".ytp-time-display").style = `display: ${display} !important`;
  }
}

function updateTimeStyle() {
  const req = db.transaction("settings").objectStore("settings").get("time");
  req.onsuccess = () => {
    displayTime = req.result ?? "none";
    if (displayTime === "none") {
      document.body.classList.remove("yth");
    } else {
      document.body.classList.add("yth");
    }
  }
}

request.onupgradeneeded = () => {
  request.result.createObjectStore("settings");
};

request.onsuccess = () => {
  db = request.result;
  updateStyle();
  updateTimeStyle();
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "toggle") {
    display = display == "none" ? "block" : "none";
    db.transaction("settings", "readwrite").objectStore("settings").put(display, "display");
    updateStyle();
  }
  if (request.action === "toggleTime") {
    displayTime = displayTime == "none" ? "block" : "none";
    db.transaction("settings", "readwrite").objectStore("settings").put(displayTime, "time");
    updateTimeStyle();
  }
  sendResponse(JSON.stringify({display, displayTime}));
});
