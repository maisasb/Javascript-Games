import { drawBall } from "./components/ball.js";
import {
  collisionDetection,
  drawBricks,
  initiateBricks,
} from "./components/bricks.js";
import { drawLives } from "./components/lives.js";
import { drawPaddle } from "./components/paddle.js";
import { drawScore } from "./components/score.js";
import { LEFT_PRESSED, RIGHT_PRESSED, RIT_BRICK } from "./hooks/keys.js";
import useCustomEvent from "./hooks/useCustomEvent.js";
import "./events/events.js";

let canvas = null;
let ctx = null;

let ballX = 0;
let ballY = 0;
var paddleX = 0;
var dx = 2;
var dy = -2;
var ballRadius = 10;
var paddleHeight = 10;
let paddleWidth = 75;
var rightPressed = false;
var leftPressed = false;

var score = 0;
var lives = 3;
const bricks = [];

const { consume } = useCustomEvent();

consume(RIGHT_PRESSED, (value) => {
  rightPressed = value;
});

consume(LEFT_PRESSED, (value) => {
  leftPressed = value;
});

consume(RIT_BRICK, (totalBricks) => {
  dy = -dy;
  score++;
  if (score == totalBricks) {
    alert("YOU WIN, CONGRADULATIONS!");
    document.location.reload();
  }
});

initiateBricks(bricks);

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks(ctx, bricks);
  drawBall(ctx, ballX, ballY, ballRadius);
  drawPaddle(ctx, paddleX, canvas.height, paddleHeight, paddleWidth);
  drawScore(ctx, score);
  drawLives(ctx, lives, canvas.width);
  collisionDetection(bricks, ballX, ballY);

  if (ballY + dy < ballRadius) {
    dy = -dy;
  } else if (ballY + dy > canvas.height - ballRadius) {
    if (ballX > paddleX && ballX < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      lives--;
      if (!lives) {
        alert("GAME OVER!");
        document.location.reload();
      } else {
        ballX = canvas.width / 2;
        ballY = canvas.height - 30;
        dx = 2;
        dy = -2;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }
  if (ballX + dx > canvas.width - ballRadius || ballX + dx < ballRadius) {
    dx = -dx;
  }

  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  ballX += dx;
  ballY += dy;
  requestAnimationFrame(draw);
};

export const startGame = () => {
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
  ballX = canvas.width / 2;
  ballY = canvas.height - 30;
  paddleX = (canvas.width - paddleWidth) / 2;
  draw();
};

window.startGame = startGame;
