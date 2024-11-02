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
        console.log(message.id)
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
    }
});
      
chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "reload") {
        location.reload();
    }
});
