# Bach Ngoc Sach Vip API Analyze

## Novel ID

<details>
<summary>Click to expand</summary>

### URL
```
https://ngocsach.com/api/story-by-slug/{{Novel Slug}}
```

### Novel Slug
Novel Slug is a path of Novel
like
> https://bachngocsach.net.vn/truyen/thuong-hai-diep-anh/  

So Novel Slug 
> thuong-hai-diep-anh

Another example
> https://bachngocsach.net.vn/truyen/du-toi/chuong-6  

Novel slug 
> du-toi

### Header
> Not required
### Responce API

<details>
<summary>Click to expand</summary>

```
{
    "id": 944,
    "name": "Thương Hải Điệp Ảnh",
    "slug": "thuong-hai-diep-anh",
    "source_id": 1,
    "cover": "https://ngocsach.com/storage/story_img/huYgUlYbA8jfGVQZfK7OB7GPCOc2bLaHCBmWJM1F.jpg",
    "image_info": "https://ngocsach.com/storage/",
    "image_info_link": null,
    "desc": "Cừu Địch là một Bắc phiêu, tức là người hộ khẩu vùng ngoài đang cố gắng bám trụ kiếm sống ở Bắc Kinh. Tuy không có gia thế, cũng chẳng có bằng cấp tốt, song nhờ vào sự nhạy bén, chịu khó và nhiều tài lẻ, Cừu Địch vẫn sống không đến nỗi nào, dẫu vậy, y luôn mưu cầu một công việc đàng hoàng có thể diện, chứ không phải một người giao hàng như hiện nay.\r\n\r\nBất ngờ nhận được một lời mời tham gia phỏng vấn vào công ty có tiếng trong giới, rồi vì lý do cực kỳ ngớ ngẩn hoàn toàn không chủ động, Cừu Địch và ba người nữa trúng tuyển thành gián điệp thương mại.\r\n\r\nThế là một anh giao hàng với bản tính đa nghi, một tên ngốc xấu xí lớn gan không gì không dám làm, một chàng trai xinh đẹp hơn cả mỹ nữ, một cô em nhìn như học sinh rụt rè lại hiếu thắng vô cùng, tổ hợp bốn người kỳ quái đó không biết nói là ngốc hay là nghé con không biết sợ cọp, vừa đọc hướng dẫn làm gián điệp vừa hành nghề, tạo ra đống chuyện oái oăm, dở khóc dở cười …",
    "more_info": "Bản dịch được đăng duy nhất ở Bạch Ngọc Sách VIP-Reader!",
    "display": 1,
    "total_words": 1258529,
    "view": 96793,
    "author_id": 477,
    "status": 1,
    "avg_rating": "5.0",
    "np": 3146,
    "is_free": 0,
    "transactions_count": 62062,
    "chapters_count": 907,
    "ratings_count": 4,
    "comments_count": 231,
    "marks_count": 123,
    "direct_comments_count": 90,
    "updated_at": "2024-11-03T22:08:31.000000Z",
    "cover_original": "https://ngocsach.com/storage/story_img/org_huYgUlYbA8jfGVQZfK7OB7GPCOc2bLaHCBmWJM1F.jpg",
    "first_chapter_number": 1,
    "is_mine": null,
    "saved": null,
    "subscribed": null,
    "auto_buy": null,
    "gc_auto_buy": null,
    "price_a_word": "0.30",
    "categories": [
        {
            "id": 4,
            "name": "Đô Thị",
            "slug": "do-thi",
            "pivot": {
                "story_id": 944,
                "category_id": 4
            }
        },
        {
            "id": 14,
            "name": "Trinh Thám",
            "slug": "trinh-tham",
            "pivot": {
                "story_id": 944,
                "category_id": 14
            }
        },
        {
            "id": 30,
            "name": "Hài Hước",
            "slug": "hai-huoc",
            "pivot": {
                "story_id": 944,
                "category_id": 30
            }
        },
        {
            "id": 49,
            "name": "Thương Nghiệp",
            "slug": "thuong-nghiep",
            "pivot": {
                "story_id": 944,
                "category_id": 49
            }
        }
    ],
    "source": {
        "id": 1,
        "name": "Dịch",
        "slug": "dich"
    },
    "contributors": [
        {
            "id": 2179,
            "username": "lanhdiendiemla",
            "slug": "lanhdiendiemla",
            "role": "contributor",
            "role_list": [
                {
                    "name": "contributor"
                }
            ],
            "pivot": {
                "story_id": 944,
                "user_id": 2179
            }
        }
    ],
    "tags": [
        {
            "id": 40,
            "name": "Đại Thần Dịch",
            "slug": "dai-than-dich",
            "pivot": {
                "story_id": 944,
                "tag_id": 40
            }
        },
        {
            "id": 52,
            "name": "Độc quyền BNS",
            "slug": "doc-quyen-bns",
            "pivot": {
                "story_id": 944,
                "tag_id": 52
            }
        }
    ],
    "author": {
        "id": 477,
        "name": "Thường Thư Hân",
        "slug": "thuong-thu-han"
    }
}
```

