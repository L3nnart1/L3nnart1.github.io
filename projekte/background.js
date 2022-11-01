let canvas = document.querySelector("#canvas")
let ctx = canvas.getContext("2d");
canvas.style.background = "#3e7784";

canvas.width = 1920;
canvas.height = 1820;
const fps = 30;
let radius = 120;
let ballx = canvas.height / 2;
let bally = canvas.width / 2;
let xSpeed = 10;
let ySpeed = 10;

setInterval(update, 1000/fps);

function update(){
    if (bally - radius < 0) {
        ySpeed = Math.floor(Math.random() * 20 + 10);
    }
    if (ballx - radius < 0) {
        xSpeed = Math.floor(Math.random() * 20 + 10);
    }
    if (ballx + radius > canvas.width) {
       xSpeed = -Math.floor(Math.random() * 20 + 10);
    }
    if (bally + radius > canvas.height) {
        ySpeed = -Math.floor(Math.random() * 20 + 10);
    }
    ballx += xSpeed;
    bally += ySpeed;

    ctx.fillStyle = "#3e7784";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "#4f94a1"
    drawcircle(ballx, bally, radius);
}

function drawcircle(x, y, radius,) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI *2);
    ctx.closePath();
    ctx.fill();
}
