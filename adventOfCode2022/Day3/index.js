const fs = require("fs");
const text = fs.readFileSync("./input.txt", encoding = "utf8");
const myArray = text.split("\n");

const priorityNumber = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
var partOneSum = 0;

myArray.forEach(string => {
    firstCompartment = string.substring(0, string.length / 2);
    secondCompartment = string.substring(string.length / 2);
    compartmentCompare(firstCompartment, secondCompartment);
}
)
console.log("Solution to part 1 is %d", partOneSum);


function compartmentCompare(string1, string2) {
    for (const i in string1) {
        if (string2.includes(string1[i]) === true) {
            return partOneSum += priorityNumber.indexOf(string1[i]) + 1;
        }
    }
}
