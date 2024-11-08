class Novel{
    constructor(logo,title, author, totalChapter , fiveNewestChapter,chaptersToBuy) {
        this.logo = logo;
        this.name = title;
        this.author = author;
        this.totalChapter = totalChapter;
        this.availableChapter = this.totalChapter - chaptersToBuy;
        this.fiveNewestChapter = fiveNewestChapter;
        this.Approve = true;
    }
}