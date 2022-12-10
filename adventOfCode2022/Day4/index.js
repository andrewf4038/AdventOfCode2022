const fs = require("fs");
const text = fs.readFileSync("./input.txt", encoding = "utf8");
const myArray = text.split("\n");

var sameSectionCount = 0;
var partialOverlapCount = 0;

const pairs = [];
myArray.forEach(pair => {
    pairs.push(pair.split(","))
})

pairs.forEach(pair => sameSectionCount += fullOverlapCompare(pair));
console.log("The solution for part 1 is %d", sameSectionCount);

pairs.forEach(pair => partialOverlapCount += partialOverlapCompare(pair));
console.log("The solution for part 2 is %d", partialOverlapCount);

function fullOverlapCompare(pair) {
    const pairOneLow = Number(pair[0].split("-")[0]);
    const pairOneHigh = Number(pair[0].split("-")[1]);
    const pairTwoLow = Number(pair[1].split("-")[0]);
    const pairTwoHigh = Number(pair[1].split("-")[1]);

    if ((pairOneLow <= pairTwoLow && pairOneHigh >= pairTwoHigh) || (pairTwoLow <= pairOneLow && pairTwoHigh >= pairOneHigh)) {
        return 1
    } else return 0
}

function partialOverlapCompare(pair) {
    const pairOneLow = Number(pair[0].split("-")[0]);
    const pairOneHigh = Number(pair[0].split("-")[1]);
    const pairTwoLow = Number(pair[1].split("-")[0]);
    const pairTwoHigh = Number(pair[1].split("-")[1]);

    if (pairOneLow > pairTwoHigh) {
        return 0
    } else if (pairOneHigh < pairTwoLow) {
        return 0
    } else return 1

}