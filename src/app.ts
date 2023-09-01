import './reset.css';

// Get canvas element and context
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

// Function to draw on the canvas
const draw = () => {
  // Clear the canvas
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  // Example usage of putPixel
  putPixel(0.5, 0.5, "#FF0000");
  putPixel(0.25, 0.25, "#00FF00", 2);
  putPixel(0.75, 0.75, "#0000FF", 20);
};

// Function to draw a pixel at x, y with a given color
const putPixel = (x: number, y: number, color: string, size: number = 1) => {
  if (ctx) {
    ctx.fillStyle = color;
    // Transform x and y to canvas coordinates
    const px = x * canvas.width;
    const py = (1 - y) * canvas.height;
    ctx.fillRect(px, py, size, size);
  }
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

