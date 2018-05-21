$(document).ready(function () {
        init();
    }
);


function init() {

    $('.message a').click(function(){
        $('form').animate({height: "toggle", opacity: "toggle"}, 350);
    });

    $('.register-form button').click(function () {
        console.log("------register-------");
        registerUserName = $(".register-form input[placeholder='name']").val();
        registerPassword = $(".register-form input[placeholder='password']").val();
        registerEmail    = $(".register-form input[placeholder='email address']").val();
    })
    $('.login-form button').click(function () {
        console.log("login");

        $('.login-form input').prop('disabled', true);
        $('.login-form p').animate({opacity: "toggle", display:"none"}, "fast");
        $('.login-form button').animate({opacity: "toggle", display:"none"}, "fast").queue(function () {
            $('.login-form .loading').animate({opacity: "toggle", display:"block"}, "slow").dequeue;
        });


    })
}

