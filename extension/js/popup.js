const WEBSITE_IDENTIFY = {
    BACH_NGOC_SACH_VIP : 1
};

const SUPPORTED_WEBSITE = {
    "bachngocsach.net.vn" : WEBSITE_IDENTIFY.BACH_NGOC_SACH_VIP,
    "bachngocsach.app": WEBSITE_IDENTIFY.BACH_NGOC_SACH_VIP};

const NONE = "none";
const CHOOSE_A_NOVEL = "Mời bạn chọn truyện";
const NOT_LOGIN = "Bạn chưa đăng nhập";

function fetchToGetNovelInfo(){
    changeDisplay("not-supported",NONE);
    changeDisplay("supported",NONE);
    chrome.runtime.sendMessage({ action: "getNameAndTotalChapter"}, (message) => {
    if (message.error) {
        document.getElementById("message").innerText = message.error;
    } else if(!message.Approve){
        SwitchSupportDiv(false);
    } 
    else if(message.Approve)
    {
        SwitchSupportDiv();
        if(message.name){
            document.getElementById("novel-title").innerText = message.name;
            document.getElementById("total-chapter").innerText = message.totalChapter;
            document.getElementById("available-chapter").innerText = (message.availableChapter== message.totalChapter+1)? "Không rõ":message.availableChapter;
            changeDisplay("novel-info");
            Show5Newsest(message.fiveNewestChapter);
        }else{
            document.getElementById("form").innerText= CHOOSE_A_NOVEL;
            changeDisplay("novel-info",NONE);
        }
    }
});}

//First clicking on extention icon
fetchToGetNovelInfo();

//Get a message on event DOM change or navigate site => refesh extention view
chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "reload") {
        fetchToGetNovelInfo();
    }
});


function SwitchSupportDiv(condition = true){
    changeDisplay("supported");
    //changeDisplay("not-supported",NONE);
    if(!condition){
        changeDisplay("not-supported");
        //changeDisplay("supported",NONE);
    }
}

function Show5Newsest(arr){
    const container = document.getElementById("form");
    const five = 5;
    container.innerHTML = "";
    for (let i = 0; i < five; i++) 
    {
        let element = arr[i];
        const div = document.createElement('div');
        div.textContent = element;
        div.classList.add("element");
        container.appendChild(div);
    }
}


function changeDisplay(id,state="block"){
    document.getElementById(id).style.display = state;
}