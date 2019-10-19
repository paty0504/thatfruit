$(document).ready(function () {
    checkLogin();
    clickSignUp();
    $("#submit").click(() => {
        checkUserLogin();
    })

});
// lấy dữ liệu từ form đăng nhập của người dùng gửi lên database
function postUserLogin(user) {

    $.ajax({
        type: "POST",
        url: URL_API + "/v1/public/user/login",
        data: JSON.stringify(user),
        headers: {
            "adminbksoftwarevn": tokenHeader_value
        },
        contentType: "application/json",
        timeout: 2000,
        success: function (user) {

            if (user == "username or password is not correct") {
                alterThatFruitWarning("Tài khoản hoặc mật khẩu không chính xác",1000);
            } else {
                 localStorage.setItem("infoUserLogin", JSON.stringify(user));
                 token= localStorage.getItem("infoUserLogin");
                 document.cookie = "token=" + token ;
                document.cookie = "dataInfo=" + user.id;
                window.location = "home";
            }

        },
        error: function () {
            alterThatFruitDanger("lỗi",1000);
        }
    });
}

// check name và passwword đứng định dạng mới cho nhậm
function checkUserLogin() {

    let user = {
        'username': $("#username").val(),
        'password': $("#password").val()
    }

    if ($("#username").val().match("(^[a-z][a-z0-9_\\.]{5,32}@[a-z0-9]{2,}(\\.[a-z0-9]{2,4}){1,2}$)")) {
        postUserLogin(user);

    } else {
        alterThatFruitWarning("kiểm tra lại sđt, tên hoặc email",1000);
    }
}

function clickSignUp() {
    $("#submit").prop("disabled", true);
    let click_check = $("#agree").prop("checked");

    if (click_check == false) {
        let click_agree = "click_0";
        $("#agree").click(function () {
            if (click_agree == "click_0") {
                $("#submit").prop("disabled", false);
                click_agree = "click_1";
            } else {
                $("#submit").prop("disabled", true);
                click_agree = "click_0";
            }
        });
    }
}