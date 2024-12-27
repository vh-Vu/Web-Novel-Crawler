var tableOfContents = (title,author,tocOrder) =>{ return ( `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE ncx PUBLIC "-//NISO//DTD ncx 2005-1//EN" "http://www.niso.org/dtds/2005/ncx-2005-1.dtd">
    <!-- The Table of Contents (TOC) file for the EPUB book -->
    <ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
        <head>
            <meta name="dtb:uid" content="12345"/>
            <meta name="dtb:depth" content="1"/>
            <meta name="dtb:totalPageCount" content="0"/>
            <meta name="dtb:maxPageNumber" content="0"/>
        </head>
        <docTitle>
            <text>${title}</text>
        </docTitle>
        <docAuthor>
            <text>${author}</text>
        </docAuthor>
        <navMap>
            ${tocOrder.join('')}
        </navMap>
    </ncx>`)}