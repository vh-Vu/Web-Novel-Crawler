importScripts('novel.js');
const BNS_API = "https://ngocsach.com/api/"
const STORY_BY_SLUG = "story-by-slug/";
const FIVE_NEWEST_CHAPTERS = "/5-chapters-newest";

//This one like Interface
async function BNSVIPgetNameAndTotalChapter(pathname){
    console.log(pathname);
    let novelSlug = getSlug(pathname);
    if (novelSlug === null) return {Approve : true}
    const dummy = await getNovelInfo(novelSlug);
    console.log(dummy);
    return dummy;
}


async function getNovelInfo(slug){
    try{
        const request = await fetch(`${BNS_API}${STORY_BY_SLUG}${slug}`);
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
        const request = await fetch(`${BNS_API}story/${storyId}${FIVE_NEWEST_CHAPTERS}`);
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