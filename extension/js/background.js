importScripts('cookiesExtractor.js');
importScripts('APIWorker.js');
importScripts('extentionTool.js');
importScripts('BachNgocSachVIPCollecter.js');
const WEBSITE_IDENTIFY = {
    BACH_NGOC_SACH_VIP : 1
}

const SUPPORTED_WEBSITE = {
    "bachngocsach.net.vn" : WEBSITE_IDENTIFY.BACH_NGOC_SACH_VIP,
    "bachngocsach.app": WEBSITE_IDENTIFY.BACH_NGOC_SACH_VIP}


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getNameAndTotalChapter" ) {
        (async () => {
            try {
                const { host, pathName } = await getCurrentTabUrl();
                if(Approve(host)){
                    switch(SUPPORTED_WEBSITE[host]){
                        case 1:
                        sendResponse(await BNSVIPgetNameAndTotalChapter(pathName));
                        break;
                    }
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



function Approve(host){
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
                    resolve({ // Sử dụng resolve thay vì return
                        host: urlObject.host,
                        pathName: urlObject.pathname
                    }); // Trả về host
                } else {
                    reject(new Error("No URL found for the current tab."));
                }
            } else {
                reject(new Error("No active tab found."));
            }
        });
    });
}