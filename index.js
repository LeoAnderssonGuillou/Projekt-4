


//Arrays
let grid = new Array(8).fill(0).map(_ => new Array(6).fill({}));
let shop = new Array(1);
let farmCells = new Array(1);

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
        effect: 0,
        animation: 0,
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
    effect: 10,
  };
  farmItem.element.innerHTML = "Farm <br> 100";
  farmItem.element.addEventListener("click", () => {
    clickShopItem(0);
  });
  shop[0] = farmItem;
  sidebar.appendChild(farmItem.element);

  //The bank shop item
  let bankItem = {
    element: document.createElement("div"),
    active: false,
    cost: 500,
    effect: 20,
  };
  bankItem.element.innerHTML = "Bank <br> 500";
  bankItem.element.addEventListener("click", () => {
    clickShopItem(1);
  });
  shop[1] = bankItem;
  sidebar.appendChild(bankItem.element);

  //The factory shop item
  let factoryItem = {
    element: document.createElement("div"),
    active: false,
    cost: 1000,
    effect: 40,
  };
  factoryItem.element.innerHTML = "Factory <br> 1000";
  factoryItem.element.addEventListener("click", () => {
    clickShopItem(2);
  });
  shop[2] = factoryItem;
  sidebar.appendChild(factoryItem.element);
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
        placeItem(x, y, 0, "🌾");
        break;
      case 1:
        placeItem(x, y, 1, "🏛️");
        break; 
      case 2:
        placeItem(x, y, 2, "🏭");
        break;          
    }
  }
}

function placeItem(gridX, gridY, shopIndex, symbol) {
  let cell = grid[gridX][gridY];
  if (money >= shop[shopIndex].cost) {
    const dollarSign = document.createElement("figure");
    dollarSign.classList.add("dollar");
    dollarSign.innerText = "$" + shop[shopIndex].effect;

    const icon = document.createElement("article");
    icon.classList.add("icon");
    icon.innerText = symbol;

    const item = document.createElement("figure");
    item.classList.add("item");
    item.appendChild(dollarSign);
    item.appendChild(icon);
    cell.element.appendChild(item);
    cell.animation = dollarSign;
    cell.inUse = true;
    cell.effect = shop[shopIndex].effect;
    updateShop(-1);
    changeMoney(-shop[shopIndex].cost);
    farmCells.push(cell);
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
  moneyText.innerHTML = "$" + money;
}

function changeMoney(cost) {
  money = money + cost;
  moneyText.innerHTML = "$" + money;
}

fieldSetup();
gridSetup();
shopSetup();
updateMoney(1000);
setInterval(generateMoney, 1000);

//Generates money and plays animation for each farm
let aniNumber1 = true;
function generateMoney() {
  for (x in farmCells) {
   changeMoney(farmCells[x].effect);
   
   //Animation is repeated by having the element switch between two identical classes with two identical animations
   if (aniNumber1 == true) {
    farmCells[x].animation.classList.remove("dollarFading1");
    farmCells[x].animation.classList.add("dollarFading2");
   }
   else {
    farmCells[x].animation.classList.remove("dollarFading2");
    farmCells[x].animation.classList.add("dollarFading1");
   }
  }
  aniNumber1 = !aniNumber1;
}