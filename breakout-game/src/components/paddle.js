export const drawPaddle = (
  ctx,
  paddleX,
  canvasHeight,
  paddleHeight,
  paddleWidth
) => {
  ctx.beginPath();
  ctx.rect(paddleX, canvasHeight - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#88d8b0";
  ctx.fill();
  ctx.closePath();
};
