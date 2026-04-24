const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const map = new Map();
for (i=0; i<canvas.width; i++) {
    for (j=0; j<canvas.height; j++) {
        map.set(`${i}${j}`, 0)
    }
}

function createBlockade(x,y,w,h){
    for (i=x; i<=x+w; i++) {
        for (j=y; j<=y+h; j++) {
            map.set(`${i}${j}`, true);
        }
    }
    ctx.fillStyle = "rgb(167, 175, 234)";
    ctx.fillRect(x,y,w,h);
    
}

function hasBlockade(x,y){
    return map.get(`${x}${y}`)
}

const player = {
    x: 50,
    y: 50,
    height:4,
    width:4,
    speed:1,
    draw() {
        ctx.fillRect(this.x,this.y,this.height,this.width);
    }
}

const enemy = {
    x:280,
    y:280,
    speed: 0,
    draw() {
        ctx.beginPath();
        ctx.arc(this.x,this.y,2,0,Math.PI*2,false);
        ctx.stroke()
    }
}

function checkBoundary(x, y) {
    if (x >= canvas.width) return [canvas.width + 1 - player.width, y]
    if (x < 0) return [0, y]

    if (y >= canvas.height) return [x, canvas.width + 1 - player.height]
    if (y < 0) return [x, 0]
    return [x,y];
}

function drawCloser() {
    if (player.x > enemy.x) {
        enemy.x += 1
    }
    if (player.y > enemy.y) {
        enemy.y += 1
    }
    if (player.x < enemy.x) {
        enemy.x -= 1
    }
    if (player.y < enemy.y) {
        enemy.y -= 1
    }
}
player.draw();
enemy.draw();
createBlockade(150,172,10,10);

const keys = {};

document.addEventListener("keydown", (e) => keys[e.key] = true);
document.addEventListener("keyup", (e) => keys[e.key] = false);

function gameLoop() {
    ctx.reset();

    if (keys["w"]){
        canMove = true
        for(i=player.x; i<=player.x+player.width; i++){
            if (hasBlockade(i, player.y-1)) {
                canMove = false
            }
        }
        if (canMove) {
            player.y -= player.speed;
        }
    }
        
    if (keys["a"]){
        canMove = true
        for(i=player.y; i<=player.y+player.height; i++){
            if (hasBlockade(player.x-1, i)) {
                canMove = false
            }
        }
        if (canMove) {
            player.x -= player.speed;
        }
    }


    if (keys["s"]){
        canMove = true
        for(i=player.x; i<=player.x+player.width; i++){
            if (hasBlockade(i, player.y+player.height+1)) {
                canMove = false
            }
        }
        if (canMove) {
            player.y += player.speed;
        }
    }

    if (keys["d"]){
        canMove = true
        for(i=player.y; i<=player.y+player.height; i++){
            if (hasBlockade(player.x+player.width+1, i)) {
                canMove = false
            }
        }
        if (canMove) {
            player.x += player.speed;
        }
    }
    player.x = checkBoundary(player.x,player.y)[0]
    player.y = checkBoundary(player.x,player.y)[1]
    createBlockade(150,172,10,10);
    player.draw();
    drawCloser();
    enemy.draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
