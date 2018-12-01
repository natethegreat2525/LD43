const PLAYER_SIZE = 32;

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    render() {
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(this.x, this.y, PLAYER_SIZE, PLAYER_SIZE);
    }

    update() {
        if (leftKey.isDown || aKey.isDown) { 
            this.x--;
        }
        else if (rightKey.isDown || dKey.isDown) {
            this.x++;
        }
    }
}