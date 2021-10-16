const canvas = document.querySelector('canvas');

const ctx = canvas.getContext('2d');
const eraser = document.querySelector('button#eraser');
const clear = document.querySelector('button#clear');
const color = document.querySelector('input#color');
const drawbtn = document.querySelector('button#draw');
canvas.width = 1300;
canvas.height = 800;


ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 5;
ctx.strokeStyle = color.value;

let backgroundColor = "#ffffff";
canvas.style.backgroundColor = backgroundColor;
let lastX = 0;
let lastY = 0;
let isDrawing = false;

function draw(e) {
  if(!isDrawing) return ;
  
  console.log(e);
  ctx.beginPath();
  ctx.moveTo(lastX,lastY);
  ctx.lineTo(e.offsetX,e.offsetY);
  ctx.stroke();
  [lastX,lastY] = [e.offsetX,e.offsetY];
  
}


canvas.addEventListener('mousedown', (e) => {
  [lastX, lastY] = [e.offsetX, e.offsetY];isDrawing = true;
});

canvas.addEventListener('mousemove',draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout',() => isDrawing = false);

clear.addEventListener('click',() => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

color.addEventListener('change', (event) => {
  ctx.strokeStyle = color.value;
  ctx.lineWidth = 5;
});

drawbtn.addEventListener('click', (event) => {
  ctx.strokeStyle = color.value;;
  ctx.lineWidth = 5;
});
eraser.addEventListener('click',() => {
  ctx.strokeStyle = backgroundColor;
  ctx.lineWidth = 20;
});
