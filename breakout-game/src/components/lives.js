export const drawLives = (ctx, lives, canvasWidth) => {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Lives: " + lives, canvasWidth - 65, 20);
};
