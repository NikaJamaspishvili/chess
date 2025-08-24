let board = document.getElementById("board");

export const pieces = [
    {id:1,player:"white",name:"rook",url:"./public/white_pieces_svg/rook.svg"},
    {id:2,player:"black",name:"rook",url:"./public/black_pieces_svg/rook.svg"},
    {id:3,player:"white",name:"horse",url:"./public/white_pieces_svg/horse.svg"},
    {id:4,player:"black",name:"horse",url:"./public/black_pieces_svg/horse.svg"},
    {id:5,player:"white",name:"bishop",url:"./public/white_pieces_svg/bishop.svg"},
    {id:6,player:"black",name:"bishop",url:"./public/black_pieces_svg/bishop.svg"},
    {id:7,player:"white",name:"queen",url:"./public/white_pieces_svg/queen.svg"},
    {id:8,player:"black",name:"queen",url:"./public/black_pieces_svg/queen.svg"},
    {id:9,player:"white",name:"king",url:"./public/white_pieces_svg/king.svg"},
    {id:10,player:"black",name:"king",url:"./public/black_pieces_svg/king.svg"},
    {id:11,player:"white",name:"pawn",url:"./public/white_pieces_svg/pawn.svg"},
    {id:12,player:"black",name:"pawn",url:"./public/black_pieces_svg/pawn.svg"},
]

export function repaintBoard(positions){
    board.innerHTML = "";
    positions.forEach((result,index) => {
        result.forEach(((result2,index2) => {
    
            const square = document.createElement("div");
            square.classList.add("square");
            square.style.background = index % 2 === 0 && index2 % 2 === 0 ? "#769656" : index % 2 === 1 && index2 % 2 === 1 ? "#769656" : "#eeeed2";
            square.style.width = '100%';
            square.style.height = '100%';
            square.dataset.row = index;
            square.dataset.column = index2;
            square.dataset.id = result2;
            

            if(result2 !== null && result2 !== "pointer"){
                const piece_svg = document.createElement('img');
                piece_svg.src = pieces.find(item => item.id === result2)?.url;
                square.appendChild(piece_svg);
            }else if(result2 === "pointer"){
                const circle = document.createElement("div");
                circle.style.width = "10px"
                circle.style.height = "10px";
                circle.style.background = "black";
                circle.style.borderRadius = "50%";
                square.appendChild(circle);
            }
        
            board.appendChild(square);
        }))
    
     });
}


import { check } from "./checks.js";
import { pawnMove, rookMoves, bishopMoves, horseMoves, kingMoves, queenMoves } from "./moves.js";

export function checkAvailableMoves(positions,id,row,column,kingColor){
    //console.log(id,row,column);
    let moves = [];

    if(id === 11 || id === 12){
        pawnMove(id,moves,row,column,positions);
    }

    if(id === 1 || id === 2){
        rookMoves(moves,row,column,positions,undefined,id);
    }

    if(id === 5 || id === 6){
        bishopMoves(moves,row,column,positions,undefined,id)
    }

    if(id === 3 || id === 4){
        horseMoves(moves,row,column,positions,undefined,id);
    }
    
    if(id === 9 || id === 10){
       moves = kingMoves(moves,row,column,positions,id);
    }

    if(id === 7 || id === 8){
        queenMoves(moves,row,column,positions,id);
    }

    //if the piece was standing and there was not check with the king ->
    //and then the piece moved to the point it could and the check has happened ->
    //it means that the point is not valid and needs to be removed from moves array.

    let kingId = kingColor === "white" ? 9 : 10;
    let kingRow;
    let kingColumn;

    positions.forEach((result,index)=>{
       let x = result.findIndex((item) => item === kingId);

       if(x !== -1){
        kingColumn = x;
        kingRow = index;
       }
    });

    if(id === 9 || id === 10){
        console.log(moves);
        return moves;
    }

    let legalMoves = [];

    moves.forEach(([toRow, toCol]) => {
        // 1. fresh copy each time
        let temp = positions.map(r => [...r]);
    
        // 2. move the piece
        temp[toRow][toCol] = id;            // place piece in new spot
        temp[row][column] = null;           // clear old spot
    
        // 3. check king safety
        const stillSafe = check(kingRow, kingColumn, temp, kingId);
    
        // 4. keep move only if safe
        if (stillSafe) {
            legalMoves.push([toRow, toCol]);
        }
    });
    
   //console.log(legalMoves);

    return legalMoves;
}
