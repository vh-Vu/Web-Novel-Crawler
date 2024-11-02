
chrome.cookies.getAll({ domain: "bachngocsach.net.vn" }, (cookies) => {
    console.log("Cookies for bachngocsach.net.vn:", cookies);
});

const WEB_API="https://ngocsach.com/api/story-by-slug/"

async function getNovelInfo(slug){
    try{
        const request = await fetch(`${WEB_API}${slug}`);
        if(request.status===200){
            let response = await request.json();
            return {
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