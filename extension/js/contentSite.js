chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getDOM") {
        const title = document.title;
        const url = window.location.href;
        const bodyInnerHTML = document.body.innerHTML; // Lấy toàn bộ innerHTML của body

        // Gửi phản hồi lại popup script với các thông tin cần thiết
        sendResponse({ title, url, bodyInnerHTML });
    }
});