const fs = require("fs");
const text = fs.readFileSync("./input.txt", encoding = "utf8");
const myArray = text.split("\r\n");

var totalScore = 0;
myArray.forEach(element => totalScore += roundScoreFunction(element));
console.log(totalScore);

var totalScore2 = 0;
myArray.forEach(element => totalScore2 += roundScoreFunction2(element));
console.log(totalScore2);
console.log("Changes")

function roundScoreFunction(element) {
    switch (element) {
        case "A X": return 4; // Rock to Rock (1) Draw (3)
        case "A Y": return 8; // Rock to Paper (2) Win (6)
        case "A Z": return 3; // Rock to Scissors (3) Loss (0)
        case "B X": return 1; // Paper to Rock (1) Loss (0)
        case "B Y": return 5; // Paper to Paper (2) Draw(3)
        case "B Z": return 9; // Paper to Scissors (3) Win (6)
        case "C X": return 7; //Scissors to Rock (1) Win (6)
        case "C Y": return 2; //Scissors to Paper (2) Loss (0)
        case "C Z": return 6; //Scissors to Scissors(3) Draw (3)
    }
}

function roundScoreFunction2(element) {
    switch (element) {
        case "A X": return 3; // Rock to lose => Scissor
        case "A Y": return 4; // Rock to Draw => Rock
        case "A Z": return 8; // Rock to Win => Paper
        case "B X": return 1; // Paper to lose => Rock
        case "B Y": return 5; // Paper to Draw => Paper
        case "B Z": return 9; // Paper to Win => Scissors
        case "C X": return 2; //Scissors to Lose => Paper
        case "C Y": return 6; //Scissors to Draw => Scissors
        case "C Z": return 7; //Scissors to Win => Rock
    }
}