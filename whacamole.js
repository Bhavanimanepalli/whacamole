let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;
let gameStarted = false;
let gameMusic = new Audio("./music.mp3");
let gameOverMusic = new Audio("./game-over.wav");

window.onload = function () {
  setGame();
};

function setGame() {
  for (let i = 0; i < 9; i++) {
    let tile = document.createElement("div");
    tile.id = i.toString();
    tile.addEventListener("click", selectTile);
    document.getElementById("board").appendChild(tile);
  }
  document.getElementById("start-button").addEventListener("click", startGame);
  document
    .getElementById("restart-button")
    .addEventListener("click", restartGame);
  document
    .getElementById("game-over-restart")
    .addEventListener("click", restartGame);
}

function getRandomTile() {
  let num = Math.floor(Math.random() * 9);
  return num.toString();
}

function startGame() {
  gameStarted = true;
  document.getElementById("start-button").style.display = "none";
  document.getElementById("restart-button").style.display = "block";
  setMole();
  setInterval(setMole, 800);
  setInterval(setPlant, 1000);
  gameMusic.play();
}

function restartGame() {
  gameStarted = false;
  document.getElementById("start-button").style.display = "block";
  document.getElementById("restart-button").style.display = "none";
  score = 0;
  document.getElementById("score").innerText = score.toString();
  currMoleTile = null;
  currPlantTile = null;
  gameOver = false;
  document.getElementById("game-over-popup").style.display = "none";
  gameMusic.pause();
  gameOverMusic.pause();
}

function setMole() {
  if (gameOver) {
    return;
  }

  if (currMoleTile) {
    currMoleTile.innerHTML = "";
  }

  let mole = document.createElement("img");
  mole.src = "./monty-mole.png";

  let num = getRandomTile();
  if (currPlantTile && currPlantTile.id == num) {
    return;
  }

  currMoleTile = document.getElementById(num);
  currMoleTile.appendChild(mole);
}

function setPlant() {
  if (gameOver) {
    return;
  }
  if (currPlantTile) {
    currPlantTile.innerHTML = "";
  }
  let plant = document.createElement("img");
  plant.src = "./piranha-plant.png";

  let num = getRandomTile();
  if (currMoleTile && currMoleTile.id == num) {
    return;
  }

  currPlantTile = document.getElementById(num);
  currPlantTile.appendChild(plant);
}

function selectTile() {
  if (gameOver) {
    return;
  }
  if (this == currMoleTile) {
    score += 10;
    document.getElementById("score").innerText = score.toString();
  } else if (this == currPlantTile) {
    document.getElementById("score").innerText =
      "GAME OVER: " + score.toString();
    gameOver = true;
    document.getElementById("game-over-popup").style.display = "block";
    document.getElementById("game-over-score").innerText = score.toString();
    gameOverMusic.play();
  }
}
