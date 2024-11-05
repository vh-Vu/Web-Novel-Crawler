const storyPath = "/doc-truyen/";

async function DaoQuangetNameAndTotalChapter(pathName){
    console.log(getSlugNameorID(pathName,storyPath,true));
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "pageData") {
        console.log("Dữ liệu từ trang:", message.data);
        // Xử lý dữ liệu hoặc lưu trữ vào storage nếu cần
    }
});