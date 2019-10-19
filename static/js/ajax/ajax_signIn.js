$(document).ready(function () {
    checkLogin();
    $("#submitSign").click(function () {
        checkInformation();
    });
});
// kieem tra email và so ten co dung dinh dạng hay khong
function checkInformation() {
    if ($("#name").val().match("(.{3,11})") && $("#email").val().match("(^[a-z][a-z0-9_\\.]{5,32}@[a-z0-9]{2,}(\\.[a-z0-9]{2,4}){1,2}$)")) {
        checkPassword();

    } else {
        alterThatFruitWarning("kiểm tra lại sđt, tên hoặc email",1000);
    }
}
// kiem tra password 1 với 2 xem có trung nhau hay khong
function checkPassword() {

    if ($("#password-v2").val() == $("#password").val()) {
       postUser();

    } else {
      alterThatFruitWarning("Mật khẩu không trùng ",1000)
    }

}

// post thong tin user len database
function postUser() {
    let user = {
        "email":$("#email").val(),
        "password":$("#password").val(),
        "fullName":$("#name").val()
    }


    $.ajax({
        type: "POST",
        url: URL_API+"/v1/public/user/register",
        data: JSON.stringify(user),
        headers: {
            "adminbksoftwarevn": tokenHeader_value
        },
        contentType: "application/json",
        timeout: 2000,
        success: function (response) {

            alterThatFruitImage('Đăng kí thành công')
            // let user2 = {
            //     "id":response.id,
            //     "email":response.email,
            //     "password":response.password,
            //     "fullName":response.fullName
            // };
            localStorage.setItem("infoUser",JSON.stringify(response) );
            document.cookie = "dataInfo="+user2.id;
            window.location="login";
        },
        error: function (err) {
            alterThatFruitWarning("Email đã được sử dụng, xin vui lòng thử một tài khoản khác")
            console.log(err);
        }

    });
}