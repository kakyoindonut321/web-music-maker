let exportBut = document.querySelector(".export-button");
let importBut = document.querySelector(".import-button");
let songname = document.querySelector(".songname");
let fileInput = document.getElementById("inputfile");
let costumizeButton = document.querySelector(".costumizebutton");
var fr = new FileReader();
let notesLength = 37;

exportBut.addEventListener("click", exportPattern);
importBut.addEventListener("click", () => {
  fr.onload = function () {
    // let json = fr.result;
    importPattern(JSON.parse(fr.result));
  };
  fr.readAsText(fileInput.files[0]);
});
// const testData = {
//   dataLength: 10,
//   bigText: [
//     [
//       1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     ],
//     [
//       0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     ],
//     [
//       0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     ],
//     [
//       0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     ],
//     [
//       0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     ],
//     [
//       0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     ],
//     [
//       0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     ],
//     [
//       0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     ],
//     [
//       0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     ],
//     [
//       0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     ],
//   ],
// };

function exportPattern() {
  if (songname.value == "") {
    alert("name must not be empty");
    return;
  }
  let allPattern = document.querySelector(".pattern").children;
  let arraydata = [];
  let length = allPattern.length;

  for (let i = 0; i < length; i++) {
    let currentColumn = allPattern[i].children;
    insideray = [];
    for (let b = 0; b < currentColumn.length; b++) {
      if (
        currentColumn[b].style.backgroundColor == "grey" ||
        currentColumn[b].style.backgroundColor == ""
      ) {
        insideray.push(0);
      } else {
        insideray.push(1);
      }
    }
    arraydata.push(insideray);
  }

  let dummyData = {
    name: songname.value,
    dataLength: length,
    bigText: arrayToBin(arraydata),
  };

  download(dummyData, dummyData.name);
}

function importPattern(patternData) {
  if (saving) {
    if (!confirm("are you sure? unsaved patterns will be discarded")) return;
  }
  saving = true;

  let patContainer = document.querySelector(".pattern");
  let referencePatt = document
    .querySelectorAll(".pattern-column")[0]
    .cloneNode(true);
  let arrayData = binToArray(patternData.bigText);
  patContainer.innerHTML = "";
  for (patternArray of arrayData) {
    let perPattern = referencePatt.cloneNode(true);
    for (let n = 0; n < patternArray.length; n++) {
      if (patternArray[n] === 1) {
        perPattern.children[n].style.backgroundColor = "green";
      } else {
        perPattern.children[n].style.backgroundColor = "grey";
      }
    }
    patContainer.appendChild(perPattern);

    // give event
    for (const child of perPattern.children) {
      eventgiver(child, true);
    }
  }
}

function arrayToBin(theArray) {
  let usedArray = [...theArray];
  for (let ar = 0; ar < usedArray.length; ar++) {
    let stringyArray = usedArray[ar].toString();
    let newArray = parseInt(stringyArray.split(",").reverse().join(""), 2);
    usedArray[ar] = newArray;
  }
  return usedArray;
}

function binToArray(theArray) {
  let usedArray = [...theArray];
  for (let ar = 0; ar < usedArray.length; ar++) {
    let stringyBin = dec2bin(usedArray[ar], notesLength);
    let newArray = stringyBin.split("").map((x) => parseInt(x));
    usedArray[ar] = newArray;
  }
  return usedArray;
}

function dec2bin(dec, binLength) {
  let binary = (dec >>> 0).toString(2).split("").reverse().join("");
  let remainder = binLength - binary.length;
  let addedZero = "0".repeat(remainder);
  return binary + addedZero;
}

function download(content, fileName) {
  var a = document.createElement("a");
  let stringJson = JSON.stringify(content);
  var file = new Blob([stringJson], { type: "text/plain" });
  a.href = URL.createObjectURL(file);
  a.download = fileName + ".json";
  a.click();
}

// CUSTOME CODE HERE
costumizeButton.addEventListener("click", () => {
  if (!confirm("are you sure?")) return;
  let patContainer = document.querySelector(".pattern");
  let points = 10;
  let state = true;
  for (children of patContainer.children) {
    for (let i = 0; i < children.children.length; i++) {
      if (i == points) {
        children.children[i].style.backgroundColor = "green";
      }
    }
    if (points == 10) {
      state = true;
    } else if (points == notesLength) {
      state = false;
    }

    state ? points++ : points--;
    console.log(points);
  }
});
