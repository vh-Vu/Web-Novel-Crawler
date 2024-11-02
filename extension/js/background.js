chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "sendH1Content") {
        // Gửi thông điệp đến popup
        console.log(message.content)
       sendResponse({farewell: "goobye"});
    }
});

importScripts('cookiesExtractor.js');
