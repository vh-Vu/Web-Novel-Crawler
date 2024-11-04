// const WEBSITE_IDENTIFY = {
//     BACH_NGOC_SACH_VIP : 1
// }

// const SUPPORTED_WEBSITE = {
//     "bachngocsach.net.vn" : WEBSITE_IDENTIFY.BACH_NGOC_SACH_VIP,
//     "bachngocsach.app": WEBSITE_IDENTIFY.BACH_NGOC_SACH_VIP}

// let lastUrl = location.href;

// // obsever duty is watching DOM content changing, this one for only BachNgocSach
// const observer = new MutationObserver(mutations => {
//     mutations.forEach(mutation => {
//         if (lastUrl!= location.href) { //When DOM content had changed, will checking url changing.
//             lastUrl = location.href;
//             sendToWorker();
//         }
//     });
// });
    
// const host = this.location.host;

// function weAreChecking(){
//     switch(SUPPORTED_WEBSITE[host]){
//     case 1:
//         observer.observe(document.body, { childList: true, subtree: true }); // Starting obsever service
//         sendToWorker();
//         break;
//     default:
//         sendToWorker();
//         console.log("Not Supported");
//     }
// }

// function refeshGetContent(event){
//     weAreChecking();
// }
// refeshGetContent();
// //This event for Back and Forward for future
// //window.addEventListener("popstate", refeshGetContent)

// //Send host and pathname to background
// function sendToWorker(){
//     console.log(host);
//     chrome.runtime.sendMessage({ action: "user-action", host: host, content: location.pathname});
// }
