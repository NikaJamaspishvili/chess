import { rookMoves,bishopMoves,horseMoves } from "./moves.js";

export const check = (row,column,positions,id) => {
    //white king pawn check
    if(id === 9){
        if(positions[row-1]?.[column-1] === 12) return false;
        if(positions[row-1]?.[column+1] === 12) return false;
    }

    if(id === 10){
        if(positions[row+1]?.[column-1] === 11) return false;
        if(positions[row+1]?.[column+1] === 11) return false;
    }

    const rookLineResult = rookMoves([],row,column,positions,id);
    if(rookLineResult === false) return false;
    const bishopLineResult = bishopMoves([],row,column,positions,id);
    if(bishopLineResult === false) return false;
    const horseSquaresResult = horseMoves([],row,column,positions,id);
    if(horseSquaresResult === false) return false;

    return true;
}