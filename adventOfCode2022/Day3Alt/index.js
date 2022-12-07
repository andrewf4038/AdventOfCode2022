const fs = require("fs");
const text = fs.readFileSync("./input.txt", encoding = "utf8");
const myArray = text.split("\n");

const priorityNumber = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
var partOneSum = 0;
var sameItem = "";

myArray.forEach(rucksack => {
    firstCompartment = rucksack.substring(0, rucksack.length / 2);
    secondCompartment = rucksack.substring(rucksack.length / 2);
    let items = [...firstCompartment.matchAll("[" + secondCompartment + "]")];
    partOneSum += itemPriority(items[0]);
}
);
console.log("Solution to part 1 is %d", partOneSum);




function itemPriority(item) {
    return priorityNumber.indexOf(item) + 1;
}