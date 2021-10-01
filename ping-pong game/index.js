// initial x-coordinate-Ball: left: 47.5%
// Max x-coordinate-Ball : left: 98.7%;
// Min x-coordinate-Ball : left: 0%;
// initial y-coordinate-Ball : top: 94.5%;
// Min y-coordinate-Ball : top: 2.3%;
// Max y-coordinate-Ball : top: 94.5%;

var isStarted = false;
var speed = 100;

var score = 0;

var initialDirection = "up-1";
var direction = initialDirection;

var bars = document.querySelectorAll(".bars");
var initialBarX = 44;
var maxBarX = 92;
var minBarX = 0;
var barX = initialBarX;

var initialBallX = 47.5;
var initialBallY = 94.5;
var maxBallX = 98.5;
var maxBallY = 94.5;
var minBallX = 0.5;
var minBallY = 1.5;
var ballX = initialBallX;
var ballY = initialBallY;
console.log(ballX, ballY);

function setBallCoordinates(){
    // console.log(ballX, ballY);
    document.getElementById("ball").style.left = ballX + "%";
    document.getElementById("ball").style.top = ballY + "%";
}

function setBar(){
    for(let bar of bars){
        bar.style.left = barX + "%";
    }
}

function initialSetup(){
    barX = initialBarX;
    ballX = initialBallX;
    ballY = initialBallY;
    if(direction.substr(0,1) === "d"){
        direction = initialDirection;
    }
    score = 0;
    setBar();
    setBallCoordinates();
}

function getScore(){
    var highScore = localStorage.getItem("highScore");
    var highScoreObj = [];
    if(highScore == null){
        highScoreObj = [];
    }else{
        highScoreObj = JSON.parse(highScore);
    }
    if(highScoreObj[0]>=score){
        return `    Your Score: ${score} \n    High Score: ${highScoreObj[0]}`;
    }else{
        highScoreObj[0] = score;
        localStorage.setItem("highScore", JSON.stringify(highScoreObj));
        return `    Congratulations! You have beaten the high score. \n    Score: ${score}`
    }
}

function moveBall(direction){
    switch (direction){
        case "up--5":
            if(ballX-5>=minBallX){
                ballX-=5;
            }else{
                ballX = minBallX;
            }
            ballY--;
            break;
        case "up--3":
            if(ballX-3>=minBallX){
                ballX-=3;
            }else{
                ballX = minBallX;
            }
            ballY--;
            break;
        case "up--1":
            if(ballX-1>=minBallX){
                ballX--;
            }else{
                ballX = minBallX;
            }
            ballY--;
            break;
        case "up-0":
            if(ballY-2>=minBallY){
                ballY-=2;
            }else{
                ballY = minBallY;
            }
            break;
        case "up-1":
            if(ballX+1<=maxBallX){
                ballX++;
            }else{
                ballX = maxBallX;
            }
            ballY--;
            break;
        case "up-3":
            if(ballX+3<=maxBallX){
                ballX+=3;
            }else{
                ballX = maxBallX;
            }
            ballY--;
            break;
        case "up-5":
            if(ballX+5<=maxBallX){
                ballX+=5;
            }else{
                ballX = maxBallX;
            }
            ballY--;
            break;
        case "down--5":
            if(ballX-5>=minBallX){
                ballX-=5;
            }else{
                ballX = minBallX;
            }
            ballY++;
            break;
        case "down--3":
            if(ballX-3>=minBallX){
                ballX-=3;
            }else{
                ballX = minBallX;
            }
            ballY++;
            break;
        case "down--1":
            if(ballX-1>=minBallX){
                ballX--;
            }else{
                ballX = minBallX;
            }
            ballY++;
            break;
        case "down-0":
            if(ballY+2<=maxBallY){
                ballY+=2;
            }else{
                ballY = maxBallY;
            }
            break;
        case "down-1":
            if(ballX+1<=maxBallX){
                ballX++;
            }else{
                ballX = maxBallX;
            }
            ballY++;
            break;
        case "down-3":
            if(ballX+3<=maxBallX){
                ballX+=3;
            }else{
                ballX = maxBallX;
            }
            ballY++;
            break;
        case "down-5":
            if(ballX+5<=maxBallX){
                ballX+=5;
            }else{
                ballX = maxBallX;
            }
            ballY++;
            break;
    }
}

function edgeStrike(side){
    if (side === "right"){
        if(direction.substring(0,1)==="u"){
            direction = "up--1";
            moveBall(direction);
        }else{
            direction = "down--1";
            moveBall(direction);
        }
    }else{
        if(direction.substring(0,1)==="u"){
            direction = "up-1";
            moveBall(direction);
        }else{
            direction = "down-1";
            moveBall(direction);
        }
    }
}

