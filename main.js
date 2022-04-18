/*
    allow for two players to take turns
    X always starts the game
*/
let TicTacToeBoard = [
    ["", "", ""],
    ["", "", ""], 
    ["", "", ""], 
];

// Player's first move
let firstMove = true; /* not case sensitive */
let game_start = false;
let game_going = true;
var game_mode;              // Used to determine Play Mode. True will be 2P and False will be AI
var timer;
var timeLeft;


document.getElementsByClassName("display_player")[0].innerHTML = "X";
document.getElementsByClassName("score_x")[0].innerHTML = 0;
document.getElementsByClassName("score_y")[0].innerHTML = 0;

// Tracks each of the player's scores
let scoreX = 0;
let scoreY = 0;


// Define Listeners HERE

// BOXES

const boxes = [];
boxes[0] = document.getElementsByClassName("one")[0];
boxes[1] = document.getElementsByClassName("two")[0];
boxes[2] = document.getElementsByClassName("three")[0];
boxes[3] = document.getElementsByClassName("four")[0];
boxes[4] = document.getElementsByClassName("five")[0];
boxes[5] = document.getElementsByClassName("six")[0];
boxes[6] = document.getElementsByClassName("seven")[0];
boxes[7] = document.getElementsByClassName("eight")[0];
boxes[8] = document.getElementsByClassName("nine")[0];

for(let i = 0; i < 9; i++){
    boxes[i].addEventListener('click', onBoxClick);
}

// BUTTONS

let new_game_button = document.getElementsByClassName("new_game")[0];
new_game_button.addEventListener('click', newGameClick);

let reset_button = document.getElementsByClassName("reset")[0];
reset_button.addEventListener('click', resetClick);

let twop_button = document.getElementsByClassName("two_players")[0];
twop_button.addEventListener('click', twop_click);

let ai_button = document.getElementsByClassName("ai_button")[0];
ai_button.addEventListener('click', ai_click);

function onBoxClick(event){
    if(game_going && game_start){
        if(typeof(timer) === "undefined"){
            timeLeft = 3;
            countdown();
        }
        else{
            clearTimeout(timer);
            timeLeft = 3;
            countdown();
        }
        var identifier = event.target.className;
        var which_span;
        switch(identifier){
            case "one":
                which_span = 0; 
                TicTacToeBoard[0][0] = (firstMove) ? "X" : "O";
                break;
            case "two":
                which_span = 1;
                TicTacToeBoard[1][0] = (firstMove) ? "X" : "O";
                break;
            case "three":
                which_span = 2;
                TicTacToeBoard[2][0] = (firstMove) ? "X" : "O";
                break;
            case "four":
                which_span = 3;
                TicTacToeBoard[0][1] = (firstMove) ? "X" : "O";
                break;
            case "five":
                which_span = 4;
                TicTacToeBoard[1][1] = (firstMove) ? "X" : "O";
                break;
            case "six":
                which_span = 5;
                TicTacToeBoard[2][1] = (firstMove) ? "X" : "O";
                break;
            case "seven":
                which_span = 6;
                TicTacToeBoard[0][2] = (firstMove) ? "X" : "O";
                break;
            case "eight":
                which_span = 7;
                TicTacToeBoard[1][2] = (firstMove) ? "X" : "O";
                break;
            case "nine":
                which_span = 8;
                TicTacToeBoard[2][2] = (firstMove) ? "X" : "O";
                break;
        }
        console.log(identifier);
        var span = document.getElementsByClassName('xo')[which_span];
        span.innerHTML = (firstMove) ? "X" : "O";
        checkEnd();

        if(!game_mode && game_going){
            firstMove = false;
            setTimeout(function() { AI_Move(); }, 1);
            firstMove = true;
        }
        else{
            firstMove = !firstMove;
            document.getElementsByClassName("display_player")[0].innerHTML = (firstMove) ? "X" : "O";
        }
    }
}

/*
    Detect when the game ends
    i.e. when all squares have either an X or an O
*/

function countdown(){
    if(game_going){
        if(timeLeft){
            document.getElementsByClassName("time")[0].innerHTML = "Time Left: " + timeLeft;
            timeLeft--;
            timer = setTimeout(countdown, 1000);
        }
        else{
            document.getElementsByClassName("time")[0].innerHTML = "Turn Skipped!";
            firstMove = !firstMove;
            document.getElementsByClassName("display_player")[0].innerHTML = (firstMove) ? "X" : "O";
            timeLeft = 3;
            setTimeout(function() {countdown();} , 1000);
            time = undefined;

        }
    }

}

function checkEnd(){
    if(!winnerPlayer()){
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                if(TicTacToeBoard[i][j] == ""){
                    game_going = true;
                    return;                         // Return if a single cell is still emtpy!
                }
            }
        }

        setTimeout(function () { alert("No Further Moves. Neither Player Wins"); }, 1);
        game_going = false;

    }
}

