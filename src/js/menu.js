// menu.js

let toggleStatusButton = document.getElementById("toggle-status");
let blockChannelButton = document.getElementById("block-channel");
let getOptionsButton = document.getElementById("get-options");
let status = document.getElementById("status");

toggleStatusButton.addEventListener("click", () => {
    chrome.storage.sync.get("enabled", ({ enabled }) => {
        enabled = !enabled;
        status.innerText = enabled ? "Enabled" : "Disabled" 
        chrome.storage.sync.set({ "enabled": enabled });
    });
});

blockChannelButton.addEventListener("click", () => {
  
    let css = "a.yt-simple-endpoint.style-scope.yt-formatted-string";
    let element = $(css);
    if (element.innerText > 0) {
        let channelName = element.innerText;
        let channelId = element.href.split("/").pop();
        chrome.storage.sync.get("channels", ({ channels }) => {
            channels[channelName] = channelId;
            chrome.storage.sync.set({ "channels": channels });
        });
        alert("channel blocked");
    } else {
        alert("no dice, error."); 
    }
});

getOptionsButton.addEventListener("click", () => {
    chrome.tabs.create({ 'url': 'chrome://extensions/?options=' + chrome.runtime.id });
});