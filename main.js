
let buttonColors = ['green', 'red', 'yellow', 'blue'];
let gamePattern = []; 
let userClickedPattern = [];
let started = false;
let level = 0;

$(document).keypress(function() {
    if (!started) {
        $("#main-header").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".game-button").click(function(){
    let userChosedColor = $(this).attr("id");
    userClickedPattern.push(userChosedColor);
    playSound(userChosedColor);
    animatePress(userChosedColor);
    checkAnswer(userClickedPattern.length-1)
});

function nextSequence() {
    userClickedPattern = [];
    level++
    $("#main-header").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChoosedColor = buttonColors[randomNumber];
    gamePattern.push(randomChoosedColor);
    $("#" + randomChoosedColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosedColor);
} 

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".wav");
    audio.play();
}
function animatePress(currentColor) {
    $('#' + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}
function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("SUCCESS");
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("WRONG");
        let gameOverSOund = new Audio("sounds/wrong.wav");
        gameOverSOund.play();
        $("#main-header").html("Game over, Press any key to restart. <span>Your score: " + level + "</span>");
        // $("#main-header").html("<span>Your score: " + level + "</span>");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 2000);
        startOver();
    }
}
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
// END