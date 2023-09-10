// const synth = new Tone.PolySynth(Tone.Synth).toDestination();
const now = Tone.now();

// let testbutton = document.querySelector(".testbutton");

// const sampler = new Tone.Sampler({
//   urls: {
//     C2: "/39163__jobro__piano-ff-016.wav",
//     "C#2": "/39164__jobro__piano-ff-017.wav",
//     D2: "/39165__jobro__piano-ff-018.wav",
//     "D#2": "/39166__jobro__piano-ff-019.wav",
//     E2: "/39167__jobro__piano-ff-020.wav",
//     F2: "/39168__jobro__piano-ff-021.wav",
//     "F#2": "/39169__jobro__piano-ff-022.wav",
//     G2: "/39170__jobro__piano-ff-023.wav",
//     "G#2": "/39171__jobro__piano-ff-024.wav",
//     A2: "/39172__jobro__piano-ff-025.wav",
//     "A#2": "/39173__jobro__piano-ff-026.wav",
//     B2: "/39174__jobro__piano-ff-027.wav",
//     // C3
//     C3: "/39175__jobro__piano-ff-028.wav",
//     "C#3": "/39176__jobro__piano-ff-029.wav",
//     D3: "/39177__jobro__piano-ff-030.wav",
//     "D#3": "/39178__jobro__piano-ff-031.wav",
//     E3: "/39179__jobro__piano-ff-032.wav",
//     F3: "/39180__jobro__piano-ff-033.wav",
//     "F#3": "/39181__jobro__piano-ff-034.wav",
//     G3: "/39182__jobro__piano-ff-035.wav",
//     "G#3": "/39183__jobro__piano-ff-036.wav",
//     A3: "/39184__jobro__piano-ff-037.wav",
//     "A#3": "/39185__jobro__piano-ff-038.wav",
//     B3: "/39186__jobro__piano-ff-039.wav",
//     // C4
//     C4: "/39187__jobro__piano-ff-040.wav",
//     "C#4": "/39188__jobro__piano-ff-041.wav",
//     D4: "/39189__jobro__piano-ff-042.wav",
//     "D#4": "/39190__jobro__piano-ff-043.wav",
//     E4: "/39191__jobro__piano-ff-044.wav",
//     F4: "/39193__jobro__piano-ff-045.wav",
//     "F#4": "/39194__jobro__piano-ff-046.wav",
//     G4: "/39195__jobro__piano-ff-047.wav",
//     "G#4": "/39196__jobro__piano-ff-048.wav",
//     A4: "/39197__jobro__piano-ff-049.wav",
//     "A#4": "/39198__jobro__piano-ff-050.wav",
//     B4: "/39199__jobro__piano-ff-051.wav",
//     // C5
//     C5: "/39200__jobro__piano-ff-052.wav",
//     "C#5": "/39201__jobro__piano-ff-053.wav",
//     D5: "/39202__jobro__piano-ff-054.wav",
//     "D#5": "/39203__jobro__piano-ff-055.wav",
//     E5: "/39204__jobro__piano-ff-056.wav",
//     F5: "/39205__jobro__piano-ff-057.wav",
//     "F#5": "/39206__jobro__piano-ff-058.wav",
//     G5: "/39207__jobro__piano-ff-059.wav",
//     "G#5": "/39208__jobro__piano-ff-060.wav",
//     A5: "/39209__jobro__piano-ff-061.wav",
//     "A#5": "/39210__jobro__piano-ff-062.wav",
//     B5: "/39211__jobro__piano-ff-063.wav",
//     // C6
//     C6: "/39212__jobro__piano-ff-064.wav",
//   },
//   release: 1,
//   baseUrl: "jobro-sample",
// }).toDestination();

const sampler = new Tone.Sampler({
  urls: {
    C2: "/C223.wav",
    G2: "/G221.wav",
    C3: "/C319.wav",
    G3: "/G317.wav",
    C4: "/C415.wav",
    G4: "/G513.wav",
    C5: "/C511.wav",
    G5: "/G69.wav",
    C6: "/C67.wav",
    G6: "/G75.wav",
    C7: "/C73.wav",
  },
  release: 1,
  baseUrl: "yamahaui",
}).toDestination();

// testbutton.addEventListener("click", async () => {
//   await Tone.start();
//   console.log("audio is ready");
//   // sampler.triggerAttackRelease(["C6"], 4);
// });

