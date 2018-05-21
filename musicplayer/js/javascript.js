window.onload = init;


var dataSnaptadidoo;
function testFirebase(){
    var firebaseRef = firebase.database().ref();
    var firebaseRefMusic = firebase.database().ref().child("music");

    firebaseRefMusic.on('value', function (dataSnap) {
        console.log(dataSnap.val());
        dataSnaptadidoo = dataSnap.val();

    })
    console.log(firebaseRef);
}

function firebaseFurtherTesting(){
    console.log(dataSnaptadidoo);
}



function init() {
    document.querySelector(".app").style.minHeight = (85 / 100)*window.innerHeight+"px";
    document.querySelector(".app").style.minWidth = (53 / 100)*window.innerHeight+"px";
document.getElementById("sliderTime").addEventListener("input",mudarCorProgresso);
    document.getElementById("sliderTime").addEventListener("change",mudarCorProgresso);
document.getElementById("arrowToBrowser").addEventListener("click", toggleBrowser);
document.querySelectorAll(".controls img")[0].addEventListener("click", previousSong);
document.querySelectorAll(".controls img")[1].addEventListener("click", pausePlaySong);
document.querySelectorAll(".controls img")[2].addEventListener("click", nextSong);
    document.getElementById("albumCover").addEventListener("load",setBackgroundColorWithImageColor);
    setBackgroundColorWithImageColor();
}


//  recebe numero de 0-100
function updateProgressMusic(percentagemProgresso) {
    sliderElement = document.getElementById("sliderTime");

    sliderElement.value = percentagemProgresso;

    val = (percentagemProgresso - sliderElement.getAttribute("min")) / (sliderElement.getAttribute("max") - sliderElement.getAttribute("min"));

    sliderElement.style.backgroundImage = '-webkit-gradient(linear, left top, right top, '
        + 'color-stop(' + val + ',' +colorProgressBar+'), '
        + 'color-stop(' + val + ', #434343)'
        + ')';
}//updateProgressMusic


function setBackgroundColorWithImageColor(){
    
    console.log("mudar cor background");
    
    var vibrant = new Vibrant(document.getElementById("albumCover"));
    var swatches = vibrant.swatches();
    //console.log(swatches["Vibrant"].getHex());
    //console.log(swatches["Muted"].getHex());
    //console.log(swatches["DarkVibrant"].getHex());
    //console.log(swatches["DarkMuted"].getHex());
    //console.log(swatches["LightVibrant"].getHex());
    if(swatches["Vibrant"]==null){
        if(swatches["LightVibrant"]==null){
            if(swatches["DarkVibrant"]==null){
                if(swatches["Muted"]==null){
                    if(swatches["DarkMuted"]==null){
                        hexBackgroundColor = "#191919";
                    }else{
                        hexBackgroundColor = swatches["DarkMuted"].getHex();
                    }
                }else{
                    hexBackgroundColor = swatches["Muted"].getHex();
                }
            }else{
                hexBackgroundColor = swatches["DarkVibrant"].getHex();
            }
        }else{
            hexBackgroundColor = swatches["LightVibrant"].getHex();
        }
    }else{
        hexBackgroundColor = swatches["Vibrant"].getHex();
    }
    console.log(hexBackgroundColor);

    document.querySelector("#background").style.background = "linear-gradient("+ColorLuminance(hexBackgroundColor,-0.15)+",#101010 75%)";
    document.querySelector(".player").style.background = "linear-gradient("+ColorLuminance(hexBackgroundColor,-0.15)+",#101010 75%)";
    colorProgressBar = ColorLuminance(hexBackgroundColor,-0.05);

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
        + 'color-stop(' + val + ',' +colorProgressBar+'), '
        + 'color-stop(' + val + ', #434343)'
        + ')';

}//mudarCorProgresso

function toggleVisibility(elementToToggleVisibility){
    document.querySelector(elementToToggleVisibility).classList.toggle("visibilityHidden");
}



//------------------------Utilities---------------------------

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

/*function setBackgroundToImageColor(){

 var colorThief = new ColorThief();

 var sourceImage = document.getElementById("albumCover");

 tempArray = colorThief.getColor(sourceImage);

 //linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%),
 //document.querySelector(".player").style.backgroundColor = "rgb("+ tempArray[0]+","+tempArray[1]+","+tempArray[2]+")";
 document.querySelector(".player").style.background = "linear-gradient(rgb("+ tempArray[0]+","+tempArray[1]+","+tempArray[2]+"),#101010 75%)";

 }//getImageColor*/

function ColorLuminance(hex, lum) {

    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    }
    lum = lum || 0;

    // convert to decimal and change luminosity
    var rgb = "#", c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i*2,2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00"+c).substr(c.length);
    }

    return rgb;
}
