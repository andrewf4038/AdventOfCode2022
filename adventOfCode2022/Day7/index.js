const fs = require("fs");
const text = fs.readFileSync("./input.txt", encoding = "utf8");
const inputs = text.split("\n");

var folders = {};
var cwd = "";
var cwid = 0;
var subs = {};
var sub = ""
var id = 0;

inputs.forEach((input, index) => {
    if (input.match(/\$.cd/g) && input.slice(5, 7) !== "..") {
        cwd = input.slice(5);
        cwid = subCheck(cwid, cwd);
    }
    if (!folders[cwid]) {
        folders[cwid] = createDir(cwd);
    } else if (input.match(/\d+/g)) {
        var fileSize = input.match(/\d+/g)[0];
        if (folders[cwid]) {
            folders[cwid]['File Size'] += Number(fileSize);
            sizeRollup(cwid, Number(fileSize));
        } else {
            folders[cwid] = createDir(cwd, Number(fileSize));
        }
    } else if (input.match(/dir/g)) {
        sub = input.split(" ")[1];
        subs[id] = cwid;
        folders[id] = createDir(sub);
        ;
    } else if (input.match(/\$.cd.\.{2}/g)) {
        cwid = subs[cwid];
    }

})

var folderTotal = 0;
for (const folder in folders) {
    if (folders[folder]['File Size'] <= 100000) {
        folderTotal += folders[folder]['File Size'];
    }
}
console.log("The answer to part 1 is %d", folderTotal);

const totalSpace = 70000000;
const desiredSpace = 30000000;
const currentFreeSpace = totalSpace - folders[0]['File Size'];
var deletedFolderSize = 70000000;
var currentFolderSize = 70000000;
for (const folder in folders) {
    if (folders[folder]['File Size'] + currentFreeSpace >= desiredSpace) {
        currentFolderSize = folders[folder]['File Size'];
    }
    if (currentFolderSize < deletedFolderSize) { deletedFolderSize = currentFolderSize }
}
console.log("The answer to part 2 is %d", deletedFolderSize);

function sizeRollup(cwid, size) {
    var parent = Number(subs[cwid]);
    if (Number.isInteger(parent)) {
        folders[parent]['File Size'] += size;
    }
    if (Number.isInteger(subs[parent])) {
        sizeRollup(parent, size)
    } else { return }
}

function createDir(folderName, fileSize = 0) {
    id++;
    return {
        "Name": folderName,
        "File Size": fileSize
    }
}

function subCheck(cwid, cwd) {
    // check through all the subs to see if any of the names match the cwid
    for (const sub in subs) {
        if (subs[sub] === cwid && folders[sub]['Name'] === cwd) {
            return Number(sub);
        }
    }
    return cwid
}