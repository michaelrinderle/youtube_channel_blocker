// content.js

function getChannelId() {
    if ($("a.yt-simple-endpoint.style-scope.ytd-video-owner-renderer").length > 0) {
        let a = document.querySelector("a.yt-simple-endpoint.style-scope.ytd-video-owner-renderer").href;
        return a.split("/").pop();
    } else { setTimeout(getChannelId, 300); }
};

function checkChannelBlock(channelId) {
    chrome.storage.sync.get("channels", ({ channels }) => {
        if (channels == undefined) {
            checkChannelBlock(channelId);
        }
        else {
            if (channels.indexOf(channelId) >= 0) {
                randomizeAutoPlaylist();
            }
        }
    });
};

function randomizeAutoPlaylist() {
    let thumbnails = document.querySelectorAll("a.yt-simple-endpoint.style-scope.ytd-compact-video-renderer");
    if (thumbnails.length > 0) {
        let randomIndex = Math.floor(Math.random() * 10) + 1;
        let randomVideo = thumbnails[randomIndex].href;
        let randomVideoId = randomVideo.split("=")[1];
        if (randomVideoId == undefined) {
            setTimeout(randomizeAutoPlaylist, 500);
        }
        else {
            window.location.href = "https://www.youtube.com/watch?v=" + randomVideoId;
        }
    } else { setTimeout(randomizeAutoPlaylist, 500); }
};

function playerStatusChangeHandler() {
    try {
        let channel = getChannelId();
        checkChannelBlock(channel);
    } catch (error) {
        console.log(error);
    }
}

// wait for next playlist to populate
$("ytd-app").ready(() => {
    playerStatusChangeHandler();
    let player = document.querySelector("video");
    if (player !== undefined) {
        player.addEventListener("emptied", playerStatusChangeHandler);
    } // waiting for store to sync
});