const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

const grid = 20
const tileCount = canvas.width / grid

let snake = [{x:15,y:15}]
let dx = 1
let dy = 0

let food = randomFood()

let score = 0
let level = 1
let speed = 120

let gameLoop

document.addEventListener("keydown",keyPress)

function keyPress(e){

if(e.key==="ArrowUp" && dy===0){dx=0;dy=-1}
if(e.key==="ArrowDown" && dy===0){dx=0;dy=1}
if(e.key==="ArrowLeft" && dx===0){dx=-1;dy=0}
if(e.key==="ArrowRight" && dx===0){dx=1;dy=0}

}

function randomFood(){

return{
x:Math.floor(Math.random()*tileCount),
y:Math.floor(Math.random()*tileCount)
}

}

function drawGame(){

ctx.fillStyle="black"
ctx.fillRect(0,0,canvas.width,canvas.height)

moveSnake()

drawFood()

drawSnake()

checkCollision()

}

function moveSnake(){

const head={
x:snake[0].x+dx,
y:snake[0].y+dy
}

snake.unshift(head)

if(head.x===food.x && head.y===food.y){

score++

food=randomFood()

updateScore()

}else{

snake.pop()

}

}

function drawSnake(){

snake.forEach((part,i)=>{

ctx.fillStyle=i===0?"#00ff88":"#00cc66"

ctx.beginPath()
ctx.arc(
part.x*grid + grid/2,
part.y*grid + grid/2,
grid/2-2,
0,
Math.PI*2
)

ctx.fill()

})

}

function drawFood(){

ctx.fillStyle="red"

ctx.beginPath()
ctx.arc(
food.x*grid + grid/2,
food.y*grid + grid/2,
grid/2-3,
0,
Math.PI*2
)

ctx.fill()

}

function checkCollision(){

let head = snake[0]

if(head.x<0 || head.y<0 || head.x>=tileCount || head.y>=tileCount){
gameOver()
}

for(let i=1;i<snake.length;i++){

if(head.x===snake[i].x && head.y===snake[i].y){
gameOver()
}

}

}

function updateScore(){

document.getElementById("score").innerText=score

let newLevel = Math.floor(score/5)+1

if(newLevel>level){

level=newLevel

speed=Math.max(60,120-(level*5))

document.getElementById("level").innerText=level

restartLoop()

}

}

function restartLoop(){

clearInterval(gameLoop)

gameLoop=setInterval(drawGame,speed)

}

function gameOver(){

clearInterval(gameLoop)

document.getElementById("gameOver").style.display="block"

}

function restartGame(){

snake=[{x:15,y:15}]
dx=1
dy=0

score=0
level=1
speed=120

food=randomFood()

document.getElementById("score").innerText=0
document.getElementById("level").innerText=1
document.getElementById("gameOver").style.display="none"

restartLoop()

}

function pauseGame(){

clearInterval(gameLoop)

}

restartLoop()