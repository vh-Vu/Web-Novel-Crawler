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
function formatDescription(description) {
    let paragraphs = description.split('\n');
    let formattedDescription = paragraphs.map(paragraph => {
        return `<p>${paragraph.replace(/\n/g, ' ')}</p>`;
    }).join('');
    return formattedDescription;
}

function UpdateProgress(number,title,current,total){
    chrome.runtime.sendMessage({
        action: "updateProgress",
        message: `Đang tải Chương ${number}: ${title}`,
        progress: (parseInt(current) / total) * 100
    });
}