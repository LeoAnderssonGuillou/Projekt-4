
function boardSetup(board) {
  board.style.display = "grid";
  board.style.gridTemplateColumns = new Array(10)
    .fill("10%")
    .join(" ");
  board.style.gridTemplateRows = new Array(10).fill("10%").join(" ");
}