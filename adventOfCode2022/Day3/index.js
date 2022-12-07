const fs = require("fs");
const text = fs.readFileSync("./input.txt", encoding = "utf8");
const myArray = text.split("\n");

const priorityNumber = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
var partOneSum = 0;
var sameItem = "";

myArray.forEach(rucksack => {
    firstCompartment = rucksack.substring(0, rucksack.length / 2);
    secondCompartment = rucksack.substring(rucksack.length / 2);
    let item = compareItem(firstCompartment, secondCompartment);
    partOneSum += itemPriority(item);
}
);
console.log("Solution to part 1 is %d", partOneSum);

var partTwoSum = 0;
const groups = [];
groupReducer(myArray);
groups.forEach(group => {
    let item = compareItem(group[0], group[1], group[2]);
    partTwoSum += itemPriority(item);
});
console.log("Solution to part 2 is %d", partTwoSum);

function compareItem(string1, string2, string3 = "", iter = 0) {
    for (let i = iter; i < string1.length || i < string2.length || i <= string3.length; i++) {
        if (string3 === "" && string2.includes(string1[i])) {
            return string1[i];
        } else if (string2.includes(string1[i]) && string3.includes(string1[i])) {
            return string1[i];
        }
    }
}

function groupReducer(array) {
    groups.push(array.splice(0, 3));
    if (array.length >= 3) {
        groupReducer(array);
    }
}

function itemPriority(item) {
    return priorityNumber.indexOf(item) + 1;
}