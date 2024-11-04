importScripts('novel.js');
const BNS_API = "https://ngocsach.com/api/"
const STORY_BY_SLUG = "story-by-slug/";
const FIVE_NEWEST_CHAPTERS = "/5-chapters-newest";
const BNS_AUTHENTICATE = "https://bachngocsach.net.vn/api/auth/session";
const CHAPTERS_HAVE_TO_BUY = "info-hasnt-bought-chapters/"


//This one like Interface
async function BNSVIPgetNameAndTotalChapter(pathname){
    console.log(pathname);
    let novelSlug = getSlug(pathname);
    if (novelSlug === null) return {Approve : true}
    const token = await getTokenAccess();
    const dummy = await getNovelInfo(novelSlug,token);
    return dummy;
}


async function getNovelInfo(slug,token){
    try{
        const request = await fetch(`${BNS_API}${STORY_BY_SLUG}${slug}`);
        let response = await request.json();
        if(request.status===200 && response.id){
            const fiveNewestChapter = await getFiveNewestChapters(response.id)
            let chaptersToBuy = -1;
            if(token!==null){
                chaptersToBuy = await getNumberChaptersHaveToBuy(token,response.id);
            }
            console.log(chaptersToBuy);
            const novelInfo = new Novel(response,fiveNewestChapter,chaptersToBuy)
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

async function getNumberChaptersHaveToBuy(token,id) {
    try{
        const holder = "?from=undefined&to=undefined"
        const request = await fetch(`${BNS_API}${CHAPTERS_HAVE_TO_BUY}${id}${holder}`,{
            method: 'GET',
            headers:{
                'Accept':'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const response = await request.json();
        if (request.status ===200){
            return response.amount_chapters;
        }
        else return -1;
    }catch{
        return -1;
    }
    
}

async function getTokenAccess(){
    const allCookies = await getCookies("bachngocsach.net.vn");
    let __Host ={name: "__Host-next-auth.csrf-token",value:""};
    let __Secure__CallBack = {name: "__Secure-next-auth.callback-url",value:""};
    let __Secure__NextAuthen = {name: "__Secure-next-auth.session-token",value:""};;
    for (let i = 0; i < allCookies.length; i++) {
        if (allCookies[i].name === __Host.name) {
            __Host.value = allCookies[i].value;
        }
        if (allCookies[i].name === __Secure__CallBack.name) {
            __Secure__CallBack.value = allCookies[i].value;
        }
        if (allCookies[i].name === __Secure__NextAuthen.name) {
            __Secure__NextAuthen.value = allCookies[i].value;
        }
    }
    if(__Secure__NextAuthen.value===""){
        return null;
    }
    let cookie = __Host.name+"="+__Host.value+"; "+__Secure__CallBack.name+"="+__Secure__CallBack.value+"; "+__Secure__NextAuthen.name+"="+__Secure__NextAuthen.value
    const response = await fetch(BNS_AUTHENTICATE, {
        method: 'GET',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Cookie': cookie
        }
    });
    const request = await response.json();
    return request.accessToken;
}