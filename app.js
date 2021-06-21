let lastRenderTime = 0;
let snakeSpeed = 3; //move snake by 2 boxes every second
const gameBoard = document.getElementById("game-board");
const scoreTable = document.querySelector(".score-table");
const speedTable = document.querySelector(".speed-table");
let snakeBody = [];
let snakeDirection = {};
let isGameOver;
let foodPos = {};
let score;
let increaseSpeed;

function main(currentTime) {
  //game loop
  window.requestAnimationFrame(main);

  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000; //divided by 1000 to convert it to seconds
  if (secondsSinceLastRender < 1 / snakeSpeed) return; //if last render time is smaller than the speed, don't render anything

  lastRenderTime = currentTime;

  update();
  if (!isGameOver) {
    draw(gameBoard);
  } else {
     alert(`Game is over! Your score is ${score}`);
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

  checkHitBorder();
  checkSnakeDead();
  checkFoodEaten();
}
function draw(gameBoard) {
  gameBoard.innerHTML = "";
  const foodDiv = document.createElement("div");
  foodDiv.style.gridRowStart = foodPos.y;
  foodDiv.style.gridColumnStart = foodPos.x;
  foodDiv.classList.add("food");
  gameBoard.appendChild(foodDiv);

  snakeBody.forEach((segment) => {
    const snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;
    snakeElement.classList.add("snake");
    gameBoard.appendChild(snakeElement);
  });

}
function checkHitBorder() {
  if (
    snakeBody[0].x < 0 ||
    snakeBody[0].y < 0 ||
    snakeBody[0].x > 21 ||
    snakeBody[0].y > 21
  ) {
    isGameOver = true;
  }
}

function checkSnakeDead() {
  for (let i = 1; i < snakeBody.length; i++) {
    if (
      snakeBody[0].x === snakeBody[i].x &&
      snakeBody[0].y === snakeBody[i].y
    ) {
      isGameOver = true;
    }
  }
}
function checkFoodEaten() {
  if (snakeBody[0].x === foodPos.x && snakeBody[0].y === foodPos.y) {
    setFoodPos();
    snakeBody.push(snakeBody[snakeBody.length - 1]);//adding new segment to the snake
    score++;
    scoreHandle();
    speedHandle();
  }
}

function speedHandle() {
  increaseSpeed++;
  if (increaseSpeed > 5) {
    increaseSpeed = 0;
    snakeSpeed++;
  }

  
  speedTable.innerHTML = `Speed: ${snakeSpeed}`

}

function scoreHandle() {
  scoreTable.innerHTML = `Score: ${score}`
}

function eventListener() {
  document.addEventListener("keydown", (event) => {
    if (event.keyCode === 38) {
      if (snakeDirection.yDirection === 1) {
      } else {
        snakeDirection.yDirection = -1;
        snakeDirection.xDirection = 0;
      }
    } else if (event.keyCode === 40) {
      if (snakeDirection.yDirection === -1) {
      } else {
        snakeDirection.yDirection = 1;
        snakeDirection.xDirection = 0;
      }
    } else if (event.keyCode === 39) {
      if (snakeDirection.xDirection === -1) {
      } else {
        snakeDirection.yDirection = 0;
        snakeDirection.xDirection = 1;
      }
    } else if (event.keyCode === 37) {
      if (snakeDirection.xDirection === 1) {
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
  ];
  snakeDirection = {
    xDirection: 1,
    yDirection: 0,
  };
  isGameOver = false;
  setFoodPos();
  score = 0;
  scoreHandle();
  increaseSpeed = 0;
  speedHandle();


}

eventListener();
initNewgame();

function setFoodPos() {
  foodPos = {
    x: Math.floor(Math.random() * 21 + 1),
    y: Math.floor(Math.random() * 21 + 1),
  };
}
