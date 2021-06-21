let lastRenderTime = 0;
const SNAKE_SPEED = 2; //move snake by 2 boxes every second
const gameBoard = document.getElementById("game-board");
const snakeBody = [
  { x: 10, y: 11 },
  { x: 11, y: 11 },
  { x: 12, y: 11 },
  { x: 13, y: 11 },
  { x: 14, y: 11 },
];
const snakeDirection = {
  xDirection: 1,
  yDirection: 0,
};

function main(currentTime) {
  //game loop
  window.requestAnimationFrame(main);

  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000; //divided by 1000 to convert it to seconds
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return; //if last render time is smaller than the speed, don't render anything

  console.log("render");
  lastRenderTime = currentTime;

  update();
  draw(gameBoard);
}

window.requestAnimationFrame(main); //game loop calling

function update() {
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    //starting from the second last box from the end. not starting from the last box because it will disappear
    snakeBody[i + 1] = { ...snakeBody[i] };
  }
  snakeBody[0].x += snakeDirection.xDirection;
  snakeBody[0].y += snakeDirection.yDirection;
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
