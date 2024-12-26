import Chapter from './chapter.js';
//import Novel from './novel.js';

const NONE = "none";
const CHOOSE_A_NOVEL = "Mời bạn chọn truyện";
const NOT_LOGIN = "Bạn chưa đăng nhập";

const NOVEL_TITLE =  document.getElementById("novel-title");
const TOTAL_CHAPTERS = document.getElementById("total-chapter");
const AUTHOR = document.getElementById("author");
const AVAILABLE_CHAPTERS = document.getElementById("available-chapter");
const SUPPORTED_FRAME = document.getElementById("supported");
const NOT_SUPPORTED_FRAME = document.getElementById("not-supported");
const NOVEL_INFO_FRAME = document.getElementById("novel-info");
const LOGO_WEBSERVICE_IMG = document.getElementById("banner");
const LOADER = document.getElementById("waiting");
const Donate = document.getElementById("donate");
const Download = document.getElementById("download");
let CURRENT_NOVEL;


function fetchToGetNovelInfo(){
    chrome.runtime.sendMessage({ action: "getNameAndTotalChapter"}, (message) => {
    changeDisplay(LOADER,NONE);
    if (message.error) {
        document.getElementById("message").innerText = message.error;
    } else if(!message.Approve){
        SwitchSupportDiv(false);
    } 
    else if(message.Approve)
    {
        SwitchSupportDiv();
        CURRENT_NOVEL = message;
        console.log(message);
        LOGO_WEBSERVICE_IMG.src = message.logo;
        if(message.name){
            NOVEL_TITLE.innerText = message.name;
            TOTAL_CHAPTERS.innerText = message.totalChapter;
            AUTHOR.innerText = message.author;
            if (message.availableChapter== message.totalChapter+1){
                AVAILABLE_CHAPTERS.style.color = 'red'
                AVAILABLE_CHAPTERS.innerText = '? Đăng nhập';
            }else{
                AVAILABLE_CHAPTERS.innerText =  message.availableChapter;
            }
            changeDisplay(NOVEL_INFO_FRAME);
            //Show5Newsest(message.fiveNewestChapter);
        }else{
            document.getElementById("form").innerText= CHOOSE_A_NOVEL;
            changeDisplay(NOVEL_INFO_FRAME,NONE);
        }
    }
});}


//First clicking on extention icon
fetchToGetNovelInfo();

//Get a message on event DOM change or navigate site => refesh extention view
// chrome.runtime.onMessage.addListener((message) => {
//     if (message.action === "reload") {
//         fetchToGetNovelInfo();
//     }
// });


function SwitchSupportDiv(condition = true){
    changeDisplay(SUPPORTED_FRAME);
    changeDisplay(NOT_SUPPORTED_FRAME,NONE);
    if(!condition){
        changeDisplay(NOT_SUPPORTED_FRAME);
        changeDisplay(SUPPORTED_FRAME,NONE);
    }
}

function Show5Newsest(arr){
    const container = document.getElementById("form");
    const five = 5;
    container.innerHTML = "";
    for (let i = 0; i < five; i++) 
    {
        let element = arr[i];
        const div = document.createElement('div');
        div.textContent = element;
        div.classList.add("element");
        container.appendChild(div);
    }
}


function changeDisplay(frame,state="block"){
    frame.style.display = state;
}


Donate.addEventListener('click',() =>{
})

