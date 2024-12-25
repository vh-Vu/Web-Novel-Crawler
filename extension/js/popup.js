import Chapter from './chapter.js';
//import Novel from './novel.js';

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
        SwitchSupportDiv(false);
    } 
    else if(message.Approve)
    {
        SwitchSupportDiv();
        CURRENT_NOVEL = message;
        console.log(message);
        LOGO_WEBSERVICE_IMG.src = message.logo;
        if(message.name){
            NOVEL_TITLE.innerText = message.name;
            TOTAL_CHAPTERS.innerText = message.totalChapter;
            AUTHOR.innerText = message.author;
            if (message.availableChapter== message.totalChapter+1){
                AVAILABLE_CHAPTERS.style.color = 'red'
                AVAILABLE_CHAPTERS.innerText = '? Đăng nhập';
            }else{
                AVAILABLE_CHAPTERS.innerText =  message.availableChapter;
            }
            changeDisplay(NOVEL_INFO_FRAME);
            //Show5Newsest(message.fiveNewestChapter);
        }else{
            document.getElementById("form").innerText= CHOOSE_A_NOVEL;
            changeDisplay(NOVEL_INFO_FRAME,NONE);
        }
    }
});}


//First clicking on extention icon
fetchToGetNovelInfo();

//Get a message on event DOM change or navigate site => refesh extention view
// chrome.runtime.onMessage.addListener((message) => {
//     if (message.action === "reload") {
//         fetchToGetNovelInfo();
//     }
// });


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


Donate.addEventListener('click',() =>{
})

Download.addEventListener('click', async () =>{
    // const content = new Chapter("CHƯƠNG 1 ĐẠO THỐNG TRUYỀN THỪA HỆ THỐNG.",["Tại huyện Dự Châu, có một sơn thôn hẻo lánh tên là \"Diệp gia thôn\". Dựa theo tập tục của thôn này, ban đêm, mỗi nhà đều phải ở trước cửa đốt hai xấp tiền giấy, một xấp đồ cúng, một... xấp khác là cho cô hồn dã quỷ qua đường. Tiền giấy là dành cho người nhà để họ thuận lợi ra đi, không gặp khó khăn gì trên đường xuống dưới.",
    //                         "Đốt xong tiền giấy, mỗi nhà đều đóng chặt cửa, cài chặt then sớm nghỉ ngơi, những người tin phật tín đạo thì còn cầu khẩn trong nhà, cầu cho đêm nay vượt qua bình an.",
    //                         "Đêm khuya, mưa dông nổi lên, đập vào lá cây rào rào xào xạc giống như tiếng cô hồn dã quỷ bộ hành, tiếng gió thổi nức nở như than như khóc, làm cho bầu không khí nơi đây vốn bất thường lại càng quỷ dị hơn."]);
    const zip = new JSZip();
    const image = await fetch(CURRENT_NOVEL.cover).then(res => res.blob());
    zip.file("img/Cover.jpg",image);
    zip.file("metadata.opf", `t`);
    zip.file("mimetype", "application/epub+zip");

    const blob = await zip.generateAsync({ type: "blob" });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'files.epub';
    link.click();
    URL.revokeObjectURL(link.href);
});
