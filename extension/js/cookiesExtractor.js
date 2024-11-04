
// chrome.cookies.getAll({ domain: "bachngocsach.net.vn" }, (cookies) => {
//     console.log("Cookies for bachngocsach.net.vn:", cookies);
// });

function getCookies(host) {
    return new Promise((resolve, reject) => {
        chrome.cookies.getAll({ domain: host }, (cookies) => {
            if (chrome.runtime.lastError) {
                reject(new Error(chrome.runtime.lastError));
            } else {
                console.log("Cookies for bachngocsach.net.vn:", cookies);
                resolve(cookies);
            }
        });
    });
}