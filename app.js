/////// MODEL
let healthValue = 100;
let foodValue = 25;
let sleepValue = 25;
let happyValue = 25;
let foodColorValue = "#d9f8c4";
let sleepColorValue = "#d9f8c4";
let happyColorValue = "#d9f8c4";
let healthColorValue = "#d9f8c4";
let foodTickRate = 1800;
let happyTickRate = 2000;
let sleepTickRate = 1500;
let healthTickRate = 2000;
let imgSrc = "img/dolphin-normal.gif";
/// CONTROLLER
/// HP
///
const healthTick = setInterval(healtPointsBar, healthTickRate);
function healtPointsBar() {
  if (healthValue == 0) {
    clearInterval(healthTickRate);
    foodValue = 0;
    sleepValue = 0;
    happyValue = 0;
  } else if (foodValue < 80 && sleepValue < 80 && happyValue < 80) {
    healthValue--;
  } else if (healthValue < 100) {
    healthValue++;
  }
  healthBarColor();
}

let imgSel = imgSrc;
function healthBarColor() {
  if (healthValue > 50) {
    imgSrc = "img/dolphin-normal.gif";
    imgSel = imgSrc;
    healthColorValue = "#d9f8c4";
  } else if (healthValue == 0) {
    imgSrc = "img/dolphin-dead.gif";
    imgSel = imgSrc;
  } else if (healthValue < 20) {
    imgSrc = "img/dolphin-lowHP.gif";
    imgSel = imgSrc;
    healthColorValue = "#f37878";
  } else if (healthValue <= 50) {
    imgSrc = "img/dolphin-midHP.gif";
    imgSel = imgSrc;
    healthColorValue = "#f9f9c5";
  }
  updateView();
}

/*  function HPBarFunksjon(foodValue, sleepValue, happyValue) {
          const container = document.createElement("div");
          container.style.width = "500px";
          container.style.height = "20px";
          container.style.border = "1px solid black";

          const bar1 = document.createElement("div");
          bar1.style.width = `${foodValue}%`;
          bar1.style.height = "100%";
          bar1.style.backgroundColor = "red";
          bar1.style.float = "left";

          const bar2 = document.createElement("div");
          bar2.style.width = `${sleepValue}%`;
          bar2.style.height = "100%";
          bar2.style.backgroundColor = "green";
          bar2.style.float = "left";

          const bar3 = document.createElement("div");
          bar3.style.width = `${happyValue}%`;
          bar3.style.height = "100%";
          bar3.style.backgroundColor = "blue";
          bar3.style.float = "left";

          container.appendChild(bar1);
          container.appendChild(bar2);
          container.appendChild(bar3);

          return container;
          updateView();
        } */

/* const progressBar = HPBarFunksjon(foodValue, sleepValue, happyValue);
          document.body.appendChild(progressBar); */
////////
/// PLAY
////////
const happyTick = setInterval(happyLoss, happyTickRate);
function play() {
  if (happyValue < 90) {
    happyValue += 10;
    sleepValue -= 10;
    foodValue -= 5;
    imgSrc = "img/dolphin-play.gif";
    setTimeout(() => {
      imgSrc = imgSel;
    }, 3000);
  }
}
function happyLoss() {
  happyValue--;
  if (happyValue === 0) {
    clearInterval(happyTick);
  }
  happyBarColor();
  updateView();
}
function happyBarColor() {
  if (happyValue > 50) {
    happyColorValue = "#d9f8c4";
  } else if (happyValue < 20) {
    happyColorValue = "#f37878";
  } else if (happyValue <= 50) {
    happyColorValue = "#f9f9c5";
  }
}
///////
/// EAT
////////
const foodTick = setInterval(foodLoss, foodTickRate);
function foodLoss() {
  foodValue--;
  if (foodValue === 0) {
    clearInterval(foodTick);
  }

  foodBarColor();
  updateView();
}

function eat() {
  if (foodValue < 80) {
    foodValue += 20;
    imgSrc = "img/dolphin-eat.gif";
    setTimeout(() => {
      imgSrc = "img/dolphin-normal.gif";
    }, 3000);
    updateView();
  }
}
function foodBarColor() {
  if (foodValue > 50) {
    foodColorValue = "#d9f8c4";
  } else if (foodValue < 20) {
    foodColorValue = "#f37878";
  } else if (foodValue <= 50) {
    foodColorValue = "#f9f9c5";
  }
}
/////////
/// SLEEP
/////////
const sleepTick = setInterval(sleepLoss, sleepTickRate);
function sleepLoss() {
  sleepValue--;
  if (sleepValue === 0) {
    clearInterval(sleepTick);
  }
  sleepBarColor();
  updateView();
}

function sleep() {
  if (sleepValue < 100) {
    sleepValue = 100;
    imgSrc = "img/dolphin-sleep.gif";
    setTimeout(() => {
      imgSrc = "img/dolphin-normal.gif";
    }, 3000);
    updateView();
    sleepBarColor();
  }
}
function sleepBarColor() {
  if (sleepValue > 50) {
    sleepColorValue = "#d9f8c4";
  } else if (sleepValue < 20) {
    sleepColorValue = "#f37878";
  } else if (sleepValue <= 50) {
    sleepColorValue = "#f9f9c5";
  }
}
////////
///
//////// VIEW
function updateView() {
  document.getElementById("main").innerHTML = /* HTML */ `
    <h1>-dolphinochi-</h1>
    <div id="tamaImgDiv" class="lofiBorder">
      <img src=${imgSrc} id="tamaImgSrc" />
    </div>

    <div class="bars" id="healthBars">
      <div class="backgroundBar lofiBorder">
        <span>hp</span>
        <div
          class="foregroundBar health"
          id="health"
          style="width:${healthValue}%; background-color:${healthColorValue}"
        >
          ${healthValue}/100
        </div>
      </div>
    </div>

    <br />

    <div class="bars" id="foodBars">
      <div class="backgroundBar lofiBorder">
        <span>hunger</span>
        <div
          class="foregroundBar food"
          id="food"
          style="width:${foodValue}%; background-color:${foodColorValue}"
        >
          ${foodValue}/100
        </div>
      </div>
      <button class="addButton lofiBorder" onclick="eat()">eat</button>
    </div>

    <div class="bars" id="sleepBars">
      <div class="backgroundBar lofiBorder">
        <span>fatigue</span>
        <div
          class="foregroundBar sleep"
          id="sleep"
          style="width:${sleepValue}%; background-color:${sleepColorValue}"
        >
          ${sleepValue}/100
        </div>
      </div>
      <button class="addButton lofiBorder" onclick="sleep()">sleep</button>
    </div>

    <div class="bars" id="happyBars">
      <div class="backgroundBar lofiBorder">
        <span>happyness</span>
        <div
          class="foregroundBar happy"
          id="happy"
          style="width:${happyValue}%; background-color:${happyColorValue}"
        >
          ${happyValue}/100
        </div>
      </div>
      <button class="addButton lofiBorder" onclick="play()">play</button>
    </div>
  `;
}
updateView();
