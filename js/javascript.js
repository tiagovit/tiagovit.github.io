window.onload = init;

function testFirebase(){
    var firebaseRef = firebase.database().ref();
    var firebaseRefMusic = firebase.database().ref().child("music");

    firebaseRefMusic.on('value', function (dataSnap) {
        console.log(dataSnap.val());

    })
    console.log(firebaseRef);
}




function init() {
    //alert("works");
document.getElementById("sliderTime").addEventListener("input",mudarCorProgresso);
document.getElementById("arrowToBrowser").addEventListener("click", toggleBrowser);
document.querySelectorAll(".controls img")[0].addEventListener("click", previousSong);
document.querySelectorAll(".controls img")[1].addEventListener("click", pausePlaySong);
document.querySelectorAll(".controls img")[2].addEventListener("click", nextSong);

}

function previousSong() {

}

function pausePlaySong() {

    var imgElement = this;

    (this.getAttribute("class") == "pauseSong")?togglePlayPauseButton("playSong", imgElement):togglePlayPauseButton("pauseSong", imgElement);

}

function togglePlayPauseButton(className, imgElement) {
    imgElement.setAttribute("class",className);
    (className == "pauseSong")?imgElement.setAttribute("src","img/pauseButton.png"):imgElement.setAttribute("src","img/playButton.png");

}

function nextSong() {

}


function toggleBrowser() {

    document.querySelector(".player").classList.toggle("open");
}



function mudarCorProgresso(e){

    val = (e.target.value - this.getAttribute("min")) / (this.getAttribute("max") - this.getAttribute("min"));

    this.style.backgroundImage = '-webkit-gradient(linear, left top, right top, '
        + 'color-stop(' + val + ', #BC493E), '
        + 'color-stop(' + val + ', #434343)'
        + ')';

}


