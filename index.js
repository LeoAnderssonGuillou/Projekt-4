



let grid = new Array(8).fill(0).map(_ => new Array(6).fill({}));
let shop = new Array(10)

let buyState = -1;

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
      cell.addEventListener("click", () => {
        clickField(x, y);
      });
  
      cell.id = `${x}:${y}`;
      grid[x][y] = cell.id;
      // cell.innerHTML = `${x}.${y}`;
    }
  }
}

//Fills the sidebar shop with items
function shopSetup() {
  //The farm shop item
  let farmItem = {
    element: document.createElement("div"),
    active: false,
  };
  farmItem.element.innerHTML = "Farm";
  farmItem.element.addEventListener("click", () => {
    clickShopItem(0);
  });
  shop[0] = farmItem;
  sidebar.appendChild(farmItem.element);
}

//When a shop item is clicked on
function clickShopItem(x) {
  if (shop[x].active == false) {
    shop[x].element.style.backgroundColor = "rgb(145, 145, 145)";
    buyState = x;
    shop[x].active = true;
  }
  else {
    shop[x].element.style.backgroundColor = "rgb(172, 172, 172)";
    buyState = -1;
    shop[x].active = false;
  }
  
}

//When a field cell is clicked on
function clickField(x, y) {
  let cell = document.getElementById(grid[x][y]);
  switch (buyState) {
    case -1:
      console.log("bababooey");
      break;
    case 0:
      const farm = document.createElement("figure");
      cell.appendChild(farm);
      
  }
  
}


fieldSetup();
gridSetup();
shopSetup();