const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Ball properties
const ballRadius = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;

// Paddle properties
const paddleWidth = 10;
const paddleHeight = 100;
let leftPaddleY = canvas.height / 2 - paddleHeight / 2;
let rightPaddleY = leftPaddleY;

// Game properties
const paddleSpeed = 8;
const winningScore = 3;
let leftPaddleScore = 0;
let rightPaddleScore = 0;

function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle(x, y) {
    ctx.fillStyle = "#fff";
    ctx.fillRect(x, y, paddleWidth, paddleHeight);
}

function drawScore() {
    ctx.font = "40px Arial";
    ctx.fillStyle = "#fff";
    ctx.fillText(leftPaddleScore + " - " + rightPaddleScore, canvas.width / 2 - 40, 50);
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
    ballSpeedY = 5;
}

function movePaddles() {
    // Move the left paddle
    if (wKeyDown) {
        leftPaddleY -= paddleSpeed;
    }
    if (sKeyDown) {
        leftPaddleY += paddleSpeed;
    }

    // Move the right paddle
    if (ArrowUpKeyDown) {
        rightPaddleY -= paddleSpeed;
    }
    if (ArrowDownKeyDown) {
        rightPaddleY += paddleSpeed;
    }
}

function update() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Check collision with paddles
    if (
        (ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight && ballX - ballRadius <= paddleWidth) ||
        (ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight && ballX + ballRadius >= canvas.width - paddleWidth)
    ) {
        ballSpeedX = -ballSpeedX;
    }

    // Check collision with top and bottom walls
    if (ballY - ballRadius < 0 || ballY + ballRadius > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    // Check for scoring
    if (ballX - ballRadius < 0) {
        rightPaddleScore++;
        resetBall();
    } else if (ballX + ballRadius > canvas.width) {
        leftPaddleScore++;
        resetBall();
    }
}

function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the ball, paddles, and score
    drawBall();
    drawPaddle(0, leftPaddleY);
    drawPaddle(canvas.width - paddleWidth, rightPaddleY);
    drawScore();
}

// Keyboard input handling
let wKeyDown = false;
let sKeyDown = false;
let ArrowUpKeyDown = false;
let ArrowDownKeyDown = false;

document.addEventListener("keydown", (event) => {
    if (event.key === "w") {
        wKeyDown = true;
    } else if (event.key === "s") {
        sKeyDown = true;
    } else if (event.key === "ArrowUp") {
        ArrowUpKeyDown = true;
    } else if (event.key === "ArrowDown") {
        ArrowDownKeyDown = true;
    }
});

document.addEventListener("keyup", (event) => {
    if (event.key === "w") {
        wKeyDown = false;
    } else if (event.key === "s") {
        sKeyDown = false;
    } else if (event.key === "ArrowUp") {
        ArrowUpKeyDown = false;
    } else if (event.key === "ArrowDown") {
        ArrowDownKeyDown = false;
    }
});

// Game loop
function gameLoop() {
    movePaddles(); // Call the movePaddles function to update the paddles' positions
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
