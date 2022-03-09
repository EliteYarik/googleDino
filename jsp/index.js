document.addEventListener('DOMContentLoaded', function(){ 
    let canvas = document.querySelector('canvas');
    let ctx = canvas.getContext("2d");

    // ---------------------------------------------------------------------
    function Dino(x, y){
        this.speed = 0;
        this.speedY = 0;
        this.x = x;
        this.y = y;
        this.width = 235;
        this.height = 218;
        this.isAlive = 0;
        this.sprite = new Image();
        this.sprite.src = "img/dino.png";
        this.checkStanding = function(groundLevel){
            if(this.y == groundLevel){
                return  true;
            }
            else{
                return false;
            }
        }
        this.checkIsAlive = function(kaktys){
           if(this.x + this.width - 115 >= kaktys.x &&
                this.x + 90 <= kaktys.x + kaktys.width &&
                this.y + this.height -30 >= kaktys.y &&
                this.y <= kaktys.y + kaktys.height){
                return false;
            }
            else{
                return true;     
            }
        }   
    }

    function Ground(x, y){
        this.speed = 4;
        this.width = 1000;
        this.height = 300;
        this.x = x;
        this.y = y;
        this.sprite = new Image();
        this.sprite.src = "img/road.webp"
    }

    function Kaktys(x, y){
        this.width = 100;
        this.height = 100;
        this.x = x;
        this.y = y;
        this.passed = false;
        this.sprite = new Image();
        this.sprite.src = 'img/kaktus.png';
    }
    // ---------------------------------------------------------------------
    let background = new Image();
    let score = 0;
    let groundLevel = 343;
    background.src = "img/background.jpg";
    let dino = new Dino(0, 343);
    let grounds = [];
    let kaktysi = [];
    let gravity = 0.25;
    let gameOver = false;
    grounds[0] = new Ground(0, 500);
    grounds[1] = new Ground(grounds[0].width, 500);
    grounds[2] = new Ground(grounds[0].width + grounds[1].width, 500);

    kaktysi[0] = new Kaktys(Math.random() * 500 + 1000, 437);
    kaktysi[1] = new Kaktys(Math.random() * 500 + 1600, 437);
    kaktysi[2] = new Kaktys(Math.random() * 500 + 2200, 437);
    kaktysi[3] = new Kaktys(Math.random() * 500 + 2800, 437);
    kaktysi[4] = new Kaktys(Math.random() * 500 + 3400, 437);
    kaktysi[5] = new Kaktys(Math.random() * 500 + 4000, 437);

    Logic();
    function Logic(){
        console.log(0);
        if(!gameOver){
            dino.y += dino.speedY;
            if(!dino.checkStanding(groundLevel)){
                dino.speedY += gravity;
            }
            else{
                dino.speedY = 0;
            }

            for(let i = 0; i < grounds.length; i++){
                grounds[i].x -= grounds[i].speed;
                if(grounds[i].x < -1000 ){
                    grounds[i] = new Ground(2000, 500);
                }
            }
            for(let i = 0; i < kaktysi.length; i++){
                kaktysi[i].x -= grounds[0].speed;
                if(!dino.checkIsAlive(kaktysi[i])){
                    gameOver = true;
                }
                if(kaktysi[i].x < -100){
                    let right = 0;
                    for(let j = 0; j < kaktysi.length; j++){
                        if(right < kaktysi[j].x){
                            right = kaktysi[j].x;
                        }
                    }
                    let newPos = right + Math.random() * 1000 + 400;
                    kaktysi[i] = new Kaktys(newPos, 437)
                }

                if(!kaktysi[i].passed && dino.x > kaktysi[i].x){
                    score = score + 1;
                    kaktysi[i].passed = true;
                    console.log(score);
                }

            }

            
        }
        Draw();
        requestAnimationFrame(Logic);
    }
    
    
    function Draw(){

        ctx.drawImage(background, 0, 0);
        for(let i = 0; i < grounds.length; i++){
            ctx.drawImage(grounds[i].sprite, grounds[i].x, grounds[i].y, grounds[i].width, grounds[i].height);
        }
        ctx.drawImage(dino.sprite, dino.x, dino.y, dino.width, dino.height);
        for(let i = 0; i < kaktysi.length; i++){
            ctx.drawImage( kaktysi[i].sprite, kaktysi[i].x, kaktysi[i].y, kaktysi[i].width, kaktysi[i].height);
        }
        ctx.fillText(score, 100, 100);
        ctx.font = '48px serif';
    }

    document.addEventListener("keydown", function(keyPressed){
        switch(keyPressed.keyCode){
            case(32):
            if(dino.checkStanding(groundLevel)){
                dino.speedY = -12;
            }
            break;
        }
    });
})