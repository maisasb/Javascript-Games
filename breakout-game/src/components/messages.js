import { RESTART_GAME } from "../hooks/keys.js";
import useCustomEvent from "../hooks/useCustomEvent.js";

const { dispatch } = useCustomEvent();

export const drawWinMessage = (
  ctx,
  canvasHeight,
  canvasWidth,
  canvasX,
  canvasY
) => {
  drawMessage(
    ctx,
    canvasHeight,
    canvasWidth,
    canvasX,
    canvasY,
    "YOU WIN!",
    "#8AFA7E"
  );
};

export const drawGameOverMessage = (
  ctx,
  canvasHeight,
  canvasWidth,
  canvasX,
  canvasY
) => {
  drawMessage(
    ctx,
    canvasHeight,
    canvasWidth,
    canvasX,
    canvasY,
    "Game Over",
    "#ff6f69"
  );
};

const drawMessage = (
  ctx,
  canvasHeight,
  canvasWidth,
  canvasX,
  canvasY,
  message,
  color
) => {
  const height = 60;
  const width = 200;

  const messageX = canvasWidth / 2 - width / 2;
  const messageY = canvasHeight / 2 - height / 2;

  ctx.beginPath();
  ctx.rect(messageX, messageY, width, height);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();

  ctx.font = "12px Arial";
  ctx.fillStyle = "#FFF";
  ctx.textAlign = "center";
  ctx.fillText(message, messageX + width / 2, messageY + 20);
  ctx.fillText("Click to restart", messageX + width / 2, messageY + 40);
  document.addEventListener("click", (e) => {
    if (
      e.clientX > messageX + canvasX &&
      e.clientX < messageX + width + canvasX &&
      e.clientY > messageY + canvasY &&
      e.clientY < messageY + height + canvasY
    ) {
      dispatch(RESTART_GAME);
    }
  });
};
