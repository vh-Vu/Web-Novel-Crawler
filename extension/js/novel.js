class Novel{
    constructor(response, fiveNewestChapter) {
        this.id = response.id;
        this.name = response.name;
        //this.availableChapter 
        this.totalChapter = response.chapters_count;
        this.fiveNewestChapter = fiveNewestChapter;
        this.Approve = true;
    }
}