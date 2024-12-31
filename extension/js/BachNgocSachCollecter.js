const BNS_LOGO = "../img/BNS.png";

async function BNSgetNovelInfo(pathName){
    const request = await fetch(`https://bnsach.com${pathName}`);
    const response = await request.text();
    const regex = /"nodeBid":\s*"([^"]+)"/;
    const match = response.match(regex);
    if(!match) return {logo: BNS_LOGO,Approve: true};
    return  {logo: BNS_LOGO,Approve: true,novel:await getInfo(match[1])}; 
}

async function getInfo(NovelID) {
    return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ action: "getBNSinfo", id: NovelID }, (response) => {
        if (response.status === "success") {
            resolve(response.data); 
        } else {
            reject("Có lỗi xảy ra khi tải xuống!"); 
        }
        });
    });
}


async function BNSAddChapterProcess(novel,ebook){
    let chapterID = novel.firstChapterNode;
    const firstRequest = await fetch(`https://bnsach.com/reader/mucluc-jump/${novel.id}/${chapterID}`);
    const firstResponse = await firstRequest.json();
    let current = 1;
    const chapterTitle = BNSsplitTitle(firstResponse[0].title);
    UpdateProgress(current,chapterTitle,current,novel.totalChapter);
    ebook.addChapter(current,chapterTitle,await getChapterContents(firstResponse[0].nid));
    while(true){
        let flag = false
        const request = await fetch(`https://bnsach.com/reader/mucluc-jump/${novel.id}/${chapterID}`);
        const response = await request.json();
        const length = response.length;
        for(let i = 0; i<response.length;i++){
            if(flag){
                current++;
                const chapterTitle = BNSsplitTitle(response[i].title);
                UpdateProgress(current,chapterTitle,current,novel.totalChapter);
                ebook.addChapter(current,chapterTitle,await getChapterContents(response[i].nid));
            }
            if(response[i].current) flag = true;
        }
        if(response[length-1].nid == chapterID) break;
        chapterID = response[length-1].nid;
    }
}


function BNSsplitTitle(title){
    if (title.indexOf(":") > -1){
        const colon = title.indexOf(":");
        const begin = title.indexOf(":.") >-1? colon + 3 : colon + 2;
        const chapterTitle = title.slice(begin);
        return chapterTitle;
    }
    return title;
}


async function getChapterContents(chapterID) {
    const request =await fetch(`https://bnsach.com/reader/node/${chapterID}`);
    const response = await request.text();
    const regex = /<\s*div\s+id=["']encrypted-content["'][^>]*>(.*?)<\s*\/\s*div>/;
    const match = response.match(regex);
    if(!match) throw new Error("Vui lòng báo cho lập trình viên");
    return await decryptContent(match[1]);
}


async function decryptContent(a) {
    const encryptedContent = a.trim();

    try {
        const response = await fetch('https://bnsach.com/reader/api/decrypt-content.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                encryptedData: encryptedContent
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.content;
    } catch (error) {
        console.error('Error decrypting content:', error);
    }
}