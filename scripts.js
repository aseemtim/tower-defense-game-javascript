const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const player = {
    x: 50,
    y: 50,
    speed: 5,
    draw() {
        ctx.beginPath();
        ctx.moveTo(this.x,this.y);
        ctx.lineTo(this.x, this.y+4); 
        ctx.lineTo(this.x+4, this.y+4); // 4 is player size
        ctx.lineTo(this.x+4, this.y);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

const enemy = {
    x:280,
    y:280,
    speed: 2,
    draw() {
        ctx.beginPath();
        ctx.arc(this.x,this.y,2,0,Math.PI*2,false);
        ctx.stroke()
    }
}

function checkBoundary(x, y) {
    if (x >= canvas.width) return [canvas.width - 4, y]
    if (x < 0) return [0, y]

    if (y >= canvas.height) return [x, canvas.width - 4]
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
const keys = {};

document.addEventListener("keydown", (e) => keys[e.key] = true);
document.addEventListener("keyup", (e) => keys[e.key] = false);

function gameLoop() {
    ctx.reset();

    if (keys["w"]) player.y -= player.speed;
    if (keys["a"]) player.x -= player.speed;
    if (keys["s"]) player.y += player.speed;
    if (keys["d"]) player.x += player.speed;
    player.x = checkBoundary(player.x,player.y)[0]
    player.y = checkBoundary(player.x,player.y)[1]
    player.draw();
    drawCloser();
    enemy.draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
