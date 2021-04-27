


//Arrays
let grid = new Array(8).fill(0).map(_ => new Array(6).fill({}));
let shop = new Array(1);

//Other variables
let buyState = -1;
let money = 0;


//Colors
const shopColorOff = "rgb(172, 172, 172)";
const shopColorOn = "rgb(145, 145, 145)";

//Specific elements
const field = document.querySelector(".field");
const sidebar = document.querySelector(".sidebar");
const moneyText = document.querySelector(".moneytext");


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
      let cell = {
        element: document.createElement("div"),
        inUse: false,
      };
      field.appendChild(cell.element);
      cell.element.addEventListener("click", () => {
        clickField(x, y);
      });
  
      cell.element.id = `${x}:${y}`;
      grid[x][y] = cell;
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
    cost: 100,
  };
  farmItem.element.innerHTML = "Farm <br> 100";
  farmItem.element.addEventListener("click", () => {
    clickShopItem(0);
  });
  shop[0] = farmItem;
  sidebar.appendChild(farmItem.element);
}

//When a shop item is clicked on
function clickShopItem(x) {
  if (shop[x].active == false) {
    updateShop(x);
  }
  else {
    updateShop(-1);
  }
  
}

//When a field cell is clicked on
function clickField(x, y) {
  let cell = grid[x][y];
  if (cell.inUse == false) {
    switch (buyState) {
      case -1:
        console.log("bababooey");
        break;
      case 0:
        if (money > farmItem.cost) {
          const farm = document.createElement("figure");
          cell.element.appendChild(farm);
          cell.inUse = true;
          updateShop(-1);
          changeMoney(-farmItem.cost);
        }
          
    }
  }
}

//Assigns a buyState and updates the status of all shop items accordingly
function updateShop(state) {
  buyState = state;
  for (i = 0; i < shop.length; i++) {
    if (buyState == i) {
      shop[i].element.style.backgroundColor = shopColorOn;
      shop[i].active = true;
    }
    else {
      shop[i].element.style.backgroundColor = shopColorOff;
      shop[i].active = false;
    }
  }
}

function updateMoney(cash) {
  money = cash;
  moneyText.innerHTML = "$" + cash;
}

function changeMoney(cost) {
  money = money + cost;
  moneyText.innerHTML = "$" + money;
}


fieldSetup();
gridSetup();
shopSetup();
updateMoney(1000);