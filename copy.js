HTML Setup

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flappy Bird Game</title>
    <link rel="stylesheet" href="Flap.css">
</head>
<body>
    <canvas id="gameCanvas" width="400" height="400"></canvas>
    <script src="Flap.js"></script>
</body>
</html>

CSS

body {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f3f3f3;
}

canvas {
    border: 1px solid #333;
}

JS 

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const bird = {
    x: 50,
    y: canvas.height / 2,
    velocity: 0,
    gravity: 0.5,
    lift: -10,
    size: 25,
};

let pipes = [];
let score = 0;

function drawBird() {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(bird.x, bird.y, bird.size, bird.size);
}

function drawPipes() {
    ctx.fillStyle = 'green';
    for (const pipe of pipes) {
        ctx.fillRect(pipe.x, 0, pipe.width, pipe.top);
        ctx.fillRect(pipe.x, pipe.bottom, pipe.width, canvas.height - pipe.bottom);
    }
}

function moveBird() {
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;
}

function generatePipes() {
    if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - 200) {
        const pipeGap = 150;
        const pipeWidth = 30;
        const pipeTopHeight = Math.random() * (canvas.height - pipeGap - 50) + 50;
        pipes.push({
            x: canvas.width,
            top: pipeTopHeight,
            bottom: pipeTopHeight + pipeGap,
            width: pipeWidth,
        });
    }
}

function movePipes() {
    for (const pipe of pipes) {
        pipe.x -= 2;
    }

    if (pipes.length > 0 && pipes[0].x + pipes[0].width < 0) {
        pipes.shift();
        score++;
    }
}

function checkCollisions() {
    if (bird.y < 0 || bird.y + bird.size > canvas.height) {
        gameOver();
    }

    for (const pipe of pipes) {
        if (
            bird.x + bird.size > pipe.x &&
            bird.x < pipe.x + pipe.width &&
            (bird.y < pipe.top || bird.y + bird.size > pipe.bottom)
        ) {
            gameOver();
        }
    }
}

function drawScore() {
    ctx.fillStyle = 'black';
    ctx.font = '24px Arial';
    ctx.fillText('Score: ' + score, 10, 30);
}

function gameOver() {
    alert('Game Over! Your score: ' + score);
    resetGame();
}

function resetGame() {
    bird.y = canvas.height / 2;
    bird.velocity = 0;
    pipes = [];
    score = 0;
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    moveBird();
    drawBird();

    generatePipes();
    movePipes();
    drawPipes();

    checkCollisions();

    drawScore();

    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', () => {
    bird.velocity = bird.lift;
});

gameLoop();
