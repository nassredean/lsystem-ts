import './reset.css';
import { LSystem } from './LSystem';

// const lSystem = new LSystem(
//   'FF[+F-F+F]F-F[F-F-F]+F[+FF-F[+F+F]F-F-F]F[-F[+F+F-F-F]F-F]',
//   {},
//   1,
//   Math.PI / 2
// );

// const lSystem = new LSystem(
//   'F',  // axiom
//   { 'F': 'FFF-FF-F-F+F+FF-F-FFF' },
//   1,
//   Math.PI / 2  // angle
// );

const lSystem = new LSystem(
  'F-F-F-F',  // axiom
  { 'F': 'F-F+F+FF-F-F+F' },  // rules
  1,
  Math.PI / 2  // angle
);

// Get canvas element and context
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");



const relCoordToPx = (x: number, y: number) => [x * canvas.width, (1 - y) * canvas.height];

// Function to draw based on L-System string
const drawLSystem = (lSystem: LSystem, segmentLength: number) => {
  const stack: { x: number, y: number, angle: number }[] = [];
  let [x, y] = relCoordToPx(0.5, 0.25);
  let currentAngle = Math.PI / 2;

  for (const char of lSystem.sentence) {
    switch (char) {
      case 'F':
        const newX = x + segmentLength * Math.cos(currentAngle);
        const newY = y - segmentLength * Math.sin(currentAngle);
        
        if (ctx) {
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(newX, newY);
          ctx.stroke();
        }
        [x, y] = [newX, newY];
        break;
      case '+':
        currentAngle += lSystem.angle;
        break;
      case '-':
        currentAngle -= lSystem.angle;
        break;
      case '[':
        stack.push({ x, y, angle: currentAngle });
        break;
      case ']':
        const popped = stack.pop();
        if (popped) {
          x = popped.x;
          y = popped.y;
          currentAngle = popped.angle;
        }
        break;
    }
  }
};

const draw = () => {
  // Clear the canvas
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  drawLSystem(lSystem , 20);
};

const resizeCanvas = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  draw();
};

// Initial canvas resize
resizeCanvas();

// Event listener for window resize
window.addEventListener("resize", resizeCanvas);

