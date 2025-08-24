export const pawnMove = (id,moves,row,column,positions) => {
    if(id === 11){
        //white pawn
        if(positions[row-1][column] === null){
            moves.push([row-1,column]);

            if(row === 6){
                if(positions[row-2][column] === null){
                    moves.push([row-2,column])
                }
            }
        }

        if(positions[row-1]?.[column-1] !== null && positions[row-1]?.[column-1] % 2 === 0){
            moves.push([row-1,column-1]);
        }else if(positions[row-1]?.[column+1] !== null && positions[row-1]?.[column+1] % 2 === 0){
            moves.push([row-1,column+1])
        }
    }

    if(id === 12){
        //black pawn
        if(positions[row+1][column] === null){
            moves.push([row+1,column])
        
            if(row === 1){
                if(positions[row+2][column] === null){
                    moves.push([row+2,column])
                }
            }
        }

        if(positions[row+1]?.[column-1] !== null && positions[row+1]?.[column-1] % 2 === 1){
            moves.push([row+1,column-1]);
        }else if(positions[row+1]?.[column+1] !== null && positions[row+1]?.[column+1] % 2 === 1){
            moves.push([row+1,column+1])
        }

    }
}

export const rookMoves = (moves,row,column,positions,kingId,id,nokill) => {
        //rook

        let UpLimit;
        let DownLimit;
        let RightLimit;
        let LeftLimit;

        let rowMoves = [];
        let columnMoves = [];

        function check(pieceId){
         if(pieceId === undefined) return false;
         if(id % 2 === 0) if(pieceId % 2 === 1) return true;
         if(id % 2 === 1) if(pieceId % 2 === 0) return true;
         return false;
        }  

        for(let i=1;i<=8;i++){
            if(!UpLimit){
                let newPosition = positions[row-i]?.[column];
                if(newPosition === null){
                    rowMoves.push([row-i,column]);
                }else{
                    if(check(newPosition)){
                        columnMoves.push([row-i,column]);
                    }

                    if(kingId){
                        if(positions[row-i]?.[column] !== kingId){
                            UpLimit = newPosition;
                        }
                    }else{
                        UpLimit = newPosition;
                    }
                }
            }

            if(!DownLimit){
                if(positions[row+i]?.[column] === null){
                    rowMoves.push([row+i,column]);
                }else{
                    if(check(positions[row+i]?.[column])){
                        columnMoves.push([row+i,column]);
                    }

                    if(kingId){
                        if(positions[row+i]?.[column] !== kingId){
                            DownLimit = positions[row+i]?.[column];
                        }
                    }else{
                        DownLimit = positions[row+i]?.[column];
                    }
                }
            }

            if(!LeftLimit){
                if(positions[row]?.[column-i] === null){
                   columnMoves.push([row,column-i]); 
                }else{
                    if(check(positions[row]?.[column-i])){
                        columnMoves.push([row,column-i]);
                    }
                    if(kingId){
                        if(positions[row]?.[column-i] !== kingId){
                            LeftLimit = positions[row]?.[column-i];
                        }
                    }else{
                        LeftLimit = positions[row]?.[column-i];
                    }
                }
            }

            if(!RightLimit){
                if(positions[row]?.[column+i] === null){
                    columnMoves.push([row,column+i]); 
                 }else{
                    if(check(positions[row]?.[column+i])){
                        columnMoves.push([row,column+i]);
                    }

                    if(kingId){
                        if(positions[row]?.[column+i] !== kingId){
                            RightLimit = positions[row]?.[column+i];
                        }
                    }else{
                        RightLimit = positions[row]?.[column+i];
                    }
                 }
            }
        }

        if(kingId){
            let threats = [];

            if (kingId === 9) {
                threats = [2, 8];
            }else if(kingId === 10){
                threats = [1,7];
            }
    
            if([UpLimit, DownLimit, LeftLimit, RightLimit].some(val => threats.includes(val))) {
                return false;
            }
        }else{
            moves.push(...columnMoves,...rowMoves);
        }
}

