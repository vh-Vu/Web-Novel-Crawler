const SUPPORTED_WEBSITE = ["https://bachngocsach.net.vn/"];
//let test;
document.addEventListener('DOMContentLoaded', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        let currentTab = tabs[0];
        let currentUrl = currentTab.url;
        let message = document.getElementById("message"); 
        //Showing message when match with supported website 
        for (let website of SUPPORTED_WEBSITE){
            if(currentUrl.includes(website)){
                message.innerHTML = currentUrl;
                // test = currentUrl;
                // console.log(currentTab)
                // console.log(currentTab.title)
                //getNovelTitle(currentTab.title);
                //localStorage.setItem("novel","hello storge")
                break;
            }
        }
    });
});

function getNovelTitle(tabId) {
    document.getElementById("title").innerText = tabId;

}