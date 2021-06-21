let lastRenderTime = 0;
const SNAKE_SPEED = 2; //move snake by 2 boxes every second
const gameBoard = document.getElementById("game-board");
let snakeBody = [];
let snakeDirection = {};
let isGameOver;
let foodPos = {};

function main(currentTime) {
  //game loop
  window.requestAnimationFrame(main);

  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000; //divided by 1000 to convert it to seconds
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return; //if last render time is smaller than the speed, don't render anything

  lastRenderTime = currentTime;

  update();
  if (!isGameOver) {
    draw(gameBoard);
  } else {
    alert("game is over my guy");
    initNewgame();
  }
}

window.requestAnimationFrame(main); //game loop calling

function update() {
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    //starting from the second last box from the end. not starting from the last box because it will disappear
    snakeBody[i + 1] = { ...snakeBody[i] };
  }
  snakeBody[0].x += snakeDirection.xDirection;
  snakeBody[0].y += snakeDirection.yDirection;

  isHitBorder();
  isSnakeDead();
  isFoodEaten();
}
function draw(gameBoard) {
  gameBoard.innerHTML = "";
  snakeBody.forEach((segment) => {
    const snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;
    snakeElement.classList.add("snake");
    gameBoard.appendChild(snakeElement);
  });
  const foodDiv = document.createElement("div");
  foodDiv.style.gridRowStart = foodPos.y;
  foodDiv.style.gridColumnStart = foodPos.x;
  foodDiv.classList.add("food");
  gameBoard.appendChild(foodDiv);
}
function isHitBorder() {
  if (
    snakeBody[0].x < 0 ||
    snakeBody[0].y < 0 ||
    snakeBody[0].x > 21 ||
    snakeBody[0].y > 21
  ) {
    isGameOver = true;
    console.log(`hit border: ${snakeBody[0].x} and ${snakeBody[0].y}`);
  }
}

function isSnakeDead() {
  for (let i = 1; i < snakeBody.length; i++) {
    if (
      snakeBody[0].x === snakeBody[i].x &&
      snakeBody[0].y === snakeBody[i].y
    ) {
      isGameOver = true;
      console.log(`killed: ate ${i}`);
    }
  }
}
function isFoodEaten() {
  if (snakeBody[0].x === foodPos.x && snakeBody[0].y === foodPos.y) {
    setFoodPos();
  }
}

function eventListener() {
  console.log("sub");
  document.addEventListener("keydown", (event) => {
    if (event.keyCode === 38) {
      console.log("up");
      if (snakeDirection.yDirection === 1) {
        console.log("cant go back");
      } else {
        snakeDirection.yDirection = -1;
        snakeDirection.xDirection = 0;
      }
    } else if (event.keyCode === 40) {
      console.log("down");
      if (snakeDirection.yDirection === -1) {
        console.log("cant go back");
      } else {
        snakeDirection.yDirection = 1;
        snakeDirection.xDirection = 0;
      }
    } else if (event.keyCode === 39) {
      console.log("right");
      if (snakeDirection.xDirection === -1) {
        console.log("cant go back");
      } else {
        snakeDirection.yDirection = 0;
        snakeDirection.xDirection = 1;
      }
    } else if (event.keyCode === 37) {
      console.log("left");
      if (snakeDirection.xDirection === 1) {
        console.log("cant go back");
      } else {
        snakeDirection.yDirection = 0;
        snakeDirection.xDirection = -1;
      }
    }
  });
}
function initNewgame() {
  snakeBody = [
    { x: 4, y: 11 },
    { x: 3, y: 11 },
    { x: 2, y: 11 },
    { x: 1, y: 11 },
    { x: 0, y: 11 },
  ];
  snakeDirection = {
    xDirection: 1,
    yDirection: 0,
  };
  isGameOver = false;
  setFoodPos();
}

eventListener();
initNewgame();

function setFoodPos() {
  foodPos = {
    x: Math.round(Math.random() * 21),
    y: Math.round(Math.random() * 21),
  };
}
