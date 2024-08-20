export const drawPaddle = (
  ctx,
  paddleX,
  canvasHeight,
  paddleHeight,
  paddleWidth
) => {
  ctx.beginPath();
  ctx.rect(paddleX, canvasHeight - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
};
