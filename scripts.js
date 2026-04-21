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

function checkBoundary(x, y) {
    if (x >= canvas.width) return [canvas.width - 4, y]
    if (x < 0) return [0, y]

    if (y >= canvas.height) return [x, canvas.width - 4]
    if (y < 0) return [x, 0]
    return [x,y];
}
player.draw()
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
    requestAnimationFrame(gameLoop);
}

gameLoop();
