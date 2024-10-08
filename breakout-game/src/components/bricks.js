import { RIT_BRICK } from "../hooks/keys.js";
import useCustomEvent from "../hooks/useCustomEvent.js";

const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
const brickRowCount = 3;
const brickColumnCount = 5;

export const initiateBricks = (bricks) => {
  for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
      bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
  }
};

export const drawBricks = (ctx, bricks) => {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#96ceb4";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
};

export const collisionDetection = (bricks, ballX, ballY) => {
  const { dispatch } = useCustomEvent();
  const x = ballX;
  const y = ballY;
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      const b = bricks[c][r];
      if (b.status == 1) {
        if (
          x > b.x &&
          x < b.x + brickWidth &&
          y > b.y &&
          y < b.y + brickHeight
        ) {
          dispatch(RIT_BRICK, brickRowCount * brickColumnCount);
          b.status = 0;
        }
      }
    }
  }
};