</details>
</details>

## Five Chapters Newest
<details>
<summary>Click to expand</summary>

### URL
```
https://ngocsach.com/api/story/{{storyID}}/5-chapters-newest
```
Which storyID is a ID of Novel

### Header
> Not required

### Resonpce API
<details>
<summary>Click to expand</summary>

```
{
    "current_page": 1,
    "data": [
        {
            "id": 871085,
            "story_id": 1212,
            "name": "Chương 840: Bí Mật Kim Đan",
            "slug": "chuong-840-bi-mat-kim-dan",
            "price": "2.55",
            "contributor_id": 6726,
            "chapter_number": 840,
            "publish_at": "2024-11-01 17:08:00",
            "created_at": "2024-11-01T10:08:25.000000Z",
            "poster_id": 6726,
            "words": 1275,
            "bought": null,
            "time_edit": null,
            "contributor": {
                "id": 6726,
                "username": "nhansmall999",
                "fullname": "Phan Thiện Nhân",
                "title": null,
                "email": "nhansmall999@gmail.com",
                "email_verified_at": null,
                "phone": "0344193909",
                "bank_account": null,
                "is_active": 1,
                "balance": "11319.90",
                "role_id": 2,
                "avatar": "https://ngocsach.com/storage/",
                "avatar_original": "https://ngocsach.com/storage/",
                "created_at": "13-08-2022",
                "updated_at": "2024-11-03T18:09:44.000000Z",
                "gender": "male",
                "birthday": "01-01-2002",
                "age": 20,
                "cover": "https://ngocsach.com/storage/",
                "cover_original": "https://ngocsach.com/storage/",
                "remember_bank": 0,
                "bank_name": null,
                "ttkm": "0.00",
                "np": 0,
                "slug": "nhansmall999",
                "two_factor_code": null,
                "two_factor_expires_at": null,
                "deleted_at": null,
                "block_reason": null,
                "role": "contributor",
                "role_list": [
                    {
                        "name": "contributor"
                    }
                ]
            },
            "poster": {
                "id": 6726,
                "username": "nhansmall999",
                "slug": "nhansmall999",
                "role": "contributor",
                "role_list": [
                    {
                        "name": "contributor"
                    }
                ]
            }
        },
        {
            "id": 871084,
            "story_id": 1212,
            "name": "Chương 839: Ý Cảnh Bất Hủ",
            "slug": "chuong-839-y-canh-bat-hu",
            "price": "2.76",
            "contributor_id": 6726,
            "chapter_number": 839,
            "publish_at": "2024-11-01 17:08:00",
            "created_at": "2024-11-01T10:08:25.000000Z",
            "poster_id": 6726,
            "words": 1379,
            "bought": null,
            "time_edit": null,
            "contributor": {
                "id": 6726,
                "username": "nhansmall999",
                "fullname": "Phan Thiện Nhân",
                "title": null,
                "email": "nhansmall999@gmail.com",
                "email_verified_at": null,
                "phone": "0344193909",
                "bank_account": null,
                "is_active": 1,
                "balance": "11319.90",
                "role_id": 2,
                "avatar": "https://ngocsach.com/storage/",
                "avatar_original": "https://ngocsach.com/storage/",
                "created_at": "13-08-2022",
                "updated_at": "2024-11-03T18:09:44.000000Z",
                "gender": "male",
                "birthday": "01-01-2002",
                "age": 20,
                "cover": "https://ngocsach.com/storage/",
                "cover_original": "https://ngocsach.com/storage/",
                "remember_bank": 0,
                "bank_name": null,
                "ttkm": "0.00",
                "np": 0,
                "slug": "nhansmall999",
                "two_factor_code": null,
                "two_factor_expires_at": null,
                "deleted_at": null,
                "block_reason": null,
                "role": "contributor",
                "role_list": [
                    {
                        "name": "contributor"
                    }
                ]
            },
            "poster": {
                "id": 6726,
                "username": "nhansmall999",
                "slug": "nhansmall999",
                "role": "contributor",
                "role_list": [
                    {
                        "name": "contributor"
                    }
                ]
            }
        },
        {
            "id": 871083,
            "story_id": 1212,
            "name": "Chương 838: Lĩnh Hội Thần Thông, Toạ Độ Tinh Không (2)",
            "slug": "chuong-838-linh-hoi-than-thong-toa-do-tinh-khong-2",
            "price": "2.87",
            "contributor_id": 6726,
            "chapter_number": 838,
            "publish_at": "2024-11-01 17:08:00",
            "created_at": "2024-11-01T10:08:25.000000Z",
            "poster_id": 6726,
            "words": 1433,
            "bought": null,
            "time_edit": null,
            "contributor": {
                "id": 6726,
                "username": "nhansmall999",
                "fullname": "Phan Thiện Nhân",
                "title": null,
                "email": "nhansmall999@gmail.com",
                "email_verified_at": null,
                "phone": "0344193909",
                "bank_account": null,
                "is_active": 1,
                "balance": "11319.90",
                "role_id": 2,
                "avatar": "https://ngocsach.com/storage/",
                "avatar_original": "https://ngocsach.com/storage/",
                "created_at": "13-08-2022",
                "updated_at": "2024-11-03T18:09:44.000000Z",
                "gender": "male",
                "birthday": "01-01-2002",
                "age": 20,
                "cover": "https://ngocsach.com/storage/",
                "cover_original": "https://ngocsach.com/storage/",
                "remember_bank": 0,
                "bank_name": null,
                "ttkm": "0.00",
                "np": 0,
                "slug": "nhansmall999",
                "two_factor_code": null,
                "two_factor_expires_at": null,
                "deleted_at": null,
                "block_reason": null,
                "role": "contributor",
                "role_list": [
                    {
                        "name": "contributor"
                    }
                ]
            },
            "poster": {
                "id": 6726,
                "username": "nhansmall999",
                "slug": "nhansmall999",
                "role": "contributor",
                "role_list": [
                    {
                        "name": "contributor"
                    }
                ]
            }
        },
        {
            "id": 871082,
            "story_id": 1212,
            "name": "Chương 837: Lĩnh Hội Thần Thông, Toạ Độ Tinh Không ",
            "slug": "chuong-837-linh-hoi-than-thong-toa-do-tinh-khong",
            "price": "2.77",
            "contributor_id": 6726,
            "chapter_number": 837,
            "publish_at": "2024-11-01 17:08:00",
            "created_at": "2024-11-01T10:08:25.000000Z",
            "poster_id": 6726,
            "words": 1385,
            "bought": null,
            "time_edit": null,
            "contributor": {
                "id": 6726,
                "username": "nhansmall999",
                "fullname": "Phan Thiện Nhân",
                "title": null,
                "email": "nhansmall999@gmail.com",
                "email_verified_at": null,
                "phone": "0344193909",
                "bank_account": null,
                "is_active": 1,
                "balance": "11319.90",
                "role_id": 2,
                "avatar": "https://ngocsach.com/storage/",
                "avatar_original": "https://ngocsach.com/storage/",
                "created_at": "13-08-2022",
                "updated_at": "2024-11-03T18:09:44.000000Z",
                "gender": "male",
                "birthday": "01-01-2002",
                "age": 20,
                "cover": "https://ngocsach.com/storage/",
                "cover_original": "https://ngocsach.com/storage/",
                "remember_bank": 0,
                "bank_name": null,
                "ttkm": "0.00",
                "np": 0,
                "slug": "nhansmall999",
                "two_factor_code": null,
                "two_factor_expires_at": null,
                "deleted_at": null,
                "block_reason": null,
                "role": "contributor",
                "role_list": [
                    {
                        "name": "contributor"
                    }
                ]
            },
            "poster": {
                "id": 6726,
                "username": "nhansmall999",
                "slug": "nhansmall999",
                "role": "contributor",
                "role_list": [
                    {
                        "name": "contributor"
                    }
                ]
            }
        },
        {
            "id": 871081,
            "story_id": 1212,
            "name": "Chương 836: Phương Hướng Tu Hành (2)",
            "slug": "chuong-836-phuong-huong-tu-hanh-2",
            "price": "2.21",
            "contributor_id": 6726,
            "chapter_number": 836,
            "publish_at": "2024-11-01 17:08:00",
            "created_at": "2024-11-01T10:08:12.000000Z",
            "poster_id": 6726,
            "words": 1107,
            "bought": null,
            "time_edit": null,
            "contributor": {
                "id": 6726,
                "username": "nhansmall999",
                "fullname": "Phan Thiện Nhân",
                "title": null,
                "email": "nhansmall999@gmail.com",
                "email_verified_at": null,
                "phone": "0344193909",
                "bank_account": null,
                "is_active": 1,
                "balance": "11319.90",
                "role_id": 2,
                "avatar": "https://ngocsach.com/storage/",
                "avatar_original": "https://ngocsach.com/storage/",
                "created_at": "13-08-2022",
                "updated_at": "2024-11-03T18:09:44.000000Z",
                "gender": "male",
                "birthday": "01-01-2002",
                "age": 20,
                "cover": "https://ngocsach.com/storage/",
                "cover_original": "https://ngocsach.com/storage/",
                "remember_bank": 0,
                "bank_name": null,
                "ttkm": "0.00",
                "np": 0,
                "slug": "nhansmall999",
                "two_factor_code": null,
                "two_factor_expires_at": null,
                "deleted_at": null,
                "block_reason": null,
                "role": "contributor",
                "role_list": [
                    {
                        "name": "contributor"
                    }
                ]
            },
            "poster": {
                "id": 6726,
                "username": "nhansmall999",
                "slug": "nhansmall999",
                "role": "contributor",
                "role_list": [
                    {
                        "name": "contributor"
                    }
                ]
            }
        }
    ],
    "first_page_url": "https://ngocsach.com/api/story/1212/5-chapters-newest?page=1",
    "from": 1,
    "last_page": 168,
    "last_page_url": "https://ngocsach.com/api/story/1212/5-chapters-newest?page=168",
    "next_page_url": "https://ngocsach.com/api/story/1212/5-chapters-newest?page=2",
    "path": "https://ngocsach.com/api/story/1212/5-chapters-newest",
    "per_page": 5,
    "prev_page_url": null,
    "to": 5,
    "total": 840
}
```
</detail> </detail>