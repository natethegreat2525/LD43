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
        this.elvesInRange = [];
    }

    render() {
        if (this.dir == RIGHT) {
            if (this.attack) {
                this.atkFr++;
                if (this.atkFr >= 29) {
                    this.attack = false;
                    this.atkFr = 0;
                }
            }
        } else if (this.dir == LEFT) {
            if (this.attack) {
                this.atkFr++;
                if (this.atkFr >= 29) {
                    this.attack = false;
                    this.atkFr = 0;
                }
            }
        } else {
            if (this.attack) {
                this.atkFr++;
                if (this.atkFr >= 29) {
                    this.attack = false;
                    this.atkFr = 0;
                }
            }
        }
        drawPlayer(this.x, this.y, this.vx, this.vy, this.w, this.h, this.atkFr, this.fr, this.dir, this.attack);
        if (this.elvesInRange.length > 0) {
            drawOptions(this.x + this.w/2, this.y, ["(u) Grant the power of flight", "(i) Help me fix this toy", "(o) Boo!"]);
        }
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

        this.elvesInRange = [];
        for (let i = 0; i < world.entities.length; i++) {
            let ent = world.entities[i];
            if (ent instanceof Elf && ent.alive) {
                let dx = ent.x - this.x;
                let dy = ent.y - this.y;
                if (Math.sqrt(dx * dx + dy * dy) < 60 && ((dx > 0 && this.dir === RIGHT) || (dx < 0 && this.dir === LEFT))) {
                    this.elvesInRange.push(ent);
                }
            }
        }

        if (uKey.isDown) {
            for (let idx in this.elvesInRange) {
                let elf = this.elvesInRange[idx];
                if (elf.mode === NEUTRAL_MODE) {
                    elf.mode = REINDEER_MODE;
                }
            }
        }
        if (iKey.isDown) {
            for (let idx in this.elvesInRange) {
                let elf = this.elvesInRange[idx];
                if (elf.mode === NEUTRAL_MODE) {
                    elf.mode = FOLLOW_MODE;
                }
            }
        }
        if (oKey.isDown) {
            for (let idx in this.elvesInRange) {
                let elf = this.elvesInRange[idx];
                elf.mode = FLEE_MODE;
            }
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
