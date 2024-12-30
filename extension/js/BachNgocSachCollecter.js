const BNS_LOGO = "../img/BNS.png";

async function BNSgetNovelInfo(pathName){
    const request = await fetch(`https://bnsach.com${pathName}`);
    const response = await request.text();
    const regex = /"nodeBid":\s*"([^"]+)"/;
    const match = response.match(regex);
    if(!match) return {logo: BNS_LOGO,Approve: true};
    return  {logo: BNS_LOGO,Approve: true,novel: await getInfo(match[1])}; 
}

async function getInfo(NovelID) {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]) {
                const tabId = tabs[0].id; 
                chrome.tabs.sendMessage(tabId, { action: "getBNSinfo", id: NovelID }, (response) => {
                    if (response.status === "success") {
                        resolve(response.data); 
                    } else {
                        reject("Có lỗi xảy ra khi tải xuống!"); 
                    }
                });
            } else {
                reject("Không tìm thấy tab hiện tại!"); 
            }
        });
    });
}
