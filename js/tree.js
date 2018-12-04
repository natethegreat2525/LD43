
class Tree {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.lx = x;
        this.ly = y;
        this.vx = 0;
        this.vy = 0;
        this.w = BLOCK_SIZE;
        this.h = BLOCK_SIZE;
        this.static = true;
    }

    render(pass) {
        if (pass === 1) {
            return;
        }

        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.fillStyle = '#009900';
        ctx.beginPath()
        ctx.moveTo(0, BLOCK_SIZE - 7);
        ctx.lineTo(BLOCK_SIZE, BLOCK_SIZE - 7);
        ctx.lineTo(BLOCK_SIZE / 2, -BLOCK_SIZE);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = 'rgba(60, 30, 10, 1)';
        ctx.fillRect(BLOCK_WIDTH / 2 - 3, BLOCK_WIDTH - 7, 6, 7);
        ctx.restore();
    }

    update(dt) {
        this.x = this.lx;
        this.y = this.ly;
        this.vx = 0;
        this.vy = 0;
    }

    handleMapCollision(val) {
        return false;
    }
}
