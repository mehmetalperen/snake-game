var canvas = document.querySelector("canvas");
canvas.width = 800;
canvas.height = 700;
var context = canvas.getContext("2d");

const SNAKE_SIZE = 20;
const xStartPos = canvas.width / 2;
const yStartPos = canvas.height / 2;

class Snake {
  constructor(
    boxSize,
    startXpos,
    startYpos,
    curXpos,
    curYpos,
    contex,
    velocity,
    xBorder,
    yBorder,
    xDirection,
    yDirection,
    snakeLength
  ) {
    this.boxSize = boxSize;
    this.startXpos = startXpos;
    this.startYpos = startYpos;
    this.curXpos = curXpos;
    this.curYpos = curYpos;
    this.contex = contex;
    this.velocity = velocity;
    this.xBorder = xBorder;
    this.yBorder = yBorder;
    this.xDirection = xDirection;
    this.yDirection = yDirection;
    this.snakeLength = snakeLength;
    this.skaneMovementHist = [];
  }

  movement() {
    if (this.curXpos + this.boxSize === this.xBorder || this.curXpos === 0) {
      //bounce back x
      this.xDirection = this.xDirection * -1;
    }
    if (this.curYpos + this.boxSize === this.yBorder || this.curYpos === 0) {
      //bounce back y
      this.yDirection = this.yDirection * -1;
    }

    this.curXpos += this.xDirection * this.velocity;
    this.curYpos += this.yDirection * this.velocity;
    // this.skaneMovementHist.push([this.curXpos, this.curYpos]);
  }

  draw() {
    this.contex.beginPath();
    this.contex.rect(this.curXpos, this.curYpos, this.boxSize, this.boxSize);
    this.contex.fill();

    for (let i = 1; i < this.snakeLength; i++) {
      this.contex.beginPath();
      this.contex.rect(
        this.curXpos - this.boxSize * i * this.xDirection,
        this.curYpos - this.boxSize * i * this.yDirection,
        this.boxSize,
        this.boxSize
      );
      this.contex.stroke();
    }
  }

  getMovementHist() {
    return this.skaneMovementHist;
  }
  controlXdirection(xDirection) {
    this.xDirection = xDirection;
    this.yDirection = 0;
  }
  controlYdirection(yDirection) {
    this.yDirection = yDirection;
    this.xDirection = 0;
  }
}

var snake = new Snake(
  SNAKE_SIZE,
  xStartPos,
  yStartPos,
  400,
  400,
  context,
  1,
  canvas.width,
  canvas.height,
  1,
  0,
  10
);

function setEventListeners() {
  document.addEventListener("keyup", (event) => {
    if (event.keyCode === 39) {
      snake.controlXdirection(1);
      console.log(snake.getMovementHist());
    } else if (event.keyCode === 37) {
      snake.controlXdirection(-1);
    } else if (event.keyCode === 38) {
      snake.controlYdirection(-1);
    } else if (event.keyCode === 40) {
      snake.controlYdirection(1);
    }
  });
}
setEventListeners();
animationLoop();

function animationLoop() {
  requestAnimationFrame(animationLoop);
  context.clearRect(0, 0, canvas.width, canvas.height);

  snake.movement();
  snake.draw();
}
