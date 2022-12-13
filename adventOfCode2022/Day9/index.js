const fs = require("fs");
const text = fs.readFileSync("./input.txt", encoding = "utf8");
const directions = text.split("\n");

var hCoordinates = [[0, 0]]; // [[0,0],[0,1], [0,2],[0,3],[0,4]];
var tCoordinates = [[0, 0]];

directions.forEach(dir => {
    var tX2 = tCoordinates[tCoordinates.length - 1][0];
    var tY2 = tCoordinates[tCoordinates.length - 1][1];
    var hX2 = hCoordinates[hCoordinates.length - 1][0];
    var hY2 = hCoordinates[hCoordinates.length - 1][1];
    hBuilder(dir, [tX2, tY2], [hX2, hY2]);
});

for (let i = 1; i < hCoordinates.length; i++) {
    tCoordinates.push(tBuilder2(hCoordinates[i], tCoordinates[tCoordinates.length - 1]));
}
const uniqueCount = new Set(tCoordinates.map(JSON.stringify));
console.log("The count of tail positions and answer to part one is %d", uniqueCount.size)

var tCoordinates = [[0, 0]];
var coString = ""
for (let index = 0; index < 9; index++) {
    if (index === 0) {
        for (let i = 1; i < hCoordinates.length; i++) {
            tCoordinates.push(tBuilder2(hCoordinates[i], tCoordinates[tCoordinates.length - 1]));
        }
    } else {
        hCoordinates = tCoordinates;
        tCoordinates = [[0, 0]];
        for (let i = 1; i < hCoordinates.length; i++) {
            tCoordinates.push(tBuilder2(hCoordinates[i], tCoordinates[tCoordinates.length - 1]));
        }
    }
}
const uniqueCount2 = new Set(tCoordinates.map(JSON.stringify));
console.log("The count of tail positions and answer to part two is %d", uniqueCount2.size)
// 2461 is incorrect

function hBuilder(dir, tailCoord, headCoord) {
    var direction = dir.slice(0, 1);
    var numOfSteps = dir.slice(2);
    var [hX2, hY2] = headCoord;
    var [tX2, tY2] = tailCoord;
    switch (direction) {
        case "R":
            for (let i = 0; i < numOfSteps; i++) {
                hX2++;
                hCoordinates.push([hX2, hY2]);
            }
            break;
        case "L":
            for (let i = 0; i < numOfSteps; i++) {
                hX2--;
                hCoordinates.push([hX2, hY2]);

            }
            break;
        case "U":
            for (let i = 0; i < numOfSteps; i++) {
                hY2++;
                hCoordinates.push([hX2, hY2]);
            }
            break;
        case "D":
            for (let i = 0; i < numOfSteps; i++) {
                hY2--;
                hCoordinates.push([hX2, hY2]);
            }
            break;
        default:
            break;
    }
}

// function tBuilder(headCoord, prevHeadCoord, tailCoord) {

//     const hX1 = prevHeadCoord[0];
//     const hX2 = headCoord[0];
//     const hY1 = prevHeadCoord[1];
//     const hY2 = headCoord[1];
//     const tX1 = tailCoord[0];
//     const tY1 = tailCoord[1];
//     var tX2 = tailCoord[0];
//     var tY2 = tailCoord[1];

//     if (hX2 - hX1 > 0 && hY2 === hY1 && Math.abs(hX2 - tX1) > 1) { // R
//         tX2++;
//         tY2 = hY2;
//         tCoordinates.push([tX2, tY2]);
//     } else if (hX2 - hX1 < 0 && hY2 === hY1 && Math.abs(hX2 - tX1) > 1) { // L
//         tX2--;
//         tY2 = hY2;
//         tCoordinates.push([tX2, tY2]);
//     } else if (hY2 - hY1 > 0 && hX2 === hX1 && Math.abs(hY2 - tY1) > 1) { // U
//         tX2 = hX2;
//         tY2++;
//         tCoordinates.push([tX2, tY2]);
//     } else if (hY2 - hY1 < 0 && hX2 === hX1 && Math.abs(hY2 - tY1) > 1) { // D
//         tX2 = hX2;
//         tY2--;
//         tCoordinates.push([tX2, tY2]);
//     } else if (hX2 - hX1 > 0 && hY2 - hY1 > 0 && (Math.abs(hX2 - tX1) > 1 || Math.abs(hY2 - tY1) > 1)) { // RU
//         tX2++;
//         tY2++;
//         tCoordinates.push([tX2, tY2]);
//     } else if (hX2 - hX1 < 0 && hY2 - hY1 > 0 && (Math.abs(hX2 - tX1) > 1 || Math.abs(hY2 - tY1) > 1)) { // LU
//         tX2--;
//         tY2++;
//         tCoordinates.push([tX2, tY2]);
//     } else if (hX2 - hX1 > 0 && hY2 - hY1 < 0 && (Math.abs(hX2 - tX1) > 1 || Math.abs(hY2 - tY1) > 1)) { // RD
//         tX2++;
//         tY2--;
//         tCoordinates.push([tX2, tY2]);
//     } else if (hX2 - hX1 < 0 && hY2 - hY1 < 0 && (Math.abs(hX2 - tX1) > 1 || Math.abs(hY2 - tY1) > 1)) { // LD
//         tX2--;
//         tY2--;
//         tCoordinates.push([tX2, tY2]);
//     } else {
//         tCoordinates.push([tX2, tY2]);
//     }
// }
// I need to build the logic based on the rules
// if in the same row or column then add one to the other
// if not in the same row or column then add one to both

function tBuilder2(headCoord, tailCoord) {

    const hX = headCoord[0];
    const hY = headCoord[1];
    const tX = tailCoord[0];
    const tY = tailCoord[1];
    var tX2 = hX;
    var tY2 = hY;
    var adder = 0;
    var adder2 = 0;
    if (Math.abs(hX - tX) > 1 || Math.abs(hY - tY) > 1) {
        if (hX === tX && hY !== tY) {
            adder = signHelper(tY, hY);
            tY2 = tY + adder;
        } else if (hX !== tX && hY === tY) {
            adder = signHelper(tX, hX);
            tX2 = tX + adder;
        } else if (hX !== tX && hY !== tY) {
            adder = signHelper(tX, hX);
            adder2 = signHelper(tY, hY);
            tX2 = tX + adder;
            tY2 = tY + adder2;

        }
    } else {
        tX2 = tX;
        tY2 = tY;
    }
    return [tX2, tY2]
}

function signHelper(x, y) {
    if (y - x > 0) {
        return 1;
    } else { return -1 }
}
function coordString(coString, coordinates) {

    coordinates.forEach(coordinate => {
        coString = coString + coordinate[0] + coordinate[1] + ' ';
    })
    return coString;
}