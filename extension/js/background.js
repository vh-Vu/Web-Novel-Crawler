importScripts('cookiesExtractor.js');
importScripts('BachNgocSachVIPCollecter.js');
importScripts('DaoQuanCollecter.js');
importScripts('chapter.js')
let WEBSITE_IDENTIFY;
let SUPPORTED_WEBSITE;

let configLoaded = false;  

async function loadConfig() {
    try {
        const configResponse = await fetch('https://raw.githubusercontent.com/vh-Vu/Web-Novel-Crawler/refs/heads/4th_f/extension/config.json');
        const config = await configResponse.json();

        WEBSITE_IDENTIFY = config.WEBSITE_IDENTIFY;
        SUPPORTED_WEBSITE = config.SUPPORTED_WEBSITE;
        configLoaded = true;

        chrome.storage.local.set({ WEBSITE_IDENTIFY, SUPPORTED_WEBSITE }, () => {
            console.log("Config saved to chrome storage");
        });
        
        console.log("Config loaded successfully:", WEBSITE_IDENTIFY, SUPPORTED_WEBSITE);
    } catch (error) {
        console.error("Error loading config:", error);
    }
}

function loadConfigFromStorage() {
    chrome.storage.local.get(['WEBSITE_IDENTIFY', 'SUPPORTED_WEBSITE'], (result) => {
        if (result.WEBSITE_IDENTIFY && result.SUPPORTED_WEBSITE) {
            WEBSITE_IDENTIFY = result.WEBSITE_IDENTIFY;
            SUPPORTED_WEBSITE = result.SUPPORTED_WEBSITE;
            configLoaded = true;
            console.log("Config loaded from chrome storage:", WEBSITE_IDENTIFY, SUPPORTED_WEBSITE);
        } else {
            loadConfig();
        }
    });
}

loadConfigFromStorage()


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getNameAndTotalChapter" ) {
        (async () => {
            try {
                // const timeoutPromise = new Promise((_, reject) =>
                //     setTimeout(() => reject(new Error('Timeout: Unable to get the current tab URL within the time limit.')), 5000)
                // );

                const { host, pathName } =  await getCurrentTabUrl(); //Promise.race([getCurrentTabUrl(), timeoutPromise]);
                if(Approve(host)){
                    switch(SUPPORTED_WEBSITE[host]){
                        case 1:
                            sendResponse(await BNSVIPgetNameAndTotalChapter(pathName));
                        break;
                        case 2:
                            sendResponse(await DaoQuangetNameAndTotalChapter(pathName));
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
                    const urlObject = new URL(url); 
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