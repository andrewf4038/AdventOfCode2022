const fs = require("fs");
const text = fs.readFileSync("./input.txt", encoding = "utf8");
const trees = text.split("\n");
const treeGrid = [];
trees.forEach(row => treeGrid.push(row.split("")));
const treeGridColumn = transpose(treeGrid);

var visibleTrees = 2 * treeGrid.length + 2 * treeGrid[0].length - 4;
var maxScenicScore = 0;
for (let i = 1; i < treeGrid.length - 1; i++) {
    for (let j = 1; j < treeGrid[i].length - 1; j++) {
        var tree = Number(treeGrid[i][j]);
        var rowValues = biggestTrees(j, treeGrid[i]);
        var columnValues = biggestTrees(i, treeGridColumn[j]);
        var topTree = columnValues.first;
        var bottomTree = columnValues.second;
        var leftTree = rowValues.first;
        var rightTree = rowValues.second;
        var scenicScore = scenicScoreCalc(j, i, treeGrid[i], treeGridColumn[j]);
        if (scenicScore > maxScenicScore) { maxScenicScore = scenicScore }
        if (tree > topTree || tree > leftTree || tree > rightTree || tree > bottomTree) {
            visibleTrees++;
        }
    }

}

console.log("The total number of visible trees for part one is %d", visibleTrees);
console.log("The max scenic score for part two is %d", maxScenicScore);

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

function biggestTrees(i, rowOrColumn) {
    var tree1 = 0;
    var tree2 = 0;
    rowOrColumn.forEach((el, index) => {
        if (index < i && tree1 < Number(el)) {
            tree1 = Number(el)
        } else if (index > i && tree2 < Number(el)) {
            tree2 = Number(el);
        }
    })
    return {
        "first": tree1,
        "second": tree2
    }
}

function scenicScoreCalc(i, j, row, column) {
    var leftScore = 0;
    var rightScore = 0;
    var topScore = 0;
    var bottomScore = 0;
    for (index = i - 1; index >= 0; index--) {
        if (row[index] < row[i]) {
            leftScore++
        } else if (row[index] >= row[i]) {
            leftScore++
            break
        }
    }
    for (index = i + 1; index < row.length; index++) {
        if (row[index] < row[i]) {
            rightScore++
        } else if (row[index] >= row[i]) {
            rightScore++
            break
        }
    }
    for (index = j - 1; index >= 0; index--) {
        if (column[index] < column[j]) {
            topScore++
        } else if (column[index] >= column[j]) {
            topScore++
            break
        }
    }
    for (index = j + 1; index < column.length; index++) {
        if (column[index] < column[j]) {
            bottomScore++
        }
        if (column[index] >= column[j]) {
            bottomScore++
            break
        }
    }
    if (i === 2 && j === 3) {
    }
    const scenicScore = leftScore * rightScore * topScore * bottomScore;
    return scenicScore;
}
