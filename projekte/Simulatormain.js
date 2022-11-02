let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let gravityslide = document.getElementById("myrange")
let frictionslide = document.getElementById("frictionrange");
canvas.style.background = "#224d77";

let balls = [];
canvas.width = 1920
canvas.height = 930
let gravity;
const fps = 30;
let radius = 60;
let ballx, bally;
let xSpeed, ySpeed;
let ball2x, ball2y;
let ySpeed2, xSpeed2;

setInterval(update, 1000/fps);

function setvalue() {
    gravity = gravityslide.value;
    friction = frictionslide.value;
    ballx = canvas.width / 2;
    bally = canvas.height / 4;
    ball2x = canvas.width / 2;
    ball2y = canvas.height / 4;
    xSpeed = Math.floor(Math.random()*200 - 100);
    ySpeed = Math.floor(Math.random()*20 - 38);
    
    xSpeed2 = 0;
    ySpeed2 = Math.floor(Math.random()*20 - 38);
}

//if (Math.floor(Math.random() * 2 + 1) === 2){
//    xSpeed = -xSpeed
//}
//if (Math.floor(Math.random() * 2 + 1) === 2){
//    ySpeed = -ySpeed
//}

function update(){
    ball2()
    if (bally - radius < 0) {
        ySpeed = -ySpeed;
    }
    if (ballx - radius + xSpeed < 0) {
        xSpeed = -xSpeed;
    }
    if (ballx + radius + xSpeed > canvas.width) {
       xSpeed = -xSpeed;
    }
//------ball versinkt wegen fehler hier unten------//
    if (bally + radius + ySpeed > canvas.height) {
        ySpeed = -ySpeed * friction;
        xSpeed = xSpeed * friction;
    }
    else{
        ySpeed += Math.floor(gravity);
        //ySpeed = ySpeed * friction
        //xSpeed = xSpeed * friction
    }
//    console.log(bally)
//    console.log(gravityslide.value)
    ballx += xSpeed;
    bally += ySpeed;

    ctx.fillStyle = "#224d77";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "#17395a";
    drawcircle(ball2x, ball2y, radius);
    ctx.fillStyle = "black"
    drawcircle(ballx, bally, radius);
}

function drawcircle(x, y, radius,) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI *2);
    ctx.closePath();
    ctx.fill();
}

function drawRect(x,y,w,h) {
    ctx.fillStyle = "black";
    ctx.fillRect(x,y,w,h);
}
function ball2() {
    if (ball2y - radius < 0) {
        ySpeed2 = -ySpeed2;
    }
    if (ball2x - radius + xSpeed2 < 0) {
        xSpeed2 = -xSpeed2;
    }
    if (ball2x + radius + xSpeed2 > canvas.width) {
       xSpeed2 = -xSpeed2;
    }
    if (ball2y + radius + ySpeed2 > canvas.height) {
        ySpeed2 = -ySpeed2 * friction;
        xSpeed2 = xSpeed2 * friction;
    }
    else{
        ySpeed2 += Math.floor(gravity);
    }
    ball2x += xSpeed2;
    ball2y += ySpeed2;

//    ctx.fillStyle = "#224d77";
//    ctx.fillRect(0,0,canvas.width,canvas.height);
}