// KEYBOARD ---------------------------------------------------------------
let keyboardNotes = document.querySelectorAll(".note");
let visibilityToggle = document.querySelector(".note-visibility");
let visibilityToggleVar = true;

keyboardNotes.forEach((index, value) => {
  index.addEventListener("click", () => {
    // var splitNotes = index.id.split("-");
    // instrument.play(splitNotes[0], splitNotes[1], 2);
    var splitNotes = index.id.replace("-", "");
    // synth.triggerAttackRelease(splitNotes, "8n");
    sampler.triggerAttackRelease(splitNotes, 1);
  });
});

// Toggle visibility of the notes alphabetical notation
visibilityToggle.addEventListener("click", () => {
  if (visibilityToggleVar) {
    keyboardNotes.forEach((index, value) => {
      index.innerHTML = "";
    });
    visibilityToggle.innerHTML = "show notes";
    visibilityToggleVar = false;
  } else {
    keyboardNotes.forEach((index, value) => {
      index.innerHTML = index.id.replace("-", "");
    });
    visibilityToggle.innerHTML = "hide notes";
    visibilityToggleVar = true;
  }
});
// -------------------------------------------------------------------------

// PATTERN
let patternContainer = document.querySelector(".pattern"),
  playbutton = document.querySelector(".playbutton"),
  resetbutton = document.querySelector(".resetbutton"),
  patternChangeButton = document.querySelector(".pattern-change"),
  patternLength = document.querySelector(".pattern-length"),
  tempoChange = document.querySelector(".tempo-change"),
  tempoInput = document.querySelector(".temput"),
  saving = false;

var tempo = 250,
  aborting = false,
  playing = false,
  duration = 2;

// EVENT GIVER
var drag = false;
var state = null;
window.addEventListener("mousedown", () => {
  drag = true;
});
window.addEventListener("mouseup", () => {
  drag = false;
  state = null;
});

function difNote(item, activeOrNot) {
  if (item.classList.contains("bn")) {
    return activeOrNot ? "green" : "grey";
  } else {
    return activeOrNot ? "green" : "#aaaaaa";
  }
}

function offNoteCheck(state) {
  if (state == "grey" || state == "#aaaaaa") {
    return true;
  }
}

function eventgiver(items, singleIterable = false) {
  // SINGLE ITEM
  if (singleIterable) {
    items.addEventListener("mouseenter", () => {
      let activeNotes = difNote(items, true);
      let offNotes = difNote(items, false);
      if (drag) {
        if (
          items.style.backgroundColor != activeNotes &&
          !offNoteCheck(state)
        ) {
          items.style.backgroundColor = activeNotes;
          var idSplitted = items.id.replace("-", "");
          sampler.triggerAttackRelease(idSplitted, 1);

          state = activeNotes;
        } else if (
          items.style.backgroundColor == activeNotes &&
          state != activeNotes
        ) {
          items.style.backgroundColor = offNotes;
          state = offNotes;
        }
      }
      saving = true;
    });
    items.addEventListener("mousedown", () => {
      let activeNotes = difNote(items, true);
      let offNotes = difNote(items, false);
      if (items.style.backgroundColor != activeNotes && !offNoteCheck(state)) {
        items.style.backgroundColor = activeNotes;
        var idSplitted = items.id.replace("-", "");
        sampler.triggerAttackRelease(idSplitted, 1);
        state = activeNotes;
      } else if (
        items.style.backgroundColor == activeNotes &&
        state != activeNotes
      ) {
        items.style.backgroundColor = offNotes;
        state = offNotes;
      }
      saving = true;
    });
    return;
  }

  // ARRAY ITEMS
  items.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      let activeNotes = difNote(item, true);
      let offNotes = difNote(item, false);

      if (drag) {
        if (item.style.backgroundColor != activeNotes && !offNoteCheck(state)) {
          item.style.backgroundColor = activeNotes;
          // var idSplitted = item.id.split("-");
          // instrument.play(idSplitted[0], idSplitted[1], duration);
          // var idSplitted = item.id.replace("-", "");
          // sampler.triggerAttackRelease(idSplitted, 4);
          var idSplitted = item.id.replace("-", "");
          sampler.triggerAttackRelease(idSplitted, 1);
          state = activeNotes;
        } else if (
          item.style.backgroundColor == activeNotes &&
          state != activeNotes
        ) {
          item.style.backgroundColor = offNotes;
          state = offNotes;
        }
      }
      saving = true;
    });
    item.addEventListener("mousedown", () => {
      let activeNotes = difNote(item, true);
      let offNotes = difNote(item, false);
      if (item.style.backgroundColor != activeNotes && !offNoteCheck(state)) {
        item.style.backgroundColor = activeNotes;
        // var idSplitted = item.id.split("-");
        // instrument.play(idSplitted[0], idSplitted[1], duration);
        var idSplitted = item.id.replace("-", "");
        sampler.triggerAttackRelease(idSplitted, 1);
        state = activeNotes;
      } else if (
        item.style.backgroundColor == activeNotes &&
        state != activeNotes
      ) {
        item.style.backgroundColor = offNotes;
        state = offNotes;
      }
      saving = true;
    });
  });
}

