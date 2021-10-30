// options.js

let ul = document.getElementById("blocked-list");

initialize = () => {

    let block = document.getElementById("block-submit");
    block.onclick = () => {

        let channelName = document.getElementById("channel-name").value;
        let channelId = document.getElementById("channel-id").value;

        if (channelName !== '' &&
            channelId !== '') {

            chrome.storage.sync.get("channels", ({ channels }) => {
                channels[channelName] = channelId;
                chrome.storage.sync.set({ "channels": channels });
            });

            addElementToList(channelName, channelId);
            return false;
        }

    };

    chrome.storage.sync.get("channels", ({ channels }) => {
        Object.keys(channels).forEach((key) => {

            addElementToList(key, channels[key]);
        });
    });
};

addElementToList = (channel, id) => {

    let li = document.createElement("li");
    let div = document.createElement("row");
    div.classList.add("col-sm")

    let button = document.createElement("button");
    let h2 = document.createElement("h2");
    h2.appendChild(document.createTextNode(channel))

    button.append(document.createTextNode("unblock"));
    button.classList.add("btn", "btn-primary", "blocked-button");
    button.onclick = () => {
        unblockChannel(li, id);
    };

    li.appendChild(h2);
    li.appendChild(button);
    ul.appendChild(li);
};

unblockChannel = (li, channelId) => {
    chrome.storage.sync.get("channels", ({ channels }) => {
        let key = Object.keys(channels).find(key => channels[key] == channelId);
        if (key != undefined) {
            delete channels[key];
            chrome.storage.sync.set({ "channels": channels });
            li.parentNode.removeChild(li);
        }
    });
};

initialize();