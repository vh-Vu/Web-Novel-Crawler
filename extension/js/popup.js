const WEBSITE_IDENTIFY = {
    BACH_NGOC_SACH_VIP : 1
};

const SUPPORTED_WEBSITE = {
    "bachngocsach.net.vn" : WEBSITE_IDENTIFY.BACH_NGOC_SACH_VIP,
    "bachngocsach.app": WEBSITE_IDENTIFY.BACH_NGOC_SACH_VIP};

function fetchToGetNovelInfo(){
        chrome.runtime.sendMessage({ action: "getNameAndTotalChapter"}, (message) => {
        if (message.error) {
            document.getElementById("message").innerText = message.error;
        } else if(!message.Approve){
            document.getElementById("not-supported").style.display = "block";
            document.getElementById("supported").style.display = "none";
        } 
        else {
        document.getElementById("not-supported").style.display = "none";
        document.getElementById("supported").style.display = "block";
        if(message.name){
            document.getElementById("novel-info").style.display = "block";
            document.getElementById("novel-title").innerText = message.name;
            document.getElementById("total-chapter").innerText = message.totalChapter;
                if (message.id) { // Giả sử `id` là `storyId`
                    chrome.runtime.sendMessage({ action: "getFiveNewestChapters", storyId: message.id }, (response) => {
                        const container = document.getElementById("form");
                        const five = 5;
                        container.innerHTML = "";

                        if (response.error) {
                        container.innerText = response.error;
                        } else {
                        // Hiển thị danh sách 5 chương mới nhất
                        for (let i = 0; i < five; i++) {
                        let element = response[i];
                        const div = document.createElement('div');
                        div.textContent = element;
                        div.classList.add("element");
                        container.appendChild(div);
                        }
                        }
                    });
                    }
                }else{
                    document.getElementById("form").innerText= "Mời bạn chọn truyện";
                    document.getElementById("novel-info").style.display = "none";
                }
            }

        });}
fetchToGetNovelInfo();
        
chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "reload") {
        fetchToGetNovelInfo();
    }
});
