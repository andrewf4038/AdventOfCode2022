const { group } = require("console");
const fs = require("fs");
const { arrayBuffer } = require("stream/consumers");
const text = fs.readFileSync("./input.txt", encoding = "utf8");
const myArray = text.split("\n");

const priorityNumber = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
var partOneSum = 0;

myArray.forEach(string => {
    firstCompartment = string.substring(0, string.length / 2);
    secondCompartment = string.substring(string.length / 2);
    partOneSum += compartmentComparePriority(firstCompartment, secondCompartment);
}
)
console.log("Solution to part 1 is %d", partOneSum);

const groups = []
groupReducer(myArray);
groups.forEach(group => {
    // Compare group 1 and group 2 and find one that is the same
    // compare group 2 and group 3 and see if that value is in there?
});

console.log(groups[0])

// console.log(myArray.slice(0, 3));
// console.log("----");
// console.log(myArray.slice(3, 6));

function compartmentComparePriority(string1, string2) {
    for (const i in string1) {
        if (string2.includes(string1[i]) === true) {
            return priorityNumber.indexOf(string1[i]) + 1;
        }
    }
}

function groupReducer(array) {
    groups.push(array.splice(0, 3));
    if (array.length >= 3) {
        groupReducer(array);
    }
}
