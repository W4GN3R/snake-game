let $lose = document.getElementById("perdeu");
let $dificuldade = document.getElementById("dificuldade");
let $canvas = document.getElementById("snake");
let $context = $canvas.getContext('2d');
let $contagem = document.getElementById("contagem");
let $pontos = document.getElementById("pontos");
let $melhorPonto = document.getElementById('Melhorponto');
let pontosFeito = 0;
let box = 32;
let n = 2;
let MelhorPonto = localStorage.getItem('MelhorPonto');
let jogo;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right"
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box,
}
function criarBG() {
    $context.fillStyle = "#9acc99";
    $context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha() {
    for(i = 0; i < snake.length; i++) {
        $context.fillStyle = "#000";
        $context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}


function drawFood() {
    $context.fillStyle = "#000";
    $context.fillRect(food.x, food.y, box, box);
}
document.addEventListener('keydown', update);

function update(event) {
    if(event.keyCode == 37 && direction != 'right') direction = "left";
    if(event.keyCode == 38 && direction != 'down') direction = "up";
    if(event.keyCode == 39 && direction != 'left') direction = "right";
    if(event.keyCode == 40 && direction != 'up') direction = "down";
}

function iniciarJogo() {
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    for(i = 1; i < snake.length; i++) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo);
            $lose.classList.add('active');
            if(MelhorPonto == null || MelhorPonto < pontosFeito) {
                localStorage.setItem('MelhorPonto', pontosFeito);
                $melhorPonto.innerHTML = pontosFeito;
            } else {
                $melhorPonto.innerHTML = MelhorPonto;
            }
        }
    }
    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x; 
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y) {
        snake.pop();
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;

        pontosFeito += 20;
        $pontos.innerHTML = pontosFeito
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead);
}

function reloadJogo() {
    window.location.reload();
}

function contagemRegressiva() {
    if(n > 0) {
        if( n == 2) {
            $contagem.querySelector("svg").classList = "dois";
        } else if (n == 1) {
            $contagem.querySelector("svg").classList = "um";
        }
    } else {
        clearInterval(startContagem);
    }
    n--;
}

$dificuldade.addEventListener('click', event => {
    event.preventDefault();
    const $target = event.target;
    let dificuldadeSelecionada;
    if ($target.tagName === 'BUTTON') {
        if($target.value == "facil") {
            dificuldadeSelecionada = 150;
        } else if ($target.value == "medio") {
            dificuldadeSelecionada = 100;
        } else if ($target.value == "dificil") {
            dificuldadeSelecionada = 50;
        }

        setTimeout(() => {
            jogo = setInterval(iniciarJogo, dificuldadeSelecionada);
            $contagem.classList.add('fadeOut');
        }, 2500);
        startContagem = setInterval(contagemRegressiva, 1000);
        $dificuldade.classList.add('hide');
        
    }
});