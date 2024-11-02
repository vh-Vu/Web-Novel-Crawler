importScripts('cookiesExtractor.js');
// importScripts('popup.js')
// const WEBSITE_IDENTIFY = {
//     BACH_NGOC_SACH_VIP : 1
// };

// const SUPPORTED_WEBSITE = {
//     "bachngocsach.net.vn" : WEBSITE_IDENTIFY.BACH_NGOC_SACH_VIP,
//     "bachngocsach.app": WEBSITE_IDENTIFY.BACH_NGOC_SACH_VIP};
let host;
let slug;


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "user=action") {
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
                const { name, totalChapter } = await getNovelInfo(slug);
                sendResponse({ name, totalChapter });
            } catch (error) {
                console.error("Error fetching novel info:", error);
                sendResponse({ error: error.message });
            }
        })();

        return true;
    }
});




/*
Input: https://bachngocsach.net.vn/
Output: null
Input: https://bachngocsach.net.vn/truyen/ma-y-than-te
Output: ma-y-than-te
Input: https://bachngocsach.net.vn/truyen/ma-y-than-te/chuong-1278
Output: ma-y-than-te
*/
function getSlug(pathName,path = "/truyen/"){
    if(!pathName.includes(path)) return null;
    let novelPath = pathName.slice(path.length);
    let indexOfForwardSlash = novelPath.indexOf("/")
    return  (indexOfForwardSlash === -1) ? novelPath: novelPath.slice(0,indexOfForwardSlash);
}