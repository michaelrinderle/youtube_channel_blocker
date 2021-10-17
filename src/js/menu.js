// menu.js

let blockButton = document.getElementById("menu-input-button");

blockButton.addEventListener("click", async () => {

    let channel = document.getElementById("menu-channel-input").value;
    if (channel === '') {
        alert("no channel entered");
        return;
    }
    else {
        chrome.storage.sync.get("channels", ({ channels }) => {
            if (channels.indexOf(channel) >= 0) {
                channels.push(channel);
                chrome.storage.sync.set({ channels });
                alert("channel is being blocked");
            }
            else {
                alert("channel already being blocked");
            }
        });
    }
});