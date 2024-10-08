import { drawBall } from "./components/ball.js";
import {
  collisionDetection,
  drawBricks,
  initiateBricks,
} from "./components/bricks.js";
import { drawLives } from "./components/lives.js";
import { drawPaddle } from "./components/paddle.js";
import { drawScore } from "./components/score.js";
import {
  LEFT_PRESSED,
  RESTART_GAME,
  RIGHT_PRESSED,
  RIT_BRICK,
} from "./hooks/keys.js";
import useCustomEvent from "./hooks/useCustomEvent.js";
import "./events/events.js";
import { drawGameOverMessage, drawWinMessage } from "./components/messages.js";

let canvas = null;
let canvasX = 0;
let canvasY = 0;
let ctx = null;

const ballSpeed = 3;
let ballX = 0;
let ballY = 0;
var paddleX = 0;
var dx = ballSpeed;
var dy = ballSpeed * -1;
var ballRadius = 10;
var paddleHeight = 10;
let paddleWidth = 75;
var rightPressed = false;
var leftPressed = false;
let winGame = false;

var score = 0;
var lives = 3;
const bricks = [];
let requestID = null;

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
    winGame = true;
  }
});

consume(RESTART_GAME, () => {
  startGame();
});

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "	#ffeead";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawBricks(ctx, bricks);
  drawBall(ctx, ballX, ballY, ballRadius);
  drawPaddle(ctx, paddleX, canvas.height, paddleHeight, paddleWidth);
  drawScore(ctx, score);
  drawLives(ctx, lives, canvas.width);
  collisionDetection(bricks, ballX, ballY);
  if (winGame) {
    drawWinMessage(ctx, canvas.height, canvas.width, canvasX, canvasY);
    return;
  }

  if (ballY + dy < ballRadius) {
    dy = -dy;
  } else if (ballY + dy > canvas.height - ballRadius) {
    if (ballX > paddleX && ballX < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      lives--;
      if (!lives) {
        drawGameOverMessage(ctx, canvas.height, canvas.width, canvasX, canvasY);
        return;
      } else {
        ballX = canvas.width / 2;
        ballY = canvas.height - 30;
        dx = ballSpeed;
        dy = ballSpeed * -1;
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
  requestID = requestAnimationFrame(draw);
};

export const startGame = () => {
  cancelAnimationFrame(requestID);
  canvas = document.getElementById("myCanvas");
  canvasX = canvas.offsetLeft;
  canvasY = canvas.offsetTop;
  ctx = canvas.getContext("2d");
  ballX = canvas.width / 2;
  ballY = canvas.height - 30;
  paddleX = (canvas.width - paddleWidth) / 2;
  score = 0;
  winGame = false;
  lives = 3;
  initiateBricks(bricks);
  dx = ballSpeed;
  dy = ballSpeed * -1;
  draw();
};

window.startGame = startGame;
