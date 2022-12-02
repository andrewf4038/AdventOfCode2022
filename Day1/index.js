const fs = require("fs");
const text = fs.readFileSync("./input.txt", encoding = "utf8");
const myArray = text.split("\r\n");

var maxCalories = 0;
var elfCalories = 0;
var elfArray = [];
myArray.forEach(element => {
    if (element == "") {
        elfArray.push(elfCalories);
        elfCalories = 0;
    } else {
        elfCalories += Number(element);
    }
}
);

elfArray.sort(function (a, b) { return b - a });

console.log("Top Elf");
console.log(elfArray[0]);
console.log("----");
console.log("Top 3 elves");
console.log(elfArray[0] + elfArray[1] + elfArray[2]);



// const initialValue = 0;
// const finalSum = textToArray.reduce((acc, current) => acc + Number(current), initialValue);
// console.log(finalSum)