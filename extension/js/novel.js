class Novel{
    constructor(response, fiveNewestChapter,chaptersToBuy) {
        this.id = response.id;
        this.name = response.name;
        this.totalChapter = response.chapters_count;
        this.availableChapter = this.totalChapter - chaptersToBuy;
        this.fiveNewestChapter = fiveNewestChapter;
        this.Approve = true;
    }
}