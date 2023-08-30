let exportBut = document.querySelector(".export-button");

exportBut.addEventListener("click", exportPattern);

function exportPattern() {
  let allPattern = document.querySelector(".pattern").children;
  let arraydata = [];

  for (let i = 0; i < allPattern.length; i++) {
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
  let stringifyArray = "" + arraydata + "";
  console.log(stringifyArray);
}
