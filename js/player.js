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
        console.log(this.y, this.vy);
        ctx.fillRect(this.x, this.y, PLAYER_WIDTH, PLAYER_HEIGHT);
    }

    update() {
        if (leftKey.isDown || aKey.isDown) { 
            this.vx = -2;
        }
        else if (rightKey.isDown || dKey.isDown) {
            this.vy = 2;
        }
    }
}