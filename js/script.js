let patternContainer = document.querySelector(".pattern"),
  playbutton = document.querySelector(".playbutton"),
  patternChangeButton = document.querySelector(".pattern-change"),
  patternLength = document.querySelector(".pattern-length"),
  // referencePattern = document.querySelector(".reference-point"),
  tempoChange = document.querySelector(".tempo-change"),
  tempoInput = document.querySelector(".temput");

var tempo = 500;
var aborting = false,
  playing = false;

tempoChange.addEventListener("click", () => {
  let tempoValue = parseInt(tempoInput.value);
  if (tempoValue < 60 || tempoValue > 400) {
    alert("invalid value, please enter between 60-200 bpm");
    return;
  }
  let outputTempo = document.querySelector(".current-tempo");
  let bpm = 60000 / tempoValue;
  outputTempo.innerHTML = tempoValue;
  tempo = bpm;
});

// CHANGE HOW MANY PATTERNS THERE ARE(heavily modified to the point where it doesn't look like the one chatgpt wrote)
patternChangeButton.addEventListener("click", () => {
  aborting = true;
  const inputValue = parseInt(patternLength.value);
  if (inputValue < 1 || inputValue > 30) {
    alert("invalid value, please enter between 1-30 patterns");
    return;
  }
  // Ensure the input value is not below 1
  if (inputValue >= 1) {
    let patternItem = document.querySelectorAll(".pattern-column");
    let patternNewCon = document.querySelector(".pattern");

    // this operation may not be possible if both value are the same
    // so idk just making sure I didn't include it ehhh
    if (inputValue != patternItem.length) {
      // do this operation if input value is smaller than current length of the patterns
      if (inputValue < patternItem.length) {
        console.log("length of pattern before:", patternItem.length);

        patternItem.forEach((index) => {
          index.style.transform = "none";
          index.style.border = "none";
        });
        for (let i = inputValue; i < patternItem.length; i++) {
          patternNewCon.removeChild(patternItem[i]);
          // console.log(patternItem[i]);
          console.log("pattern removed:", i);
        }
        console.log("length of the pattern after:", inputValue);
        // patternContainer.innerHTML = "";

        // do this operation if input value is bigger than patterns
      } else {
        let referencePat = patternItem[0].cloneNode(true);
        for (const child of referencePat.children) {
          child.style.backgroundColor = "grey";
        }
        for (let i = patternItem.length; i < inputValue; i++) {
          const newParagraph = referencePat.cloneNode(true);
          // newParagraph.style.display = "grid";
          newParagraph.style.transform = "none";
          newParagraph.style.border = "none";
          // newParagraph.style.borderLeft = "1px solid black";
          patternNewCon.appendChild(newParagraph);
        }
      }
    } else {
      console.log("input is already the same");
    }
  }
  document.querySelector(".current-length").innerHTML = inputValue;
  initialPattern();
});

// name the instrument, piano 0, organ 1, guitar 2, synth 3
var instrument = Synth.createInstrument(0);

// -------- FUNCTIONS ------------------------------------------------------------------------
function initialPattern() {
  let note = document.querySelectorAll(".single-pattern");
  // note.forEach((index, value) => {
  //   index.style.backgroundColor = "grey";
  // });

  note.forEach((index, value) => {
    index.addEventListener("click", () => {
      if (index.style.backgroundColor != "green") {
        index.style.backgroundColor = "green";
        var idSplitInit = index.id.split("-");
        instrument.play(idSplitInit[0], idSplitInit[1], 2);
      } else {
        index.style.backgroundColor = "grey";
      }
    });
  });
}

// DELAY FUNCTION
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function playMusic() {
  let patterns = document.querySelectorAll(".pattern-column");
  let prevPattern;
  for (let p = 0; p < patterns.length; p++) {
    playing = true;
    // ABORT PROCESS (HELP ME)
    if (aborting) {
      clearColumns(patterns);
      break;
    }
    // VISUAL INDICATOR
    if (prevPattern) {
      prevPattern.style.transform = "none";
      prevPattern.style.border = "none";
      // prevPattern.style.borderLeft = "1px solid black";
    }
    patterns[p].style.borderTop = "10px solid white";
    patterns[p].style.transform = "translateY(-10px)";

    let count = 0;
    for (const child of patterns[p].children) {
      if (child.style.backgroundColor == "green") {
        var idSplit = child.id.split("-");
        instrument.play(idSplit[0], idSplit[1], 2);
      }
      count++;
    }
    prevPattern = patterns[p];
    // time delay
    await sleep(tempo);
  }
  playing = false;
  playbutton.innerHTML = "PLAY";
}
// --------END FUNCTION-----------------------------------------------------------------------------

// initialization
initialPattern();

playbutton.addEventListener("click", () => {
  let patternCol = document.querySelectorAll(".pattern-column");
  if (playing) {
    clearColumns(patternCol);
    aborting = true;
    playbutton.innerHTML = "PLAY";
  } else {
    clearColumns(patternCol);
    aborting = false;
    playbutton.innerHTML = "STOP";
  }

  playMusic();
  //   console.log("done");
});

function clearColumns(allCol) {
  allCol.forEach((column) => {
    column.style.transform = "none";
    column.style.border = "none";
    // column.style.borderLeft = "1px solid black";
  });
}
