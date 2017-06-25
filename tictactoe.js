var board = ["-","-","-",
             "-","-","-",
             "-","-","-"];
var player = ''; //AI
var opponent = '';  //player 1, the AI's opponent
var winner = "";
var playerNo ="";
var now = 'opponent';
var playerScore = 0, opponentScore = 0, drawScore =0;
var reset = 0;

updateScore();

function updateScore(){
  if(playerNo == 1){
    document.getElementById("opponentScore").innerHTML = "Your Score :  " + opponentScore;
    document.getElementById("playerScore").innerHTML = "Computer's Score :  " + playerScore;
  }
  
  if(playerNo == 2){
    document.getElementById("opponentScore").innerHTML = "Player 1:  " + opponentScore;
    document.getElementById("playerScore").innerHTML = "Player 2:  " + playerScore;
  }
  document.getElementById("drawScore").innerHTML = "draw:  " + drawScore;
}


function players(p){
  if(p == '1'){
    playerNo = 1;
  }
  if(p == "2"){
    playerNo = 2;
  }
  $('#chooseOX').show().siblings('div').hide();
}

function chooseOX(p){
  if(p == "O"){
    opponent = "O";
    player = "X";
  }else
  if(p == "X"){
    opponent = "X";
    player = "O";
  } 
  $('#xoBoard').show().siblings('div').hide();
  randomStart();
}

function randomStart(){
    var x = Math.floor((Math.random() * 2) + 1);
  
    if(playerNo == 1){
      document.getElementById('oppTurn').innerHTML = "Your Turn";
      document.getElementById('playerTurn').innerHTML = "Computer's Turn";
      
      if(x == 1){
        $('#opponent').show();
      }
      if(x == 2){
          $('#player').show();
          compMove();
       }
    }
  
    if(playerNo == 2){
      document.getElementById('oppTurn').innerHTML = "Go Player 1";
      document.getElementById('playerTurn').innerHTML = "Go Player 2";
        if(x == 1){
          $('#opponent').show();
        }
      
      if(x == 2){
        now = "player";
        $('#player').show();
      }
    }
}

function fillCell(y){ 
  if(board[y] !== "-"){
    return;
  } 
  
  if(now == 'opponent'){
  board.splice(y, 1, opponent);
  document.getElementById(y).innerHTML = opponent;
  }
  
  if(now == 'player'){
    board.splice(y, 1, player);
    document.getElementById(y).innerHTML = player;
  }
  
  setWin();
  
  if(playerNo == 1){
     // compMove();   //player is AI
    $('#player').show();
    $('#opponent').hide();
    setTimeout(compMove, 500);
  }
  
  else if(playerNo == 2){
    if (now == 'player'){ 
      now = 'opponent'; //human player2
      $('#opponent').show();
      $('#player').hide();
    }
    else if(now == 'opponent'){ 
      now = 'player'; //human player 1
      $('#player').show();
      $('#opponent').hide();
    }
  }
  
  if (reset == 1){
    $('#opponent').hide();
    $('#player').hide();
  }
  

}

function setPlayer(){
      if(opponent == 'o'){
          opponent = 'x';     
      }
      
     else if(opponent == 'x'){
          opponent = 'o';     
      }
}

function compMove(){
  var moves = findBestMove(board);
   
 //moves[0] is the bestValue and moves[1] is the bestMove
  board.splice(moves[1], 1, player);
  document.getElementById(moves[1]).innerHTML = player;
  setWin();
    $('#opponent').show();
    $('#player').hide();
  if (reset == 1){
    $('#opponent').hide();
    $('#player').hide();
  }

}

