export const drawLives = (ctx, lives, canvasWidth) => {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#ff6f69";
  ctx.textAlign = "left";
  ctx.fillText("Lives: " + lives, canvasWidth - 65, 20);
};
