$(document).ready(function () {
        init();
    }
);


function init() {

    $('.message a').click(function(){
        $('form').animate({height: "toggle", opacity: "toggle"}, 350);
    });

    $('.register-form button').click(function (event) {
        event.preventDefault();
        registerUserName = $(".register-form input[placeholder='username']").val();
        registerPassword = $(".register-form input[placeholder='password']").val();
        registerEmail    = $(".register-form input[placeholder='email address']").val();
    });

    $('.login-form input').focus(function () {

        $(this).css({
            "background":"#f2f2f2",
            "border-right":"13px solid transparent"
        });
        $('.login-form button').text('login');
    })

    $('.login-form button').click(function (event) {
        event.preventDefault();

        loginEmail = $(".login-form input[placeholder='email']").val();
        loginPassword = $(".login-form input[placeholder='password']").val();

        if(loginEmail == "" || loginEmail == null || loginEmail.length < 5
            || loginPassword == "" || loginPassword == null || loginPassword.length < 6
            || !isValidEmailAddress(loginEmail)){



            $('.login-form button').effect( "shake" );

            if(!isValidEmailAddress(loginEmail)){
                $('.login-form input:nth-child(1)').css({
                    "background":"#f2f2f2 url(img/warning.png) right no-repeat",
                    "border-right":"13px solid transparent",
                    "background-size":"16px"
                });
            }
            if(loginPassword.length < 5){
                $('.login-form input:nth-child(2)').css({
                    "background":"#f2f2f2 url(img/warning.png) right no-repeat",
                    "border-right":"13px solid transparent",
                    "background-size":"16px"
                });
            }
            $('.login-form input:nth-child(2)').val("");


            $('.login-form button').text('Invalid fields');

            return;
        }

        $('.login-form input').prop('disabled', true);
        $('.login-form input').css({
            "background":"#e6e6e6",
            "cursor":"not-allowed"
        });

        $('.login-form p').animate({opacity: "toggle", display:"none"}, "fast");
        $('.login-form button').animate({opacity: "toggle", display:"none"}, "fast").queue(function () {
            $('.login-form .loading').animate({opacity: "toggle", display:"block"}, "slow").dequeue();
        });




        firebase.auth().signInWithEmailAndPassword(loginEmail, loginPassword).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...

            console.log(errorCode,errorMessage);

            if(errorCode != ""){






                $('.login-form input').prop('disabled', false);
                $('.login-form input').css({
                    "background":"#f2f2f2",
                    "cursor":"auto"
                });

                $('.login-form p').animate({opacity: "toggle", display:"none"}, "slow");
                $('.login-form .loading').animate({opacity: "toggle", display:"none"}, "fast").queue(function () {
                    $('.login-form button').animate({opacity: "toggle", display:"block"}, "slow").delay(1000).dequeue();
                });







                switch (errorCode){
                    case "auth/invalid-email" :
                      console.log("invalid email")  ;//TODO erro de email
                    break;

                    case "auth/wrong-password" :
                        $('.login-form input:nth-child(2)').css({
                           "background":"#f2f2f2 url(img/warning.png) right no-repeat",
                            "border-right":"13px solid transparent",
                            "background-size":"16px"
                        });
                        $('.login-form button').text('Wrong Password');
                    break;

                    case "auth/user-not-found" :
                        $('.login-form a').trigger("click");
                        $('.register-form input:nth-child(3)').val(loginEmail);
                    break;



                }
            }
        });

    });
}






//==============================FIREBASE==============================
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log("yay logged in");
        $('.login-form input:nth-child(1)').val(user.email);
        $('.login-form input:nth-child(2)').val(user.l);




        $('.login-form input').prop('disabled', true);
        $('.login-form input').css({
            "background":"#e6e6e6",
            "cursor":"not-allowed"
        });

        $('.login-form p').animate({opacity: "toggle", display:"none"}, "fast");
        $('.login-form button').animate({opacity: "toggle", display:"none"}, "fast").queue(function () {
            $('.login-form .loading').animate({opacity: "toggle", display:"block"}, "slow").dequeue();
        });

        setTimeout(function() {
            window.location.href = "chat.html";
        }, 1000);

        //console.log(user);

        window.location()

    } else {
        // No user is signed in.
    }
});

//========================================================================================

function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);
    return pattern.test(emailAddress);
};