importScripts('cookiesExtractor.js');
importScripts('APIWorker.js');
let host;
let slug;



chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "user-action") {
        console.log("host la", message.host);
        console.log("path la", message.content);
        let storageHost = chrome.storage.local.get("host");
        if(storageHost!==message.host){
            chrome.storage.local.set({"host":message.host});
        }
        slug = getSlug(message.content);
        let storageSlug = chrome.storage.local.get("slug");
        if (slug !== storageSlug){
            chrome.storage.local.set({ slug: slug });
        }
    }
    
});


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getNameAndTotalChapter") {
        (async () => {
            try {
                sendResponse(await getNovelInfo(slug));
            } catch (error) {
                console.error("Error fetching novel info:", error);
                sendResponse({ error: error.message });
            }
        })();

        return true;
    }
    
});


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getFiveNewestChapters") {
        (async () => {
            try {
                console.log("FUCK");
                sendResponse(await getFiveNewestChapters(message.storyId));
            } catch (error) {
                console.error("Error fetching novel info:", error);
                sendResponse({ error: error.message });
            }
        })();
        return true;
    }
});

