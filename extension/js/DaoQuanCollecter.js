const DQ_LOGO = "../img/DaoQuanLogo.png"
const DQ_API = "https://api.daoquan.vn/web/c/";
const DQDOMAIN = "https://daoquan.vn";

async function DaoQuangetNameAndTotalChapter(pathName){
    const {novelId,slug} =  GetId(pathName);
    console.log(pathName);
    if (!novelId)  return {logo: DQ_LOGO, Approve : true};
    return await DQGetNovelInfo(novelId,slug);
}


function GetId(pathName){
    const storyPath = "/doc-truyen/";
    if(pathName.includes(storyPath)){
        const novelPath = pathName.slice(storyPath.length);
        const indexOfForwardSlash = novelPath.indexOf("/");
        return {novelId: novelPath.slice(indexOfForwardSlash+1),slug: pathName};
    }
    const regex = /^\/([a-zA-Z0-9\-]+)\/(\d+)\/1\/chuong-(\d+)$/;
    const match = pathName.match(regex);
    console.log(match);
    if(match) return {novelId: match[2],slug: `${storyPath}${match[1]}/${match[2]}`};
    return { novelId: null, slug: null }; 
}

async function DQGetNovelInfo(id,pathName) {
    try{

        const story = "stories/";
        const request = await fetch(`${DQ_API}${story}${id}`);
        const CoverRequest = await fetch(`${DQDOMAIN}${pathName}`);
        console.log(`${DQDOMAIN}${pathName}`);
        if(request.status !== 200 || CoverRequest.status !== 200) throw new Error("Trang web đang bị lỗi, vui lòng thử lại sau");
        
        const response = await request.json();
        const cover = CoverParser(await CoverRequest.text());
        const novelInfo = new Novel(
                                        DQ_LOGO,
                                        response.name,
                                        response.storyAuthors.name,
                                        response.countChapter,
                                        0,
                                        cover
                                        );
        return novelInfo;
    }
    catch{
        throw new Error("Vui lòng báo cho lập trình viên ở email dưới footer");
    }
}

function CoverParser(htmlText){
    const regex = /<a[^>]*id="bookImg"[^>]*><img[^>]*src="([^"]*)"/;
    const match = htmlText.match(regex);
    return match[1].split('?')[0];;
}