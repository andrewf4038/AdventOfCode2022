const fs = require("fs");
const text = fs.readFileSync("./input.txt", encoding = "utf8");
const myArray = text.split("\n");

const priorityNumber = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
var partOneSum = 0;
var sameItem = "";

myArray.forEach(rucksack => {
    firstCompartment = rucksack.substring(0, rucksack.length / 2);
    secondCompartment = rucksack.substring(rucksack.length / 2);
    let { item } = compareItem(firstCompartment, secondCompartment);
    partOneSum += itemPriority(item);
    // partOneSum += compartmentComparePriority(firstCompartment, secondCompartment);
}
)
console.log("Solution to part 1 is %d", partOneSum);

const groups = [];
groupReducer(myArray);
console.log(groups[0])
groups.forEach(group => {
    let { item, itemIndex } = compareItem(group[0], group[1]);
    console.log(item);
    console.log(itemIndex);
});



function compareItem(string1, string2, iter = 0) {
    for (let i = iter; i < string1.length && i < string2.length; i++) {
        if (string2.includes(string1[i]) === true) {
            return {
                'item': string1[i],
                'itemIndex': i
            }
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