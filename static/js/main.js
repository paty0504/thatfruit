$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();

    $('#blogCarousel').carousel({
        interval: 5000
    });

    $('#blogCarouselb').carousel({
        interval: 5000
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() > 40) {
            $('#up').fadeIn();
        } else {
            $('#up').fadeOut();
        }
    });

    //Scroll
    $('#up').click(function () {
        $('html,body').animate({ scrollTop: 0 }, 800)
    });

    $('#productmenu .ps1').click(function () {
        scrollElement('#productmenu .ps1','#supperoffer', 600);
    })

    $('#productmenu .ps2').click(function () {
        scrollElement('#productmenu .ps2','#bestsellers', 800);
    })

    $('#productmenu .ps3').click(function () {
        scrollElement('#productmenu .ps3','#featuredsproducts', 1000);
    })

    $('#productmenu .ps4').click(function () {
        scrollElement('#productmenu .ps4','#dealsmonth',1200);
    })

    $('#productmenu .ps5').click(function () {
        scrollElement('#productmenu .ps5','#news',1400);
    })

    $('#productmenu .ps6').click(function () {
        scrollElement('#productmenu .ps6','#feedback',1600);
    })

    //Scroll-nav
    let lg = $('main').offset().top + $('nav').height();
    $(document).scroll(function() {
        let width = $(window).width();
        if (width >= 992 && $(this).scrollTop() >= lg) {
            $('nav').addClass('scroll-nav');
        } else {
            $('nav').removeClass('scroll-nav');
        }
    })
    //pagination
    // $(".paginationjs-pages ul li").click(function () {
    //     $(this).css({"background":"var(--bg-color1)"});
    //     $(this).children().css("color","white");
    // })
});

function scrollElement(start,end, time){
    $('body, html').animate({
        scrollTop: $(end).offset().top - 30
    }, time);
}

//deivide number product in one slide
function divideProductSliderResponsive(query) {
    let listHtml = $(`${query} .p-1`); //get all class p-1, all product
    let width = $(window).width();
    let textHtml = ``;
    if (width >= 992) {
        textHtml = listProductSliderResponsive(listHtml,3); //call number product in one slide
    } else if(width >= 768) {
        textHtml = listProductSliderResponsive(listHtml,2);
    } else {
        textHtml = listProductSliderResponsive(listHtml,1);
    }
    $(query).html(textHtml);
    $(`${query} .carousel-item:nth-child(1)`).addClass("active"); //active carouse-iteam fist
}

//set product deivide in one slide with windown resize
function setProductSliderResponsive(query, action) {
    divideProductSliderResponsive(query);
    clickProductCart("#dealsmonth"); // to product
    clickAddCart("#dealsmonth"); //add cart
    $(window).resize(function () {
        divideProductSliderResponsive(query);
        clickProductCart("#dealsmonth"); // to product
        clickAddCart("#dealsmonth"); //add cart
    })
}

//
function listProductSliderResponsive(listHtml,numberProduct) {
    let length = listHtml.length;
    let textHtml = '';
    // case 1 special
    if (numberProduct > 1) {
        textHtml = `<div class="carousel-item"><div class="row d-flex justify-content-center">`;
        for (let i = 1;;) {
            let n = i + numberProduct;
            for (let j = i; j < n; j++) {
                let text = $(listHtml[j-1]).html();
                textHtml += `<div class="p-1">`;
                textHtml += text === undefined ? `<div class="card"></div>` : text; // full slot when short product
                textHtml += `</div>`;
            }
            i += numberProduct;
            if(i < length) {
                textHtml += `</div></div><div class="carousel-item "><div class="row d-flex justify-content-center">`;
            } else {
                break;
            }
        }
        textHtml += `</div></div>`;
    } else {
        for (let i = 1; i <= length; i++) {
            textHtml += `<div class="carousel-item"><div class="row d-flex justify-content-center"><div class="p-1">`;
            textHtml += $(listHtml[i-1]).html();
            textHtml += `</div></div></div>`;
        }
    }
    return textHtml;
}

function alterThatFruitImage(text) {
    $.notify({
        icon: 'https://i.ibb.co/Cv7fMnW/icon-Logo.png',
        title: 'Thật Fruit',
        message: text
    },{
        delay: 3000,
        offset: 65,
        icon_type: 'image',
        type: 'minimalist',
        template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
            '<img data-notify="icon" class="img-circle pull-left">' +
            '<div class="text-mess">' +
            '<span data-notify="title">{1}</span>' +
            '<span data-notify="message">{2}</span>' +
            '</div>' +
            '</div>'
    });
}

function alterThatFruitSuccess(text,time) {
    $.notify({
        icon: 'far fa-check-circle',
        message: text
    },{
        delay: time,
        offset: 65,
        type: 'success',
    });
}

function alterThatFruitInfo(text,time) {
    $.notify({
        icon: 'fas fa-info-circle',
        message: text
    },{
        delay: time,
        offset: 65,
        type: 'info',
    });
}

function alterThatFruitWarning(text,time) {
    $.notify({
        icon: 'fas fa-exclamation',
        message: text
    },{
        delay: time,
        offset: 65,
        type: 'warning',
    });
}

function alterThatFruitDanger(text,time) {
    $.notify({
        icon: 'fas fa-exclamation-triangle',
        message: text
    },{
        delay: time,
        offset: 65,
        type: 'danger',
    });
}