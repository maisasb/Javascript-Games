import { startGame } from "./game";

export class BreakoutGame extends HTMLElement {
  connectedCallback() {
    if (!this.getAttribute("html-node-id")) {
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.id = "myCanvas";
    canvas.width = 480;
    canvas.height = 320;
    document
      .getElementById(this.getAttribute("html-node-id"))
      .appendChild(canvas);

    startGame();
  }
}
if (!customElements.get("breakout-game")) {
  customElements.define("breakout-game", BreakoutGame);
}
