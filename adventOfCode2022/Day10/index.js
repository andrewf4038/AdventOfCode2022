const fs = require("fs");
const text = fs.readFileSync("./input.txt", encoding = "utf8");
const program = text.split("\n");


var cycle = 0;
const signalStrength = [1];
program.forEach(instruction => {
    const inst = instruction.slice(0, 4);
    var cycleTime = 0;
    if (inst === "addx") {
        cycleTime = 2;
        signalStrength.push(0);
        signalStrength.push(Number(instruction.slice(4)));
    } else if (inst === "noop") {
        cycleTime = 1;
        signalStrength.push(Number(instruction.slice(4)));
    }
})

var partOne = 0;
const interestingSignals = [20, 60, 100, 140, 180, 220];
interestingSignals.forEach(signal => {
    partOne += signalAtCycle(signalStrength, signal);
})
console.log("The answer to part one is %d", partOne);

const image = [];
var spriteCenter = 0;
var signal = 0;
const line = [];


for (let i = 0; i < Math.floor(signalStrength.length / 40); i++) {
    lineGenerator(i);
}

function lineGenerator(j) {
    var myString = "";
    for (let i = 0; i < 40; i++) {
        if (i === registerPosition(signalStrength, i + 1 + 40 * j)) {
            myString += "#"
        } else if (i === registerPosition(signalStrength, i + 1 + 40 * j) + 1) {
            myString += "#"
        } else if (i === registerPosition(signalStrength, i + 1 + 40 * j) - 1) {
            myString += "#"
        } else {
            myString += "."

        }
    }
    console.log(myString);
}


function signalAtCycle(signalStrength, cycleNum) {
    const myArray = signalStrength.slice(0, cycleNum);
    return myArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0) * cycleNum;
}

function registerPosition(signalStrength, cycleNum) {
    const myArray = signalStrength.slice(0, cycleNum);
    return myArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}

function toString(toString, myArray) {

    myArray.forEach(el => {
        toString = toString + el;
    })
    return toString;
}
