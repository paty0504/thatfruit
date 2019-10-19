$(document).ready(function () {
    checkUrl();
});

function setNews(news) {
    var text = ``;
    news.map(data => {

        var list = (data.time + "").split(",");
        if (list[4] < 10) {
            list[4] = "0" + list[4];
        }

        var timePost = list[2] + "-" + list[1] + "-" + list[0] + " " + list[3] + ":" + list[4];

        text += `
        <div class="col-12 col-sm-6 col-md-4">
        <div class="np__wapper">
        <div class="npwp-img">
            <img src="${data.image}" alt="">
            <a href="#"><span>${data.topic.name}</span></a>
        </div>
        <div class="npwp-text">
            <span>${data.title}</span>
            <time><span><i class="far fa-calendar" aria-hidden="true"></i> ${timePost}</span></time>
            <p>${data.description}</p>
            <a href="../newdetail?id=${data.id}">xem thêm</a>
        </div>
    </div>
    </div>`;
    });
    $("#news-products").html(text);


}

function setNewsNull() {
    $("#newspage .container").html("<p style=\"margin:20px ; font-size: 20px ; color: green;\">Không tìm thấy tin phù hợp !</p>");
}

// tìm theo news
function findAllNews(page) {
    //============ Get All Products ========================
    $('#pagi-news').pagination({
        dataSource: function (done) {
            $.ajax({
                type: "GET",
                headers: {
                    adminbksoftwarevn: tokenHeader_value
                },
                url: URL_API + "/v1/public/news/page",
                success: function (news) {
                    done(news)

                },
                error: function (jqXHR, textStatus, errorThrown) {
                    errMess(jqXHR, textStatus, errorThrown);
                }
            });
        },
        pageNumber: 1,
        pageSize: 6,
        callback: function (data2, pagination) {
            setNews(data2);
        }
    });

}


function findAllNewsByTopicId(id, page) {
    //============ Get All Products ========================
    $.ajax({
        type: "GET",
        headers: {
            adminbksoftwarevn: tokenHeader_value
        },
        url: URL_API + "/v1/public/news/topic/page?topic-id=" + id + "&page=" + page,
        success: function (news) {
            setNews(news);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // errMess(jqXHR, textStatus, errorThrown);
            setNewsNull();
        }
    });
}

function clickTopic() {
    const urlNewsByTopic = window.location.href;
    var str = urlNewsByTopic.split("id=");
    const id = str[str.length - 1];
    if ((id - 1) >= 0) {
        findAllNewsByTopicId(id, 1);
        // findAllPageNewsNumberByTopicId(id);
    } else {
        findAllNews(1);
        // findAllPageNewsNumber();
    }
}



// tìm theo title
function findAllNewsByTitle(title) {
    //============ Get All News By Name ========================
    $('#pagi-news').pagination({
        dataSource: function (done) {
            $.ajax({
                type: "GET",
                headers: {
                    adminbksoftwarevn: tokenHeader_value
                },
                url: URL_API + "/v1/public/news/find-by-title/page?title="+title ,
                success: function (news) {
                    if (news.length <= 0) {
                        setNewsNull();
                    } else {
                        done(news);

                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    errMess(jqXHR, textStatus, errorThrown);
                }
            });
        },
        pageNumber: 1,
        pageSize: 6,
        callback: function (data2, pagination) {
            setNews(data2);
        }
    });
}

// tìm theo title
function searchNewsByTitle() {
    const urlNewsByTitle = window.location.href;
    var str = urlNewsByTitle.split("title=");
    const title = str[str.length - 1];
    if (title != null) {
        findAllNewsByTitle(title );
        // findAllPageNewsNumberByTitle(title);
    } else {
        findAllNews(1);
        // findAllPageNewsNumber();
    }
}

// kiểm tra url
function checkUrl() {
    const url = window.location.href;
    if (url.includes("id")) {
        clickTopic();
    } else if (url.includes("title")) {
        searchNewsByTitle();
    } else {
        findAllNews(1);
        // findAllPageNewsNumber();
    }
}