var movesArr = [], playerArr =[];
var count=0;
var strict = "off";
var game = "off";
var now = "compMoves";
var timer, secs=0;
var error="no";
var time = "true";

function hello(){
  alert("hello");
  
  var audio = document.getElementById("sound-5");
  audio.play();
  
}


$( document ).ready(function() {
  
  $(".startBtn").prop('disabled', true);
  $(".strictBtn").prop('disabled', true);  

});

$("#onOff").on("change", function (event) {
    if ($(this).is(":checked")) {
        $(".startBtn").prop('disabled', false);
        $(".strictBtn").prop('disabled', false);
        document.getElementById("screen").innerHTML = "--";
      
    } else {
        $(".startBtn").prop('disabled', true);
        $(".strictBtn").prop('disabled', true);
        document.getElementById("screen").innerHTML = "";
        clearGame();
    }
});

function clearGame(){
  movesArr.splice(0, movesArr.length);
  playerArr.splice(0, playerArr.length);
  count=0;
  now ="compMoves";
  stopTimer();
}


function startGame(){
  document.getElementById("screen").innerHTML = "--";
  clearGame(); 
  setTimeout(function(){
    getMoves();
  }, 500)
 
  
}

function strictMode(){
 //alert("strict");
  if (strict == "off"){
    strict = "on";
    document.getElementById("strc").innerHTML = strict;
    return;
  }
  
  else if (strict == "on"){
    strict = "off";
    document.getElementById("strc").innerHTML = strict;
    return;
  }
 
}


function getMoves(){
  now = "compMoves";
   x = Math.floor(Math.random() * 4) + 0;  
  movesArr.push(x);
  document.getElementById("screen").innerHTML = movesArr.length;
  clearPlayer();
  showMoves();
}


function showMoves() {
  now ="compMoves"
  var i = 0;
  var moves = setInterval(function(){
    playGame(movesArr[i]);
    i++;
    if (i >= movesArr.length) {
      startTimer();      
      clearInterval(moves);
      now = "player";
    }
  }, 1000)
}

function playGame(tile) {
  document.getElementById(tile).style.opacity = "1";
  var audio = document.getElementById("sound-" + tile);
  audio.play();
   
  setTimeout(function(){
    document.getElementById(tile).style.opacity = "0.4";
  }, 500);
  stopTimer();
}


function addToPlayer(id) {
  if(now == "compMoves"){
    return;
  }
  stopTimer();
  playGame(id);
  playerArr.push(id);
  count++;
  time = "true";
  analyzer();
  startTimer();
  
}

function analyzer(){
  
   var index = count-1;
  //if(index == -1){
    //index = 0;
    //alert(playerArr[0]);
  //}
 
  if(playerArr[index] != movesArr[index] || time == "false"){
      document.getElementById("screen").innerHTML = "!!";
      var audio = document.getElementById("sound-4");
      audio.play();  
    
      if(strict == 'off'){
          clearPlayer();
          setTimeout(function(){
            document.getElementById("screen").innerHTML = movesArr.length ;
          }, 500);
          
         showMoves();
      }
      if(strict == 'on'){
         
        setTimeout(function(){
           clearGame();
           getMoves(); 
         }, 500);
        
      }
  }
  
  if(playerArr[index] == movesArr[index]){
        if(playerArr.length == movesArr.length){     
            if(movesArr.length == 20){
              document.getElementById("screen").innerHTML = "20";
               var audio = document.getElementById("sound-5");
               audio.play();
              
              var myVar = setInterval(function(){ setColor() }, 300);
               var x;
              function setColor() {
                   x = document.getElementById("counts");
                   x.style.backgroundColor = x.style.backgroundColor == "yellow" ? "pink" :"yellow";
               }
              
                setTimeout(function(){
                    clearInterval(myVar);
                    clearGame();
                    getMoves();
                    x.style.backgroundColor = "white";
                }, 3000);
             }
            else{
            setTimeout(function(){
               getMoves();
            }, 800);
          }
          now ="compMoves";
     
        }     
  }
  
  
}

function clearPlayer(){
  playerArr.splice(0, playerArr.length);
  count=0;
  stopTimer();
}


function startTimer(){
  secs=0;
    timer = setInterval(function(){ 
        secs++;
      //document.getElementById("timer").innerHTML = secs ;
      if (secs > 5){
          clearInterval(timer);
          time = "false";
          clearPlayer();
          analyzer();
      }
    }, 1000);

  
}


function stopTimer(){
  //document.getElementById("timer").innerHTML = "";
  clearInterval(timer);
}
