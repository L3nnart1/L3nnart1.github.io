let canvas = document.getElementById("canvas");
let c = canvas.getContext("2d");
let winner = document.querySelector("#Gewinner")
let pause = document.querySelector("#pause")
let botscore = document.querySelector("#Scorebot");
let playerscore = document.querySelector("#Scoreplayer");
let easy = document.querySelector("#easy");
let medium = document.querySelector("#medium");
let impossible = document.querySelector("#impossible")
document.addEventListener("keydown", updatecounter);
canvas.style.background = "black";
let pongsound = new Audio('/Ping Pong/X2Download (mp3cut.net).mp3');

let playervalue = 0;
let botvalue = 0;
playerscore.innerText = playervalue;
botscore.innerText = botvalue;

canvas.width = 800;
canvas.height = 600;
let fps = 30
let mode = 0;
let running = false
let counter = 1;
let gameover = true;

let playerx = canvas.width - 40;
let playery = 100;

let ballx = canvas.width / 2;
let bally = canvas.height / 2;
let xSpeed = -20;
let ySpeed = 5

let botx = canvas.width - canvas.width + 20
let boty = bally + 80;
let botspeedy

setInterval(isgoing, 100)
setInterval(gameloop,1000 / fps)

function gameloop() {
    if (gameover === false){
        if (running) {
            c.fillStyle = "black";
            c.fillRect(0, 0, canvas.width, canvas.height);
            legende()
            player();
            ball();
            bot();
            checkgameover();
        }
    }
}

function player() {
    window.addEventListener("mousemove", function (e) {
//        console.log(`x: ${e.x} y: ${e.y}`);
        if (e.y > 150 && e.y < 700) {
            playery = e.y -150     
        }   
    });
    drawRect(playerx, playery, 20, 50); 
}

function ball() {
    
    if (ballx + xSpeed < 0) {
        ballx = canvas.width / 2;
        bally = canvas.height / 2;
        xSpeed = 10;
        ySpeed = 0;
        playerscore.innerText = null;
        playervalue += 1;
        playerscore.innerText = playervalue;
    }
    if (ballx + xSpeed < botx && bally + 20 < boty + 50 && bally + 20 > boty) {
        if (impossible.checked) {
            xSpeed = (xSpeed * -1) + Math.floor(Math.random()* 20 -5);
            ySpeed = ySpeed + Math.floor(Math.random()* 20 -10);
            pongsound.play(); 
        }
        else{
            xSpeed = (xSpeed * -1) + Math.floor(Math.random()* 10 -5);
            ySpeed = ySpeed + Math.floor(Math.random()* 20 -10);
            pongsound.play();
        }
    }
    if (ballx + 20 > playerx && bally < playery + 50 && bally + 20 > playery) {
        xSpeed = -20;
        pongsound.play();
        if (ySpeed < 0) {
            ySpeed = -5
        }
        if (ySpeed > 0) {
            ySpeed = 5
        }

    }
    if (ballx + 20 + xSpeed > canvas.width){
        ballx = canvas.width / 2;
        bally = canvas.height / 2;
        xSpeed = -10;
        ySpeed = 0;
        botscore.innerText = null;
        botvalue += 1;
        botscore.innerText = botvalue;
        boty = (canvas.height / 2) - 20;
    }
    if (bally + 20 + ySpeed > canvas.height) {
        ySpeed = ySpeed * -1;
        pongsound.play();
    }
    if (bally < 0) {
        ySpeed = ySpeed * -1;
        pongsound.play();
    }
    
    
    ballx += xSpeed;
    bally += ySpeed;
    
    drawRect(ballx, bally, 20, 20);
}

function bot() {
    if (easy.checked && medium.checked === false && impossible.checked === false) {
        mode = 4.4;
    }
    if (medium.checked && easy.checked === false && impossible.checked === false) {
        mode = 6;
    }
    if (mode > 2) {
        if (boty > 5 && boty < canvas.height - 5){
            if (boty < bally) {
                boty += mode;
            }
            if (boty > bally) {
                boty += -mode;
            }
        }   
    }
    if (impossible.checked && easy.checked === false && medium.checked === false) {
        if (bally < canvas.height - 5 && bally > 5) {
            boty = bally   
        }
    }
    if (boty > canvas.height - 10) {
        boty = canvas.height - 20;
    }
    if (boty < 8) {
        boty = canvas.height - canvas.height + 10;
    }
    drawRect(botx, boty - 10, 20, 50);
}
function drawRect(x,y,w,h) {
    c.fillStyle = "white";
    c.fillRect(x,y,w,h);
}

function checkgameover() {
    if (botvalue >= 8 || playervalue >= 8) {
        running = false
        gameover = true;
        counter += 1;
        if (botvalue === 8) {
            winner.innerText = "Der Bot hat gewonnen!"
        }
        if (playervalue === 8) {
            winner.innerText = "Du hast gewonnen!"
        }
    }
    if (running === false){
    }
}
function isgoing(){
    if (easy.checked && medium.checked === false && impossible.checked === false && counter % 2 === 0 && playervalue != 8 && botvalue != 8){
        running = true;
        gameover = false;
    }
    if (medium.checked && easy.checked === false && impossible.checked === false && counter % 2 === 0 && playervalue != 8 && botvalue != 8){
        running = true;
        gameover = false;
    }
    if (impossible.checked && easy.checked === false && medium.checked === false && counter % 2 === 0 && playervalue != 8 && botvalue != 8){
        running = true;
        gameover = false;
    }
    if (easy.checked && medium.checked && impossible.checked) {
        running = false;
        gameover = true;
    }
    if (easy.checked === false && medium.checked && impossible.checked) {
        running = false;
        gameover = true;
    }
    if (easy.checked && medium.checked && impossible.checked === false) {
        running = false;
        gameover = true;
    }
    if (easy.checked && medium.checked === false && impossible.checked) {
        running = false;
        gameover = true;
    }
    if (easy.checked === false && medium.checked === false && impossible.checked === false){
        running = false;
        gameover = true;
    }
    if (counter % 2 != 0) {
        running = false;
    }
    if (gameover) {
        ballx = canvas.width / 2;
        bally = canvas.height / 2
    }
    if (counter % 2 != 0) {
        pause.innerText = "Drücke p um fortzufahren"
    }
    else if (counter % 2 === 0) {
        pause.innerText = null
    }
    if (gameover === false) {
        winner.innerText = null;
    }
}
function updatecounter(e) {
    if (e.keyCode == 80 && gameover === true) {
        playervalue = 0;
        playerscore.innerText = playervalue;
        botvalue = 0;
        botscore.innerText = botvalue;
    }
    if (e.keyCode == 80) {
        counter += 1;
    }
}
function legende(){
    for (let i = canvas.height; i > 0; i -= 34) {
        c.fillStyle = "white";
        c.fillRect((canvas.width / 2) - 7.5,i,15,15);
    }
}
