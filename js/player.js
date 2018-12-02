const PLAYER_WIDTH = 20;
const PLAYER_HEIGHT = 20;

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.w = PLAYER_WIDTH;
        this.h = PLAYER_HEIGHT;
        this.hitSpikes = 0;
        this.enteredTrigger = false;
        this.inTrigger = false;
        this.exitedTrigger = true;
    }

    render() {
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(this.x, this.y, PLAYER_WIDTH, PLAYER_HEIGHT);
    }

    update() {
        if (this.vx > -200 && leftKey.isDown || aKey.isDown) { 
            if (this.vx > 0) this.vs = 0;
            this.vx -= 20;
        }
        else if (this.vx < 200 && rightKey.isDown || dKey.isDown) {
            if (this.vx < 0) this.vs = 0;
            this.vx += 20;
        } else {
            this.vx *= .7;
        }

        if ((upKey.isPressed || wKey.isPressed) && this.grounded) {
            this.vy = -300;
        }
    }

    // Place all trigger cases before case for ground (g)
    handleMapCollision(blockId, OverlapX, OverlapY) {
        this.enteredCollison = false;
        switch (blockId) {
            case 's':
                this.vx = -400;
                this.vy = -200;
                return false;
            default:
                return true;
        }
    }
}