export const bishopMoves = (moves,row,column,positions,kingId,id) => {
    //bishop moving logic
    let rightDownMoves = [];
    let leftDownMoves = [];
    let rightUpMoves = [];
    let leftUpMoves = [];

    let leftDownStop;
    let leftUpStop;
    let rightDownStop;
    let rightUpStop;


    function check(pieceId){
         if(pieceId === undefined) return false;
         if(id % 2 === 0) if(pieceId % 2 === 1) return true;
         if(id % 2 === 1) if(pieceId % 2 === 0) return true;
         return false;
    }  
    
    for(let i=1;i<=8;i++){
        if(!rightDownStop){
            if(positions[row+i]?.[column+i] === null){
                rightDownMoves.push([row+i,column+i]);
            }else{
                if(check(positions[row+i]?.[column+i])){
                    rightDownMoves.push([row+i,column+i]);
                }


                if(kingId){
                    if(positions[row+i]?.[column+i] !== kingId){
                        rightDownStop = positions[row+i]?.[column+i];
                    }
                }else{
                    rightDownStop = positions[row+i]?.[column+i];
                }
            }
        }

        if(!leftDownStop){
            if(positions[row+i]?.[column-i] === null){
                leftDownMoves.push([row+i,column-i]);
            }else{
                if(check(positions[row+i]?.[column-i])){
                    leftDownMoves.push([row+i,column-i]);
                }
                if(kingId){
                    if(positions[row+i]?.[column-i] !== kingId){
                        leftDownStop = positions[row+i]?.[column-i];
                    }
                }else{
                    leftDownStop = positions[row+i]?.[column-i];
                }
                
            }
        }


        if(!leftUpStop){
            if(positions[row-i]?.[column-i] === null){
                    leftUpMoves.push([row-i,column-i]);
            }else{
                if(check(positions[row-i]?.[column-i])){
                    leftUpMoves.push([row-i,column-i]);
                }

                if(kingId){
                    if(positions[row-i]?.[column-i] !== kingId){
                        leftUpStop = positions[row-i]?.[column-i];
                    }
                }else{
                    leftUpStop = positions[row-i]?.[column-i];
                }
            }
        }


        if(!rightUpStop){
            if(positions[row-i]?.[column+i] === null){
                    rightUpMoves.push([row-i,column+i]);
            }else{
                if(check(positions[row-i]?.[column+i])){
                    rightUpMoves.push([row-i,column+i]);
                }

                if(kingId){
                    if(positions[row-i]?.[column+i] !== kingId){
                        rightUpStop = positions[row-i]?.[column+i];
                    }
                }else{
                    rightUpStop = positions[row-i]?.[column+i];
                }
            }
        }
    }
    if(kingId){
        let threats = [];
        if (kingId === 9) {
            threats = [6, 8];
        }else if(kingId === 10){
            threats = [5,7];
        }

        if([leftDownStop, rightDownStop, leftUpStop, rightUpStop].some(val => threats.includes(val))){
            return false;
        }
    }else{
        moves.push(...leftDownMoves,...leftUpMoves,...rightDownMoves,...rightUpMoves);
    }

}


export const horseMoves = (moves,row,column,positions,kingId,id) => {
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

    function check(pieceId){
         if(pieceId === undefined) return false;
         if(id % 2 === 0) if(pieceId % 2 === 1) return true;
         if(id % 2 === 1) if(pieceId % 2 === 0) return true;
         return false;
    }  

    const blocked = pos.some(([dr, dc]) => {
        const newRow = row + dr;
        const newCol = column + dc;
      
        if (positions[newRow]?.[newCol] === null) {
          moves.push([newRow, newCol]);
          return false;
        } else {
          if(check(positions[newRow]?.[newCol])){
            moves.push([newRow,newCol]);
          }

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
    function checkCondition(pieceId){
         if(pieceId === undefined) return false;
         if(id % 2 === 0) if(pieceId % 2 === 1) return true;
         if(id % 2 === 1) if(pieceId % 2 === 0) return true;
         return false;
    }
    
    const pos = [
        [-1,0],
        [-1,-1],
        [-1,+1],
        [+1,0],
        [+1,-1],
        [+1,+1],
        [0,-1],
        [0,+1]
    ]

    pos.forEach(([dr,dc])=>{
        if(positions[row+dr]?.[column+dc] === null){
            moves.push([row+dr,column+dc]);
        }else{
            if(checkCondition(positions[row+dr]?.[column+dc])){
                moves.push([row+dr,column+dc]);
            }
        }
    })
        console.log("moves before: ",moves);
        moves = moves.filter(item => check(item[0],item[1],positions,id));
        moves = moves.filter(item => kingMovesCheck(item[0],item[1],positions,id));

       console.log("moveees",moves);

       //CHECKMATE: if the king is getting checked and there is nowhere to go.
       //STALEMATE: if the king is not getting checked and there is nowhere to go.
       return moves;
}

function kingMovesCheck(row,column,positions,id){
    console.log(id);
    const pos = [
        [-1,0],
        [-1,-1],
        [-1,+1],
        [+1,0],
        [+1,-1],
        [+1,+1],
        [0,-1],
        [0,+1]
    ]

    for(let i=0;i<pos.length;i++){
        if(positions[row+pos[i][0]]?.[column+pos[i][1]] === (id === 10 ? 9 : 10)){
            return false;
        }
    }

    return true;
}

export const queenMoves = (moves,row,column,positions,id) => {
    bishopMoves(moves,row,column,positions,undefined,id);
    rookMoves(moves,row,column,positions,undefined,id);
}