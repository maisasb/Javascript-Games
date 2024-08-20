import { LEFT_PRESSED, RIGHT_PRESSED } from "../hooks/keys.js";
import useCustomEvent from "../hooks/useCustomEvent.js";

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

const { dispatch } = useCustomEvent();

function keyDownHandler(e) {
  if (e.keyCode == 39) {
    dispatch(RIGHT_PRESSED, true);
  } else if (e.keyCode == 37) {
    dispatch(LEFT_PRESSED, true);
  }
}

function keyUpHandler(e) {
  if (e.keyCode == 39) {
    dispatch(RIGHT_PRESSED, false);
  } else if (e.keyCode == 37) {
    dispatch(LEFT_PRESSED, false);
  }
}
