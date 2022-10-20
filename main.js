let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
document.addEventListener("keydown", keyDown);

canvas.style.background = "#4979aa";

canvas.width = 600;
canvas.height = 600;

let rows = 20;
let cols = 20;
let snake = [{
    x:10,
    y:10,
}]
let cellWidth = canvas.width / cols;
let cellHeight = canvas.height / rows;
let direction;
let food_collected = false;

placefood();
setInterval(game_loop, 100);

function add(x, y){
    ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth - 2, cellHeight - 2);
}

draw();

function draw(){
    ctx.fillStyle = '#25496d';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black"
    snake.forEach(part => add(part.x, part.y));


    ctx.fillStyle = "#7ed673"
    add(food.x, food.y);
    requestAnimationFrame(draw)
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
        placefood()
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
            x:10,
            y:10
        }]
        direction = " ";
    }
}


function keyDown(e){
    if (e.keyCode == 37) {
        direction = "LEFT";
    }
    if (e.keyCode == 40) {
        direction = "UP";
    }
    if (e.keyCode == 39) {
        direction = "RIGHT";
    }
    if (e.keyCode == 38) {
        direction = "DOWN";
    }
}