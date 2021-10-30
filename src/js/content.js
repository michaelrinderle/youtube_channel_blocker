// content.js

let counter = 0;

getChannelId = () => {
    let css = "a.yt-simple-endpoint.style-scope.ytd-video-owner-renderer";
    if ($(css).length > 0) {
        let a = document.querySelector(css).href;
        return a.split("/").pop();
    } else { setTimeout(getChannelId, 300); }
};

checkChannelBlock = (channelId) => {
    chrome.storage.sync.get("channels", ({ channels }) => {
        if (channels === undefined) {
            checkChannelBlock(channelId);
        }
        else {
            Object.keys(channels).forEach((key) => {
                if (channels[key] === channelId) {
                    getRandomVideo();
                }
            });
        }
    });
};

getRandomVideo = () => {
    let thumbnails = document.querySelectorAll("a.yt-simple-endpoint.style-scope.ytd-compact-video-renderer");
    if (thumbnails.length > 0) {
        let randomIndex = Math.floor(Math.random() * 10) + 1;
        if (thumbnails[randomIndex].href === undefined) {
            setTimeout(randomizeAutoPlaylist, 500);
        }
        let randomVideo = thumbnails[randomIndex].href;
        let randomVideoId = randomVideo.split("=")[1];
        if (randomVideoId === undefined) {
            setTimeout(randomizeAutoPlaylist, 500);
        }
        else {
            window.location.href = "https://www.youtube.com/watch?v=" + randomVideoId;
        }
    } else { setTimeout(randomizeAutoPlaylist, 500); }
}

playerStatusChangeHandler = () => {
    try {
        var checkExist = setInterval(function () {
            if (!document.querySelector("a.yt-simple-endpoint.style-scope.yt-formatted-string")) {
                clearInterval(checkExist);
            }
        }, 100);

        let channel = getChannelId();
        checkChannelBlock(channel);
    } catch (error) {
        console.log(error);
    }
};

delay = (time) => {
    return new Promise(resolve => setTimeout(resolve, time));
}

$(document).ready(() => {

    let player = document.querySelector("video");
    if (player !== undefined) {
        player.addEventListener("loadedmetadata", playerStatusChangeHandler);
        player.addEventListener("loadeddata", playerStatusChangeHandler);
        player.addEventListener("canplay", playerStatusChangeHandler);
        player.addEventListener("playing", playerStatusChangeHandler);
        player.addEventListener("canplaythrough", playerStatusChangeHandler);
    }
    
    delay(1000).then(()=>{
        playerStatusChangeHandler(); 
    });
});