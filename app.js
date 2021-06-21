let lastRenderTime = 0;
const SNAKE_SPEED = 2; //move snake by 2 boxes every second
const gameBoard = document.getElementById("game-board");
const snakeBody = [
  { x: 4, y: 11 },
  { x: 3, y: 11 },
  { x: 2, y: 11 },
  { x: 1, y: 11 },
  { x: 0, y: 11 },
];
const snakeDirection = {
  xDirection: 1,
  yDirection: 0,
};
let isGameOver = false;

function main(currentTime) {
  //game loop
  window.requestAnimationFrame(main);

  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000; //divided by 1000 to convert it to seconds
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return; //if last render time is smaller than the speed, don't render anything

  console.log("render");
  lastRenderTime = currentTime;

  update();
  if (!isGameOver) {
    draw(gameBoard);
  } else {
    alert("game is over my guy");
    isGameOver = true;
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

function draw(gameBoard) {
  gameBoard.innerHTML = "";
  snakeBody.forEach((segment) => {
    const snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;
    snakeElement.classList.add("snake");
    gameBoard.appendChild(snakeElement);
  });
}

function eventListener() {
  console.log("sub");
  document.addEventListener("keydown", (event) => {
    if (event.keyCode === 38) {
      console.log("up");
      snakeDirection.yDirection = -1;
      snakeDirection.xDirection = 0;
    } else if (event.keyCode === 40) {
      snakeDirection.yDirection = 1;
      snakeDirection.xDirection = 0;
    } else if (event.keyCode === 39) {
      snakeDirection.yDirection = 0;
      snakeDirection.xDirection = 1;
    } else if (event.keyCode === 37) {
      snakeDirection.yDirection = 0;
      snakeDirection.xDirection = -1;
    }
  });
}

eventListener();
