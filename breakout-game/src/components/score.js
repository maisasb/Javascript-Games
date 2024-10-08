export const drawScore = (ctx, score) => {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#ff6f69";
  ctx.textAlign = "left";
  ctx.fillText("Score: " + score, 8, 20);
};
