const fs = require("fs");
// // 1) node wcat.js filepath => display the contewnt of file in terminal
// //node wcat.js f1.txt
// let input = process.argv.slice(1);
// console.log(fs.readFileSync(input[1], "utf-8"));


// // 2) node wcat.js filepath1 filepath2 filepath3  => displays the content of all files in terminal in concatinated form in given order
// // node wcat.js f1.txt f2.txt f3.txt
// let inputArr = process.argv.slice(2);
// let filesArr = [];
// // placed files path in filesArr
// for (let i = 0; i < inputArr.length; i++){
//     filesArr.push(inputArr[i]);
// }
// // console.log("file to be read are " + filesArr);

// //check if all the files are present //
// for (let i = 0; i < filesArr.length; i++){
//     let doesExist = fs.existsSync(filesArr[i]);
//     if (!doesExist) {
//         console.log("Files does not exist ");
//         return;
//     }
// }

// // content read and appending starts//
// let content = "";
// for (let i = 0; i < filesArr.length; i++){
//     let fileContent = fs.readFileSync(filesArr[i]);
//     content += fileContent+"\n";
// }
// console.log(content);


// 3) node wcat.js -n file1 file 2 file3 OR node wcat.js -n file1 
let inputArr = process.argv.slice(2); // stores the input in a array word wise ex:[ '-b', 'f1.txt' ]
let filesArr = [];
let optionsArr = [];
//===============> placed files path in filesArr <=============
for (let i = 0; i < inputArr.length; i++){
    let firstChar = inputArr[i].charAt(0);
    if (firstChar == '-') {
        optionsArr.push(inputArr[i]);
    }
    else {
        filesArr.push(inputArr[i]);
    }
}
// console.log("file to be read are " + filesArr);

//=============>check if all the files are present<============= //
for (let i = 0; i < filesArr.length; i++){
    let doesExist = fs.existsSync(filesArr[i]);
    if (!doesExist) {
        console.log("One or more File(s) do not exist ");
        return;
        // break;
    }
}

// =============>content read and appending starts<=============//
let content = "";
for (let i = 0; i < filesArr.length; i++){
    let fileContent = fs.readFileSync(filesArr[i]);
    content = content + fileContent + "\n";
                     
}
let contentArr = content.split("\n"); // splits the contednt and stores it in a array

//================>Check for -n and execute accordingly<==========================================//
let isNPresent = optionsArr.includes("-n");
if(isNPresent){
    var lineno =1;
    for(var i=0;i<contentArr.length-1;i++){
        console.log(lineno+". "+contentArr[i]);
        lineno++;
    }
}

//======================>check if -s is present or not<=========================//
let isSPresent = optionsArr.includes("-s");
if (isSPresent) {
    // console.log("data before removing extra lines\n");
    // for (var i = 0;i < contentArr.length; i++){
    //     console.log(contentArr[i]);
    // }
    for (let i = 1; i < contentArr.length; i++){
        if ((contentArr[i] == '\r' || contentArr[i] == '') && contentArr[i - 1] == '\r' ) {
            contentArr[i] = null;
        }
        else if ((contentArr[i] == '\r' || contentArr[i] == '') && contentArr[i - 1] == null) {
            contentArr[i] = null;
        }
    }
    // console.table(contentArr);
    let tempArr = [];
    //push everything in tempArr except null
    for (let i = 0; i < contentArr.length; i++){
        if (contentArr[i] != null) {
            tempArr.push(contentArr[i]);
        }
    }
    // console.log("data after removing extra lines\n");
    for (var i = 0;i < tempArr.length; i++){
        console.log(tempArr[i]);
    }
}

//======================>check if -b is present or not<=========================//
let isBPresent = optionsArr.includes("-b");
if (isBPresent) {
    // console.log(" data before  numbering lines\n");
    // for (var i = 0;i < contentArr.length; i++){
    //     console.log(contentArr[i]);
    // }
    lineno = 1;
    let tempArr = [];
    for (let i = 0; i < contentArr.length; i++){
        if (contentArr[i] != '\r' && contentArr[i] != '') {
            tempArr[i] = lineno+". "+contentArr[i];
            lineno ++;
        }
        else{
            tempArr[i] = ' ';
        }
    }

    // console.log("data after numbering lines\n");
    for (var i = 0;i < tempArr.length; i++){
        console.log(tempArr[i]);
    }
}