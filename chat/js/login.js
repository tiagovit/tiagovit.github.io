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
        console.log("------register-------");
        registerUserName = $(".register-form input[placeholder='username']").val();
        registerPassword = $(".register-form input[placeholder='password']").val();
        registerEmail    = $(".register-form input[placeholder='email address']").val();
    });
    $('.login-form button').click(function (event) {
        event.preventDefault();
        console.log("login");

        $('.login-form input').prop('disabled', true);
        $('.login-form input').css({
            "background":"#e6e6e6",
            "cursor":"not-allowed"
        });

        $('.login-form p').animate({opacity: "toggle", display:"none"}, "fast");
        $('.login-form button').animate({opacity: "toggle", display:"none"}, "fast").queue(function () {
            $('.login-form .loading').animate({opacity: "toggle", display:"block"}, "slow").dequeue;
        });

        loginUserName = $(".login-form input[placeholder='username']").val();
        loginPassword = $(".login-form input[placeholder='password']").val();


        firebase.auth().signInWithEmailAndPassword(loginUserName, loginPassword).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...


            if(errorCode != ""){
                switch (errorCode){
                    case "auth/invalid-email" :
                        ;//TODO erro de email
                    break;
                    

                }
            }
        });

    })
}






//==============================FIREBASE==============================
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log("yay logged in");
    } else {
        // No user is signed in.
    }
});