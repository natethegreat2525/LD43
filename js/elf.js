const ELF_WIDTH = 16;
const ELF_HEIGHT = 40;

const NEUTRAL_MODE = "neutral";
const FOLLOW_MODE = "follow";
const FLEE_MODE = "flee";
const REINDEER_MODE = "reindeer";
const PUSH_RIGHT_MODE = "push_right";
const PUSH_LEFT_MODE = "push_left";

class Elf {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.h = h || ELF_HEIGHT;
        this.w = w || ELF_WIDTH;
        this.drawH = h;
        this.drawW = w;
        this.fr = 0;
        this.dir = FRONT;
        this.alive = true;
        this.mode = NEUTRAL_MODE;
        this.pushTimer = 0;
    }

    render() {
        if (this.alive) {
            if (this.sayHi) {
                drawSayHi(this.x, this.y);
            }
            drawElf(this.x, this.y, this.vx, this.vy, this.drawW, this.drawH, this.fr, this.dir, this.alive, this.mode, this.pushTimer);
        } else {
            ctx.save();
            ctx.translate(this.x+this.drawH, this.y);
            ctx.rotate(Math.PI/2);
            drawElf(0, 0, this.vx, this.vy, this.drawW, this.drawH, this.fr, this.dir, this.alive, this.mode, this.pushTimer);
            ctx.restore();
        }
    }

    findSanta() {
      for (let i = 0; i < world.entities.length; i++) {
        if (world.entities[i] instanceof Player) {
          return world.entities[i];
        }
      }
      return null;
    }

    mustJumpLeft() {
      let mx = Math.floor((this.x + this.w/2) / BLOCK_WIDTH);
      let my = Math.floor((this.y + this.h/2) / BLOCK_WIDTH);
      let leftBlock = world.getValue(mx-1, my);
      let leftUpBlock = world.getValue(mx-1, my-1);
      return (leftUpBlock === ' ' && (leftBlock === 'g' || leftBlock === 'd'));
    }
    mustJumpRight() {
      let mx = Math.floor((this.x + this.w/2) / BLOCK_WIDTH);
      let my = Math.floor((this.y + this.h/2) / BLOCK_WIDTH);
      let rightBlock = world.getValue(mx+1, my);
      let rightUpBlock = world.getValue(mx+1, my-1);
      return (rightUpBlock === ' ' && (rightBlock === 'g' || rightBlock === 'd'));
    }

    moveLeftSafe() {
      if (this.mustJumpLeft()) {
        return true;
      }
      let mx = Math.floor((this.x + this.w/2) / BLOCK_WIDTH);
      let my = Math.floor((this.y + this.h/2) / BLOCK_WIDTH);
      let leftBlock = world.getValue(mx-1, my);
      let leftDownBlock = world.getValue(mx-1, my+1);
      let leftDown2Block = world.getValue(mx-1, my+2);
      return (leftBlock === ' ' && ((leftDownBlock === 'g' || leftDownBlock === 'd') || (leftDownBlock === ' ' && (leftDown2Block === 'g' || leftDown2Block === 'd'))));
    }

    moveRightSafe() {
      if (this.mustJumpRight()) {
        return true;
      }
      let mx = Math.floor((this.x + this.w/2) / BLOCK_WIDTH);
      let my = Math.floor((this.y + this.h/2) / BLOCK_WIDTH);
      let rightBlock = world.getValue(mx+1, my);
      let rightDownBlock = world.getValue(mx+1, my+1);
      let rightDown2Block = world.getValue(mx+1, my+2);
      return (rightBlock === ' ' && ((rightDownBlock === 'g' || rightDownBlock === 'd') || (rightDownBlock === ' ' && (rightDown2Block === 'g' || rightDown2Block === 'd'))));
    }

  	update(dt) {
        let santa = this.findSanta();
        if (santa) {
            let dx = santa.x + santa.w/2 - this.x - this.w/2;
            let dy = santa.y + santa.h/2 - this.y - this.h/2;
            if (Math.sqrt(dx*dx + dy*dy) < 70 && this.mode === NEUTRAL_MODE) {
                this.sayHi = true;
            } else {
                this.sayHi = false;
            }
        }
        this.dir = FRONT;

        if (this.alive) {
            if (!this.moveLeft && !this.moveRight) {
                switch (this.mode) {
                  case FLEE_MODE: {
                      let dx = santa.x + santa.w/2 - this.x - this.w/2;
                      let dy = santa.y + santa.h/2 - this.y - this.h/2;
                      if (Math.sqrt(dx * dx + dy * dy) > 300) {
                        this.mode = NEUTRAL_MODE;
                      } else {
                        if (dx > 0) {
                          if (this.moveLeftSafe()) {
                            this.moveLeft = true;
                          }
                        } else {
                          if (this.moveRightSafe()) {
                            this.moveRight = true;
                          }
                        }
                      }
                      }
                      break;
                  case FOLLOW_MODE: {
                      let dx = santa.x + santa.w/2 - this.x - this.w/2;
                      let dy = santa.y + santa.h/2 - this.y - this.h/2;
                      if (Math.sqrt(dx * dx + dy * dy) > 300) {
                        this.mode = NEUTRAL_MODE;
                      } else {
                        if (Math.abs(dx) > 40) {
                            if (dx < 0) {
                                    this.moveLeft = true;
                            } else {
                                    this.moveRight = true;
                            }
                        }
                      }
                      }
                      break;
                  case REINDEER_MODE: {
                        let dx = santa.x - this.x;
                    
                        if (dx > 0) {
                            if (!this.moveLeftSafe()) {
                                this.jump = true;
                            }
                            this.moveLeft = true;
                        } else {
                            if (!this.moveRightSafe()) {
                                this.jump = true;
                            }
                            this.moveRight = true;
                        }
                        }
                        break;
                }
            }
            
            if (this.mustJumpLeft() && this.moveLeft) {
              this.jump = true;
            }
            if (this.mustJumpRight() && this.moveRight) {
              this.jump = true;
            }
            if (this.jump && this.grounded) {
              this.vy = -300;
            }
            if (this.moveLeft) {
                this.vx -= 20;
                this.dir = LEFT;
            } else if (this.moveRight) {
                this.vx += 20;
                this.dir = RIGHT;
            } else {
                this.vx = this.vx * .7;
            }
            this.vx = Math.min(200, Math.max(-200, this.vx));
        } else {
            this.vx = this.vx * .7;
            if (this.lockedX && this.lockedY) {
              this.x = this.lockedX;
              this.y = this.lockedY;
              this.vy = 0;
              this.vx = 0;
            }
        }

        this.moveLeft = false;
        this.moveRight = false;
        this.jump = false;
        this.fr++;
    }

    die() {
        this.alive = false;
        this.w = this.drawH;
        this.h = this.drawW;
        this.y += this.w - this.h;
    }

    // Place all trigger cases before case for ground (g)
    handleMapCollision(blockId, OverlapX, OverlapY, i, j) {
        switch (blockId) {
            case 's':
                if (j * BLOCK_WIDTH + 15 < this.y + this.h) {
                  if (this.alive || !this.static) {
                    if (this.alive) {
                        this.die();
                    }
                    this.static = true;
                    this.lockedX = this.x;
                    this.lockedY = Math.max(this.y, j * BLOCK_WIDTH + 23 - this.h);
                  }
                }
                return false;
            default:
                return true;
        }
    }

    handleEntityCollision(ent) {
        if (ent instanceof Player && this.alive) {
            return false;
        }
        if (ent instanceof Elf && this.alive && ent.alive) {
            return false;
        }

        return true;
    }
}
