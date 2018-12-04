const BLOCK_SIZE = 32;

class Block {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.w = BLOCK_SIZE;
        this.h = BLOCK_SIZE;
        this.friction = .8;
    }

    render(pass) {
        if (pass === 1) {
            return;
        }
        ctx.save();
        ctx.translate(this.x,this.y);
        let sp = 1;
        ctx.fillStyle = 'rgba(59, 59, 59, 1)';
        ctx.fillRect(sp, sp, BLOCK_SIZE, BLOCK_SIZE);
        ctx.fillStyle = 'rgba(49, 49, 49, 1)';
        ctx.beginPath();
        ctx.moveTo(-sp, -sp);
        ctx.lineTo(sp, sp);
        ctx.lineTo(sp, sp + BLOCK_SIZE);
        ctx.lineTo(-sp, -sp + BLOCK_SIZE);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = 'rgba(69, 69, 69, 1)';
        ctx.beginPath();
        ctx.moveTo(-sp-1, -sp);
        ctx.lineTo(BLOCK_SIZE - sp, -sp);
        ctx.lineTo(BLOCK_SIZE + sp, sp);
        ctx.lineTo(sp-1, sp);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    update(dt) {
        this.vx *= this.friction;
    }

    handleMapCollision(val) {
        if (val === 's') {
            return false;
        }
        return true;
    }
}
