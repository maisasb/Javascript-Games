export const drawBall = (ctx, x, y, ballRadius) => {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#ffcc5c";
  ctx.fill();
  ctx.closePath();
};
