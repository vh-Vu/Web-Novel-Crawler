importScripts('cookiesExtractor.js');
importScripts('APIWorker.js');
importScripts('extentionTool.js');



chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "user-action") {
        console.log(message.host);
        chrome.storage.local.set({"host":message.host});
        slug = getSlug(message.content);
        chrome.storage.local.set({ slug: slug });
        chrome.runtime.sendMessage({action: "reload"});
}});


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getNameAndTotalChapter" ) {
        (async () => {
            try {
                if(await Approve()){
                    slug = await chrome.storage.local.get("slug");
                    if(slug.slug===null){
                        sendResponse({Approve:true})
                    }
                    else
                    sendResponse(await getNovelInfo(slug.slug));
                }else{
                    sendResponse({Approve:false})
                }
                
            } catch (error) {
                console.error("Error fetching novel info:", error);
                sendResponse({ error: error.message });
            }
        })();
        return true;
    }
    
});

async function Approve(){
    const SUPPORTED_WEBSITE = {
        "bachngocsach.net.vn" : WEBSITE_IDENTIFY.BACH_NGOC_SACH_VIP,
        "bachngocsach.app": WEBSITE_IDENTIFY.BACH_NGOC_SACH_VIP};
    //let host = getCurrentTabUrl();
    console.log("hello");
    const host = await getCurrentTabUrl();
    console.log("Host:", host);
    return host in SUPPORTED_WEBSITE;
}


function getCurrentTabUrl() {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (chrome.runtime.lastError) {
                return reject(new Error(chrome.runtime.lastError));
            }
            if (tabs.length > 0) {
                const currentTab = tabs[0]; // Tab hiện tại
                const url = currentTab.url; // Lấy URL

                if (url) {
                    const urlObject = new URL(url); // Tạo một đối tượng URL
                    resolve(urlObject.host); // Trả về host
                } else {
                    reject(new Error("No URL found for the current tab."));
                }
            } else {
                reject(new Error("No active tab found."));
            }
        });
    });
}