/*
    Detect when a player wins
    Thoughts: display an alert of who wins?
        i.e. "Game finished" vs "X/O won"
*/
function winnerPlayer() {
        var won = false;
        var player_indicator;

        if (TicTacToeBoard[0][0] == "X" && TicTacToeBoard[1][1] == "X" && 
            TicTacToeBoard [2][2] == "X"){
                won = true; player_indicator = "X";
        }
        else if(TicTacToeBoard[0][0] == "O" && 
            TicTacToeBoard[1][1] == "O" && TicTacToeBoard [2][2] == "O") {
            // somebody won diagonally this way: \ 
            won = true; player_indicator = "Y";
            }
        else if (TicTacToeBoard[0][2] == "X" && TicTacToeBoard[1][1] == "X" && 
            TicTacToeBoard [2][0] == "X"){
                won = true; player_indicator = "X";
            }
        else if(TicTacToeBoard[0][2] == "O" && 
            TicTacToeBoard[1][1] == "O" && TicTacToeBoard [2][0] == "O") {
            // somebody won diagonally this way: /
            won = true; player_indicator = "Y";
            }
        else if (TicTacToeBoard[0][0] == "X" && TicTacToeBoard[0][1] == "X" &&
            TicTacToeBoard[0][2] == "X" || TicTacToeBoard[1][0] == "X" &&
            TicTacToeBoard[1][1] == "X" && TicTacToeBoard[1][2] == "X" || 
            TicTacToeBoard[2][0] == "X" && TicTacToeBoard[2][1] == "X" &&
            TicTacToeBoard[2][2] == "X") {
                //someone won horizontally for X
                won = true; player_indicator = "X";
            }
        else if (TicTacToeBoard[0][0] == "O" && TicTacToeBoard[0][1] == "O" &&
            TicTacToeBoard[0][2] == "O" || TicTacToeBoard[1][0] == "O" &&
            TicTacToeBoard[1][1] == "O" && TicTacToeBoard[1][2] == "O" || 
            TicTacToeBoard[2][0] == "O" && TicTacToeBoard[2][1] == "O" &&
            TicTacToeBoard[2][2] == "O") {
                //someone won horizontally for O
                won = true; player_indicator = "Y";
            }
        else if (TicTacToeBoard[0][0] == "X" && TicTacToeBoard[1][0] == "X" &&
            TicTacToeBoard[2][0] == "X" || TicTacToeBoard[0][1] == "X" &&
            TicTacToeBoard[1][1] == "X" && TicTacToeBoard[2][1] == "X" ||
            TicTacToeBoard[0][2] == "X" && TicTacToeBoard[1][2] == "X" &&
            TicTacToeBoard[2][2] == "X"){
                //someone won vertically for X
                won = true; player_indicator = "X";
            }
        else if (TicTacToeBoard[0][0] == "O" && TicTacToeBoard[1][0] == "O" &&
            TicTacToeBoard[2][0] == "O" || TicTacToeBoard[0][1] == "O" &&
            TicTacToeBoard[1][1] == "O" && TicTacToeBoard[2][1] == "O" ||
            TicTacToeBoard[0][2] == "O" && TicTacToeBoard[1][2] == "O" &&
            TicTacToeBoard[2][2] == "O"){
                //someone won vertically for X
                won = true; player_indicator = "X";
            }

            if(won){
                if(player_indicator == "X"){
                    ++scoreX;
                    document.getElementsByClassName("score_x")[0].innerHTML = scoreX;
                }
                else if(player_indicator == "Y"){
                    player_indicator = "Y";
                    ++scoreY;
                    document.getElementsByClassName("score_y")[0].innerHTML = scoreY;
                }
                setTimeout(function () { alert("Player " + player_indicator + " has won."); }, 1);
                game_going = false;
            }

            return won;
}

function getSpanNumber(row, column){
    switch(row){
        case 0:
            switch(column){
                case 0:
                    return 0;
                case 1:
                    return 3;
                case 2:
                    return 6; 
            }
        case 1:
            switch(column){
                case 0:
                    return 1;
                case 1:
                    return 4;
                case 2:
                    return 7;
            }
        case 2:
            switch(column){
                case 0:
                    return 2;
                case 1:
                    return 5;
                case 2:
                    return 8;
            }
    }
}

// implement New Game button here

function newGameClick(){
    // Clear JS Board Holder

    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            TicTacToeBoard[i][j] = "";
        }
    }

    clearTimeout(timer);
    document.getElementsByClassName("time")[0].innerHTML = "Time Left: 3";

    // Clear UI

    for(let i = 0; i < 9; i++){
        document.getElementsByClassName("xo")[i].innerHTML = "";
    }

    firstMove = true; /* not case sensitive */
    game_going = true;

    document.getElementsByClassName("display_player")[0].innerHTML = "X";
}

function resetClick(){
    newGameClick();
    game_start = false;
    document.getElementsByClassName("score_x")[0].innerHTML = 0;
    document.getElementsByClassName("score_y")[0].innerHTML = 0;
    document.getElementsByClassName("two_players")[0].style.backgroundColor = "";
    document.getElementsByClassName("ai_button")[0].style.backgroundColor = "";
    
}

function twop_click(){
    game_start = true;
    game_mode = true;

    document.getElementsByClassName("two_players")[0].style.backgroundColor = "green";
    document.getElementsByClassName("ai_button")[0].style.backgroundColor = "";
}

function ai_click(){
    game_start = true;
    game_mode = false;

    document.getElementsByClassName("ai_button")[0].style.backgroundColor = "green";
    document.getElementsByClassName("two_players")[0].style.backgroundColor = "";
}

function AI_Move(){
    document.getElementsByClassName("display_player")[0].innerHTML = "O";
    let make_move = false;
    
    while(!make_move){
        let row = Math.floor(Math.random() * 3);
        let column = Math.floor(Math.random() * 3);

        if(TicTacToeBoard[row][column] == ""){
            let span = getSpanNumber(row, column);
            document.getElementsByClassName("xo")[span].innerHTML = "O";
            TicTacToeBoard[row][column] = "O";
            make_move = true;
            setTimeout(function () {checkEnd();}, 10);
            document.getElementsByClassName("display_player")[0].innerHTML = "X";
        }
    }

}


//end of game
