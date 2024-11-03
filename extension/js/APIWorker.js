importScripts('novel.js');
const WEB_API = "https://ngocsach.com/api/"
const STORY_BY_SLUG = "story-by-slug/";
const FIVE_NEWEST_CHAPTERS = "/5-chapters-newest";


async function getNovelInfo(slug){
    try{
        const request = await fetch(`${WEB_API}${STORY_BY_SLUG}${slug}`);
        let response = await request.json();
        if(request.status===200 && response.id){
            const fiveNewestChapter = await getFiveNewestChapters(response.id)
            const novelInfo = new Novel(response,fiveNewestChapter)
            return novelInfo;
        }else{
            throw new Error("Cannot get API from server, try it later.");
        }
    }catch{
        throw new Error("Vui lòng báo cho lập trình viên ở email dưới footer");
    }
}

async function getFiveNewestChapters(storyId) {
    try{
        const request = await fetch(`${WEB_API}story/${storyId}${FIVE_NEWEST_CHAPTERS}`);
        if(request.status===200){
            let response = await request.json();
            const fiveNewestChapter = response.data.map(element=> element.name);
            return fiveNewestChapter;
        }else{
            throw new Error("Cannot get API from server, try it later.");
        }
    }
    catch{
        throw new Error("Vui lòng báo cho lập trình viên ở email dưới footer");
    }
}