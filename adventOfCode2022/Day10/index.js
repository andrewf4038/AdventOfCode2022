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

for (i = 0; i < signalStrength.length; i++) {
    spriteCenter = registerPosition(signalStrength, i);
    console.log(spriteCenter);
}


function signalAtCycle(signalStrength, cycleNum) {
    const myArray = signalStrength.slice(0, cycleNum);
    return myArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0) * cycleNum;
}

function registerPosition(signalStrength, cycleNum) {
    const myArray = signalStrength.slice(0, cycleNum);
    return myArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}


