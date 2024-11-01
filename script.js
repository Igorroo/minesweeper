let minefieldTemplate = [
    ["1", "2", "3", "4", "5", "6", "7", "8"],
    ["9", "10", "11", "12", "13", "14", "15", "16"],
    ["17", "18", "19", "20", "21", "22", "23", "24"],
    ["25", "26", "27", "28", "29", "30", "31", "32"],
    ["33", "34", "35", "36", "37", "38", "39", "40"],
    ["41", "42", "43", "44", "45", "46", "47", "48"],
    ["49", "50", "51", "52", "53", "54", "55", "56"],
    ["57", "58", "59", "60", "61", "62", "63", "64"]
  ];
  let minefield = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
  let mineCounter=0;
  for(let i=0; i<8; i++){
        for(let j=0; j<8; j++){
            let num = minefieldTemplate[i][j];
            //document.querySelector(".c"+num).innerHTML=(num);
            document.querySelector(".c"+num).classList.add("noBomb")
            // console.log(num)
        }
  }
  function showTable(){
    for(let i=0; i<10; i++){
            console.log("row "+i+" -->     "+minefield[i][0]+" - "+minefield[i][1]+" - "+minefield[i][2]+" - "+minefield[i][3]+" - "+minefield[i][4]+" - "+minefield[i][5]+" - "+minefield[i][6]+" - "+minefield[i][7]+" - "+minefield[i][8]+" - "+minefield[i][9]);
    }
  }
  function getRandom(){
    // Getting random number
    bombListX = [];
    bombListY = [];
    for(let i=0; i<8; i++){
        randomX = (Math.floor(Math.random() * 8));
        //console.log("x:"+randomX);
        randomY = (Math.floor(Math.random() * 8));
        //console.log("y:"+randomY);
        let num = minefieldTemplate[randomY][randomX];
        let bomb = document.querySelector(".c"+num);
        bomb.classList.remove("noBomb");
        bomb.classList.add("bomb");
        bombListX.push(randomX);
        bombListY.push(randomY);

        minefield[bombListY[i]+1][bombListX[i]+1] = 9;
        

    }
    for(let i=0; i<8; i++){
        console.log("bomb"+i+" x = "+bombListX[i]);
        console.log("bomb"+i+" y = "+bombListY[i]);
        console.log("");
    }
    assignNumbers();
    insertNumbers();
    showTable();

}
function assignNumbers() {
    // Loop through the 10x10 array
    for (let row = 1; row < 9; row++) {
        for (let col = 1; col < 9; col++) {
            // Check if cell contains a bomb
            if (minefield[row][col] === 9) {
                mineCounter++;
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        if (i === 0 && j === 0) continue;
                        let newRow = row + i;
                        let newCol = col + j;
                        // Only update if it's not a bomb
                        if (minefield[newRow][newCol] !== 9) {
                            minefield[newRow][newCol]++;
                        }
                    }
                }
            }
        }
    }
}

function insertNumbers(){
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            let cell = document.querySelector(".c"+minefieldTemplate[col][row]);
            cell.classList.add("num"+minefield[col+1][row+1]);
            if(minefield[col+1][row+1]===9 || minefield[col+1][row+1]===0){
                continue;
            }else{
                cell.innerHTML=minefield[col+1][row+1];
            }
        }    
    } 
}

document.querySelectorAll(".hidden").forEach(element => {
    element.addEventListener("click", function() {
        this.classList.replace("hidden","shown")
        console.log(this.classList[0]);
        console.log("run with value : "+this.classList[0]);
        uncoverNear(this.classList[0]);
    });
});

document.querySelectorAll(".hidden").forEach(element => {
    element.addEventListener("click", function() {
        this.classList.replace("hidden","shown")
        if(this.classList.contains("bomb")){
            document.querySelector(".result>div").innerHTML="Lose"
        }
    });
});


function uncoverNear(className) {
    let numberFromClass = className.replace(/\D/g, "");
    let row = 0;
    let col = 0;

    // Find the row and col corresponding to the clicked cell
    for (let rowF = 0; rowF < 8; rowF++) {
        for (let colF = 0; colF < 8; colF++) {
            if (minefieldTemplate[rowF][colF] == numberFromClass) {
                col = colF;
                row = rowF;
            }
        }
    }

    // Only proceed if the cell has no bombs around it
    if (minefield[row + 1][col + 1] === 0) {
        let iMin = -1, jMin = -1, iMax = 1, jMax = 1;

        // Adjust bounds if cell is at the edges
        if (row === 0) iMin = 0;
        if (row === 7) iMax = 0;
        if (col === 0) jMin = 0;
        if (col === 7) jMax = 0;

        for (let i = iMin; i <= iMax; i++) {
            for (let j = jMin; j <= jMax; j++) {
                if (i === 0 && j === 0) continue;

                let newRow = row + i;
                let newCol = col + j;

                // Check if the cell has not already been uncovered
                let cell = document.querySelector(".c" + minefieldTemplate[newRow][newCol]);
                if (cell && cell.classList.contains("hidden")) {
                    cell.classList.replace("hidden", "shown");
                    console.log("new tile to uncover: .c" + minefieldTemplate[newRow][newCol]);

                    // Recursive call to uncover cells around this cell if it's also empty
                    if (minefield[newRow + 1][newCol + 1] === 0) {
                        uncoverNear(".c" + minefieldTemplate[newRow][newCol]);
                    }
                }
            }
        }
    }
    
    let uncoveredTilesCounter = 0;
    for (let row = 1; row < 9; row++) {
        for (let col = 1; col < 9; col++) {
            if (minefield[row][col] !== 9 && document.querySelector(".c" + minefieldTemplate[row-1][col-1]).classList.contains("shown")) {
                uncoveredTilesCounter++;
            }
        }
    }
    if(uncoveredTilesCounter>=56){
        document.querySelector(".result>div").innerHTML=("win")
        console.log("You Win!");
    }else{
        console.log(uncoveredTilesCounter+" tiles uncovered from 56");
    }
}
getRandom()