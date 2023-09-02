import './reset.css';

// Get canvas element and context
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

// const axiom = 'F';
// // L-System rules
// const rules: { [key: string]: string | undefined } = {
//   'F': 'FFF-FF-F-F+F+FF-F-FFF'
// };
// let angle = Math.PI / 2;

// const axiom = "F-F-F-F";
// const rules: { [key: string]: string | undefined } = {
//   'F': 'F-F+F+FF-F-F+F'
// };
// const angle = Math.PI / 2;


const axiom = 'FF[+F-F+F]F-F[F-F-F]+F[+FF-F[+F+F]F-F-F]F[-F[+F+F-F-F]F-F]'
const rules: { [key: string]: string | undefined } = {}
const angle = Math.PI / 2;

// Function to apply L-System rules for n iterations
const iterate = (initial: string, n: number): string => {
  let output = initial;
  for (let i = 0; i < n; i++) {
    let nextOutput = '';
    for (const char of output) {
      nextOutput += rules[char] as string || char;
    }
    output = nextOutput;
  }
  return output;
};

const relCoordToPx = (x: number, y: number) => [x * canvas.width, (1 - y) * canvas.height];

// Function to draw based on L-System string
const drawLSystem = (lSystemString: string, segmentLength: number) => {
  const stack: { x: number, y: number, angle: number }[] = [];
  let [x, y] = relCoordToPx(0.5, 0.25);
  let currentAngle = Math.PI / 2;

  for (const char of lSystemString) {
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
        currentAngle += angle;
        break;
      case '-':
        currentAngle -= angle;
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

// Function to draw on the canvas
const draw = () => {
  // Clear the canvas
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  // Generate L-System string
  const lSystemString = iterate(axiom, 1);

  // Draw L-System
  drawLSystem(lSystemString, 20);
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

