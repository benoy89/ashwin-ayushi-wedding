let musicPlaying = false;

const flipSound = new Audio("audio/pageflip.mp3");

function resizeFlipbook() {
  const width = Math.min(window.innerWidth * 0.92, 420);
  const height = width * 1.777;

  if ($("#flipbook").data("turn")) {
    $("#flipbook").turn("size", width, height);
  }
}

$(document).ready(function () {
  const width = Math.min(window.innerWidth * 0.92, 420);
  const height = width * 1.777;

  $("#flipbook").turn({
    width: width,
    height: height,
    autoCenter: true,
    display: "single",
    acceleration: true,
    gradients: true,
    elevation: 150,
    duration: 1800
  });

  window.addEventListener("resize", resizeFlipbook);
});

function startInvitation() {
  document.getElementById("startScreen").style.display = "none";

  const music = document.getElementById("bgMusic");
 
  music.volume = 0.18;
  music.play().then(() => {
    musicPlaying = true;
  }).catch(() => {
    musicPlaying = false;
  });
}

function nextPage() {

  flipSound.currentTime = 0;
  flipSound.play();

  $("#flipbook").turn("next");
}

function previousPage() {

  flipSound.currentTime = 0;
  flipSound.play();

  $("#flipbook").turn("previous");
}

function toggleMusic() {
  const music = document.getElementById("bgMusic");

  if (musicPlaying) {
    music.pause();
    musicPlaying = false;
  } else {
    music.play();
    musicPlaying = true;
  }
}

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") nextPage();
  if (e.key === "ArrowLeft") previousPage();
});
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", function(e) {
    touchEndX = e.changedTouches[0].screenX;

    if (touchEndX < touchStartX - 50) {
        $("#flipbook").turn("next");
    }

    if (touchEndX > touchStartX + 50) {
        $("#flipbook").turn("previous");
    }
});
$("#flipbook").bind("turned", function(event, page) {

  if(page === 8){

    const music = document.getElementById("bgMusic");

    let fade = setInterval(function(){

      if(music.volume > 0.02){

        music.volume -= 0.02;

      } else {

        music.pause();
        clearInterval(fade);

      }

    }, 500);

  }

});