// CONST
//http://123.31.45.240:8687/admin_that_fruit_com/api
const URL_API = "https://admin.thatfruit.vn/api";
const tokenHeader_value = "1df0e68d684175afa5ae2c3d1543fa0e";
var token = "";
// END_CONST
tokenLogin = "";
//RUN

$(document).ready(function () {
    checkLogin();
    getMenu();
    // setLogo();
    getFooter();
    btnSearchHeader();

    updateAmountProductInCart();
    $('.card-item1').click(function () {
        window.location.href = '/cart';
    })
    getUserCookie();
});
//END_RUN

// -----FUNCTION-----
function btnSearchHeader() {
    $("#searchHeader").change(function () {
        let name;
        if ($("#searchHeader").val() === null || $("#searchHeader").val() == "") {
            alterThatFruitWarning("Bạn cần nhập từ khóa để tìm kiếm");
        } else {

            name = $("#searchHeader").val();

            $("#clickSearch").click(function () {
                window.location.href = "list-product?name=" + name;

            })
            $("#searchHeader").keypress(function () {
                window.location.href = "list-product?name=" + name;
            })
        }
    })


}

//Set logo
function setLogo() {
    //id 1 name logo
    getImagePage(1).then(imgSrc => {
        $(".logo-company").html(`<img src=${imgSrc} alt="thatfruit"></a>`);
    }).catch(err => {
        console.log(err);
    });
}

//Set menu view
function setMenu(listMenu) {
    var link = ['home', 'aboutme', 'product', 'news', 'contact'];
    let text = '<ul class="navbar-nav">';
    listMenu.map((data, index) => {
        text += `<li class="nav-item"><a class="nav-link" href="${link[index]}">${data.name}</a></li>`;
        getListBigCategory(data, index + 1)
    })
    text += '</ul>';
    $('#navbarsExample08').html(text); //add HTML
    // $('#navbarsExample08 ul.navbar-nav li)').click(function () {
    //     $(this).addClass('active');
    // });//add active default menu
}

