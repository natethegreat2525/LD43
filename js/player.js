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
    }

    render() {
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(this.x, this.y, PLAYER_WIDTH, PLAYER_HEIGHT);
    }

    update() {
        if (leftKey.isDown || aKey.isDown) { 
            this.vx = -200;
        }
        else if (rightKey.isDown || dKey.isDown) {
            this.vx = 200;
        } else {
            this.vx *= .7;
        }

        if ((upKey.isDown || wKey.isDown) && this.grounded) {
            this.vy = -300;
        }
    }
}