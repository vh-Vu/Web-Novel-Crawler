function createMetaData(novel,manifestItems,spineItems){
    let date = () => {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }
    return (`<?xml version="1.0" encoding="UTF-8"?>
        <package xmlns="http://www.idpf.org/2007/opf"
                 xmlns:dc="http://purl.org/dc/elements/1.1/"
                 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                 xsi:schemaLocation="http://www.idpf.org/2007/opf http://www.idpf.org/2007/opf/schema/opf2.xsd"
                 version="2.0">
            <metadata>
                <dc:title lang="vi">${novel.title}</dc:title><dc:creator>${novel.author}</dc:creator><dc:language>vi</dc:language><dc:description><![CDATA[<div><p>Dịch giả: ${novel.contributor}</p><p>Phát hành: ${novel.publisher}</p><p>Ứng dụng tạo ebook: <a href="https://github.com/vh-Vu/Web-Novel-Crawler"><strong style="color: #6cb4ee">Web Novel Crawler</strong></a></p><p>Tổng số chương: ${novel.totalChapter}</p><div>${novel.description}</div>
</div>]]></dc:description><dc:publisher>${novel.publisher}</dc:publisher><dc:contributor>${novel.contributor}</dc:contributor><dc:date>${date()}</dc:date><dc:subject>${novel.subject}</dc:subject><meta name="cover" content="cover"/></metadata>
            <manifest>
                <item href="CoverPage.xhtml" id="Coverpage" media-type="application/xhtml+xml"/>
                <item href="toc.ncx" id="ncx" media-type="application/x-dtbncx+xml"/>
                <item href="cover.jpg" id="cover" media-type="image/jpeg"/>
                <item id="id3" href="cover.jpg" media-type="image/jpeg"/>
                ${manifestItems.join('')}
            </manifest>
            <spine toc="ncx">
                <itemref idref="Coverpage" />
                ${spineItems.join('')}
            </spine>
            <guide>
                <reference href="CoverPage.xhtml" type="cover"/>
            </guide>
        </package>`)
}