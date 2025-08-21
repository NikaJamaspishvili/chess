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


import { pawnMove, rookMoves, bishopMoves, horseMoves, kingMoves, queenMoves } from "./moves.js";

export function checkAvailableMoves(positions,id,row,column){
    console.log(id,row,column);
    let moves = [];

    if(id === 11 || id === 12){
        pawnMove(id,moves,row,column);
    }

    if(id === 1 || id === 2){
        rookMoves(moves,row,column,positions);
    }

    if(id === 5 || id === 6){
        bishopMoves(moves,row,column,positions)
    }

    if(id === 3 || id === 4){
        horseMoves(moves,row,column,positions);
    }

    if(id === 9 || id === 10){
       const availableMoves = kingMoves(moves,row,column,positions,id);
       return availableMoves;
    }

    if(id === 7 || id === 8){
        queenMoves(moves,row,column,positions);
    }


    return moves;
}
