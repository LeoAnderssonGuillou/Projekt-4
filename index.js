



let grid = new Array(8).fill(0).map(_ => new Array(6).fill({}));
let shop = new Array(10)

const field = document.querySelector(".field");
const sidebar = document.querySelector(".sidebar");

//Creates CSS for the main field
function fieldSetup() {
  field.style.display = "grid";
  field.style.gridTemplateColumns = new Array(8)
    .fill("1fr")
    .join(" ");
  field.style.gridTemplateRows = new Array(6).fill("1fr").join(" ");
}

//Creates cells for the main field
function gridSetup() {
  for (let y = 0; y < 6; y++) {
    for (let x = 0; x < 8; x++) {
      const cell = document.createElement("div");
      field.appendChild(cell);
  
      cell.id = `${x}:${y}`;
      grid[x][y] = cell.id;
      // cell.innerHTML = `${x}.${y}`;
    }
  }
}

//Fills the sidebar shop with items
function shopSetup() {
  const farm = document.createElement("div");
  farm.innerHTML = "Farm";
  farm.addEventListener("click", () => {
    clickShopItem(0);
  });
  shop[0] = farm;
  sidebar.appendChild(farm);

}

function clickShopItem(x) {
  shop[x].style.backgroundColor = "rgb(145, 145, 145)";
}


fieldSetup();
gridSetup();
shopSetup();