const img = "https://img.daoquan.vn/get/images/doctruyen/images/20220405/web.png"
async function DaoQuangetNameAndTotalChapter(pathName){
    console.log(GetId(pathName));
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "pageData") {
        console.log("Dữ liệu từ trang:", message.data);
        // Xử lý dữ liệu hoặc lưu trữ vào storage nếu cần
    }
});


function GetId(pathName){
    const storyPath = "/doc-truyen/";
    if(pathName.includes(storyPath)){
        const novelPath = pathName.slice(storyPath.length);
        const indexOfForwardSlash = novelPath.indexOf("/");
        return novelPath.slice(indexOfForwardSlash+1);
    }
    const regex = /^\/([a-zA-Z0-9\-]+)\/(\d+)\/1\/chuong-(\d+)$/;
    const match = pathName.match(regex);
    if(match) return match[2];
    return null;
}