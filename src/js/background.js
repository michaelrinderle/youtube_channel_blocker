// background.js

let channels = {
    "Fox News":     "UCXIJgqnII2ZOINSWNOGFThA",
    "Fox Business": "UCCXoCcu9Rp7NPbTzIvogpZg",
    "MSNBC":        "UCaXkIU1QidjPwiAYu6GcHjg",
    "NBC News":     "UCeY0bbntWzzVIaj2z3QigXg",  
    "ABC News":     "UCBi2mrWuNuyYy4gbM6fU18Q",
    "CNN":          "UCupvZG-5ko_eiXAupbDfxWw",
    "The View":     "UCeH6qE4V7n5tVwP7NkdrtJg"
}

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ "channels": channels });
    chrome.storage.sync.set({ "enabled": true });
});