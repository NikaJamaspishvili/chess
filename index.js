let board = document.getElementById("board");
import { checkAvailableMoves,repaintBoard } from "./index2.js";

//this code defines the information about the pieces

//this code initilaizes the array, which will store the info about the positions of pieces

let positions = [
[null, null, null, null, 10, null, null, null], // black king
[null, null, null, null, null, null, null, null],
[null, null, null, null, null, null, null, null],
[null, null, null, null, 8, null, null, null], // black queen
[null, null, null, null, null, null, null, null],
[null, null, null, null, null, null, null, null],
[null, null, null, null, null, null, null, null],
[9, null, null, null, null, null, null, 2], // white king vs black rook
];

function positions_init(){
    for(let i=0;i<8;i++){
        if(i === 0){
            positions[i] = [2,4,6,8,10,6,4,2]
        }else if(i === 1){
            positions[i] = [12,12,12,12,12,12,12,12];
        }else if(i === 7){
            positions[i] = [1,3,5,7,9,5,3,1];
        }else if(i === 6){
            positions[i] = [11,11,11,11,11,11,11,11];
        }else{
            positions[i] = [];
    
            for(let j=0;j<8;j++){
                positions[i][j] = null;
            }
        }
    }
}

//positions_init();

//this code draws the board using the array we initialized previously.
repaintBoard(positions);



const clearPointers = () => {
    positions = positions.map((result) => {
        const row = result.map((item) =>{
            if(item === "pointer"){
                item = null;
            }
            return item;
        })
        return row;
    })
}

 let playersTurn = "white";
 let chosenPieceCordinates = {row:null,column:null};
 let makeAMove = false;
 let available_moves = [];

 import { checkMate } from "./checks.js";
 const movePiece = new Audio("public/sounds/move-self.mp3");
 const capturePiece = new Audio("public/sounds/capture.mp3"); 
 const gameStart = new Audio("public/sounds/game-start.mp3");
 const checkMateSound = new Audio("public/sounds/checkmate.mp3");
 const checkSound = new Audio("public/sounds/move-check.mp3");

const moveLogic = (row,column,id) => {
    //attack logic, it replaces the piece with attackers piece
    let previousElement = positions[row][column];
    positions[row][column] = positions[chosenPieceCordinates.row][chosenPieceCordinates.column];
    positions[chosenPieceCordinates.row][chosenPieceCordinates.column] = null;

    //the end logic to repaint everything
    clearPointers();
    repaintBoard(positions);
    available_moves = [];

    //changes the players turn
    let player_board = document.getElementById("player_board")
    playersTurn = playersTurn === "white" ? "black" : "white";
    player_board.innerText = playersTurn;

    //this code checks the "checks and checkmates" of the opponents pieces
    let result = checkMate(playersTurn,positions,positions[row][column]);
    //console.log("result is: ",result);
    if(result && result.array.length === 0){
        if(result.status === "stalemate"){
            alert(`STALEMATE: game is a draw 💥`);
            checkMateSound.play();
        }else if(result.status === "check"){
            //alert("checkmate sound has been played");
            checkSound.play();
            checkMateSound.play();
            alert(`CHECKMATE MOTHERFUCKERS! ${playersTurn === "white" ? "black" : "white"} WON THE GAME 💥`);
        }

        playersTurn = "white";
        player_board.innerText = playersTurn;
        chosenPieceCordinates = {row:null,column:null};
        makeAMove = false;
        positions_init();
        clearPointers();
        gameStart.play();
        repaintBoard(positions);
    }else{
        if(result.array.length > 0 && result.status === "check"){
            //alert("checksound has been played");
            checkSound.play();
        }else{
            if(previousElement === null || previousElement === "pointer"){
                //alert("hit");
                movePiece.play();
             }else{
                capturePiece.play();
            }
        }
    }
    }

 board.addEventListener("click",(e)=>{
    let square  = e.target;

    while(!square.dataset.row){
        square = square.parentNode;
    }

    let id = parseInt(square.dataset.id);
    let row = parseInt(square.dataset.row);
    let column = parseInt(square.dataset.column);
    let isMoveValid = available_moves.some(item => item[0] === row && item[1] === column);

    console.log("id is: ",id);

    if(makeAMove && isMoveValid){
        console.log("hit");
        moveLogic(row,column,id);
    }

 if(positions[row][column] % 2 === 0 && playersTurn === "black" || positions[row][column] % 2 === 1 && playersTurn === "white")
 if(chosenPieceCordinates.row !== row || chosenPieceCordinates.column !== column){
    chosenPieceCordinates["row"] = row;
    chosenPieceCordinates["column"] = column;
    clearPointers();

    const moves = checkAvailableMoves(positions,id,row,column,playersTurn);
    available_moves = [...moves];
    moves.forEach(item => {
        if(positions[item[0]]?.[item[1]] === null){
            positions[item[0]][item[1]] = "pointer";
        }
    });

    if(!isNaN(id)) makeAMove=true;

    repaintBoard(positions);
}   

})