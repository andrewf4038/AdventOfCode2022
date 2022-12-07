const { generateKeyPairSync } = require("crypto");
const fs = require("fs");
const text = fs.readFileSync("./input.txt", encoding = "utf8");
const myArray = text.split("\n");

var sameSectionCount = 0;

const allPairs = [];
myArray.forEach(pair => {
    allPairs.push(pair.split(","))
})
console.log(allPairs);

allPairs.forEach(assignments => {
    assignments.forEach(assignment => {
        assignment = assignment.split("-");
        console.log(Number(assignment[1]) - Number(assignment[0]));
    })
})
