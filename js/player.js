const LEFT = 0;
const RIGHT = 2;
const FRONT = 1;
const PLAYER_WIDTH = 20;
const PLAYER_HEIGHT = 47;

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.w = PLAYER_WIDTH;
        this.h = PLAYER_HEIGHT;
        this.atkFr = 0;
        this.fr = 0;
        this.dir = FRONT;
        this.attack = false;
    }

    render() {
        drawPlayer(this.x, this.y, this.vx, this.vy, this.w, this.h, this.atkFr, this.fr, this.dir, this.attack);
    }

    update(dt) {
        if (leftKey.isDown || aKey.isDown) {
            this.vx -= 20;
            this.dir = LEFT;
            this.fr++;
        } else if (rightKey.isDown || dKey.isDown) {
            this.vx += 20;
            this.dir = RIGHT;
            this.fr++;
        } else {
            this.vx *= .7;
            if ((downKey.isDown || sKey.isDown) && this.grounded) {
                this.dir = FRONT;
            }
            if (!leftKey.isDown && !rightKey.isDown) {
                this.fr = 0;
            }
        }
        this.vx = Math.max(-200, Math.min(200, this.vx));

        if ((upKey.isDown || wKey.isDown) && this.grounded) {
            this.vy = -300;
            this.dir = FRONT;
        }
    }
    
    attack() {
        this.attack = true;
    }

    handleEntityCollision(ent, ox, oy) {
        if (!ent.alive && oy < 0) {
            this.grounded = true;
        }
    }

    // Place all trigger cases before case for ground (g)
    handleMapCollision(blockId, OverlapX, OverlapY, i, j) {
        switch (blockId) {
            case 's':
                if (j * BLOCK_WIDTH + 15 < this.y + this.h) {
                    window.dispatchEvent(resetWorldEvent);
                }
                return false;
            case 'k':
                if (!this.finished) {
                    this.finished = true;
                    window.dispatchEvent(nextLevelEvent);
                }
                return true;
            default:
                return true;
        }
    }
}
