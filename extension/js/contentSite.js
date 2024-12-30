chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getBNSinfo") {
        (async () => {
            try {
                const request = await fetch(`https://bnsach.com/reader/node/${message.id}`);
                const response = await request.text();
                const parser = new DOMParser();
                const novelDOM = parser.parseFromString(response, "text/html");

                const title = novelDOM.getElementById("truyen-title").innerText;     
                const author = novelDOM.getElementById("tacgia").querySelector('a').innerText;
                const newestChapterw = novelDOM.getElementById("chuong-list-new").querySelector("span").innerText.slice(7,);
                const totalChapter = newestChapterw.slice(0, newestChapterw.indexOf(':'));
                const description = novelDOM.getElementById("gioithieu").querySelector("div").innerHTML;
                const cover = novelDOM.getElementById("anhbia").querySelector("img").src;
                const subject = Array.from(novelDOM.getElementById("theloai").querySelectorAll('a')).map(a => a.innerText);
                
                const novel = {
                    id: message.id,
                    title,
                    author,
                    totalChapter,
                    availableChapter: totalChapter,
                    cover,
                    description,
                    contributor: "Không rõ",
                    publisher: "bnsach.com",
                    subject: subject.join(", ")
                };
                sendResponse({ status: "success", data: novel });

            } catch (error) {
                console.error("Error:", error);
                sendResponse({ status: "error", error: "Không rõ lí do" });
            }
        })();
        return true;
    }
});
