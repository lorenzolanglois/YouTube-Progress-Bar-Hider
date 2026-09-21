"use strict";

let toggleButton;
let test;
let notYoutube;
let first = true;

function updateText(display) {
  if (display === undefined) {
    notYoutube.style.display = "flex";
    return;
  }
  const text = display === "none" ? "Show" : "Hide";
  toggleButton.innerText = `${text} YouTube Progress Bar`;
  if (first === true) {
    test.style.transition = "all 0";
    first = false;
  } else {
    test.style.transition = "all 0.5s";
  }
  if (display === "none") {
    test.style.transform = "translateY(50px) scale(0.2)";
    test.style.opacity = "0";
  } else {
    test.style.transform = "translateY(0) scale(1)";
    test.style.opacity = "1";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  toggleButton = document.getElementById("toggleButton");
  test = document.getElementById("test");
  notYoutube = document.getElementById("notYoutube");
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: "refresh"}, updateText);
  });
  toggleButton.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: "toggle"}, updateText);
    });
  });
});
