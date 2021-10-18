// import Paddle from "/src/PADDLE.JS";
// paddle
function music(){


    var audio=new Audio("sound.wav");
    // audio.setAttribute('src','sound.wav');
    // audio.loop=true;
    audio.play();
    };
    // function musicstart(){
    
    
        // var audio=new Audio("start.wav");
        // audio.setAttribute('src','sound.wav');
        // audio.loop=true;
        // audio.play();
        // };
        // function musicend(){
    
    
        //     var audio=new Audio("back.wav");
        //     // audio.setAttribute('src','sound.wav');
        //     // audio.loop=true;
            // audio.play();
            // };
    class Paddle {
    
    
        constructor(game) {
    
            this.gameWidth = game.gameWidth;
    
            this.width = 150;
    
            this.height = 20;
    
            this.maxspeed = 7;
    
            this.speed = 0;
    
    
            this.position = {
    
                x: game.gameWidth / 2 - this.width / 2,
    
                y: game.gameHeight - this.height - 10
    
            };
        }
        draw(ctx) {
    
            ctx.fillStyle = "green";
    
            ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        }
    
        update(deltaTime) {
    
            if (!deltaTime) return;
    
            this.position.x += this.speed;
    
            if (this.position.x < 0) this.position.x = 0;
            // this.position.x+= 5/deltaTime;
            if (this.position.x + this.width > this.gameWidth)
    
                this.position.x = this.gameWidth - this.width;
        }
    
        moveLeft() {
            this.speed = -this.maxspeed;
        }
        moveRight() {
            this.speed = this.maxspeed;
        }
        stop() {
            this.speed = 0;
        }
    }
    const gamestate = {
        paused: 0,
        running: 1,
        menu: 2,
        gameover: 3,
        newlevel:4,
        completed:5
    };
    //Input Handler
    class InputHandler {
    
        constructor(paddle, game) {
            document.addEventListener("keydown", (event) => {
                // alert(event.keyCode);
                switch (event.keyCode) {
                    case 37:
                        paddle.moveLeft();
                        break;
                    case 39:
                        paddle.moveRight();
                        break;
                    case 32:
                        game.togglepause();
                        break;
                    case 13:
                        game.start();
                        break;
                }
            });
    
            document.addEventListener("keyup", (event) => {
                // alert(event.keyCode);
                switch (event.keyCode) {
                    case 37:
                        if (paddle.speed < 0)
                            paddle.stop();
                        break;
                    case 39:
                        if (paddle.speed > 0)
                            paddle.stop();
                        break;
                }
            });
        }
    
    
    
    }
    
    // ball.js
    class Ball {
    
        constructor(game) {
            this.image = document.querySelector(".img-ball")
    
            this.gameWidth = game.gameWidth;
            this.gameHeight = game.gameHeight;
    
            
            this.game = game;
            this.size = 16;
            this.reset();
        }
    reset(){
        this.speed = { x: 4, y: -2 };
    
            this.position = { x: 10, y: 400 };
    }
    
    
    
        draw(ctx) {
    
            ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
    
        }
    
    
        update(deltatime) {
            this.position.x += this.speed.x;
    
            this.position.y += this.speed.y;
    
            if (this.position.x < 0 || this.position.x + this.size > this.gameWidth) {
                this.speed.x = -this.speed.x;
            }
            if (this.position.y < 0 ) {
                this.speed.y = -this.speed.y;
            }
            if(this.position.y + this.size > this.gameHeight){
                this.game.lives--;
                this.reset();
            }
    
            // let bottomofball = this.position.y + this.size;
    
            // let topofpaddle = this.game.paddle.position.y;
    
            // let leftside = this.game.paddle.position.x;
    
            // let rightside = this.game.paddle.position.x + this.game.paddle.width;
    
            // if (bottomofball >= topofpaddle
            //     && this.position.x >= leftside
            //     && this.position.x + this.size <= rightside
    
            // )
            if (collisoinDetection(this, this.game.paddle)) {
                this.speed.y = -this.speed.y;
                this.position.y = this.game.paddle.position.y - this.size;
            }
    
    
    
        }
    }
    
    
    class Brick {
    
    
        constructor(game, position) {
            this.image = document.querySelector(".img-brick");
    
    
    
            this.game = game;
    
            this.position = position;
    
            this.width = 80;
            this.height = 24;
            this.mark = false;
        }
    
    
    
        update() {
            if (collisoinDetection(this.game.ball, this)) {
                this.game.ball.speed.y = -this.game.ball.speed.y;
                this.mark = true;
              setInterval( music(),80 );  
            }
        }
    
    
    
    
    
    
    
        draw(ctx) {
            ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    
        }
    
    
    
    
    
    
    }
    
    // collision Detection
    function collisoinDetection(ball, gameobject) {
    
        let bottomofball = ball.position.y + ball.size;
    
        let topofball = ball.position.y;
    
        let topofobject = gameobject.position.y;
    
        let bottomofobject = gameobject.position.y + gameobject.height;
    
        let leftsideobject = gameobject.position.x;
    
        let rightsideobject = gameobject.position.x + gameobject.width;
    
        if (bottomofball >= topofobject
            && topofball <= bottomofobject
            && ball.position.x >= leftsideobject
            && ball.position.x + ball.size <= rightsideobject
    
        ) {
            // this.speed.y = -this.speed.y;
            // this.position.y = this.game.paddle.position.y - this.size;
            return true;
    
        } else {
            return false;
        }
    
    
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // class Game
    
    class Game {
    
    
        constructor(gameWidth, gameHeight) {
            this.gameHeight = gameHeight;
    
            this.gameWidth = gameWidth;
    
    
            this.gamestate = gamestate.menu;
            this.lives=2;
            this.paddle = new Paddle(this);
            this.gameobjects=[];
            this.ball = new Ball(this);
            new InputHandler(this.paddle, this);
            this.bricks=[];
            this.levels=[level1,level2];
            this.curindex=0;
            // let paddle = new Paddle(this);
    
            // let ball = new Ball(this);
    
            // new InputHandler(this.paddle);
    
        }
        start() {
    if(this.gamestate!==gamestate.menu && this.gamestate!==gamestate.newlevel)return;
    
            // let bricks=[];
            // for(let i=0;i<10;i++){
            //     bricks.push(new Brick(this, {x:i * 52 , y:30}));
            // }
            // let bricks=new Brick(this, { x:20 , y:20 });
    
            this.bricks = buildlevel(this, this.levels[this.curindex]);
    this.ball.reset();
            this.gameobjects = [this.paddle, this.ball];
    
           this.gamestate= gamestate.running;
        }
    
    
        update(deltatime) {
            if(this.lives===0){this.gamestate=gamestate.gameover; 
                // setInterval( musicend(),100000);
                // musicend();
               // this.gamestate = gamestate.menu;
            }
    if(this.curindex===2){
        this.gamestate=gamestate.completed;
    }
            
    
            if (this.gamestate === gamestate.paused || this.gamestate === gamestate.menu ||this.gamestate === gamestate.gameover) return;
            if(this.bricks.length===0){
                
                this.curindex++;
                this.gamestate=gamestate.newlevel;
                this.start();
            }
            [...this.gameobjects,...this.bricks].forEach(objects => objects.update(deltatime));
    
            this.bricks= this.bricks.filter(brick => !brick.mark);
    
        }
    
    
    
        draw(ctx) {
    
           [...this.gameobjects,...this.bricks].forEach(objects => objects.draw(ctx));
    
            if (this.gamestate == gamestate.paused) {
                ctx.rect(0, 0, this.gameWidth, this.gameHeight);
                ctx.fillStyle = "rgba(0,0,0,0.5)";
                ctx.fill();
    
    
                ctx.font = "30px Arial";
                ctx.fillStyle = "white";
                ctx.textAlign = "center";
                ctx.fillText("PAUSED", this.gameWidth / 2, this.gameHeight / 2);
            }
            if (this.gamestate == gamestate.menu) {
                ctx.rect(0, 0, this.gameWidth, this.gameHeight);
                ctx.fillStyle = "rgba(0,0,0,1)";
                ctx.fill();
    
    
                ctx.font = "30px Arial";
                ctx.fillStyle = "white";
                ctx.textAlign = "center";
                ctx.fillText("PRESS ENTER TO START", this.gameWidth / 2, this.gameHeight / 2);
            }
            if (this.gamestate == gamestate.gameover) {
                ctx.rect(0, 0, this.gameWidth, this.gameHeight);
                ctx.fillStyle = "rgba(0,0,0,1)";
                ctx.fill();
    
    
                ctx.font = "30px Arial";
                ctx.fillStyle = "white";
                ctx.textAlign = "center";
                ctx.fillText("GAMEOVER", this.gameWidth / 2, this.gameHeight / 2);
            }
            if (this.gamestate == gamestate.completed) {
                ctx.rect(0, 0, this.gameWidth, this.gameHeight);
                ctx.fillStyle = "rgba(0,0,0,1)";
                ctx.fill();
    
    
                ctx.font = "30px Arial";
                ctx.fillStyle = "white";
                ctx.textAlign = "center";
                ctx.fillText("ALL Level Completed", this.gameWidth / 2, this.gameHeight / 2);
            }
        }
    
    
    
    
    
    
        togglepause() {
            if (this.gamestate == gamestate.paused) {
                this.gamestate = gamestate.running;
            } else {
                this.gamestate = gamestate.paused;
            }
    
    
    
        }
    
    
    
    
    
    
    
    
    }
    
    
    
    
    
    function buildlevel(game, level) {
    
        let bricks = [];
    
        level.forEach((row, rowInex) => {
    
            row.forEach((brick, brickIndex) => {
    
                if (brick === 1) {
    
                    let position =
                    {
                        x: 80 * brickIndex,
    
                        y: 75 + 24 * rowInex
    
    
                    };
                    bricks.push(new Brick(game, position));
                }
            });
    
        });
    
        return bricks;
    }
    
    
    const level1 = [
        [1, , , ,,,,1]
        
    ];
    const level2 = [
        [0, 1, 1, 1, 0, 0, 1, 1, 1, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // images
    
    
    // main
    
    let canvas = document.querySelector("#gameScreen");
    
    let ctx = canvas.getContext("2d");
    
    const GAME_WIDTH = 800;
    
    const GAME_HEIGHT = 600;
    
    
    // ctx.clearRect(0, 0, 800, 600);
    
    
    
    // paddle.draw(ctx);
    
    
    let lasttime = 0;
    
    let game = new Game(GAME_WIDTH, GAME_HEIGHT);
    // game.start();
    
    
    function gameloop(timestamp) {
    
        let deltatime = timestamp - lasttime;
    
        lasttime = timestamp;
    
        ctx.clearRect(0, 0, 800, 600);
    
        game.update(deltatime);
    
        game.draw(ctx);
    
        requestAnimationFrame(gameloop);
    }
    requestAnimationFrame(gameloop);
