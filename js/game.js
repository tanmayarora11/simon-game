var btnColors = ["red","blue","green","yellow"];

var gamePattern = [];
var userClickPattern = [];

var start = false;
var level = 0;

$(document).keypress(function(){
    
    if (!start)
    {
        $("#level-title").text("Level " + level);
        newSequence();
        start = true;
    }

});

$(".btn").on("click",function(){

    var userChoice = $(this).attr("id");
    userClickPattern.push(userChoice);

    playSound(userChoice);
    animatePress(userChoice);

    checkanswer(userClickPattern.length - 1);

});

function checkanswer(currentlevel){

    if(gamePattern[currentlevel] === userClickPattern[currentlevel])
    {
        if(userClickPattern.length === gamePattern.length)
        {
            setTimeout(function(){
            newSequence();
            },1000);
        }
    }    
    else 
    {
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function newSequence(){

    userClickPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomno = Math.floor(Math.random()*4);
    var randomChoosenColor = btnColors[randomno];
    gamePattern.push(randomChoosenColor);

    $("#"+ randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColor);

}

function animatePress(currentColor){

    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    },100);
}

function playSound(name){

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function startOver(){
    level = 0;
    gamePattern = [];
    start = false;
}




