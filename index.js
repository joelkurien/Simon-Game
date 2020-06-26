//The javascript for creating a simon's game using a jQuery library
//Variables required for the game
var gamePattern = [];
var buttonColor = ['red','blue','green','yellow'];
var userClickedPattern = [];
var level = 1;

//Choosing a random color and adding it to gamePattern
function nextSequence(){
  userClickedPattern = []
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColor[randomNumber];
  gamePattern.push(randomChosenColor);
  blink(randomChosenColor);
  setTimeout(blink,5);
  sounds(randomChosenColor);
  $('h1').text('Level ' + level);
  level ++;
}

//Functions for animations
function blink(n){
  $("#" + n).fadeOut(200);
  $('#' + n).fadeIn(200);
}

function sounds(color){
  var audio = new Audio('sounds/'+color+'.mp3');
  audio.play();
}

function animatePress(currentColor){
  $("#" + currentColor).addClass('pressed');
  setTimeout(function(){
    $("#" + currentColor).removeClass('pressed');
  },100);
}

//to check the Simon's game rules
function checkAnswer(currentLevel){
 if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
   console.log('success');
   if(userClickedPattern.length === gamePattern.length){
     setTimeout(function(){
       nextSequence();
     },1000);
   }
}
 else
 {
   console.log('wrong');
   $('body').addClass('game-over');
   setTimeout(function(){
     $('body').removeClass('game-over');
   },200);
   startOver();
 }
}

//the restart condition
function startOver(){
  gamePattern = [];
  userClickedPattern = [];
  level = 1;
}

//statements for calling the nextSequence()
var toggle = 0;
$(document).on('keypress',function(event){
  toggle = 1;
  if (toggle === 1){
    nextSequence();
  }
})

//Users input
$(".btn").on('click',function(){
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  sounds(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
})
