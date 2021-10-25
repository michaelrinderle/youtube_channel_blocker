// background.js

// initial blocked channels 
let channels =
    [
        "UCXIJgqnII2ZOINSWNOGFThA", // FOX news
        "UCCXoCcu9Rp7NPbTzIvogpZg", // Fox Business
        "UCaXkIU1QidjPwiAYu6GcHjg", // MSNBC
        "UCeY0bbntWzzVIaj2z3QigXg", // NBC News    
        "UCBi2mrWuNuyYy4gbM6fU18Q", // ABC News
        "UCupvZG-5ko_eiXAupbDfxWw", // CNN
        "UCeH6qE4V7n5tVwP7NkdrtJg", // The View
    ];

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ channels });
});