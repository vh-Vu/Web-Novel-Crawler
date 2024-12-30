importScripts('cookiesExtractor.js');
importScripts('GeneralScript.js')
importScripts('BachNgocSachVIPCollecter.js');
importScripts('DaoQuanCollecter.js');
importScripts('BachNgocSachCollecter.js');
importScripts('ebook.js');
let WEBSITE_IDENTIFY;
let SUPPORTED_WEBSITE;

let configLoaded = false;
let isDownload = false;

async function loadConfig() {
    try {
        const configResponse = await fetch('../config.json');
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
loadConfig()

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getNameAndTotalChapter" ) {
        (async () => {
            try {
                if(isDownload) {sendResponse({Approve:false,isDownload:isDownload})}
                else{
                    loadConfigFromStorage()
                    const { host, pathName } =  await getCurrentTabUrl(); //Promise.race([getCurrentTabUrl(), timeoutPromise]);
                    if(Approve(host)){
                        switch(SUPPORTED_WEBSITE[host]){
                            case 1:
                                sendResponse(await BNSVIPgetNameAndTotalChapter(pathName));
                                break;
                            case 2:
                                sendResponse(await DaoQuangetNameAndTotalChapter(pathName));
                                break;
                            case 3:
                                sendResponse(await BNSgetNovelInfo(pathName))
                                break;
                        }
                    }else{
                        sendResponse({Approve:false})
                    }
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
chrome.runtime.onInstalled.addListener(() => {
    console.log("Web Novel Crawler Extension Installed.");
});


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "download") {
        (async () => {
            try {
                isDownload = true;
                const downloadWindow = await createDownloadWindow();
                console.log(message.novel)
                await startDownload(message.novel);

                chrome.windows.remove(downloadWindow.id, () => {
                    console.log("Download window closed.");
                });
                sendResponse({ status: "success" });
            } catch (error) {
                console.error("Error during file download creation:", error);
                sendResponse({ status: "error", error: "Có lỗi xảy ra khi tạo file zip!" });
            }finally{
                isDownload = false;
            }
        })();
        return true; 
    }
});



async function createDownloadWindow() {
    return new Promise((resolve, reject) => {
        chrome.windows.create({ 
            url: '../process.html',
            type: 'popup',
            width: 350,
            height: 400
        }, (window) => {
            if (chrome.runtime.lastError) {
                reject(new Error('Failed to create download window'));
            } else {    
                resolve(window);
            }
        });
    });
}

async function startDownload(novel) {
    let ebook = new Ebook(novel.title,novel.cover,novel.author,novel.publisher,novel.contributor,novel.subject,novel.description)
    // Thêm các chương vào 
    switch(SUPPORTED_WEBSITE[novel.publisher]){
        case 2:
            await DaoQuanAddChapterProcess(novel,ebook);
            break;
        case 3:
            await BNSAddChapterProcess(novel,ebook);
            break;
    }

    chrome.runtime.sendMessage({
        action: "updateProgress",
        message: `Đang tạo sách`,
        progress: 100
    });
    const dataURL = await ebook.genBook();
    chrome.downloads.download({
        url: dataURL,
        filename: `${removeVietnameseTones_and_SpecialCharacter(novel.title)}-${removeVietnameseTones_and_SpecialCharacter(novel.author)}_Web-Novel-Crawler.zip`,
        saveAs: true
    }, (downloadId) => {
        console.log("Download started with ID:", downloadId);
    });
}