Download.addEventListener('click', async () =>{
    const zip = new JSZip();
    const image = await fetch(CURRENT_NOVEL.cover).then(res => res.blob());
    zip.file("cover.jpg",image);
    zip.file("META-INF/container.xml",container)
    zip.file("metadata.opf", createMetaData(CURRENT_NOVEL));
    zip.file("toc.ncx",TOC);
    zip.file("chapter1.xhtml",chapter1);
    zip.file("mimetype", "application/epub+zip");
    zip.file("CoverPage.xhtml",CoverPage);
    const blob = await zip.generateAsync({ type: "blob" });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${CURRENT_NOVEL.name} - ${CURRENT_NOVEL.author} (Web Novel Crawler).epub`;
    link.click();
    URL.revokeObjectURL(link.href);
    //console.log(CURRENT_NOVEL);
});



function createMetaData(novel){
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
                <dc:title lang="vi">${novel.name}</dc:title>
                <dc:creator>${novel.author}</dc:creator>
                <dc:language>vi</dc:language>
                <dc:description>
                    <![CDATA[
                        <div>
                            <p>Dịch giả: ${novel.contributor}</p>
                            <p>Phát hành: ${novel.publisher}</p>
                            <p>Ứng dụng tạo ebook: <a href="https://github.com/vh-Vu/Web-Novel-Crawler"><strong style="color: #6cb4ee">Web Novel Crawler</strong></a></p>
                            <p>Tổng số chương: ${novel.totalChapter}</p>
                        </div>
                    ]]>
                </dc:description>
                <dc:publisher>${novel.publisher}</dc:publisher>
                <dc:contributor>${novel.contributor}</dc:contributor>
                <dc:date>${date()}</dc:date>
                <dc:subject>${novel.subject}</dc:subject>
                <meta name="cover" content="cover"/>
            </metadata>
        
            <manifest>
                <item href="CoverPage.xhtml" id="Coverpage" media-type="application/xhtml+xml"/>
                <item id="content" href="chapter1.xhtml" media-type="application/xhtml+xml" />
                <item href="toc.ncx" id="ncx" media-type="application/x-dtbncx+xml"/>
                <item href="cover.jpg" id="cover" media-type="image/jpeg"/>
                <item id="id3" href="cover.jpg" media-type="image/jpeg"/>
            </manifest>
        
            <spine toc="ncx">
                <itemref idref="Coverpage" />
                <itemref idref="content" />
        
            </spine>
        
            <guide>
                <reference href="CoverPage.xhtml" type="cover"/>
            </guide>
        </package>`)
}

var container =`<container xmlns="urn:oasis:names:tc:opendocument:xmlns:container" version="1.0">
<rootfiles>
<rootfile full-path="metadata.opf" media-type="application/oebps-package+xml"/>
</rootfiles>
</container>`

var CoverPage = `<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="calibre:cover" content="true" />
        <title>Cover</title>
        <style type="text/css" title="override_css">
            @page {padding: 0pt; margin:0pt}
            body { text-align: center; padding:0pt; margin: 0pt; }
        </style>
    </head>
    <body>
        <div>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="100%" height="100%" viewBox="0 0 600 800"
                preserveAspectRatio="none">
                <image width="100%" height="100%" xlink:href="cover.jpg"/>
            </svg>
        </div>
    </body>
</html>

`

var TOC = `<?xml version="1.0" encoding="UTF-8"?>
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
        <text>Ám Dạ Hành</text>
    </docTitle>
    <docAuthor>
        <text>John Dcccoe</text>
    </docAuthor>

    <navMap>
        <!-- Chapter 1 -->
        <navPoint id="navPoint-1" playOrder="1">
            <navLabel>
                <text>Chapter 1</text>
            </navLabel>
            <content src="chapter1.xhtml"/>
        </navPoint>
    </navMap>
</ncx>
`

