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
                const linkTag = novelDOM.querySelectorAll("link");
                let totalChapter = 0;
                //go to TOC page to get all contents
                for (link of linkTag){
                    if(link.rel == "canonical"){
                        const rquest = await fetch(`${link.href}/muc-luc?page=all`);
                        const rsponse = await rquest.text();
                        totalChapter = parser.parseFromString(rsponse,"text/html").getElementById("mucluc-list").querySelector("ul").childElementCount;
                        break;
                    }
                }

                const description = novelDOM.getElementById("gioithieu").querySelector("div").innerHTML;
                const cover = novelDOM.getElementById("anhbia").querySelector("img").src;
                const subject = Array.from(novelDOM.getElementById("theloai").querySelectorAll('a')).map(a => a.innerText);
                const firstChapter = async (href) => {
                    const firstChapterRequest = await fetch(href);
                    const firstChapterResponse = await firstChapterRequest.text();
                    const regex = /node\/(\d+)/;
                    return firstChapterResponse.match(regex)[1];
                };
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
                    subject: subject.join(", "),
                    firstChapterNode: await firstChapter(novelDOM.querySelector("link").href)
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
