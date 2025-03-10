const SECRET_KEY_BNS = "bns16char_long_k"

function removeVietnameseTones_and_SpecialCharacter(str) {
    const map = {
        'a': /[àáạảãâầấậẩẫăằắặẳẵ]/g,
        'e': /[èéẹẻẽêềếệểễ]/g,
        'i': /[ìíịỉĩ]/g,
        'o': /[òóọỏõôồốộổỗơờớợởỡ]/g,
        'u': /[ùúụủũưừứựửữ]/g,
        'y': /[ỳýỵỷỹ]/g,
        'd': /[đ]/g,
        'A': /[ÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴ]/g,
        'E': /[ÈÉẸẺẼÊỀẾỆỂỄ]/g,
        'I': /[ÌÍỊỈĨ]/g,
        'O': /[ÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠ]/g,
        'U': /[ÙÚỤỦŨƯỪỨỰỬỮ]/g,
        'Y': /[ỲÝỴỶỸ]/g,
        'D': /[Đ]/g
    };

    for (let letter in map) {
        str = str.replace(map[letter], letter);
    }
    str = str.replace(/[^a-zA-Z0-9\s]/g, '');
    return str;
}



//Transform /n to p tag <p></p>
function formatParagraph(description) {
    let paragraphs = description.split('\n');
    let formatParagraph = paragraphs.map(paragraph => {
        return `<p>${paragraph.replace(/\n/g, ' ')}</p>`;
    }).join('');
    return formatParagraph;
}

function UpdateProgress(number,title,current,total){
    chrome.runtime.sendMessage({
        action: "updateProgress",
        message: `Đang tải Chương ${number}: ${title}`,
        progress: (current / total) * 100
    });
}

function decryptAES(base64Input, keyInput) {
    const encryptedData = CryptoJS.enc.Base64.parse(base64Input);
    const key = CryptoJS.enc.Utf8.parse(keyInput);
        const decrypted = CryptoJS.AES.decrypt(
        { ciphertext: encryptedData },
        key,
        { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 }
    );
    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
    return decryptedText;
}
