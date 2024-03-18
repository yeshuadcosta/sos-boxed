// Default Construction of the grid
let size = 10;
const grid = document.querySelector("#grid");
let gridA = [];
createGrid();

let uColor = "grey";
let cIndex = 0;

function createGrid() {
    for (let x = 1; x<=(size*size); x++){
        var box = document.createElement("div");
        box.setAttribute("class","box");
        box.style.height = (500 / size) + "px";
        box.style.width = (500 / size) + "px";
        grid.appendChild(box);
    }

    // Creating the two dimensional array
    gridA = new Array(size);
    for (let x = 0; x<size; x++) {
    gridA[x] = new Array(size);
    }

    // Initialising each element of the array with a whitespace
    for (let x = 0; x<size; x++){
        for (let y = 0; y<size; y++){
            gridA[x][y] = " ";
        }
    }

    // Adding the Event Listener to add color to the grid
    ability();
}

function destroyGrid() {
    var box = document.querySelectorAll(".box");

    for (let x = 0; x<(size*size); x++){
        grid.removeChild(box[x]);
    }
}


function ability() {
    var box = document.querySelectorAll(".box");
    let indexA = 0;
    let indexB = 0;
    let temp = 0;

    for (let x = 0; x<Math.pow(size, 2); x++){
        box[x].addEventListener("click", () => {
            // Figuring out the location in the 2D array
            temp = 0;
            label:
            for (let i = 0; i<size; i++){
                for (let j = 0; j<size; j++){
                    if (temp == x){
                        indexA = i;
                        indexB = j;
                        temp = 0;
                        break label;
                    }
                    temp++;
                }
            }
            if (gridA[indexA][indexB] == " "){
                gridA[indexA][indexB] = "S";
                $printGrid();
            }
        });
    }
}

function $printGrid() {
    $checkGrid();
    var box = document.querySelectorAll(".box");

    // This function essentially prints all the elements of the array into the box
    let temp = 0;
    for (let i = 0; i<size; i++){
        for (let j = 0; j<size; j++){
            box[temp].innerHTML = gridA[i][j];
            temp++;
        }
    }
}

function $checkGrid(){
    /*
    * METHOD OF USER VALIDATION
    * -------------------------
    * The default value of every element in the 2D Array is a Whitespace
    * Only if the index where 'O' is to be inserted is a whitespace will the character be placed
    * Otherwise, just forget about it!
    */
    let flag = false;

    // Checking two rows below
    for (let i = 0; i<size-2; i++){
        for (let j = 0; j<size; j++){
            if (gridA[i][j] == "S" && (gridA[i+1][j] == " " || gridA[i+1][j] == "O") && gridA[i+2][j] == "S"){
                gridA[i+1][j] = "O";

                $colorGrid(i, j);
                $colorGrid((i+1), j);
                $colorGrid((i+2), j);
            }
        }
    }

    // Checking two rows to the left
    for (let i = 0; i<size; i++){
        for (let j = 0; j<size-2; j++){
            if (gridA[i][j] == "S"  && (gridA[i][j+1] == " " || gridA[i][j+1] == "O") && gridA[i][j+2] == "S"){
                gridA[i][j+1] = "O";

                $colorGrid(i, j);
                $colorGrid(i, (j+1));
                $colorGrid(i, (j+2));
            }
        }
    }

    /* SO WE ALSO HAVE TO CHECK ACROSS BOTH THE DIAGONALS OF THE GRID */

    // Checking two rows diagonally towards the left
    for (let i = 0; i<size-2; i++){
        for (let j = 0; j<size-2; j++){
            if (gridA[i][j] == "S" && (gridA[i+1][j+1] == " " || gridA[i+1][j+1] == "O") && gridA[i+2][j+2] == "S"){
                gridA[i+1][j+1] = "O";

                $colorGrid(i, j);
                $colorGrid((i+1), (j+1));
                $colorGrid((i+2), (j+2));
            }
        }
    }

    // Checking two rows diagonally towards the right
    for (let i = 0; i<size-2; i++){
        for (let j = size; j>2; j--){
            if (gridA[i][j] == "S" && (gridA[i+1][j-1] == " " || gridA[i+1][j-1] == "O") && gridA[i+2][j-2] == "S"){
                gridA[i+1][j-1] = "O";

                $colorGrid(i, j);
                $colorGrid((i+1), (j-1));
                $colorGrid((i+2), (j-2));
            }
        }
    }
}

function $colorGrid(x, y){
    var box = document.querySelectorAll(".box");

    let temp = 0;
    for (let i = 0; i<size; i++){
        for (let j = 0; j<size; j++){
            if (i == x && j == y){
                box[temp].style.backgroundColor = uColor;
            }
            temp++;
        }
    }
}

/*
 * ESSENTIAL EVEMT LISTENERS
----------------------------
 * Change the size of the grid
 * Eraser (Can be used as an undo)
 * Clear the grid
*/

// Adding an Event Listener to change the size of the grid
document.querySelector("#changeSize").addEventListener("click", () => {
    console.log("Changing the size of the grid.");
    destroyGrid();
    size = prompt("Enter the desired size for the grid");
    createGrid();
});

// Adding an Event Listener for the eraser
document.querySelector("#eraserMode").addEventListener("click", () => {
    console.log("Activating Eraser Mode");
    previous_mode = mode;
    mode = "transparent";
});

// Adding an Event Listener to clear the grid
document.querySelector("#clearMode").addEventListener("click", () => {
    console.log("Clearing the grid");
    destroyGrid();
    createGrid();
});