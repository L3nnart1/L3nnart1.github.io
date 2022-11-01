const score = document.querySelector("#score");
const highscoretxt = document.querySelector("#highscore");
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let slider = document.getElementById("myRange");
let speed = document.getElementById("speed");
document.addEventListener("keydown", keyDown);
canvas.style.background = "#4979aa";

canvas.width = 600;
canvas.height = 600;
let cellWidth;
let cellHeight;
let rows = slider.value;
let cols = slider.value;

function updaterows(){
    rows = slider.value;
    cols = slider.value;
    cellWidth = canvas.width / cols;
    cellHeight = canvas.height / rows;
}
let snake = [{
    x:Math.floor(cols / 2),
    y:Math.floor(rows / 2),
}]
let direction;
let food_collected = false;

placefood();
setInterval(game_loop, 110);
setInterval(updaterows, 100);

let counter = 0;
let highscore = 0;

function add(x, y){
    ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth - 2, cellHeight - 2);
}
updatescore();
draw();

function draw(){
    ctx.fillStyle = "#224d77";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#0c370a"
    snake.forEach(part => add(part.x, part.y));
    ctx.fillStyle = "#7ed673";
    add(food.x, food.y);
    ctx.fillStyle = "#0a2908";
    add(snake[0].x, snake[0].y);
    requestAnimationFrame(draw);
}
function placefood() {
    let randx = Math.floor(Math.random() * cols);
    let randy = Math.floor(Math.random() * rows);
    foodtest = [{
        x:randx,
        y:randy
    }]
    let isduplicate = snake.some((snake) => {
        return snake.x == foodtest[0].x && snake.y == foodtest[0].y
    })
    if (isduplicate){
        placefood();
    }
    else{
        food = {
            x:randx,
            y:randy
        }
    }   
}
function shiftSnake() {
    for (let i = snake.length - 1; i > 0; i--) {
        const part = snake[i];
        const lastPart = snake[i - 1];
        part.x = lastPart.x;
        part.y = lastPart.y;
    }
}

function game_loop(){
    if (food_collected){
        snake = [{
            x:snake[0].x,
            y:snake[0].y,
        }, ...snake];
        food_collected = false;
    }
    shiftSnake();

    if (direction == "LEFT"){
        snake[0].x--;
    }
    if (direction == "RIGHT"){
        snake[0].x++;
    }
    if (direction == "UP"){
        snake[0].y++;
    }
    if (direction == "DOWN"){
        snake[0].y--;
    }
    if (snake[0].x == food.x && snake[0].y == food.y){
        food_collected = true;
        counter += 1;
        if (counter > highscore){
            highscore += 1;
        }
        updatescore();
        placefood();
    }
    gameover();
}
function gameover(){
    let head = snake[0];
    let tail = snake.slice(1);
    let duplicate = tail.find(part => part.x == head.x && part.y == head.y);
    if (snake[0].x > cols-1 || snake[0].y > rows-1 || snake[0].x < 0 || snake[0].y < 0 || duplicate){
        snake = [{
            x:Math.floor(slider.value / 2),
            y:Math.floor(slider.value / 2)
        }]
        direction = " ";
        counter = 0;
        updatescore();
    }
}
function keyDown(e){
    if (e.keyCode == 37 && direction != "RIGHT") {
        direction = "LEFT";
    }
    if (e.keyCode == 40 && direction != "DOWN") {
        direction = "UP";
    }
    if (e.keyCode == 39 && direction != "LEFT") {
        direction = "RIGHT";
    }
    if (e.keyCode == 38 && direction != "UP") {
        direction = "DOWN";
    }
}
function updatescore(){
    score.textContent = counter;
    highscoretxt.textContent = highscore;
}
