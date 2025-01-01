const DQ_LOGO = "../img/DaoQuanLogo.png"
const DQ_API = "https://api.daoquan.vn/web/c/";
const DQDOMAIN = "daoquan.vn";
const E5_CHAPTERS_API = (id) => `${DQ_API}storyChapters/sort?filter={%22storiesId%22:%22${id}%22}&range=[0,100000]&sort=[%22number%22,%22asc%22]`;

async function DaoQuangetNameAndTotalChapter(pathName){
    const novelId = GetId(pathName);
    if (!novelId) return {logo: DQ_LOGO, Approve : true};
    return {logo: DQ_LOGO, Approve : true, novel: await DQGetNovelInfo(novelId)};
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
    return null; 
}

async function DQGetNovelInfo(id) {
    try{
        const story = "stories/";
        const request = await fetch(`${DQ_API}${story}${id}`);
        if(request.status !== 200 ) throw new Error("Trang web đang bị lỗi, vui lòng thử lại sau");
        const response = await request.json();
        const novelInfo = new Novel(
                                    response.id,
                                    response.name,
                                    response.storyAuthors.name,
                                    response.countChapter,
                                    0,
                                    `https://img.daoquan.vn/get/images/doctruyen/${response.images.file}`,
                                    formatParagraph(response.description),
                                    response.usersCreator.fullname,
                                    DQDOMAIN,
                                    `${response.storyCategoriesParent.name}, ${response.storyTypes.name}, ${response.storyCategories[0].name}`
                                    );
        return novelInfo;
    }
    catch{
        throw new Error("Vui lòng báo cho lập trình viên ở email dưới footer");
    }
}






async function DaoQuanGetTotalChapters(id){
    try{
    const request = await fetch(`${E5_CHAPTERS_API(id)}`);
    if(request.status !== 200 ) throw new Error("Trang web đang bị lỗi, vui lòng thử lại sau");
        const response = await request.json();
        return response.result.list;
    }
    catch{
        throw new Error("Vui lòng báo cho lập trình viên ở email dưới footer");
    }
}

async function DaoQuanGetChapterContent(ChapterID){
    try {
        const request = await fetch(`${DQ_API}storyChapters/${ChapterID}`);
        if(request.status !== 200 ) throw new Error("Trang web đang bị lỗi, vui lòng thử lại sau");
            const response = await request.json();
            return formatParagraph(response.content);
        }
    catch {
        throw new Error("Vui lòng báo cho lập trình viên ở email dưới footer");
    }
}

async function DaoQuanAddChapterProcess(novel,ebook){
    const totalChapter = await DaoQuanGetTotalChapters(novel.id);
    for (let i = 0; i < totalChapter.length; i++) {
        const chapterContent = await DaoQuanGetChapterContent(totalChapter[i].id);
        UpdateProgress(totalChapter[i].number,totalChapter[i].name,i+1,novel.totalChapter);
        ebook.addChapter(totalChapter[i].number,totalChapter[i].name,chapterContent);
    }
}
