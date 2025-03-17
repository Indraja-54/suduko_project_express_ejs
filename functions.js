let board=Array.from({length:9},()=>Array(9).fill(0)) // Changed from const to let
const solution=Array.from({length:9},()=>Array(9).fill(0))
function generateSuduko(){
    fillDiagona(board);
    solvesuduko(board);
    copySolution(board);
    removeDigits(board);
    return board;
}
function fillDiagona(matrix){
    for(let num=0;num<9;num+=3){
        fillBox(matrix,num,num);
    }
}
function fillBox(matrix,row,col){
    let numSet=new Set();
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let num;
            do {
                num = Math.floor(Math.random() * 9) + 1;
            } while (numSet.has(num));
            numSet.add(num);
            matrix[row + i][col + j] = num;
        }
    }
}
function copySolution(matrix){
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            solution[i][j]=matrix[i][j];
        }
    }
}
function removeDigits(matrix){
    let count=60;
    while(count!==0){
        let row=Math.floor(Math.random()*9)
        let col=Math.floor(Math.random()*9)
        if(matrix[row][col]!==0){
            count--;
            matrix[row][col]=0;
        }
    }
}
function solvesuduko(matrix){
    solve(matrix,0,0);
    return matrix;
}
function isSafe(matrix,row,col,num){
    for(let x=0;x<9;x++){
        if(matrix[row][x]===num){
            return false;
        }
    }
    for(let x=0;x<9;x++){
        if(matrix[x][col]===num){
            return false;
        }
    }
    let startRow=row-row%3;
    let startCol=col-col%3;
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(matrix[i+startRow][j+startCol]===num){
                return false;
            }
        }
    }
    return true;
}
function solve(matrix,row,col){
    if(row===9){
        return true
    }
    if(col===9){
        return solve(matrix,row+1,0)
    }
    if(matrix[row][col]!=0){
return solve(matrix,row,col+1); 
    }
    for(let num=1;num<=9;num++){
        if(isSafe(matrix,row,col,num)){
            matrix[row][col]=num;
            if(solve(matrix,row,col+1)){
                return true;
            }
            matrix[row][col]=0;
        }
    }
    return false;
}

board = generateSuduko(); 
module.exports = { solution, board };