function setWin(){
    var win =evaluate();
  
    if(win == -10){
      if(playerNo == 1){
        document.getElementById("result").innerHTML = "You Won! :D ";
      }
      if(playerNo == 2){
        document.getElementById("result").innerHTML = "Player 1 Won! :D ";
      }
      winner = 'opponent';
      opponentScore++;
    }
  
    if(win == 10){
       if(playerNo == 1){
        document.getElementById("result").innerHTML = "Sorry, You Lost!";
      }
      if(playerNo == 2){
        document.getElementById("result").innerHTML = "Player 2 Won! :D ";
      }
      winner = 'player';
      playerScore++;
    }
  
    if((isMovesLeft(board) == 'false') && (winner=="")) {
      document.getElementById("result").innerHTML = "It's a draw!";
      winner = 'draw';
      drawScore++;  
    }
  
    updateScore();  
  
    if(winner != ""){
        $('#gameResult').show();
        reset =1;
      
        setTimeout(function(){
            resetBoard();
        }, 2000);
    }
}

function isMovesLeft(board){
    for (var i = 0; i<board.length; i++){
        if (board[i] =='-'){
            return 'true';
        }
    }
return 'false';
}  

function evaluate(){
    for (var i = 0; i < board.length; i += 3) {
        if (board[i] === board[i + 1] && board[i + 1] === board[i + 2]) {
            if (board[i] == player){
                return +10;  
            }
            else if(board[i]== opponent){
                return -10;
            } 
        }
    }
    for (var j = 0; j < board.length; j++) {
        if (board[j] === board[j + 3] && board[j + 3] === board[j + 6]) {
            if (board[j] == player){
                return +10;  
            }
            else if(board[j] == opponent){
                return -10;
            } 
        }
    }


  if ((board[4]==board[0] && board[4]==board[8]) || (board[4]==board[2] && board[4]==board[6])) {
    if (board[4]==player){
        return +10;
    }
    else if (board[4]==opponent){
        return -10;
    }
 }
return 0;

}

function minimax(board, depth, isMax){
    var score = evaluate(board);

    if (score == 10){
        return score;
    }

    if (score == -10){
        return score;
    }

    if (isMovesLeft(board) =="false"){
        return 0;
    }

    if (isMax == "true"){
        var best = -1000;

        for (var i = 0; i< board.length; i++){
            if (board[i]=='-'){
                board.splice(i, 1, player);
                var value = minimax(board, depth+1, "false");
                best = Math.max(best, value);

                board.splice(i, 1, "-");
            }
         }
         return best;  
     }

    else if (isMax == 'false'){
        var best = 1000;
        for (var i = 0; i<board.length; i++){
            if (board[i]=='-'){
             board.splice(i, 1, opponent);
             var value = minimax(board, depth+1, "true");
             best = Math.min(best, value);

             board.splice(i, 1, "-");
            }
         }
        return best;
      }
}

function findBestMove(board){
    var bestVal = -1000;
    var bestMove= -1;

    for (var i = 0; i<board.length; i++){
        if (board[i]=='-'){
            board.splice(i, 1, player);
            var moveVal = minimax(board, 0, "false");

            board.splice(i, 1, "-");

            if (moveVal > bestVal)
            {
                bestMove = i;
                bestVal = moveVal;
            }
        }
    }
    return [bestVal, bestMove];
}

function resetBoard(){
  for (var i = 0; i<board.length; i++){
         if(board [i] != "-"){
           board.splice(i, 1, '-');
           document.getElementById(i).innerHTML = "";
         }
   }    

  //randomStart();
  
  if(playerNo == 2){
    if (now == 'player'){ 
      now = 'opponent'; //human player2
      $('#opponent').show();
      $('#player').hide();
    }
    else if(now == 'opponent'){ 
      now = 'player'; //human player 1
      $('#player').show();
      $('#opponent').hide();
    }
  }
  
  
  winner = "";
  reset =0;
  $('#gameResult').hide();
}

function resetAll(){
    $('#numberOfPlayer').show().siblings('div').hide();
    $('#opponent').hide();
    $('#player').hide();
    playerScore = 0; 
    opponentScore = 0; 
    drawScore =0;
    player = '';
    playerNo ="";
    opponent = '';
    winner = "";
    now = 'opponent';
    reset = 0;
  
    for (var i = 0; i<board.length; i++){
           board.splice(i, 1, '-');
           document.getElementById(i).innerHTML = "";
    }
}
