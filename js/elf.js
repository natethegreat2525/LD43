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
        if (!h) {
            this.h = ELF_HEIGHT;
        } else {
            if (h < 40) {
                this.h = 40;
            } else {
                this.h = h;
            }
        }
        if (!w) {
            this.w = ELF_WIDTH;
        } else {
            if (w < 8) {
                this.w = 8;
            } else {
                this.w = w;
            }
        }
        this.fr = 0;
        this.dir = FRONT;
        this.alive = true;
        this.mode = FLEE_MODE;
        this.pushTimer = 0;
    }

    render(x, y, dir, fr) {

        //Feet
        let lFoot = null;
        let rFoot = null;

        //Left or Right
        if (this.dir == LEFT || this.dir == RIGHT) {
            let fcx = this.x+(this.w/2);
            let fcy = this.y+this.h-40+38;
            let ox = Math.sin((this.fr + 4) / 5) * 6;
            ctx.fillStyle = "#000000";
            ctx.fillRect(fcx + ox, fcy, 3, 3);
            ctx.fillRect(fcx - ox, fcy, 3, 3);
        } else { //Forward
            let fcxl = this.x+(this.w/2 - this.w/6)-2;
            let fcxr = this.x+(this.w/2 + this.w/6)-2;
            let fcy = this.y+this.h-40+37;
            ctx.fillStyle = "#000000";
            ctx.fillRect(fcxl, fcy, 4, 4);
            ctx.fillRect(fcxr, fcy, 4, 4);
        }

        //Body
        ctx.fillStyle = "#137703";
        ctx.fillRect(this.x, this.y+19, this.w, this.h-40+16); //outline
        ctx.fillStyle = "#02A42C";
        ctx.fillRect(this.x+1, this.y+20, this.w-2, this.h-40+14); //body

        //Vertical sash
        ctx.fillStyle = "#ff0000";
        if (this.dir == LEFT) {
            ctx.fillRect(this.x+((this.w-2)/4), this.y+19, 4, this.h-40+16);
        }

        if (this.dir == RIGHT) {
            ctx.fillRect(this.x+((this.w-2)*3/4), this.y+19, 4, this.h-40+16);
        }

        if (this.dir == FRONT) {
            ctx.fillRect(this.x+((this.w-2)/2), this.y+19, 4, this.h-40+16);
        }

        ctx.fillStyle = "#ff0000";
        ctx.fillRect(this.x+0, this.y+this.h-40+33, this.w, 3);  //horizontal sash

        //Face
        ctx.fillStyle = "#FEE3B7";
        ctx.fillRect(this.x+(this.w/2 - 11/2), this.y+8, 11, 11); //face

        //Ears
        if (this.dir == FRONT) {

            //Left Ear
            ctx.beginPath();
            ctx.moveTo(this.x+(this.w/2 - 11/2)-1, this.y+12);
            ctx.lineTo(this.x+(this.w/2 - 11/2)-1, this.y+14);
            ctx.lineTo(this.x+(this.w/2 - 11/2)-3, this.y+10);
            ctx.closePath();

            ctx.fillStyle = "#FCD179";
            ctx.fill(); //ear

            //Right Ear
            ctx.beginPath();
            ctx.moveTo(this.x+(this.w/2 - 11/2)+12, this.y+12);
            ctx.lineTo(this.x+(this.w/2 - 11/2)+12, this.y+14);
            ctx.lineTo(this.x+(this.w/2 - 11/2)+14, this.y+10);
            ctx.closePath();

            ctx.fillStyle = "#FCD179";
            ctx.fill(); //ear
        }

        //Hat
        ctx.beginPath();
        ctx.moveTo(this.x+(this.w/2 - 11/2)+7, this.y+1);
        ctx.lineTo(this.x+(this.w/2 - 11/2), this.y+7);
        ctx.lineTo(this.x+(this.w/2 - 11/2)+11, this.y+7);
        ctx.closePath(); //hat shape

        ctx.lineWidth = 1;
        ctx.strokeStyle = '#000000';
        ctx.stroke(); //hat outline

        ctx.fillStyle = "#02A42C";
        ctx.fill(); //hat triangle

        ctx.fillStyle = "#ff0000";
        ctx.fillRect(this.x+(this.w/2 - 3/2)+2, this.y+0, 3, 3); //hat pompom

        ctx.fillStyle = "#000000";
        ctx.fillRect(this.x+(this.w/2 - 13/2), this.y+7, 13, 2);  //hat stripe outline

        ctx.fillStyle = "#ff0000";
        ctx.fillRect(this.x+(this.w/2 - 13/2), this.y+7, 13, 2);  //hat stripe

        if (this.dir == LEFT) {
            //Eyes
            ctx.fillStyle = "#000000";
            ctx.fillRect(this.x+(this.w/2 - 4), this.y+12, 2, 2); //eye
        }

        if (this.dir == RIGHT) {
                //Eyes

            ctx.fillStyle = "#000000";
            ctx.fillRect(this.x+(this.w/2 + 2), this.y+12, 2, 2); //eye
        }

        if (this.dir == FRONT) {
                //Eyes

            ctx.fillStyle = "#000000";
            ctx.fillRect(this.x+(this.w/2 - 4), this.y+12, 2, 2); //left eye
            ctx.fillRect(this.x+(this.w/2 + 2), this.y+12, 2, 2); //right eye
        }

        return;
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
        this.dir = FRONT;

        if (this.alive) {
            if (!this.moveLeft && !this.moveRight) {
                switch (this.mode) {
                  case FLEE_MODE: {
                      let santa = this.findSanta();
                      let dx = santa.x - this.x;
                      let dy = santa.y - this.y;
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
                      let santa = this.findSanta();
                      let dx = santa.x - this.x;
                      let dy = santa.y - this.y;
                      if (Math.sqrt(dx * dx + dy * dy) > 300) {
                        this.mode = NEUTRAL_MODE;
                      } else {
                        if (dx < 0) {
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
                  case REINDEER_MODE:

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

    // Place all trigger cases before case for ground (g)
    handleMapCollision(blockId, OverlapX, OverlapY, i, j) {
        switch (blockId) {
            case 's':
                if (j * BLOCK_WIDTH + 15 < this.y + this.h) {
                  if (this.alive) {
                    this.alive = false;
                    this.lockedX = this.x;
                    this.lockedY = this.y;
                  }
                }
                return false;
            default:
                return true;
        }
    }

    handleEntityCollision(ent) {
        if (ent.y + ent.h < this.y + 10) {
            let mx = Math.floor((ent.x + ent.w/2) / BLOCK_WIDTH);
            let my = Math.floor((this.y + this.h/2) / BLOCK_WIDTH);

            let rightDist = 5;
            let leftDist = 5;
            for (let i = 0; i < 3; i++) {
                let below = world.getValue(mx+i, my+1) === ' ';
                if (world.getValue(mx+i, my) !== ' ' || below === 's') {
                    rightDist = i;
                    break;
                }
            }
            for (let i = 0; i < 3; i++) {
                if (world.getValue(mx-i, my) !== ' ') {
                    leftDist = i;
                    break;
                }
            }
            //player trying to jump on top
            if (leftDist === rightDist) {
                if (ent.x < this.x) {
                    this.moveRight = true;
                } else {
                    this.moveLeft = true;
                }
            } else if (leftDist > rightDist) {
                this.moveLeft = true;
            } else {
                this.moveRight = true;
            }
        }
    }
}
