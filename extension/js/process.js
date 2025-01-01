chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "updateProgress") {
        const statusElement = document.getElementById("status");
        const progressBarElement = document.getElementById("progress-bar");

        statusElement.textContent = message.message;
        if (message.progress !== undefined) {
            progressBarElement.style.width = message.progress + "%";
        }
    }
});



chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "parser") {
        const parser = new DOMParser();
        let a = message.content.replace(/\\n/g, '');
        let b = a.replace(/\\/g, '');
        const content = parser.parseFromString(b,"text/html");
        let index = message.firstWordSelectorIndex;
        let totalWord = message.matches.length;
        const response = [];
        const matches = message.matches;
        console.log(matches)

        while(message.firstWordSelectorIndex-->0){
            const paragraphWord = [];
            paragraphWord.push(convertToUnicode(content.querySelector(matches[index++].value).innerText));
            // console.log(matches[index]);

            // console.log(matches[index].order);
            while(index<totalWord && parseInt( matches[index].order)>0){
                paragraphWord.push(convertToUnicode(content.querySelector(matches[index++].value).innerText));
            }
            response.push(paragraphWord.join(''));
       }
       console.log(index);
        console.log(response.join('\n'));
        sendResponse({ status: "success" });
    }
});

function convertToUnicode(str) {
    return str.replace(/u[\dA-F]{4}/gi, match => BNSUnicode[match] || match);

}

const BNSUnicode = {
    "u00b7": "·",
    "u201c": "\"",
    "u00c0": "À",
    "u00c1": "Á",
    "u00c2": "Â",
    "u00c3": "Ã",
    "u00c8": "È",
    "u00c9": "É",
    "u00ca": "Ê",
    "u00cc": "Ì",
    "u00cd": "Í",
    "u00d2": "Ò",
    "u00d3": "Ó",
    "u00d4": "Ô",
    "u00d5": "Õ",
    "u00d9": "Ù",
    "u00da": "Ú",
    "u00dd": "Ý",
    "u00e0": "à",
    "u00e1": "á",
    "u00e2": "â",
    "u00e3": "ã",
    "u00e8": "è",
    "u00e9": "é",
    "u00ea": "ê",
    "u00ec": "ì",
    "u00ed": "í",
    "u00f2": "ò",
    "u00f3": "ó",
    "u00f4": "ô",
    "u00f5": "õ",
    "u00f9": "ù",
    "u00fa": "ú",
    "u00fd": "ý",
    "u0102": "Ă",
    "u0103": "ă",
    "u0110": "Đ",
    "u0111": "đ",
    "u0128": "Ĩ",
    "u0129": "ĩ",
    "u0168": "Ũ",
    "u0169": "ũ",
    "u01a0": "Ơ",
    "u01a1": "ơ",
    "u01af": "Ư",
    "u01b0": "ư",
    "u1ea0": "Ạ",
    "u1ea1": "ạ",
    "u1ea2": "Ả",
    "u1ea3": "ả",
    "u1ea4": "Ấ",
    "u1ea5": "ấ",
    "u1ea6": "Ầ",
    "u1ea7": "ầ",
    "u1ea8": "Ẩ",
    "u1ea9": "ẩ",
    "u1eaa": "Ẫ",
    "u1eab": "ẫ",
    "u1eac": "Ậ",
    "u1ead": "ậ",
    "u1eae": "Ắ",
    "u1eaf": "ắ",
    "u1eb0": "Ằ",
    "u1eb1": "ằ",
    "u1eb2": "Ẳ",
    "u1eb3": "ẳ",
    "u1eb4": "Ẵ",
    "u1eb5": "ẵ",
    "u1eb6": "Ặ",
    "u1eb7": "ặ",
    "u1eb8": "Ẹ",
    "u1eb9": "ẹ",
    "u1eba": "Ẻ",
    "u1ebb": "ẻ",
    "u1ebc": "Ẽ",
    "u1ebd": "ẽ",
    "u1ebe": "Ế",
    "u1ebf": "ế",
    "u1ec0": "Ề",
    "u1ec1": "ề",
    "u1ec2": "Ể",
    "u1ec3": "ể",
    "u1ec4": "Ễ",
    "u1ec5": "ễ",
    "u1ec6": "Ệ",
    "u1ec7": "ệ",
    "u1ec8": "Ỉ",
    "u1ec9": "ỉ",
    "u1eca": "Ị",
    "u1ecb": "ị",
    "u1ecc": "Ọ",
    "u1ecd": "ọ",
    "u1ece": "Ỏ",
    "u1ecf": "ỏ",
    "u1ed0": "Ố",
    "u1ed1": "ố",
    "u1ed2": "Ồ",
    "u1ed3": "ồ",
    "u1ed4": "Ổ",
    "u1ed5": "ổ",
    "u1ed6": "Ỗ",
    "u1ed7": "ỗ",
    "u1ed8": "Ộ",
    "u1ed9": "ộ",
    "u1eda": "Ớ",
    "u1edb": "ớ",
    "u1edc": "Ờ",
    "u1edd": "ờ",
    "u1ede": "Ở",
    "u1edf": "ở",
    "u1ee0": "Ỡ",
    "u1ee1": "ỡ",
    "u1ee2": "Ợ",
    "u1ee3": "ợ",
    "u1ee4": "Ụ",
    "u1ee5": "ụ",
    "u1ee6": "Ủ",
    "u1ee7": "ủ",
    "u1ee8": "Ứ",
    "u1ee9": "ứ",
    "u1eea": "Ừ",
    "u1eeb": "ừ",
    "u1eec": "Ử",
    "u1eed": "ử",
    "u1eee": "Ữ",
    "u1eef": "ữ",
    "u1ef0": "Ự",
    "u1ef1": "ự",
    "u1ef2": "Ỳ",
    "u1ef3": "ỳ",
    "u1ef4": "Ỵ",
    "u1ef5": "ỵ",
    "u1ef6": "Ỷ",
    "u1ef7": "ỷ",
    "u1ef8": "Ỹ",
    "u1ef9": "ỹ"
}