var chapter1 = `<?xml version='1.0' encoding='utf-8'?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" lang="vi" xml:lang="vi">

<head>
<title>Ám Dạ Hành</title>
</head>

<body>


<h2>2</h2>

<p>10 giờ 30 phút tối, suất phim chiếu đêm cuối cùng cũng kết thúc, Văn Lệ đứng dậy bước ra khỏi rạp.</p>

<p>Bộ phim Văn Lệ xem là phim tình cảm Hồng Kông mới ra rạp, khi ngồi vào ghế cô thấy trong rạp vắng tanh, hình như không có nhiều người xem cho lắm, nhưng đến khi hết phim, mọi người tập trung trước lối ra, cô mới phát hiện ban đêm có rất nhiều người buồn chán, ra ngoài xem phim.</p>

<p>Cô đi theo dòng người ra bên ngoài, Kim Nhất Điền cũng theo sát phía sau, sợ lạc nhau.</p>

<p>Khó khăn lắm hai người mới chen được ra khỏi lối đi chật hẹp, trên con phố rộng lớn, cơn gió mát lạnh quét qua mọi nơi, Văn Lệ buông một tiếng thở dài, “Cậu thế này đâu phải mời tôi xem phim chứ, rõ ràng là đang lãng phí thời gian nghỉ ngơi của tôi mà.”</p>

<p>Kim Nhất Điền mỉm cười nói, “Chị à, chị thật sự tụt hậu quá đấy, thanh niên trẻ thời nay hẹn hò yêu đương gì đó đều chuộng đến rạp chiếu phim kia kìa.”</p>

<p>Văn Lệ bật cười.</p>

<p>“Chị cậu năm nay đã 27 tuổi, không còn là thanh niên trẻ rất nhiều năm rồi.”</p>

<p>Kim Nhất Điền cười hì hì nói, “Dù chị có sống đến trăm tuổi, trong mắt em chị vẫn là một thiếu nữ xinh đẹp.”</p>

<p>“Bớt dẻo miệng đi cho tôi nhờ.”</p>

<p>“Em nói toàn là lời thật lòng. Chị ở trong mắt em đấy à, mãi là vị sư tỷ em nhìn thấy đầu tiên ở sân trường đại học, trẻ trung xinh đẹp đầy năng lượng, dũng cảm hào phóng lại nóng tính…”</p>

<p>“Được rồi, cậu đừng có dát vàng lên mặt tôi nữa, đại tác gia tiểu thuyết trinh thám, thám tử tư nổi tiếng của thành phố Thanh Dương, mau nói đi, lần này đến tìm tôi, lại muốn thăm dò tin tức gì ở chỗ tôi đây?”</p>

<p>“Không phải.”</p>

<p>“Vậy nhất định là muốn nhờ tôi vào phòng lưu trữ của cảnh sát tìm giúp tài liệu gì đó chứ gì?”</p>

<p>“Cũng không phải.”</p>

<p>“Vậy thì vì chuyện gì?”</p>

<p>“Đúng là em có vài lời muốn nói với chị, song không liên quan đến những việc chị vừa nói.” Kim Nhất Điền trước giờ luôn thích cười đùa, lúc này bỗng trở nên có chút dè dặt, nhìn quanh tứ phía rồi nói, “Bên kia có một quán bar, chúng ta vào đó uống một ly, vừa uống vừa nói.”</p>

<p>Văn Lệ nói, “Cảnh sát không được tùy tiện đến những nơi ăn chơi, càng không được uống rượu, cậu viết truyện cảnh sát phá án từ sáng đến tối, chẳng lẽ lại không biết ‘Năm điều lệnh cấm’ và ‘Ba mục kỷ luật’ của Cảnh sát nhân dân sao?”</p>

<p>Kim Nhất Điền nói, “Mấy cái lệnh cấm đó, hình như đều là quy tắc ứng xử trong thời gian làm việc, không nói ngoài giờ làm việc không được đến những nơi ăn chơi, hơn nữa bây giờ chị đâu có mặc cảnh phục.”</p>

<p>Văn Lệ nghiêm mặt nói, “Theo tôi thấy, trong hay ngoài giờ làm việc cũng như nhau.”</p>

<p>Kim Nhất Điền nói không lại cô, chỉ tay về phía ven đường,</p>

<p>“Bên kia có một công viên, chúng ta qua đó ngồi một lúc, vậy được rồi chứ, Madam?”</p>

<p>Văn Lệ bật cười.</p>

<p>“Cái này thì được.”</p>

<p>Hai người băng qua đường, đi về phía công viên.</p>

<p>Công viên không lớn, ở giữa có một hồ nước, bên trong thả vài con cá vàng, cạnh đó là một luống hoa lớn, bên dưới những gốc cây long não đặt một số ghế đá dài.</p>

<p>Vài ngọn đèn đường đang chiếu ánh sáng màu vàng nhạt.</p>

<p>Bên trong công viên rất yên ắng, không thấy có người nào khác.</p>

<p>Văn Lệ kéo cổ áo khoác lên một chút, ngồi xuống ghế đá rồi nói, “Cậu vừa mời tôi xem phim, lại kéo tôi dạo công viên, thần thần bí bí, rốt cuộc có chuyện gì vậy hả?”</p>

<p>“Sư tỷ, thật ra em..</p>

<p>Kim Nhất Điền đứng trước mặt cô, sắc mặt đỏ bừng, ấp a ấp úng, đột nhiên quỳ một gối xuống trước mặt cô, lấy chiếc hộp nhỏ từ trong túi áo ra, sau khi mở ra, đưa hai tay đến trước mặt cô.</p>

<p>Không ngờ bên trong hộp là một chiếc nhẫn vàng sáng lấp lánh.</p>

<p>Văn Lệ giật mình, đứng bật dậy, “Cầu hôn hả? Cậu… cậu đang bày trò gì thế này?”</p>

<p>“Chị, mắt chị nhìn thế này là sao chứ? Đây là nhẫn tỏ tình, không phải nhẫn cầu hôn, được chưa? Em, em mong chị sẽ làm bạn gái của em!”</p>

<p>Văn Lệ “ồ” một tiếng, sau đó nói, “Thì ra là vậy, lúc nãy thật sự làm tôi giật nảy mình.”</p>

<p>Kim Nhất Điền nói, “Sư tỷ, thật ra, từ lần đầu tiên nhìn thấy chị trong sân trường đại học, em đã thích chị rồi. Sau khi tốt nghiệp, chúng ta lại gặp nhau tại thành phố này, em tin đây chắc chắn là duyên phận mà ông trời ban cho chúng ta. Sư tỷ, làm bạn gái của em, có được không?”</p>

<p>Anh giơ hai tay về phía trước, đưa chiếc nhẫn tỏ tình đến gần hơn một chút.</p>

<p>Văn Lệ và anh là bạn đại học. Cô học trên Kim Nhất Điền hai khóa.</p>

<p>Sau khi tốt nghiệp đại học, Văn Lệ trở về quê nhà là thành phố Thanh Dương, tham gia thi tuyển cảnh sát, trở thành một cảnh sát hình sự.</p>

<p>Hai năm sau, Kim Nhất Điền tốt nghiệp đại học, chạy đến vài nơi khác nhau, cuối cùng ứng tuyển vào làm nhà báo cho một tòa soạn của thành phố Thanh Dương. Trong lúc chạy tin tức chính trị - pháp luật, nhận ra nữ cảnh sát hình sự phá được không ít vụ án này chính là sư tỷ mình yêu thầm năm xưa. Sau này Kim Nhất Điền đăng tải một bộ tiểu thuyết trinh thám dài tập trên mạng được đánh giá cao, anh dứt khoát từ bỏ nhiệm sở, ở nhà làm nhà văn toàn thời gian, bây giờ anh đã là một tiểu thuyết gia trinh thám có chút tiếng tăm.</p>

<p>Càng giỏi hơn nữa là, năm ngoái anh chàng này một mình một ngựa đăng ký thành lập một công ty điều tra tin tức, nói trắng ra chính là văn phòng thám tử tư nhân. Thế là Kim Nhất Điền ngoài viết tiểu thuyết ra, còn kiêm thêm công việc thám tử tư.</p>

<p>Anh thường xuyên mời Văn Lệ ăn cơm, nghe cô kể lại những chuyện li kì thú vị trong quá trình điều tra, mục đích chính là thu thập tài liệu để viết tiểu thuyết. Thỉnh thoảng anh cũng nhờ Văn Lệ sao chép một số tài liệu cơ mật chỉ có cảnh sát mới được nắm giữ. Ngày qua tháng lại, dần dà trở nên thân thiết với vị sư tỷ đại học ngày xưa.</p>

<p>Tuy quan hệ của hai người khá tốt, nhưng thấy Kim Nhất Điền đột nhiên lấy nhẫn ra tỏ tình với mình một cách trịnh trọng như thế này, Văn Lệ vẫn có chút bất ngờ.</p>

<p>Tuy xưa nay Văn Lệ đều phản ứng nhanh nhạy, làm việc quyết đoán, đùng một cái gặp phải chuyện kiểu này, vẫn có chút bối rối, không kịp phản ứng ngay. Mặt cô ửng đỏ, nhìn chiếc nhẫn tỏ tình trước mặt mình, nhất thời không biết nên nhận hay không nên nhận.</p>

<p>“Đứng im, không được nhúc nhích!”</p>

<p>Ngay lúc này, một tiếng hét lớn vang lên, bốn thanh niên trẻ từ trong bóng tối nhảy ra, mỗi người cầm một thanh mã tấu bóng loáng, bao vây hai người ở giữa.</p>

<p>Kim Nhất Điền nghiêng đầu nhìn một cái rồi nói, “Người anh em, nể mặt chút đi, tôi đang tỏ tình với bạn gái mà, vui lòng đợi vài phút, sắp có kết quả rồi.”</p>

<p>“Mẹ kiếp!” Tên cướp cầm đầu đạp anh một cái thật mạnh, “Có người nói chuyện với cướp kiểu như mày hả? Mày tưởng bọn này đang giỡn chơi chắc?”</p>

<p>Kim Nhất Điền bị đạp ngã lăn ra đất, chiếc nhẫn trên tay cũng rơi xuống.</p>

<p>Mắt tên cướp lóe sáng, tham lam cười nói, “Chiếc nhẫn này hình như làm bằng vàng đấy, chắc đáng ít tiền.” Hắn giơ tay ra định nhặt chiếc nhẫn.</p>

<p>Kim Nhất Điền vội lao lên, siết chặt chiếc nhẫn trong tay.</p>

<p>Tên cướp quay đầu lại nhìn Văn Lệ, liếm liếm môi, trên mặt lộ ra nụ cười hạ lưu, “Chà, người anh em, bạn gái của mày trông khá nhỉ, anh nói cho mày biết, hôm nay anh không chỉ muốn cướp của, mà còn muốn cướp sắc. Mau đưa chiếc nhẫn cho tao, lấy hết đồ đáng tiền trên người ra, anh sẽ không làm khó mày, thả mày đi ngay.”</p>

<p>Kim Nhất Điền bật cười nói, “Các anh em đừng làm vậy. Tôi tên Kim Nhất Điền, là một thám tử tư, các anh em kiếm ăn ở khu này đều biết đến tên tôi, không tin anh ra ngoài đường nghe ngóng thử.”</p>

<p>“Nghe ngóng cái đầu mày, bớt nhận bà con với ông đây đi, tao mặc kệ mày là thám tử tư hay là thám tử công, móc tiền ra cho ông nhanh.”</p>

<p>Tên cướp giáng một cú đấm xuống mặt Kim Nhất Điền, anh lập tức chảy máu mũi, mắt kính cũng văng sang một bên.</p>

<p>Hắn ngồi xổm xuống giật lấy chiếc nhẫn trong tay anh. Kim Nhất Điền siết chặt nhẫn vào lòng bàn tay, chết cũng không chịu buông.</p>

<p>Sức của tên cướp mạnh hơn anh, từng ngón tay bị hắn tách ra khỏi lòng bàn tay, thấy chiếc nhẫn sắp bị cướp mất, Kim Nhất Điền đột nhiên tóm lấy cổ tay đối phương, liều mạng cắn xuống.</p>

<p>Tên cướp đau đến thét lên, vội rút tay về, cổ tay đã bị cắn ra một hàng dấu răng thật sâu từ lâu.</p>

<p>“Mẹ kiếp, mày muốn chết hả?” Tên cướp giận dữ, bắt đầu gầm lên, vung mã tấu lên nhắm ngay đầu Kim Nhất Điền mà chém xuống.</p>

<p>Văn Lệ rít lên một tiếng, bỗng lao lên một bước, tóm lấy tay cầm mã tấu của tên cướp một cách nhanh như chớp, vặn ngược về phía sau, chỉ nghe thấy một tiếng “răng rắc” giòn giã, cánh tay của tên cướp đã bị bẻ gãy, thanh mã tấu trong tay rơi xuống đất phát ra tiếng “leng keng”.</p>

<p>Tên cướp ngã lăn ra đất, ôm cánh tay bị thương, lăn lộn trên mặt đất rên rỉ.</p>

<p>“Đồ bà tám, dám đánh đại ca của bọn tao, chán sống rồi đúng không?”</p>

<p>Ba tên cướp còn lại thấy vậy, đồng loạt vung mã tấu, hùng hổ lao đến.</p>

<p>Ba thanh mã tấu bóng loáng đồng loạt hướng lên người Văn Lệ.</p>

<p>Kim Nhất Điền hô lớn, “Sư tỷ cẩn thận!”</p>

<p>Văn Lệ không hề sợ hãi, nghiêng mình tránh thoát, tóm lấy cánh tay của tên cướp nhỏ con nhất, thuận thế hất một cái, dùng thanh mã tấu trên tay hắn cản hai thanh còn lại, liên hoàn cước dưới chân nhanh như chớp, chỉ nghe hai tiếng “bịch bịch”, mũi chân đã lần lượt đá trúng đầu gối của hai tên cướp.</p>

<p>Hai tên cướp đứng không vững, lập tức ngã xuống, đang vùng vẫy muốn đứng dậy, lúc này mới nhận ra một bên đầu gối đã bị trật khớp, hoàn toàn không nghe theo sự sai khiến.</p>

<p>Tên cướp còn lại, thật ra vẫn chỉ là một đứa trẻ chưa lớn, chắc là vừa từ trường trung học nào đó trốn học ra ngoài, thấy tình hình không ổn, lập tức vứt bỏ hung khí trên tay, quay đầu bỏ chạy.</p>

<p>Tên cướp bị bẻ gãy cánh tay chật vật đứng dậy, cố ý để lộ ra hình xăm trên cổ bên phải, đó là hình một chiếc đầu lâu, một nhánh hoa hồng đang cắm trên khóe miệng của chiếc đầu lâu đó.</p>

<p>Hắn nhìn chằm chằm Văn Lệ nói, “Chị hai, có bản lĩnh giỏi thế, chị kiếm ăn trên đường nào vậy? Có giỏi thì để lại tên, ngày sau Phi Thiên Bưu bang Đầu Lâu tôi đây nhất định sẽ trả ‘nhân tình’ này lại cho chị.”</p>

<p>“Kiếm ăn cái đầu mày, cô ấy là cảnh sát, cảnh sát hình sự đấy.” Kim Nhất Điền bật cười.</p>

<p>“Đệch, thì ra là cớm, xem như tao xúi quẩy.”</p>

<p>Ba tên cướp không dám nhiều lời, dìu đỡ lẫn nhau, cà nhắc đi vào trong bóng tối.</p>

<p>Văn Lệ đỡ Kim Nhất Điền dậy, “Cậu không sao chứ?”</p>

<p>Kim Nhất Điền chỉnh lại mắt kính, nói, “Không sao, chút vết thương ngoài da thôi.”</p>

<p>Văn Lệ nói, “Từ lâu tôi đã bảo cậu học chút thuật phòng thân rồi, cậu không nghe, cậu nhìn xem, lúc nãy nguy hiểm biết mấy.”</p>

<p>Kim Nhất Điền nói, “Không được, quân tử động khẩu không động thủ, thám tử tư chúng em, hơn nhau ở cái đầu, phải dựa vào trí thông minh, dùng nắm đấm để giải quyết vấn đề, đó là hành động của côn đồ.”</p>

<p>“Ồ, thảo nào…” Văn Lệ bỗng bật cười.</p>

<p>“Chị cười gì vậy?”</p>

<p>“Lúc nãy cậu cắn tên nhóc kia như chó vậy, quả nhiên là quân tử động khẩu không động thủ mà.”</p>

<p>Kim Nhất Điền đỏ mặt, lúng túng cười cười.</p>

<p>Anh lấy chiếc nhẫn kia ra, cẩn thận lau sạch sẽ, một lần nữa quỳ một gối xuống trước mặt Văn Lệ, “Sư tỷ, chị vẫn chưa nhận lời tỏ tình lúc nãy của em.”</p>

<p>Văn Lệ thấy anh đầy vẻ chân thành, trong lòng cũng có chút cảm động.</p>

<p>Đúng lúc này, điện thoại trong túi xách của cô đột ngột reo lên.</p>

<p>“Là ai gọi vậy? Thật không biết chọn thời gian.” Kim Nhất Điền bực bội ra mặt. “Không được, chị nhận lời em trước rồi hãy nhận điện thoại.”</p>

<p>Văn Lệ lấy điện thoại ra xem qua, “Đừng có phá, là thầy tôi gọi.”</p>

<p>Văn Lệ là điều tra viên của Tổ Trọng án số 2 thuộc Đội Cảnh sát Hình sự, thầy của cô là Tổ trưởng Tổ Trọng án số 2 -Tần Hán Xuyên <em>-</em> có gần 20 năm tuổi nghề.</p>

<p>Cô đi sang một bên nhận điện thoại.</p>

<p>Một phút sau, cô vội vàng quay lại nói, “Lúc nãy phòng trực ban của Đội Hình sự vừa nhận được điện thoại của Đội Cứu hỏa, nói một cửa hàng thời trang ở ngõ Thanh Vân xảy ra hỏa hoạn, một người đàn ông đã chôn thân trong biển lửa. Người của Đội Cứu hỏa cảm thấy vụ cháy này hơi bất thường, nghi ngờ đây là vụ án có người phóng hỏa. Thầy đang trên đường đến hiện trường rồi, ông ấy bảo tôi lập tức qua đó.”</p>

<p>Kim Nhất Điền lầm bầm, “Thầy, thầy, trong mắt chị chỉ có mỗi người thầy này thôi.”</p>

<p>Văn Lệ nói, “Năm 22 tuổi, tôi tốt nghiệp đại học thi vào làm cảnh sát, là thầy đã dẫn dắt tôi vào nghề, vì bảo vệ tôi mà thầy đỡ đạn cho tôi, trong mắt tôi có thầy ấy thì đã sao?”</p>

<p>Kim Nhất Điền biết cô nổi giận rồi, không dám nhắc đến chuyện khi nãy nữa, cất nhẫn đi rồi nói, “Được rồi, chị đến hiện trường, dẫn theo em nữa, gần đây em đang thiếu tư liệu để sáng tác.”</p>

<p>“Cậu đâu phải nhân viên điều tra, đến đó làm gì?”</p>

<p>“Em làm tài xế lái xe đưa chị đến hiện trường mà!”</p>

<p>Văn Lệ biết chiếc Peugeot của anh đang đậu ngay bên cạnh rạp chiếu phim. Bản thân cô không có xe, đã khuya như vậy, muốn gọi taxi trên đường lớn cũng tương đối khó. Cô đành gật đầu nói, “Vậy cũng được.”</p>

<p>Hai người lên xe, phóng đến ngõ Thanh Vân.</p>

</body>

</html>
`