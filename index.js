let board = document.getElementById("board");
import { checkAvailableMoves,repaintBoard,pieces } from "./index2.js";

//this code defines the information about the pieces

//this code initilaizes the array, which will store the info about the positions of pieces

let positions = [];

for(let i=0;i<8;i++){
    if(i === 0){
        positions[i] = [2,4,6,8,10,6,4,2]
    }else if(i === 1){
        positions[i] = [12,12,12,12,12,12,12,12];
    }else if(i === 7){
        positions[i] = [1,3,5,7,9,5,3,1];
    }else if(i === 6){
        positions[i] = [11,11,11,11,11,11,11,11];
    }else if(i === 3){
        positions[i] = [null,3,null,2,null,9,null,null];
    }else if(i === 4){
        positions[i] = [null,null,null,null,null,null,null,null];
    }else{
        positions[i] = [];

        for(let j=0;j<8;j++){
            positions[i][j] = null;
        }
    }
}

//this code draws the board using the array we initialized previously.
repaintBoard(positions);


 let playersTurn = "white";
 let chosenPieceCordinates = {row:null,column:null};
 let makeAMove = false;
 let available_moves = [];

 board.addEventListener("click",(e)=>{
    let square  = e.target;

    while(!square.dataset.row){
        square = square.parentNode;
    }

    let id = parseInt(square.dataset.id);
    let row = parseInt(square.dataset.row);
    let column = parseInt(square.dataset.column);
    console.log(available_moves);
    if(makeAMove){
        moveLogic(row,column,id); 
    }

 if(positions[row][column] % 2 === 0 && playersTurn === "black" || positions[row][column] % 2 === 1 && playersTurn === "white")
 if(chosenPieceCordinates.row !== row || chosenPieceCordinates.column !== column){
    chosenPieceCordinates["row"] = row;
    chosenPieceCordinates["column"] = column;

    const moves = checkAvailableMoves(positions,id,row,column);
    available_moves = moves;
    clearPointers();
    moves.forEach(item => {
        if(positions[item[0]]?.[item[1]] === null){
            positions[item[0]][item[1]] = "pointer";
        }
    });

    if(!isNaN(id)) makeAMove=true;

    repaintBoard(positions);
}   

})



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


const moveLogic = (row,column,id) => {
    let player_board = document.getElementById("player_board")
    positions[row][column] = positions[chosenPieceCordinates.row][chosenPieceCordinates.column];
    positions[chosenPieceCordinates.row][chosenPieceCordinates.column] = null;
    clearPointers();
    repaintBoard(positions);
    playersTurn = playersTurn === "white" ? "black" : "white";
    player_board.innerText = playersTurn;
    return;    
}