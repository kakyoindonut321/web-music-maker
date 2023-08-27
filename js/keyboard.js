let keyboardNotes = document.querySelectorAll(".note");
let visibilityToggle = document.querySelector(".note-visibility");
let visibilityToggleVar = true;

var keyboardInstrument = Synth.createInstrument(0);

keyboardNotes.forEach((index, value) => {
  index.addEventListener("click", () => {
    var splitNotes = index.id.split("-");
    keyboardInstrument.play(splitNotes[0], splitNotes[1], 2);
  });
});

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