// RESET
resetbutton.addEventListener("click", () => {
  if (!saving) return;
  if (confirm("reset the notes?")) {
    for (children of patternContainer.children) {
      for (notes of children.children) {
        if (notes.classList.contains("wn")) {
          switch (notes.style.backgroundColor) {
            case "green":
              notes.style.backgroundColor = "#aaaaaa";
              break;
          }
        } else {
          switch (notes.style.backgroundColor) {
            case "green":
              notes.style.backgroundColor = "grey";
              break;
          }
        }
      }
    }
  } else {
  }
});

// change tempo
tempoChange.addEventListener("click", () => {
  let tempoValue = parseInt(tempoInput.value);
  if (tempoValue < 60 || tempoValue > 1000) {
    alert("invalid value, please enter between 60-1000 bpm");
    return;
  }
  let outputTempo = document.querySelector(".current-tempo");
  let bpm = 30000 / tempoValue;
  outputTempo.innerHTML = tempoValue;
  tempo = bpm;
});

// change pattern length(heavily modified to the point where it doesn't look like the one chatgpt wrote)
patternChangeButton.addEventListener("click", () => {
  aborting = true;
  const inputValue = parseInt(patternLength.value);
  if (inputValue < 1 || inputValue > 1000) {
    alert("invalid value, please enter between 1-1000 patterns");
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
          console.log("pattern removed:", i);
        }
        console.log("length of the pattern after:", inputValue);

        // do this operation if input value is bigger than patterns
      } else {
        let referencePat = patternItem[0].cloneNode(true);
        for (const child of referencePat.children) {
          if (child.style.backgroundColor == "green") {
            child.style.backgroundColor = difNote(child, false);
          }
        }
        for (let i = patternItem.length; i < inputValue; i++) {
          const newParagraph = referencePat.cloneNode(true);
          newParagraph.style.transform = "none";
          newParagraph.style.border = "none";
          patternNewCon.appendChild(newParagraph);

          // give event
          for (const child of newParagraph.children) {
            eventgiver(child, true);
          }
        }
      }
    } else {
      console.log("input is already the same");
    }
  }
  document.querySelector(".current-length").innerHTML = inputValue;
});

// initial pattern
function initialPattern() {
  let note = document.querySelectorAll(".single-pattern");
  eventgiver(note);
}

// DELAY FUNCTION
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// PLAY THE MUSIC
async function playMusic() {
  await Tone.start();
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
    let notesArray = [];
    for (const child of patterns[p].children) {
      if (child.style.backgroundColor == "green") {
        // var idSplit = child.id.split("-");
        // instrument.play(idSplit[0], idSplit[1], duration);
        var idSplit = child.id.replace("-", "");
        notesArray.push(idSplit);
      }
      count++;
    }
    // synth.triggerAttackRelease(notesArray, "6n");
    sampler.triggerAttackRelease(notesArray, 1);
    prevPattern = patterns[p];
    notesArray = [];
    // time delay
    await sleep(tempo);
  }
  playing = false;
  playbutton.innerHTML = "PLAY";
}

// initialization
initialPattern();

// PLAYING THE MUSIC(this is confusing for some reason)
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

// clear columns style after play
function clearColumns(allCol) {
  allCol.forEach((column) => {
    column.style.transform = "none";
    column.style.border = "none";
  });
}
