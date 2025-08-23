import { checkAvailableMoves } from "./index2.js";
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

export const checkMate = (kingColor,positions) => {
    //first of all we need to check if the opponents king is being checked
    //then alert the opponent and let them make a moves that will save their king
    //if their is no possible moves than it is CHECKMATE

    //if their is no moves to make on the board at all and the king is not being threatened than it is a STALEMATE.
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

    //console.log(kingColor,kingId,kingRow,kingColumn);
    let isKingBeingChecked = !check(kingRow,kingColumn,positions,kingId);
    console.log('king checked? ',isKingBeingChecked, "color: ",kingColor);
    //Find all the possible moves with the pieces on the board


    let pieces_left = [];

    positions.forEach((item,index) => {
        item.forEach((result,index2) => {
            if(result !== null && ((kingColor === "white" && result % 2 === 1) || (kingColor === "black" && result % 2 === 0))){
                pieces_left.push([index,index2,result]);
            }
        })
    })


    //Checkmate move
    //We need to see each pieces moves
    //we need to find every single piece moves and check them one by one and see if all their moves can actually defend the king

    //we need to find the left up pieces based on the color which is defending

    //so for every single piece we need to check if its moves are going to save the king

    let moves_defending_king = [];
    pieces_left.forEach(([toRow,toCol,pieceId]) => {
       let tempArr = checkAvailableMoves(positions,pieceId,toRow,toCol,kingColor);
       if(tempArr.length !== 0){
        moves_defending_king.push(tempArr);
       }
    })

    if(isKingBeingChecked){
        return {array:moves_defending_king,status:"check"}
    }else{

        //Stalemate move
        //We need to see Each pieces moves
        return {array:moves_defending_king,status:"stalemate"}

    }

}