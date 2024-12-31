importScripts('../lib/jszip.min.js');


const chapterTemplate=(no,title,content)=>`<?xml version='1.0' encoding='utf-8'?><html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" lang="vi" xml:lang="vi"><head></head><body><h1>Chương ${no}: ${title}</h1>${content}</body></html>`
function createMetaData(title,author,publisher,contributor,totalChapter,subject,description,manifestItems,spineItems){let date = () => {const today = new Date();const year = today.getFullYear();const month = String(today.getMonth() + 1).padStart(2, '0');const day = String(today.getDate()).padStart(2, '0');return `${year}-${month}-${day}`;}
return (`<?xml version="1.0" encoding="UTF-8"?><package xmlns="http://www.idpf.org/2007/opf" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.idpf.org/2007/opf http://www.idpf.org/2007/opf/schema/opf2.xsd" version="2.0"><metadata><dc:title lang="vi">${title}</dc:title><dc:creator>${author}</dc:creator><dc:language>vi</dc:language><dc:description><![CDATA[<div><p>Dịch giả: ${contributor}</p><p>Phát hành: ${publisher}</p><p>Ứng dụng tạo ebook: <a href="https://github.com/vh-Vu/Web-Novel-Crawler"><strong style="color: #6cb4ee">Web Novel Crawler</strong></a></p><p>Tổng số chương: ${totalChapter}</p><div>${description}</div></div>]]></dc:description><dc:publisher>${publisher}</dc:publisher><dc:contributor>${contributor}</dc:contributor><dc:date>${date()}</dc:date><dc:subject>${subject}</dc:subject><meta name="cover" content="cover"/></metadata><manifest><item href="CoverPage.xhtml" id="Coverpage" media-type="application/xhtml+xml"/><item href="toc.ncx" id="ncx" media-type="application/x-dtbncx+xml"/><item href="cover.jpg" id="cover" media-type="image/jpeg"/><item id="id3" href="cover.jpg" media-type="image/jpeg"/>${manifestItems.join('')}</manifest><spine toc="ncx"><itemref idref="Coverpage" />${spineItems.join('')}</spine><guide><reference href="CoverPage.xhtml" type="cover"/></guide></package>`)}
const tableOfContents=(title,author,tocOrder)=>`<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE ncx PUBLIC "-//NISO//DTD ncx 2005-1//EN" "http://www.niso.org/dtds/2005/ncx-2005-1.dtd"><ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1"><head><meta name="dtb:uid" content="12345"/><meta name="dtb:depth" content="1"/><meta name="dtb:totalPageCount" content="0"/><meta name="dtb:maxPageNumber" content="0"/></head><docTitle><text>${title}</text></docTitle><docAuthor><text>${author}</text></docAuthor><navMap>${tocOrder.join("")}</navMap></ncx>`;
const CoverPage = `<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /><meta name="calibre:cover" content="true" /><title>Cover</title><style type="text/css" title="override_css">@page {padding: 0pt; margin:0pt}body { text-align: center; padding:0pt; margin: 0pt; }</style></head><body><div><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="100%" viewBox="0 0 600 800" preserveAspectRatio="none"><image width="100%" height="100%" xlink:href="cover.jpg"/></svg></div></body></html>`
const container =`<container xmlns="urn:oasis:names:tc:opendocument:xmlns:container" version="1.0"><rootfiles><rootfile full-path="metadata.opf" media-type="application/oebps-package+xml"/></rootfiles></container>`

class Ebook{
    constructor(title,cover,author,publisher,contributor,subject,description){
        this.title = title;
        this.cover = cover;
        this.author = author;
        this.publisher = publisher;
        this.contributor = contributor;
        this.subject = subject;
        this.description = description;
        this.chapters =[];
        this.ChaptersNuberic = [];
        this.chapterContents=[];
        this.filePaths = [];
        this.manifestItems = [];
        this.spineItems = [];
        this.totalChapters = 0;
    }
    addChapter(no,title,contents){
        this.ChaptersNuberic.push(no);
        this.chapters.push(title);
        this.chapterContents.push(contents);
        this.totalChapters++;
    }
    async genBook(){
        const zip = new JSZip();
        zip.file("cover.jpg", await fetch(this.cover).then(res => res.blob()));
        zip.file("META-INF/container.xml", container);
        zip.file("CoverPage.xhtml", CoverPage);
        zip.file("mimetype", "application/epub+zip");
        for(let i = 0; i<this.totalChapters;i++){
            const {filePath, contents} = this.makeChapter(i);
            zip.file(filePath,contents);
        }
        zip.file("metadata.opf",this.makeMetaData());
        zip.file("toc.ncx", this.makeTableOfContents());
        const zipContent = await zip.generateAsync({ type: "base64" });
        return `data:application/epub+zip;base64,${zipContent}`;
    }
    makeChapter(index){
        const ChapterID = this.ChaptersNuberic[index].toString().padStart(4, '0');
        const filePath =`OEBPS/contents/chapter${ChapterID}.xhtml`;
        this.manifestItems.push(`<item id="${ChapterID}" href="${filePath}" media-type="application/xhtml+xml" />`);
        this.spineItems.push(`<itemref idref="${ChapterID}" />`);
        this.filePaths.push(filePath);
        return {filePath:filePath, contents: chapterTemplate(this.ChaptersNuberic[index],this.chapters[index], this.chapterContents[index])};
    }

    makeMetaData(){
        return createMetaData(this.title,this.author,this.publisher,this.contributor,this.totalChapters,this.subject,this.description,this.manifestItems,this.spineItems);
    }
    makeTableOfContents(){
        const ToC = [];
        for(let i = 0; i<this.totalChapters;i++){
            ToC.push(`<navPoint id="navPoint-${i+1}" playOrder="${i+1}"><navLabel><text>${this.ChaptersNuberic[i]}. ${this.chapters[i]}</text></navLabel><content src="${this.filePaths[i]}"/></navPoint>`);
        }
        return tableOfContents(this.title,this.author,ToC);
    }
}

