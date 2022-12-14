const fs = require("fs");
const text = fs.readFileSync("./input.txt", encoding = "utf8");
const monkeys = text.split("\n\n");


const monkeyArr = [];
const testerArr = [];

monkeys.forEach((monkey, index) => {
    const monkeyDef = monkey.split("\n");
    const monkeyNum = Number(monkeyDef[0].match(/[0-9]+/g)[0]);
    const startingItems = monkeyDef[1].match(/[0-9]+/g).map(el => Number(el))
    functionCreator(monkeyDef[2]);
    const divisibleBy = Number(monkeyDef[3].match(/[0-9]+/g)[0]);
    testerArr.push(divisibleBy);
    const trueMonkey = Number(monkeyDef[4].match(/[0-9]+/g)[0]);
    const falseMonkey = Number(monkeyDef[5].match(/[0-9]+/g)[0]);
    const mon = new Monkey(monkeyNum, startingItems, functionCreator(monkeyDef[2]), divisibleBy, trueMonkey, falseMonkey);
    monkeyArr.push(mon);
})

// const partOneInspections = monkeyToss(monkeyArr, 20, 3);
// console.log(partOneInspections);
for (let i = 0; i < 10000; i++) {
    monkeyArr.forEach(monkey => {
        var item = monkey.startingItems.shift();
        var modItem = modReducers(item, testerArr);
        while (item) {
            modItem = modItem.map(item => monkey.monkeyOperation(item));
            modItem = modReducers(modItem, testerArr);
            var toMonkey = monkey.monkeyTest(modItem[monkey.monkeyNum]);
            monkeyArr[toMonkey].startingItems.push(modItem);
            item = monkey.startingItems.shift();
            modItem = modReducers(item, testerArr);
            monkey.inspectionCount++;
        }
    })
}

const inspections = [];
monkeyArr.forEach(monkey => inspections.push(monkey.inspectionCount));
console.log(inspections);
inspections.sort((a, b) => b - a)
console.log(inspections[0] * inspections[1]);
function monkeyToss(monkeyArr, numberOfRounds, worryDivisor) {
    const monkeyArray = [...monkeyArr];
    for (let i = 0; i < numberOfRounds; i++) {
        monkeyArray.forEach(monkey => {
            var item = monkey.startingItems.shift();
            while (item) {
                item = Math.floor(monkey.monkeyOperation(item) / worryDivisor);
                var toMonkey = monkey.monkeyTest(item);
                monkeyArray[toMonkey].startingItems.push(item);
                item = monkey.startingItems.shift();
                monkey.inspectionCount++;
            }
        })
    }
    const inspections = [];
    monkeyArray.forEach(monkey => inspections.push(monkey.inspectionCount));
    return inspections
}

function Monkey(monkeyNum, startingItems, monkeyOperation, divisibleBy, trueMonkey, falseMonkey) {
    this.monkeyNum = monkeyNum;
    this.startingItems = startingItems;
    this.monkeyOperation = monkeyOperation;
    this.monkeyTest = function (item) {
        if (item % divisibleBy === 0) {
            return trueMonkey
        } else {
            return falseMonkey
        }
    };
    this.inspectionCount = 0;
}

function functionCreator(monkeyDef2) {
    const math = monkeyDef2.split("=")[1];
    switch (math) {
        case " old * old":
            return function (old) { return old * old };
            break;
        case " old * 19":
            return function (old) { return old * 19 };
        case " old * 7":
            return function (old) { return old * 7 };
            break;
        case " old * 3":
            return function (old) { return old * 3 };
            break;
        case " old + 8":
            return function (old) { return old + 8 };
            break;
        case " old + 7":
            return function (old) { return old + 7 };
        case " old + 6":
            return function (old) { return old + 6 };
        case " old + 4":
            return function (old) { return old + 4 };
            break;
        case " old + 3":
            return function (old) { return old + 3 };
            break;
        case " old + 2":
            return function (old) { return old + 2 };
            break;


        default:
            break;
    }
}

function modReducers(item, testerArr) {
    const reducedArr = [];
    if (Number.isInteger(item)) {
        testerArr.forEach(tester => {
            reducedArr.push(item % tester)
        });
        return reducedArr;
    } else if (item) {
        for (let i = 0; i < item.length; i++) {
            reducedArr.push(item[i] % [testerArr[i]])
        };
        return reducedArr;
    }

}

