$(document).ready(function () {
        init();
    }
);


function init() {


    $('.logout').click(function(){

        firebase.auth().signOut().then(function() {
            window.location.href = "login.html";
        })

    });

    $('.update').click(function () {

        var user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: "tiagovit"
        }).then(function() {
            console.log(firebase.auth().currentUser);
        }).catch(function(error) {
            // An error happened.
        });
    })

}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
    } else {
        window.location.href = "login.html";
    }
});