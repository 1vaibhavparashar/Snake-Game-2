let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')
let body = document.querySelector('body')

body.style.backgroundColor = "black"; 

let boardHeight = 600
let boardWidth = 1200

let square = 50

let snakeCells = [[0,0]]
let direction = 'right'
let gameOver = false;
let foodcells = generateRandomFood();
let score = 0;
// let highScore = 0;

let audioStart = new Audio("./subway-surfers-(main-theme)-made-with-Voicemod.mp3"); // Audio for game start
let audioEat = new Audio("./subway-surfers-coin-collect.mp3"); // Audio for eating food
let audioGameOver = new Audio("./Rukmini Devi Public School (online-audio-converter.com).mp3"); // Audio for game over


document.addEventListener('keydown' , (event)=>{
        if(event.key === 'ArrowUp'){direction = "up"}
        else if(event.key === 'ArrowDown'){direction = "down"}
        else if(event.key === 'ArrowLeft'){direction = "left"}
        else if(event.key === 'ArrowRight'){direction = "right"}
    })

function draw(){
    if(gameOver === true){
        clearInterval(id);
        audioStart.pause();
        audioGameOver.play();
        ctx.fillStyle = "Black"
        ctx.font = "50px sans-serif"
        ctx.fillText('You are noob !!' , 400,300)
        return;
    }
    audioStart.play();
    //erase
    ctx.clearRect(0,0,1200,800)

    //draw snake
    for(let cell of snakeCells){
        ctx.fillStyle = "pink"
        ctx.fillRect(cell[0],cell[1],square,square)
        ctx.strokeStyle = "red"
        ctx.strokeRect(cell[0],cell[1],square,square )
    }

    //draw food
    ctx.fillStyle = "purple"
    ctx.fillRect(foodcells[0],foodcells[1],square,square)
    // draw score
    ctx.font = "40px monospace"
    ctx.fillText(`Score: ${score}` , 10,590)
    // ctx.fillText(`High Score :${highScore}`,250,390)

}

function update(){
    let headX = snakeCells[snakeCells.length-1][0];
    let headY = snakeCells[snakeCells.length-1][1];
    let newHeadX;
    let newHeadY;

    if(direction === 'up'){
        newHeadX = headX;
        newHeadY = headY - square;
        if(newHeadY < 0 || ex(newHeadX , newHeadY)){
            gameOver = true;
        }
    }else if(direction === 'down'){
        newHeadX = headX;
        newHeadY = headY + square;
        if(newHeadY === boardHeight || ex(newHeadX , newHeadY)){
            gameOver = true;
        }
    }
    else if(direction ==='left'){
                newHeadX = headX - square;
                newHeadY = headY;
                if(newHeadX < 0 || ex(newHeadX , newHeadY)){
                    gameOver = true;
                }
            }
    else if(direction ==='right'){
                newHeadX = headX + square;
                newHeadY = headY;
                if(newHeadX === boardWidth || ex(newHeadX , newHeadY)){
                    gameOver = true;
                }
            }


    snakeCells.push([newHeadX,newHeadY]);
    if(newHeadX === foodcells[0] && newHeadY === foodcells[1]){
        audioEat.play();
        score++;
        // highScore = Math.max(score,highScore);
        foodcells = generateRandomFood();
    }else{
        snakeCells.shift();
    }
}

function generateRandomFood(){
    return [
        Math.round(Math.random() * (boardWidth - square)/square)*square,
        Math.round(Math.random() * (boardHeight - square)/square)*square
    ]
}

function ex(newHeadX , newHeadY){
    for(let item of snakeCells){
        if(item[0] === newHeadX && item[1] === newHeadY){
            return true;
        }
    }
    return false;
}
// let audio1 = new Audio("./subway-surfers-(main-theme)-made-with-Voicemod.mp3")
// let audio2 = new Audio("./Rukmini Devi Public School (online-audio-converter.com).mp3")
// document.addEventListener('keypress', function(event){
//     audio1.play()
// })
// if(gameOver === false){
//     audio1.play()
// }else{
//     audio1.pause()
//     audio2.play()
// }

let id = setInterval(function(){
    update()
    draw()
},150)