const fs = require("fs");
const text = fs.readFileSync("./input.txt", encoding = "utf8");


console.log("The answer to problem one is %d", processor(text, 4))
console.log("The answer to problem two is %d", processor(text, 14))

function processor(text, markerLength) {
    for (let index = 0; index < text.length; index++) {
        const marker = text.substring(index, markerLength);
        if (markerVerification(marker)) {
            break
        }
        markerLength++;
    }
    return markerLength;
}
function markerVerification(marker) {
    for (let index = 0; index < marker.length; index++) {
        if (marker.includes(marker[index], index + 1)) {
            return false
        }
    }
    return true
}