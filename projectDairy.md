# Nhật ký (Dairy)

## Đôi lời
- Thông thường mọi người sẽ không tiếp cận trang này.
- Vào thời điểm bắt đầu dự án này, tôi đang là một sinh viên chuyển ngành, nghiêm túc học tập với lập trình trong một năm.
- Đây là dự án nghiêm túc đầu tiên, tôi và đồng sự(nguời bạn thời phổ thông) là 02 thành viên duy nhất.  
- Tôi tác giả, người chịu trách nhiệm chính của dự án này
- Đồng sự vừa cung cấp kiến thức về quy trình làm việc cũng kiêm vai trò QC.
- Dự án sẽ được sử dụng JS(JavaScrip) là ngôn ngữ chính, không sử dụng bất kỳ framework nào.
- Mục tiêu của dự án: 
    - Tạo ra sản phẩm có thể tiếp cận được với nhiều người nhất có thể.
    - Trao dồi kiến thức, nâng cao kỹ năng.

## Update
- Otc-31-24 (31-10-2024) Sau một cuộc trò truyện ngắn với đồng sự chúng tôi quyết định khởi động dự án, hơi nông nổi! Trong ngày đầu tôi đã thiết kế một giao diện, các bạn có thể tìm ở thư mục hình ảnh file V.1.0.
- Nov-2-24 (02-11-2024) sau 02 ngày làm việc với js, các phương trình bất đồng bộ, các hàm hứa hẹn, các hàm nạc danh. Tôi đã gặp rắc rối khi đối mặt với cấu trúc mỗi một dòng lệnh cũng như cách các service giao tiếp. Ít nhất tôi cũng thu được cách để lấy cookies.
- Nov-4-24 (04-11-2024) trước mắt tôi nghĩ nên xuất text (txt) metadata và cover, tôi chưa hình dung được thời gian parser 1k chương truyện trong bao lâu. Cũng như chưa hiểu làm sao để tạo thành một ebook hoàn chỉnh. Vào thời điểm hiện tại phần xử lí giao diện và thu thập thông tin đã khá tốt. Đã làm cho code dễ đọc hơn, hy vọng cách phân chia của tôi là chính xác.
- Nov-5-24 (05-11-2024) Thời điểm hiện tại extention đã có thể thu thập dữ liệu từ truyện tôi khá hài lòng. Ngày hôm trước, sau một cuộc trao đổi ngắn với đồng sự, anh ấy nên thử với 1 trang khác nếu không có api sạch sẽ như BNS và độ phức tạp không như BNS thì sẽ thế nào. Chúng tôi thống nhất sẽ phát triển ở phần lấy dữ liệu từ web DOM rồi hiện thị lên popup site được chọn sẽ là daoquan.vn. Sau khoảng 2-3 giờ phân tích cấu trúc web thì tôi thật sự cảm thấy sự tệ hại trong cách bố trí của website này, từ api đến cả loadDOM. Nó không khó nhưng lại mất nhiều công để lấy được nội dung, tôi nghĩ extention sẽ mất một khoảng thời gian để xử lí được nội dung từ webdom làm chậm trễ trải nghiệm của người dùng. Nên là phải có một phương thức khác để xứ lí vấn đề này, quả thực trang web này rất tệ trong xử lí api nhưng sẽ là cơ hội tuyệt vời để thử sức. Có thể t phải tạm gác lại 1 khoảng thời gian, còn các dự án học tập chưa hoàn thành. Đây không phải là từ bỏ, đây là sự ưu tiên.
- Sameday (cùng ngày) qua tìm hiểu thì tôi có thể phỏng đoán được xây dựng trên ReactJS hoặc NextJS, đến lúc này tôi nhận ra là nên từ bỏ việc tìm kiếm api vì không còn cách nào ngoài load DOM. Shit! This is not right man, ý tôi là ReactJS hay Next có thể phát triển nhanh hơn với nguồn nhân sự dồi dào, nhưng đây có vẻ như không phải là một điều tốt cho người phát triển. Now tôi đã hiểu tại sao nhiều người lại đùa rằng FE là những thợ dán, nó không ám chỉ những FE thực thụ. Tóm lại, thứ này có thể phát triển nhanh, riêng lẻ, nhưng lại không giúp được nhiều cho người tạo ra nó phát triển.
- Nov-8-24 (08-11-24), Sau 2 ngày vật vã cùng ReactJS trong project nhóm thì tôi cũng đã có thời gian nghiên cứu lại mô hình của DaoQuan. Tôi đã phân tích DOM được vào 2 ngày trước, nhưng sau khi làm 1 vài bài test thì nó hơi tệ khi phải xử lí khá nhiều, nhất là phần regax và parser. Đây là tình huống chắc chắn phải chịu khi tôi không có được thông tin api. Tin vui là sao 1 hồi phá phách thì tôi vô tình mò được api. Thế là kế hoạch cất công để mổ xẻ DOM quăng vào sọt rác, nhưng xứng đáng,
- Nov-9-24 (09-11-24), Ok cuối cùng cũng đã fetch xong phần DaoQuan. Khá ok, còn vài lỗi hơi lừa fix, nhưng nhìn chung thì lỗi đó sẽ xuất hiện khi mạng gián đoạn, không biết cách fix @@.
- Dec-21-24 (21-12-24), sau khoảng thời gian dài thì cuối cùng đã xong học phần cuối của học kỳ, tuần sau lại bắt đầu học kỳ mới. Không biết khi nào mới có thể làm cho dự án này xong. Tin vui là đã tìm hiểu được cấu trúc epub file nên có thể xuất thẳng sang epub file.

- Dec-25-24 (25-12-24), Với tình trạng hiện tại thì sắp thành đống code thối rồi. Anw, với sự trợ giúp của thư viện Zip thì công cuộc đỡ hơn phần nào. Hôm nay đã hoàn thành đc get Cover.

- Dec-26-24 (26-12-24), Đã hoàn thành xong phần đầu metadata, ko biết ứng dụng khi rip 1000 chương truyện sẽ thế nào