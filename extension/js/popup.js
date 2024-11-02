const WEBSITE_IDENTIFY = {
    BACH_NGOC_SACH_VIP : 1
};

const SUPPORTED_WEBSITE = {
    "bachngocsach.net.vn" : WEBSITE_IDENTIFY.BACH_NGOC_SACH_VIP,
    "bachngocsach.app": WEBSITE_IDENTIFY.BACH_NGOC_SACH_VIP};


    chrome.runtime.sendMessage({ action: "getNameAndTotalChapter"}, (message) => {
        if (message.error) {
            document.getElementById("message").innerText = message.error;
        } else {
            document.getElementById("not-supported").style.display = "none";
            document.getElementById("supported").style.display = "block";
            document.getElementById("novel-title").innerText = message.name;
            document.getElementById("total-chapter").innerText = message.totalChapter;
        }
    });

// Lắng nghe tin nhắn từ background
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     console.log("Tin nhắn nhận được từ background:", message);
//     if (message.site) {
//         // Hiển thị dữ liệu nhận được trong popup
//         document.getElementById("not-supported").style.display = "none";
//         document.getElementById("supported").style.display = "block";
//         document.getElementById("novel-title").innerText = message.novelTitle;
//         document.getElementById("total-chapter").innerText = message.totalChapter;
//     }
// });

//let test;
// document.addEventListener('DOMContentLoaded', function () {
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//         let currentTab = tabs[0];
//         let currentUrl = currentTab.url;
//         let message = document.getElementById("message"); 
//         //Showing message when match with supported website 
//         for (let website of SUPPORTED_WEBSITE){
//             if(currentUrl.includes(website)){
//                 message.innerHTML = currentUrl;
//                 // test = currentUrl;
//                 // console.log(currentTab)
//                 // console.log(currentTab.title)
//                 //getNovelTitle(currentTab.title);
//                 //localStorage.setItem("novel","hello storge")
//                 break;
//             }
//         }
//     });
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//         if (message.action === "receiveH1Content") {
//             console.log("Nội dung thẻ H1 nhận được:", message.content);
//             document.getElementById("novel-title").innerText = message.content;
//         }
//     });
// });

// function getNovelTitle(tabId) {
//     document.getElementById("title").innerText = tabId;

// }
