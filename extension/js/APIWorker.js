const WEB_API = "https://ngocsach.com/api/"
const STORY_BY_SLUG = "story-by-slug/";
const FIVE_NEWEST_CHAPTERS = "/5-chapters-newest";


async function getNovelInfo(slug){
    try{
        const request = await fetch(`${WEB_API}${STORY_BY_SLUG}${slug}`);
        if(request.status===200){
            let response = await request.json();
            return {
                id: response.id,
                name: response.name,
                totalChapter: response.chapters_count
            };
        }else{
            throw new Exception("Cannot get API form sever try it later")
        }
    }catch{
        throw new Error("Vui lòng báo cho lập trình viên ở email dưới footer");
    }
}

async function getFiveNewestChapters(storyId) {
    try{
        console.log("hi am getFiveNewestChapters")
        console.log(`${WEB_API}story/${storyId}${FIVE_NEWEST_CHAPTERS}`);
        const request = await fetch(`${WEB_API}story/${storyId}${FIVE_NEWEST_CHAPTERS}`);
        if(request.status===200){
            let response = await request.json();
            let re = response.data.map(element=> element.name);
            console.log(re);
            return re;
        }else{
            throw new Exception("Cannot get API form sever try it later")
        }
    }
    catch{
        throw new Error("Vui lòng báo cho lập trình viên ở email dưới footer");
    }
}