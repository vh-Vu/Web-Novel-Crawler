
class Novel{
    constructor(id,title, author, totalChapter, chaptersToBuy,cover,description,contributor,publisher,subject) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.totalChapter = totalChapter;
        this.availableChapter = this.totalChapter - chaptersToBuy;
        this.cover = cover;
        this.publisher = publisher;
        this.contributor = contributor;
        this.subject = subject;
        this.description = description;
    }
}
