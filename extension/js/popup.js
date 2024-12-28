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
const Donate = document.getElementById("donate");
const Download = document.getElementById("download");
let CURRENT_NOVEL;


function fetchToGetNovelInfo(){
    chrome.runtime.sendMessage({ action: "getNameAndTotalChapter"}, (message) => {
    changeDisplay(LOADER,NONE);
    if (message.error) {
        document.getElementById("message").innerText = message.error;
    } else if(!message.Approve){
        document.getElementById("message").innerText = message.isDownload? "Ứng dụng đang tải một trang sách khác vui lòng đợi trong giây lát": "Chúng tôi hiện tại không hổ trợ trang web này"
        SwitchSupportDiv(false);
    } 
    else if(message.Approve)
    {
        SwitchSupportDiv();
        CURRENT_NOVEL = message;
        console.log(message);
        LOGO_WEBSERVICE_IMG.src = message.logo;
        if(message.title){
            NOVEL_TITLE.innerText = message.title;
            TOTAL_CHAPTERS.innerText = message.totalChapter;
            AUTHOR.innerText = message.author;
            if (message.availableChapter== message.totalChapter+1){
                AVAILABLE_CHAPTERS.style.color = 'red'
                AVAILABLE_CHAPTERS.innerText = '? Đăng nhập';
            }else{
                AVAILABLE_CHAPTERS.innerText =  message.availableChapter;
            }
            changeDisplay(NOVEL_INFO_FRAME);
        }else{
            document.getElementById("form").innerText= CHOOSE_A_NOVEL;
            changeDisplay(NOVEL_INFO_FRAME,NONE);
        }
    }
});}


//First clicking on extention icon
fetchToGetNovelInfo();

function SwitchSupportDiv(condition = true){
    changeDisplay(SUPPORTED_FRAME);
    changeDisplay(NOT_SUPPORTED_FRAME,NONE);
    if(!condition){
        changeDisplay(NOT_SUPPORTED_FRAME);
        changeDisplay(SUPPORTED_FRAME,NONE);
    }
}

function changeDisplay(frame,state="block"){
    frame.style.display = state;
}


Donate.addEventListener('click',() =>{
})

Download.addEventListener('click', async () =>{
        const downloadButton = Download;
        downloadButton.disabled = true; 
        fetchToGetNovelInfo();
        try {
            chrome.runtime.sendMessage({ action: "download", novel: CURRENT_NOVEL }, (response) => {
                if (response && response.status === "success") {
                    console.log("Download started successfully!");
                } else {
                    console.error("Error:", response.error);
                    alert("Có lỗi xảy ra khi tải xuống!");
                }
                downloadButton.disabled = false;
                document.body.removeChild(loadingMessage);
            });
        } catch (error) {
            console.error("Error during download:", error);
            alert("Có lỗi xảy ra khi tải xuống!");
            downloadButton.disabled = false;
            document.body.removeChild(loadingMessage);
        }
});
