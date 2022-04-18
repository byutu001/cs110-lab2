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
let firstMove = 'X'; /* not case sensitive */

// Tracks each of the player's scores
let scoreX = 0;
let scoreY = 0;



/*
    Detect when the game ends
    i.e. when all squares have either an X or an O
*/


/*
    Detect when a player wins
    Thoughts: display an alert of who wins?
        i.e. "Game finished" vs "X/O won"
*/
function winnerPlayer() {
    for(let i = 0; i < 8; i++){

        if (TicTacToeBoard[0][0] == "X" && TicTacToeBoard[1][1] == "X" && 
            TicTacToeBoard [2][2] == "X" || TicTacToeBoard[0][0] == "O" && 
            TicTacToeBoard[1][1] == "O" && TicTacToeBoard [2][2] == "O")) {
            // somebody won diagonally this way: \
            }
        
        if (TicTacToeBoard[0][2] == "X" && TicTacToeBoard[1][1] == "X" && 
            TicTacToeBoard [2][0] == "X" || TicTacToeBoard[0][2] == "O" && 
            TicTacToeBoard[1][1] == "O" && TicTacToeBoard [0][2] == "O")) {
            // somebody won diagonally this way: /
            }
        

        if (TicTacToeBoard[0][0] == "X" && TicTacToeBoard[0][1] == "X" &&
            TicTacToeBoard[0][2] == "X" || TicTacToeBoard[1][0] == "X" &&
            TicTacToeBoard[1][1] == "X" && TicTacToeBoard[1][2] == "X" || 
            TicTacToeBoard[2][0] == "X" && TicTacToeBoard[2][1] == "X" &&
            TicTacToeBoard[2][2] == "X") {
                //someone won horizontally for X
            }

        if (TicTacToeBoard[0][0] == "O" && TicTacToeBoard[0][1] == "O" &&
            TicTacToeBoard[0][2] == "O" || TicTacToeBoard[1][0] == "O" &&
            TicTacToeBoard[1][1] == "O" && TicTacToeBoard[1][2] == "O" || 
            TicTacToeBoard[2][0] == "O" && TicTacToeBoard[2][1] == "O" &&
            TicTacToeBoard[2][2] == "O") {
                //someone won horizontally for O
            }
        
        if (TicTacToeBoard[0][0] == "X" && TicTacToeBoard[1][0] == "X" &&
            TicTacToeBoard[2][0] == "X" || TicTacToeBoard[0][1] == "X" &&
            TicTacToeBoard[1][1] == "X" && TicTacToeBoard[2][1] == "X" ||
            TicTacToeBoard[0][2] == "X" && TicTacToeBoard[1][2] == "X" &&
            TicTacToeBoard[2][2] == "X"){
                //someone won vertically for X
            }

        if (TicTacToeBoard[0][0] == "O" && TicTacToeBoard[1][0] == "O" &&
            TicTacToeBoard[2][0] == "O" || TicTacToeBoard[0][1] == "O" &&
            TicTacToeBoard[1][1] == "O" && TicTacToeBoard[2][1] == "O" ||
            TicTacToeBoard[0][2] == "O" && TicTacToeBoard[1][2] == "O" &&
            TicTacToeBoard[2][2] == "O"){
                //someone won vertically for X
            }

    }
}

/* Simple AI that correctly places X or O in an empty box */
var placeXorO = true;

while (placeXorO) {
    row = TicTacToeBoard[Math.floor(Math.random() * TicTacToeBoard.length)];
    col = TicTacToeBoard[Math.floor(Math.random() * TicTacToeBoard[0].length)];

    if(TicTacToeBoard[row][col] == " "){
        placeXorO = false;
    }
}




/* 
    squareX holds the squares that contain Xs 
    squareY holds that squares that contain Os.
    You this array to determine if 9 moves have been made,
    or if it's a tie, 
    or if current play made a winning move.

    const squareX = [];
    const squareO = [];
*/

// I'm probably missing some winning moves here ?
const winningMoves = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


// implement New Game button here




//end of game
