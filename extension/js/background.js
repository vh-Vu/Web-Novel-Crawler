importScripts('cookiesExtractor.js');
importScripts('APIWorker.js');
importScripts('extentionTool.js');



chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "user-action") {
        chrome.storage.local.set({"host":message.host});
        slug = getSlug(message.content);
        chrome.storage.local.set({ slug: slug });
}});


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getNameAndTotalChapter") {
        (async () => {
            try {
                slug = await chrome.storage.local.get("slug");
                sendResponse(await getNovelInfo(slug.slug));
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
                sendResponse(await getFiveNewestChapters(message.storyId));
            } catch (error) {
                console.error("Error fetching novel info:", error);
                sendResponse({ error: error.message });
            }
        })();
        return true;
    }
});

