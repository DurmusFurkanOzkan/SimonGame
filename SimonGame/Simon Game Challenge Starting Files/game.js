var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level;

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  play();

});

$("body").one("keypress", function() {
  level = 0;
  $("h1").text("Level " + level);
  userClickedPattern = [];
  gamePattern = [];
  nextSequence();
});

function nextSequence() {
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour);
  animatePress(randomChosenColour);
}

function playSound(name) {
  $("#" + name).fadeIn(100).fadeOut(100).fadeIn(100);
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass('pressed');
  setTimeout(function() {
    $("#" + currentColour).removeClass('pressed');
  }, 10);
}

async function play() {
  var flag = true;

  console.log(gamePattern);
  console.log(userClickedPattern);
  for (let i = 0; i < userClickedPattern.length; i++) {
    if (gamePattern[i] != userClickedPattern[i]) {
      flag = false;
    }

  }
  if (flag == true) {
    if (level == userClickedPattern.length) {
      userClickedPattern = [];
      await sleep(1000);
      nextSequence();
      $("h1").text("Level " + level);
    }

  } else {
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").one("keypress", function() {
      level = 0;
      $("h1").text("Level " + level);
      userClickedPattern = [];
      gamePattern = [];
      nextSequence();
    });
    $("body").addClass('game-over');
    setTimeout(function() {
      $("body").removeClass('game-over');
    }, 200);
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}
