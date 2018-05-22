$(document).ready(function () {
        init();
    }
);


function init() {


    $('button').click(function(){

        firebase.auth().signOut().then(function() {
            window.location.href = "login.html";
        })

    });

}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
    } else {
        window.location.href = "login.html";
    }
});