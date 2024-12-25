class Chapter{
    constructor(title,paragraph){
        this.title = title;
        this.content = paragraph;
    }
    getChapter() {
        return` 
            ${this.title} \n
            ${this.content[0]}\n
            ${this.content[1]}\n
            ${this.content[2]}\n
        `
        
    }
}

export default Chapter;
