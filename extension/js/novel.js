
class Novel{
    constructor(logo,title, author, totalChapter, chaptersToBuy,cover) {
        this.logo = logo;
        this.title = title;
        this.author = author;
        this.totalChapter = totalChapter;
        this.availableChapter = this.totalChapter - chaptersToBuy;
        this.cover = cover;
        this.publisher = "daoquan.vn";
        this.contributor = "dummy";
        this.subject = ["Hài","Không hài","Mưa"].join(',');
        this.Approve = true;
    }
}
