// initializing the colours and the random gamePattern, userClickedPattern and if the game has started or not and the level number
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

//keyboard press is detected and if game started (true) , the title is changed to the level name and the next sequence is started.
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


// the id of the button when clicked is retrieved which is going to be the color and it is pushed to the array of  userClickedPattern and respective sound, animation is done while checking the answer
$( ".btn" ).click(function() {
 var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);

});

// checking the answer, if it is right what should happen. if its wrong what should happen.
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
          console.log("success");
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
     playSound("wrong");
     $("body").addClass("game-over");
     setTimeout(function() {
        $("body").removeClass("game-over");
            $("#level-title").text("Game Over, Press Any Key to Restart");
      }, 100);
      startOver();
    }


}


// the next computer generated random sequence
function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level "+level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}

// fumction to play sound
function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// function to animate the button press
function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function() {
     $("#"+currentColour).removeClass("pressed");}, 100);
}

// function to Restart the game.
function startOver(){
  level = 0;
  gamePattern = [];
  started = false;

}
