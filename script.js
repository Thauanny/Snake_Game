let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}


snake[0] = {
    x: 8 * box,
    y: 8 * box
}

function criarBG(){

    context.fillStyle = "#3CB371";
    context.fillRect(0, 0, 26 * box , 16 *box);

}

function criarcobrinha(){

    for (let i = 0;  i< snake.length; ++i){

        context.fillStyle = "black";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood(){
    context.fillStyle = "#8B0000";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

function update(event){
    
    if(event.keyCode == 37 && direction != "right" || event.keyCode == 65 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down" || event.keyCode == 87 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left" || event.keyCode == 68 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up" || event.keyCode == 83 && direction != "up") direction = "down";
}



function iniciarJogo(){

    for (let i = 1; i < snake.length; ++i) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert("Game Over =(")
            window.location.reload()
        }
    }

    if(snake[0].x > 25 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 * box && direction == "left") snake[0].x = 26 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 * box && direction == "up") snake[0].y = 16 * box;

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if( direction == "right") snakeX += box;
    if( direction == "left") snakeX -= box;
    if( direction == "up") snakeY -= box;
    if( direction == "down") snakeY += box;

    if( snakeX != food.x || snakeY != food.y){

        snake.pop();

    }else{

        food.x = Math.floor(Math.random() * 24 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let newHead = {
        x: snakeX, 
        y: snakeY
    }
    
    snake.unshift(newHead);

    criarBG();
    criarcobrinha();
    drawFood();

}

let jogo = setInterval(iniciarJogo, 100);
