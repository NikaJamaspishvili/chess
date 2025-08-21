export const pawnMove = (id,moves,row,column) => {
    if(id === 11){
        //white pawn
        moves.push([row-1,column]);
        if(row === 6){
            moves.push([row-2,column])
        }
    }

    if(id === 12){
        //black pawn
        moves.push([row+1,column])
        if(row === 1){
            moves.push([row+2,column])
        }
    }
}

export const rookMoves = (moves,row,column,positions,kingId) => {
        //rook

        let UpLimit;
        let DownLimit;
        let RightLimit;
        let LeftLimit;

        let rowMoves = [];
        let columnMoves = [];

        for(let i=1;i<=8;i++){
            if(!UpLimit){
                if(positions[row-i]?.[column] === null){
                    rowMoves.push([row-i,column]);
                }else{
                    UpLimit = positions[row-i]?.[column];
                }
            }

            if(!DownLimit){
                if(positions[row+i]?.[column] === null){
                    rowMoves.push([row+i,column]);
                }else{
                    DownLimit = positions[row+i]?.[column];
                }
            }

            if(!LeftLimit){
                if(positions[row]?.[column-i] === null){
                   columnMoves.push([row,column-i]); 
                }else{
                    if(positions[row]?.[column-i] !== undefined){
                        columnMoves.push([row,column-i]);
                    }
                    LeftLimit = positions[row]?.[column-i];
                }
            }

            if(!RightLimit){
                if(positions[row]?.[column+i] === null){
                    columnMoves.push([row,column+i]); 
                 }else{
                    RightLimit = positions[row]?.[column+i];
                 }
            }
        }

        if(kingId){
            if(kingId === 9) if(UpLimit === 2 || DownLimit === 2 || LeftLimit === 2 || RightLimit === 2) return false; // checking the white king for black rooks
            if(kingId === 10) if(UpLimit === 1 || DownLimit === 1 || LeftLimit === 1 || RightLimit === 1) return false; //checking the black king for white rooks
        }else{
            moves.push(...columnMoves,...rowMoves);
        }
}

export const bishopMoves = (moves,row,column,positions,kingId) => {
    //bishop moving logic
    let rightDownMoves = [];
    let leftDownMoves = [];
    let rightUpMoves = [];
    let leftUpMoves = [];

    let leftDownStop;
    let leftUpStop;
    let rightDownStop;
    let rightUpStop;
    
    for(let i=1;i<=8;i++){
        if(!rightDownStop){
            if(positions[row+i]?.[column+i] === null){
                rightDownMoves.push([row+i,column+i]);
            }else{
                rightDownStop = positions[row+i]?.[column+i];
            }
        }

        if(!leftDownStop){
            if(positions[row+i]?.[column-i] === null){
                leftDownMoves.push([row+i,column-i]);
            }else{
                leftDownStop = positions[row+i]?.[column-i];
            }
        }


        if(!leftUpStop){
            if(positions[row-i]?.[column-i] === null){
                    leftUpMoves.push([row-i,column-i]);
            }else{
                leftUpStop = positions[row-i]?.[column-i];
            }
        }


        if(!rightUpStop){
            if(positions[row-i]?.[column+i] === null){
                    rightUpMoves.push([row-i,column+i]);
            }else{
                rightUpStop = positions[row-i]?.[column+i];
            }
        }
    }

    if(kingId){
        if(kingId === 9) if(leftDownStop === 6 || rightDownStop === 6 || leftUpStop === 6 || rightUpStop === 6) return false;
        if(kingId === 10) if(leftDownStop === 5 || rightDownStop === 5 || leftUpStop === 5 || rightUpStop === 5) return false;
    }else{
        moves.push(...leftDownMoves,...leftUpMoves,...rightDownMoves,...rightUpMoves);
    }

}


export const horseMoves = (moves,row,column,positions,kingId) => {
    const pos = [
        [-2, +1], // up right
        [-2, -1], // up left
        [+2, +1], // down right
        [+2, -1], // down left
        [-1, -2], // left up
        [+1, -2], // left down
        [-1, +2], // right up
        [+1, +2]  // right down
    ]

    const blocked = pos.some(([dr, dc]) => {
        const newRow = row + dr;
        const newCol = column + dc;
      
        if (positions[newRow]?.[newCol] === null) {
          moves.push([newRow, newCol]);
          return false;
        } else {
          if (kingId) {
            if (kingId === 10 && positions[newRow]?.[newCol] === 3) return true;
            if (kingId === 9 && positions[newRow]?.[newCol] === 4) return true;
          }
        }
      });
      
      if (blocked) return false;      
}


import { check } from "./checks.js";

export const kingMoves = (moves,row,column,positions,id) => {
       moves.push([row-1,column],[row-1,column-1],[row-1,column+1]) //up squres
       moves.push([row+1,column],[row+1,column-1],[row+1,column+1]) //down squares
       moves.push([row,column-1]) //left square
       moves.push([row,column+1]) //right squares

       moves = moves.filter(item => check(item[0],item[1],positions,id));

       return moves;
}

export const queenMoves = (moves,row,column,positions) => {
    bishopMoves(moves,row,column,positions);
    rookMoves(moves,row,column,positions);
}