document.addEventListener("keydown", (e) =>{
    if(e.key == " " && (!isStarted)){
        isStarted = true;
        moveBall(direction);
        var interval = setInterval(() => {
            // In the arena
            if(ballX<maxBallX && ballY<maxBallY && ballX>minBallX && ballY>minBallY){
                moveBall(direction);
            }
            // At right edge
            else if(ballX===maxBallX && ballY>minBallY && ballY<maxBallY){
                edgeStrike("right");
            }
            // At left edge
            else if(ballX===minBallX && ballY>minBallY && ballY<maxBallY){
                edgeStrike("left");
            }
            // At top and bottom
            else if(ballY===minBallY || ballY===maxBallY){
                let ball = document.getElementById("ball").getBoundingClientRect();
                let bar = document.getElementById("lower").getBoundingClientRect();
                let ballLeft = ball.left;
                let ballRight = ball.right
                let barMinus5 = bar.left+5;
                let barMinus3 = bar.left+30;
                let barMinus1 = bar.left+55;
                let bar0 = bar.left+70;
                let barPlus1 = bar.left+95;
                let barPlus3 = bar.left+120;
                if ((ball.left>=bar.left && ball.left<=bar.right) || (ball.right>=bar.left && ball.right<=bar.right)){
                    isStarted = true;
                    score += 10;
                    if(ballY===maxBallY && ((ballRight<barMinus5 && ballRight>=ball.left)||(ballLeft<barMinus5 && ballLeft>=ball.left))){
                        direction = "up--5";
                        moveBall(direction);
                    }
                    else if(ballY===maxBallY && ((ballRight<barMinus3 && ballRight>=barMinus5)||(ballLeft<barMinus3 && ballLeft>=barMinus5))){
                        direction = "up--3";
                        moveBall(direction);
                    }
                    else if(ballY===maxBallY && ((ballRight<barMinus1 && ballRight>=barMinus3)||(ballLeft<barMinus1 && ballLeft>=barMinus3))){
                        direction = "up--1";
                        moveBall(direction);
                    }
                    else if(ballY===maxBallY && ((ballRight<bar0 && ballRight>=barMinus1)||(ballLeft<bar0 && ballLeft>=barMinus1))){
                        direction = "up-0";
                        moveBall(direction);    
                    }
                    else if(ballY===maxBallY && ((ballRight<barPlus1 && ballRight>=bar0)||(ballLeft<barPlus1 && ballLeft>=bar0))){
                        direction = "up-1";
                        moveBall(direction);
                    }
                    else if(ballY===maxBallY && ((ballRight<barPlus3 && ballRight>=barPlus1)||(ballLeft<barPlus3 && ballLeft>=barPlus1))){
                        direction = "up-3";
                        moveBall(direction);
                    }
                    else if(ballY===maxBallY && ((ballRight<bar.right && ballRight>=barPlus3)||(ballLeft<bar.right && ballLeft>=barPlus3))){
                        direction = "up-5";
                        moveBall(direction);
                    }
                    else if(ballY===minBallY && ((ballRight<barMinus5 && ballRight>=ball.left)||(ballLeft<barMinus5 && ballLeft>=ball.left))){
                        direction = "down--5";
                        moveBall(direction);
                    }
                    else if(ballY===minBallY && ((ballRight<barMinus3 && ballRight>=barMinus5)||(ballLeft<barMinus3 && ballLeft>=barMinus5))){
                        direction = "down--3";
                        moveBall(direction);
                    }
                    else if(ballY===minBallY && ((ballRight<barMinus1 && ballRight>=barMinus3)||(ballLeft<barMinus1 && ballLeft>=barMinus3))){
                        direction = "down--1";
                        moveBall(direction);
                    }
                    else if(ballY===minBallY && ((ballRight<bar0 && ballRight>=barMinus1)||(ballLeft<bar0 && ballLeft>=barMinus1))){
                        direction = "down-0";
                        moveBall(direction);    
                    }
                    else if(ballY===minBallY && ((ballRight<barPlus1 && ballRight>=bar0)||(ballLeft<barPlus1 && ballLeft>=bar0))){
                        direction = "down-1";
                        moveBall(direction);
                    }
                    else if(ballY===minBallY && ((ballRight<barPlus3 && ballRight>=barPlus1)||(ballLeft<barPlus3 && ballLeft>=barPlus1))){
                        direction = "down-3";
                        moveBall(direction);
                    }
                    else if(ballY===maxBallY && ((ballRight<=bar.right && ballRight>=barPlus3)||(ballLeft<=bar.right && ballLeft>=barPlus3))){
                        direction = "down-5";
                        moveBall(direction);
                    }
                }else{
                    isStarted = false;
                }
            }
            setBallCoordinates();
            if(!isStarted){
                clearInterval(interval);
                score = getScore();
                alert(`Game over! \n${score}`);
                initialSetup();
            }
        },speed); 
    }
    else if (e.key=="ArrowRight" && isStarted && barX<maxBarX){
        barX++;
        setBar();
    }
    else if (e.key=="ArrowLeft" && isStarted && barX>minBarX){
        barX--;
        setBar();
    }
});