var canvas = document.querySelector('canvas');
var c = canvas.getContext("2d");
var canvasH = 400;
var canvasW = 600;
var box = {
    x:20,
    y:20
}

var gamespeed = 100;

var d;

window.addEventListener('keypress',function(e){
        if(e.key == 'w'  && d!='Down'){
            d = 'Up';
        }else if(e.key == 'd'  && d!='Left'){
            d = 'Right';
        }else if(e.key == 's'  && d!='Up'){
            d = 'Down';
        }else if(e.key == 'a'  && d!='Right'){
            d = 'Left';
        }
})


function Snake(){
    this.x = canvasW/2;
    this.y = canvasH/2;
    this.snake = [];

    this.snake[0] = {
        x:this.x,
        y:this.y
    };

    this.update = function(){
            if(d == 'Up'){
                speedY = -box.y;
                speedX = 0;
            }else if(d == 'Right'){
                speedX = box.x;
                speedY = 0;
            }else if(d == 'Down'){
                speedY = box.y;
                speedX = 0;
            }else if(d == 'Left'){
                speedX = -box.x;
                speedY = 0;
            }
            if(!(this.snake[0].x == food.x && this.snake[0].y == food.y)){
                var head ={
                    x:this.x+=speedX,
                    y:this.y+=speedY
                }
                this.snake.unshift(head);
                this.snake.pop();
            }else this.eat();
    }
    
    this.draw = function(){
        this.update();
        this.ateItself();
        this.checkIfinbounds();
        this.snake.forEach(function(el,i){
            if(i==0){
                c.fillStyle='red';
            }
            else
                c.fillStyle='white';
            c.fillRect(el.x,el.y,box.x,box.y);
            c.strokeRect(el.x,el.y,box.x,box.y);
        })
    }
    this.eat = function(){
        if(this.snake[0].x == food.x && this.snake[0].y == food.y){
            food.createFood();
            head ={
                x:this.x+=speedX,
                y:this.y+=speedY
            }
            this.snake.unshift(head);
        }
    }

    this.ateItself = function(){
        for(var i = 1; i<this.snake.length ; i++){
            if(this.snake[0].x == this.snake[i].x && this.snake[0].y == this.snake[i].y){
                this.snake.splice(i, this.snake.length-1);
            }
        }
    }

    this.checkIfinbounds = function(){
        if(this.snake[0].x == canvasW){
            this.x = 0;
            head = {
                x: this.x,
                y: this.y
            }
            this.snake.unshift(head);
            this.snake.pop();
        }
        else if(this.snake[0].x < 0){
            this.x = canvasW;
            head = {
                x: this.x,
                y: this.y
            }
            this.snake.unshift(head);
            this.snake.pop();
        }else if(this.snake[0].y == canvasH){
            this.y = 0;
            head = {
                x: this.x,
                y: this.y
            }
            this.snake.unshift(head);
            this.snake.pop();
        }else if(this.snake[0].y<0){
            this.y = canvasH;
            head = {
                x: this.x,
                y: this.y
            }
            this.snake.unshift(head);
            this.snake.pop();
        }
    }
}

function Food(){
    this.x = Math.floor(Math.random()*29+1)*box.x;
    this.y = Math.floor(Math.random()*19+1)*box.y;
    this.draw = function(){
        c.fillStyle = 'black';
        c.fillRect(this.x,this.y,box.x,box.y);
    }
    this.createFood = function(){
        food = new Food();
        snake.snake.forEach(function(el){
            if(el.x == food.x && el.y == food.y){
                food.createFood();
            }
        })
    }
}

canvas.width = canvasW;
canvas.height = canvasH;
var speedX = box.x;
var speedY = 0;
var snake = new Snake();
var food = new Food();

snake.draw();
var game = setInterval(function(){
    c.clearRect(0,0,canvasW,canvasH);
    snake.draw();
    food.draw();
},gamespeed);

