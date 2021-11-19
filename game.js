// variables
var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;
var repetitionMode = false;
var soundOn = true;
var x = 0; //  set your counter to 0 to repeat sequence

$(document).keypress(startGame);

function startGame() {
  if (!started) {
    console.log(started);
    console.log("entrou startGame");
    $("#level-title").text("Level " + level);
    $(".button-layout.start").css("visibility", "hidden");
    setTimeout(() => {
      nextSequence();
    }, 500);
    started = true;
  }
}

$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  //   console.log(userClickedPattern);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

$(".button-layout.start").click(startGame);

$(".button-layout.turn").click(function () {
  repetitionMode = !repetitionMode;
  $(".button-layout.turn").toggleClass("green-button-layout");
  if (repetitionMode) {
    $(".button-layout.turn").text("Repetition On");
  } else {
    $(".button-layout.turn").text("Repetition Off");
  }
});

$(".button-layout.sound").click(function () {
  soundOn = !soundOn;
  $(".button-layout.sound").toggleClass("green-button-layout");
  if (soundOn) {
    $(".button-layout.sound").text("Sound On");
  } else {
    $(".button-layout.sound").text("Sound Off");
  }
});

function repeatGamePattern() {
  setTimeout(function () {
    animatePress(gamePattern[x]);
    playSound(gamePattern[x]);
    x++;
    if (x < gamePattern.length) {
      repeatGamePattern();
    }
  }, 200);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Right");

    if (userClickedPattern.length === gamePattern.length) {
      if (repetitionMode) {
        repeatGamePattern();
        x = 0; // clear repetition index
        setTimeout(function () {
          nextSequence();
        }, gamePattern.length * 300 + 300);
      } else {
        x = 0; // clear repetition index
        setTimeout(function () {
          nextSequence();
        }, 300);
      }
    }
  } else {
    console.log("Wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over. Pess Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  $(".button-layout.start").css("visibility", "");
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var rand = Math.floor(4 * Math.random());
  var randomChosenColor = buttonColors[rand];
  gamePattern.push(randomChosenColor);
  $("." + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
}

function playSound(name) {
  if (soundOn) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
