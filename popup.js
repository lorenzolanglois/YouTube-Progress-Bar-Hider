"use strict";

let toggleButton;
let toggleTimeButton;
let test;
let testTime;
let notYoutube;
let first = true;

function updateText(res) {
  if (res === undefined) {
    notYoutube.style.display = "flex";
    return;
  }
  res = JSON.parse(res);
  const textDisplay = res.display === "none" ? "Show" : "Hide";
  toggleButton.innerText = `${textDisplay} YouTube Progress Bar`;
  const textDisplayTime = res.displayTime === "block" ? "Show" : "Hide";
  toggleTimeButton.innerText = `${textDisplayTime} YouTube Thumbnail Timestamps`;
  if (first === true) {
    test.style.transition = "all 0";
    testTime.style.transition = "all 0";
    first = false;
  } else {
    test.style.transition = "all 0.5s";
    testTime.style.transition = "all 0.5s";
  }
  if (res.display === "none") {
    test.style.transform = "translateY(50px) scale(0.2)";
    test.style.opacity = "0";
  } else {
    test.style.transform = "translateY(0) scale(1)";
    test.style.opacity = "1";
  }

  if (res.displayTime === "block") {
    testTime.style.transform = "translateY(-50px) scale(0.2)";
    testTime.style.opacity = "0";
  } else {
    testTime.style.transform = "translateY(0) scale(1)";
    testTime.style.opacity = "1";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  toggleButton = document.getElementById("toggleButton");
  toggleTimeButton = document.getElementById("toggleTimeButton");
  test = document.getElementById("test");
  testTime = document.getElementById("testTime");
  notYoutube = document.getElementById("notYoutube");
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: "refresh"}, updateText);
  });
  toggleButton.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: "toggle"}, updateText);
    });
  });
  toggleTimeButton.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: "toggleTime"}, updateText);
    });
  });
});
