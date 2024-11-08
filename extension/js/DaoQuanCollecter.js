const DQ_LOGO = "../img/DaoQuanLogo.png"
const DQ_API = "https://api.daoquan.vn/web/c/";

async function DaoQuangetNameAndTotalChapter(pathName){
    return await DQGetNovelInfo(GetId(pathName));
}


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
    return {logo: DQ_LOGO, Approve : true};
}

async function DQGetNovelInfo(id) {
    try{

        const story = "stories/";
        const storyChapters = `storyChapters/sort?filter={\"storiesId\":\"${id}\"}&range=[0,1]`;
        const request = await fetch(`${DQ_API}${story}${id}`);
        const storyChaptersRequest = await fetch(`${DQ_API}${storyChapters}`)

        if(request.status !== 200 || storyChaptersRequest.status!== 200) throw new Error("Vui lòng báo cho lập trình viên ở email dưới footer");
        
        const response = await request.json();
        const storyChaptersResponse = await storyChaptersRequest.json();
        const last5Chapter = storyChaptersResponse.result.lastChapter.map(i=>`Chương ${i.number}: ${i.name}`);
        const novelInfo = new Novel(
                                        DQ_LOGO,
                                        response.name,
                                        response.storyAuthors.name,
                                        response.countChapter,
                                        last5Chapter,
                                        0)
        return novelInfo;
    }
    catch{
        throw new Error("Vui lòng báo cho lập trình viên ở email dưới footer");
    }
}