//Call menu
function getMenu() {
    let menu = [];
    $.ajax({
        type: 'GET',
        dataType: "json",
        url: URL_API + "/v1/public/menu/all",
        headers: {
            "adminbksoftwarevn": tokenHeader_value
        },
        timeout: 30000,
        success: function (result) {
            menu = result;
            setMenu(menu);

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
    return menu;
}

async function getBigCategoryPage(size) {
    let list = [];
    await $.ajax({
        type: 'GET',
        dataType: "json",
        url: URL_API + `/v1/public/big-category/page?size=${size}`,
        headers: {
            "adminbksoftwarevn": tokenHeader_value
        },
        timeout: 30000,
        success: function (result) {
            list = result;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
    return list;
}

//Set BigCategory view
function setListBigCategory(listBigCategory, index) {
    if (listBigCategory.length === 0) {
        return false;
    } else {
        $(`#navbarsExample08 li:nth-child(${index})`).addClass('dropdown mega-dropdown');
        //listBigCategory[0].menu listBigCategory general menu
        let textBigCategory = `<a class="nav-link dropdown-toggle" href="" id="menudropdown${index}" data-toggle="dropdown"
                       aria-haspopup="true" aria-expanded="false">${listBigCategory[0].menu.name}</a> <ul class="dropdown-menu mega-dropdown-menu " aria-labelledby="menudropdown${index}">
                        <div class="container">
                            <div class="row d-flex justify-content-between db">`
        listBigCategory.map((result, index1) => {
            textBigCategory += `<li class="col-12  col-lg-2"><ul><li class="dropdown-header" id="${result.id}"><a href='list-product?big-category=${result.id}'>${result.name}</a></li></ul></li>`
            getListSmallCateogry(result, index, index1 + 1);
        })
        textBigCategory += '</div></div></ul>';
        $(`#navbarsExample08 li:nth-child(${index})`).html(textBigCategory); //addHTML
    }
}

//Call BigCategoy with menu
function getListBigCategory(menu, index) {
    let listBigCategory = [];
    $.ajax({
        type: 'GET',
        dataType: "json",
        url: URL_API + `/v1/public/big-category/find-by-menu?menu-id=${menu.id}`,
        headers: {
            "adminbksoftwarevn": tokenHeader_value
        },
        timeout: 30000,
        success: function (result) {
            listBigCategory = result;

            setListBigCategory(listBigCategory, index);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
    return listBigCategory;
}
//load gif
function viewLoadingGif() {
    $("#loading-gif").css("display","inline-flex");
}

function hideLoadingGif() {
    setTimeout(function () {
        $("#loading-gif").css("display","none");
    }, 200)
}


//Set SmallCategory view
function setListSmallCategory(listSmallCategory, index, index1) {
    let textSmallCategory = '';
    if (listSmallCategory.length === 0) {
        return false;
    } else {
        listSmallCategory.map((data,index) => {
            textSmallCategory += `<li><a href='list-product?small-category=${data.id}' class="iconmnf"><i class="far fa-hand-point-right"></i> <span>${data.name}</span></a></li>`
        })
        //{listSmallCategory[0].bigCategory general bigCategory
        $(`#navbarsExample08 li:nth-child(${index}) .dropdown-menu li:nth-child(${index1}) ul`).append(textSmallCategory) //add HTML
    }
}

//Call SmallCategory with BigCategory
function getListSmallCateogry(bigCategory, index, index1) {
    let smallCategory = [];
    $.ajax({
        type: 'GET',
        dataType: "json",
        url: URL_API + `/v1/public/small-category/find-by-big?big-id=${bigCategory.id}`,
        headers: {
            "adminbksoftwarevn": tokenHeader_value
        },
        timeout: 30000,
        success: function (result) {
            smallCategory = result;
            setListSmallCategory(result, index, index1);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
    return smallCategory;
}

//Set google map all web
function setMap(linkMap) {
    $('.map-google iframe').attr('src', linkMap);
}

//Set hotline all web
function setHotLine(hotline) {
    hotline = '0' + hotline;
    hotline = hotline.substr(0, 4) + ' ' + hotline.substr(4, 3) + ' ' + hotline.substr(7, 3);
    $('.hotline').html('<i class="fas fa-phone"></i> ' + hotline);
    $('.hotline').attr("href", `tel:${hotline}`);
}

//Set mailCompany all web
function setMailCompany(mail) {
    $('.mail-company').html('<i class="fas fa-envelope"></i> ' + mail);
    $('.mail-company').attr("href", `mailto:${mail}`);
}

//Set addressCompany allweb
function setAddressCompany(address) {
    $('.address-company').html('<i class="fas fa-map-marker-alt"></i> ' + address);
    $('header .address-company').html('<i class="fas fa-map-marker-alt"></i> ' + "Bản Đồ");
    $('.address-company').attr("href", `http://maps.google.com/?q=${address}`);
}

//Set social media
function setSocialMedia(contactCompany) {
    $('.link-facebook').attr("href", contactCompany.facebook);
    $('.link-twitter').attr("href", "https://twitter.com/?lang=vi");
    $('.link-zalo').attr("href", contactCompany.zalo);
    $('.link-youtube').attr("href", contactCompany.youtube);
    $('.link-instagram').attr("href", contactCompany.instagram);
}

//Call company
function getCompany(id) {
    let company = {};
    $.ajax({
        type: 'GET',
        dataType: "json",
        url: URL_API + `/v1/public/company/find-by-id?id=${id}`,
        headers: {
            "adminbksoftwarevn": tokenHeader_value
        },
        timeout: 30000,
        success: function (result) {
            company = result;
            getContactCompany(company.id);
            setHotLine(company.phone);
            setAddressCompany(company.address);
            setMailCompany(company.email);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
    return company;
}

function getContactCompany(id) {
    let contactCompany = [];
    $.ajax({
        type: 'GET',
        dataType: "json",
        url: URL_API + `/v1/public/company/contact/company?company-id=${id}`,
        headers: {
            "adminbksoftwarevn": tokenHeader_value
        },
        timeout: 30000,
        success: function (result) {
            // console.log(result);
            contactCompany = result;
            setMap(contactCompany[0].map); //one company one contact
            setSocialMedia(contactCompany[0]);
        },
        error: function (err) {
            console.log(err);
        }
    })
    return contactCompany;
}

//Set Footer
function setFooter(listFooter) {
    if (listFooter.length === 0) {
        return false;
    } else {
        textFooter = '';
        listFooter.map(data => {
            textFooter += `<div class="col-md-3 col-sm-12"><h5>${data.name}</h5></div>`
            getFooterDetail(data);
        })
        $('#footer-menu').html(textFooter); //add HTML;
    }
}

//Call Footer
function getFooter() {
    let listFooter = [];
    $.ajax({
        type: 'GET',
        dataType: "json",
        url: URL_API + `/v1/public/footer-menu/all`,
        headers: {
            "adminbksoftwarevn": tokenHeader_value
        },
        timeout: 30000,
        success: function (result) {
            listFooter = result;
            setFooter(listFooter);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
    return listFooter;
}

//set footerDeail
function setFooterDetail(listFooterDetail) {
    if (listFooterDetail.length === 0) {
        return false;
    } else {
        let textFooterDetail = '';
        //listFooterDetail[0].footerMenu.id list general footerMenu
        if (listFooterDetail[0].footerMenu.id !== 1 && listFooterDetail[0].footerMenu.id !== 3) {
            textFooterDetail = '<ul class="dot">';
            listFooterDetail.map(data => {
                textFooterDetail += `<li><a href="#">${data.name}</a></li>`;
            })
            textFooterDetail += '</ul>'
        } else if (listFooterDetail[0].footerMenu.id === 3) {
            textFooterDetail = '<ul class="dot"><li><a href="#" class="hotline"></a></li><li><a href="#" class="mail-company"></a></li><li><a href="#" class="address-company"></a></li></ul>';
            getCompany(1); //footer container infor company with footerMenu 3;
        } else {
            textFooterDetail = `<img src="resources/img/ft-img.png" alt=""><p>${listFooterDetail[0].name}<span>[...]</span></p>`;
            //id 9 name footerimg
            getImagePage(9).then(imgSrc => {
                $(`#footer-menu .col-md-3:nth-child(1) img`).attr('src', imgSrc);

            }).catch(err => {
                console.log(err);
            });
        }
        $(`#footer-menu .col-md-3:nth-child(${listFooterDetail[0].footerMenu.id})`).append(textFooterDetail);
        $(`#footer-menu .dot:nth-child(2) li:nth-child(1) a`).attr("href", "home");
        $(`#footer-menu .dot:nth-child(2) li:nth-child(2) a`).attr("href", "aboutme");
        $(`#footer-menu .dot:nth-child(2) li:nth-child(3) a`).attr("href", "news");
        $(`#footer-menu .dot:nth-child(2) li:nth-child(4) a`).attr("href", "contact");
        $(`#footer-menu .dot:nth-child(2) li:nth-child(5) a`).attr("href", "user");
    }
}

//get footerDetail
function getFooterDetail(footer) {
    let footerDetail = [];
    $.ajax({
        type: 'GET',
        dataType: "json",
        url: URL_API + `/v1/public/footer-menu-details/all?footer-menu-id=${footer.id}`,
        headers: {
            "adminbksoftwarevn": tokenHeader_value
        },
        timeout: 30000,
        success: function (result) {
            footerDetail = result;
            setFooterDetail(footerDetail);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
    return footerDetail;
}

//call ImagePage
async function getImagePage(id) {
    let imgSrc = '';
    await $.ajax({
        type: 'GET',
        dataType: "json",
        url: URL_API + `/v1/public/image-page/find-by-id?id=${id}`,
        headers: {
            "adminbksoftwarevn": tokenHeader_value
        },
        timeout: 30000,
        success: function (result) {
            imgSrc = result.url;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
    return imgSrc;
}

//call list imgPage
async function getListImagePage(startId, endId) {
    let listImgSrc = [];
    await $.ajax({
        type: 'GET',
        dataType: "json",
        url: URL_API + `/v1/public/image-page/start-end?start-id=${startId}&end-id=${endId}`,
        headers: {
            "adminbksoftwarevn": tokenHeader_value
        },
        timeout: 30000,
        success: function (result) {
            listImgSrc = result;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
    return listImgSrc;
}

//Get supperoffer product
async function getSupperOfferProduct(size, page) {
    let listSupperOffer = [];
    await $.ajax({
        type: 'GET',
        dataType: "json",
        url: URL_API + `/v1/public/product/find-by-sale?size=${size}&page=${page}`,
        headers: {
            "adminbksoftwarevn": tokenHeader_value
        },
        timeout: 30000,
        success: function (result) {
            listSupperOffer = result;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
    return listSupperOffer;
}

//Call bestsellerproduct
async function getBestSellerProduct(idSmallCategory, size, page) {
    let listBestSeller = [];
    if (idSmallCategory === 0) {
        urlCall = `/v1/public/product/find-by-hot?size=${size}&page=${page}`;
    } else {
        urlCall = `/v1/public/product/hot-by-small-category/page?size=${size}&page=${page}&small-id=${idSmallCategory}`;
    }
    await $.ajax({
        type: 'GET',
        dataType: "json",
        url: URL_API + urlCall,
        headers: {
            "adminbksoftwarevn": tokenHeader_value
        },
        timeout: 30000,
        success: function (result) {
            listBestSeller = result;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
    return listBestSeller;
}

//Call dealsmonth product
async function getDealsMonthProduct() {
    let list = [];
    $.ajax({
        type: 'GET',
        dataType: "json",
        url: URL_API + `/v1/public/product/find-by-hot?size=${size}&page=${page}`,
        headers: {
            "adminbksoftwarevn": tokenHeader_value
        },
        timeout: 30000,
        success: function (result) {
            list = result;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
    return list;
}

//Call special product
async function getSpecialProduct(size, page) {
    let list = [];
    await $.ajax({
        type: 'GET',
        dataType: "json",
        url: URL_API + `/v1/public/product/find-by-special?size=${size}&page=${page}`,
        headers: {
            "adminbksoftwarevn": tokenHeader_value
        },
        timeout: 30000,
        success: function (result) {
            list = result;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
    return list;
}

//Call news
async function getNews(size, page) {
    let list = [];
    await $.ajax({
        type: 'GET',
        dataType: "json",
        url: URL_API + `/v1/public/news/page?size=${size}&page=${page}`,
        headers: {
            "adminbksoftwarevn": tokenHeader_value
        },
        timeout: 30000,
        success: function (result) {
            list = result;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
    return list;
}

//Call hot news
async function getHotNews(size, page) {
    let list = [];
    await $.ajax({
        type: 'GET',
        dataType: "json",
        url: URL_API + `/v1/public/news/views?size=${size}&page=${page}`,
        headers: {
            "adminbksoftwarevn": tokenHeader_value
        },
        timeout: 30000,
        success: function (result) {
            list = result;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
    return list;
}

//format moeny
function formatNumber(nStr, decSeperate, groupSeperate) {
    nStr += '';
    x = nStr.split(decSeperate);
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + groupSeperate + '$2');
    }
    return x1 + x2;
}

// Date to mili
function convertDateToMilliseconds(date) {
    date = date.trim();
    let arr = date.split("-");
    let year = arr[0], month = arr[1], day = arr[2];
    var endDay = new Date(year, month - 1, day, 23, 59, 59, 99); //month 0-11
    var milliseconds = new Number(endDay) - Date.now(); // remain milliseconds.
    return convertTimeRemainView(milliseconds);
}

//mili to dd : hh : mm : ss
function convertTimeRemainView(miliseconds) {
    let a = miliseconds % (3600000 * 24);
    let day = (miliseconds - a) / (3600000 * 24);
    miliseconds = a;
    a = miliseconds % 3600000;
    let hour = (miliseconds - a) / 3600000;
    miliseconds = a;
    a = miliseconds % 60000;
    let minute = (miliseconds - a) / 60000;
    miliseconds = a;
    a = miliseconds % 1000;
    let seconds = (miliseconds - a) / 1000;

    return `${day} : ${hour} : ${minute} : ${seconds}`;
}

// minus 1
function minusTimeRemain(text) {
    text = text.trim();
    let attr = text.split(" : ");
    return convertTimeRemainView(attr[0] * 3600000 * 24 + attr[1] * 3600000 + attr[2] * 60000 + attr[3] * 1000 - 1000);
}

//click class click-prodcut
function clickProduct() {
    $(".click-product").click(function () {
        let idProduct = $(this).attr("data-id");
        window.location.href = `product?id=${idProduct}`;
    })
}

//click class click-prodcut-cart
function clickProductCart(query) {
    $(`${query} .click-product-cart`).click(function () {
        let idProduct = $(this).parents(".card").attr("data-id");  //.cart .click-product-cart
        window.location.href = `product?id=${idProduct}`;
    })
}


function clickFeaturedsProduct() {
    $("#featuredsproducts .flip-box").click(function () {
        let idProduct = $(this).parents(".carousel-item").attr("data-id"); //.cart .click-add-cart
        window.location.href = `product?id=${idProduct}`;
    })
}

// function clickFeaturedsProductAddCart() {
//     $("#featuredsproducts .fp__label").click(function () {
//         let idProduct = $(this).parents(".carousel-item").attr("data-id"); //.cart .click-add-cart
//         alert("add to cart " + idProduct);
//         return false;
//     })
// }

// query dùng để chánh bị hiểu là click nhiều lần vào các block có class giống nhau
function clickAddCart(query) {
    $(`${query} .click-add-cart`).click(function () {
        var idProduct = $(this).parents(".add-id-cart").attr("data-id"); //.cart .click-add-cart
        let infoProduct = {};
        $.ajax({
            type: "GET",
            url: URL_API + "/v1/public/product/find-by-id?id=" + idProduct,
            headers: {
                "adminbksoftwarevn": tokenHeader_value
            },
            dataType: "json",
            success: function (result) {
                if (typeof (Storage) !== "undefined") {
                    infoProduct = {
                        "id": result.id,
                        "name": result.name,
                        "originCostRetail": result.originCostRetail,
                        "saleCostRetail": result.saleCostRetail,
                        "image": result.image,
                        "quantity": 1
                    };
                    var arrProductLocal = JSON.parse(localStorage.getItem("productAddToCard"));

                    if (arrProductLocal == 0 || arrProductLocal === null) {
                        arrProductLocal = [];
                    }
                    if (arrProductLocal.length == 0) {
                        arrProductLocal.push(infoProduct);
                    } else {
                        let check = false;
                        for (let i = 0; i < arrProductLocal.length; i++) {
                            if (arrProductLocal[i].id == infoProduct.id) {
                                // infoProduct.quantity = infoProduct.quantity + 1;
                                arrProductLocal[i].quantity = arrProductLocal[i].quantity + 1;
                                check = true;
                                break;
                            }
                        }
                        if (!check) {
                            arrProductLocal.push(infoProduct);
                        }

                    }
                    localStorage.setItem("productAddToCard", JSON.stringify(arrProductLocal));
                    alterThatFruitSuccess("Thêm sản phẩm vảo giỏ thành công.", 2000);


                    updateAmountProductInCart()
                } else {
                    alterThatFruitWarning('Trình duyệt của bạn đã quá cũ. Hãy nâng cấp trình duyệt hoặc đổi sang một trình duyệt khác!');
                }


            },
            error: function (err) {
                console.log(err);

            }
        });


    })
}

// check login
function checkLogin() {
    let user = JSON.parse(localStorage.getItem("infoUser"));

    if (user !== null && user != {}) {

        if (user.id === null || user.id == 0 || user.id < 0) {
        } else {
            let tmp = "";
            tmp += `
           <i class="fas fa-user"></i> 
         ${user.fullName}
        `;
            $("#dropdownMenuButton").html(tmp);
            $("#dropdownMenuButton").click(function () {
                window.location.href = "user";
            })
            $(".dropdown-menu .dropdown-item:nth-child(1)").hide();
            $(".dropdown-menu .dropdown-item:nth-child(2)").hide();
            $(".dropdown-menu .dropdown-item:nth-child(3)").show();
            $("#out").click(function () {
              localStorage.clear();
                location.href = "home";
            })
        }
    } else {

        $(".dropdown-menu .dropdown-item:nth-child(1)").show();
        $(".dropdown-menu .dropdown-item:nth-child(2)").show();
        $(".dropdown-menu .dropdown-item:nth-child(3)").css({"display": "none"});
    }


}



// get số lượng sản phẩm với giá tiền đổ vào header cart
function updateAmountProductInCart() {

    let listPrd = JSON.parse(localStorage.getItem("productAddToCard"))

    let amoutProduct;
    let money = 0;
    if (listPrd == null || listPrd.length == 0) {
        money = 0;
        amoutProduct = 0;
    } else {
        amoutProduct = listPrd.length;
        // tinh tien
        listPrd.map(function (data, index) {

            let price = 0;
            if (data.saleCostRetail == null || data.saleCostRetail == 0) {
                if (data.originCostRetail > 0 || data.originCostRetail != null) {
                    price = data.originCostRetail * data.quantity;
                }
            } else {
                price = data.saleCostRetail * data.quantity;
            }
            money += price;
        })

    }

    let tmp = "";
    tmp += `
 <button class="card-item1 btn card1" type="button">
                        <i class="fas fa-cart-arrow-down"></i><span> ${amoutProduct} sp</span> <span>${formatNumber(money, '.', '.')} VNĐ</span>
                    </button>
`;
    // $("#car1").html(tmp);
    // $("#car1").click(function () {
    //     window.location.href = "cart";
    // })

    $(".cart1").html(tmp);
    $(".cart1").click(function () {
        window.location.href = "cart";
    })
}

// thấy thông tin người dùng đăng nhập từ cookie
function getUserCookie() {
    let str = document.cookie.split(";");
    let str2 = function (query) {
        return str.filter((elemnt) => {
            return elemnt.toLowerCase().indexOf(query.toLowerCase()) > -1;
        })
    }
    let str3 = str2('email');
    let str4 = str3.toString().split('=');
    let email = str4[str4.length - 1];
    token = localStorage.getItem("infoUserLogin");
    if (token != null) {
        tokenGetInfo = token.split("\"");
        token = tokenGetInfo[1];
        let dataUser = {}
        $.ajax({
            type: "GET",
            url: URL_API + "/v1/user/user/find-by-email?email=" + email,
            headers: {
                "Authorization": token
            },
            dataType: "json",
            setTimeout: 2000,
            success: function (result) {
                // dataUser = {
                //     "id": result.id,
                //     "fullName": result.fullName,
                //     "email": result.email
                // }

                localStorage.setItem("infoUser", JSON.stringify(result));
                checkLogin();
            },
            error: function () {


            }
        });
    }
}

// nhập email đăng kí nhận thông tin
function setFormFeedBack() {

    if ($("#valsmail").val().match('^[a-z][a-z0-9_.]{5,32}@[a-z0-9]{2,}(.[a-z0-9]{2,4}){1,2}$')) {
        let email = {
            "email": $("#valsmail").val(),
            "checked": 'false',
            "title": 'Hỏi Đáp',
            "content": "Tôi muốn nhận nhận lời khuyên, tin tức và khuyến mãi từ Thật Fruit !",
            "phone": "",

            "fullName": "",
        }

        $.ajax({
            type: "POST",
            url: URL_API + "/v1/public/contact-form",
            headers: {
                "adminbksoftwarevn": tokenHeader_value
            },
            contentType: "application/json",
            data: JSON.stringify(email),
            timeout: 3000,
            success: function (result) {
                alterThatFruitSuccess("Đăng kí thành công");
            },
            error: function (err) {
                console.log(err);
            }
        })
    } else {
        alterThatFruitWarning("Vui lòng kiểm tra lại email bạn vừa nhập");
    }


}


// function findByNameProduct(name) {
//
//     $.ajax({
//         type: "GET",
//         url: URL_API+  "api/v1/public/product/",
//         data: "data",
//         dataType: "dataType",
//         success: function (response) {
//
//         }
//     });
// }