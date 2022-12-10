const fs = require("fs");
const text = fs.readFileSync("./input.txt", encoding = "utf8");

const containersAndMoves = text.split("\n\n"); // break file into the containers and moves
const containers = containersAndMoves[0].split("\n"); // extract out containers and create an element for each line in an array
containers.pop();
const moves = containersAndMoves[1].split("\n"); // extract out moves and create an element for each line in an array

const stack = [];
// regex is bullshit
// const stackRegExp = /(.{3})(\s|$)/g;
// containers.forEach(el => {
//     let row = [el.match(stackRegExp)];
//     console.log(row);
//     stack.push(...row);
// });

containers.forEach(el => {
    const row = []
    for (let index = 0; index < el.length; index += 4) {
        row.push(el.slice(index, index + 3))
    }
    stack.push(row);
})

const columnStack = transpose(stack); // Flip the above array from rows to columns using the transpose function
const json = JSON.stringify(columnStack);
const columnStack9000 = JSON.parse(json);
const columnStack9001 = JSON.parse(json);

const moveNumbers = []; // Extract out the moves
const numberRegExp = /[0-9]+/g;
moves.forEach(el => {
    let row = [el.match(numberRegExp)];
    moveNumbers.push(...row);
});

moveNumbers.forEach(move => boxMover9000(columnStack9000, Number(move[0]), Number(move[1]), Number(move[2]))); // Transform using the moves
var secretMessage1 = ""
columnStack9000.forEach(column => secretMessage1 += column[0][1])
console.log("The answer to part 1 is %s", secretMessage1)


moveNumbers.forEach(move => boxMover9001(columnStack9001, Number(move[0]), Number(move[1]), Number(move[2]))); // Transform using the moves
var secretMessage2 = ""
columnStack9001.forEach(column => secretMessage2 += column[0][1])
console.log("The answer to part 2 is %s", secretMessage2)

function transpose(matrix) {
    const transposedMatrix = [];
    for (let i = 0; i < matrix[0].length; i++) {
        transposedMatrix.push([]);
    };

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            transposedMatrix[j].push(matrix[i][j])
        }
    }
    transposedMatrix.forEach(column => {
        while (column[0] === '   ') {
            column.shift();
        }
    })
    return transposedMatrix
}

function boxMover9000(columnStack, numberOfBoxes, fromColumn, toColumn) {
    var movedBoxes = 0;
    var i = 0;
    while (movedBoxes !== numberOfBoxes && i < 100000) {
        var box = columnStack[fromColumn - 1].shift();
        i += 1;
        movedBoxes += 1;
        columnStack[toColumn - 1].unshift(box);
    }
    return columnStack
}

function boxMover9001(columnStack, numberOfBoxes, fromColumn, toColumn) {
    var topBox = columnStack[fromColumn - 1][0];
    var boxes = columnStack[fromColumn - 1].splice(0, numberOfBoxes);
    var moveIndex = columnStack[toColumn - 1].findLastIndex(el => el === '   ');
    if (moveIndex === -1) {
        columnStack[toColumn - 1].splice(0, 0, ...boxes);
    } else {
        columnStack[toColumn - 1].splice(moveIndex, 1, ...boxes);
    }
    return columnStack
}
