class Novel{
    constructor(logo,title, author, totalChapter, chaptersToBuy,cover) {
        this.logo = logo;
        this.name = title;
        this.author = author;
        this.totalChapter = totalChapter;
        this.availableChapter = this.totalChapter - chaptersToBuy;
        this.cover = cover;
        //this.fiveNewestChapter = fiveNewestChapter;
        this.Approve = true;
    }
}

//export default Novel;
