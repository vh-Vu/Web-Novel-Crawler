const WEBSITE_IDENTIFY = {
    BACH_NGOC_SACH_VIP : 1
};

const SUPPORTED_WEBSITE = {
    "bachngocsach.net.vn" : WEBSITE_IDENTIFY.BACH_NGOC_SACH_VIP,
    "bachngocsach.app": WEBSITE_IDENTIFY.BACH_NGOC_SACH_VIP};

const NONE = "none";
const CHOOSE_A_NOVEL = "Mời bạn chọn truyện";
const NOT_LOGIN = "Bạn chưa đăng nhập";

const NOVEL_TITLE =  document.getElementById("novel-title");
const TOTAL_CHAPTERS = document.getElementById("total-chapter");
const AUTHOR = document.getElementById("author");
const AVAILABLE_CHAPTERS = document.getElementById("available-chapter");
const SUPPORTED_FRAME = document.getElementById("supported");
const NOT_SUPPORTED_FRAME = document.getElementById("not-supported");
const NOVEL_INFO_FRAME = document.getElementById("novel-info");
const LOGO_WEBSERVICE_IMG = document.getElementById("banner");
const LOADER = document.getElementById("waiting");



function fetchToGetNovelInfo(){
    changeDisplay(NOT_SUPPORTED_FRAME,NONE);
    changeDisplay(SUPPORTED_FRAME,NONE);
    chrome.runtime.sendMessage({ action: "getNameAndTotalChapter"}, (message) => {
    changeDisplay(LOADER,NONE)
    if (message.error) {
        document.getElementById("message").innerText = message.error;
    } else if(!message.Approve){
        SwitchSupportDiv(false);
    } 
    else if(message.Approve)
    {
        SwitchSupportDiv();
        LOGO_WEBSERVICE_IMG.src = message.logo;
        if(message.name){
            NOVEL_TITLE.innerText = message.name;
            TOTAL_CHAPTERS.innerText = message.totalChapter;
            AUTHOR.innerText = message.author;
            AVAILABLE_CHAPTERS.innerText = (message.availableChapter== message.totalChapter+1)? "Không rõ":message.availableChapter;
            changeDisplay(NOVEL_INFO_FRAME);
            Show5Newsest(message.fiveNewestChapter);
        }else{
            document.getElementById("form").innerText= CHOOSE_A_NOVEL;
            changeDisplay(NOVEL_INFO_FRAME,NONE);
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
    changeDisplay(SUPPORTED_FRAME);
    changeDisplay(NOT_SUPPORTED_FRAME,NONE);
    if(!condition){
        changeDisplay(NOT_SUPPORTED_FRAME);
        changeDisplay(SUPPORTED_FRAME,NONE);
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


function changeDisplay(frame,state="block"){
    frame.style.display = state;
}


const Donate = document.getElementById("donate");
Donate.addEventListener('click',() =>{
})