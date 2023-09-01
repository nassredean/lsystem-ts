import './reset.css';

// Get canvas element and context
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

// Draw a rectangle
if (ctx) {
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(0, 0, 150, 75);
}
