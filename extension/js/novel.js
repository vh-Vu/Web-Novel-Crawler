class Novel{
    constructor(response, fiveNewestChapter) {
        this.id = response.id;
        this.name = response.name;
        this.totalChapter = response.chapters_count;
        this.fiveNewestChapter = fiveNewestChapter;
        this.Approve = true;
    }
}