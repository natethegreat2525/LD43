
const GRAVITY = 1000;
class Physics {
    constructor(world) {
        this.world = world;
        this.entities = [];
    }

    addEntity(entity) {
        this.entities.push(entity);
    }

    update(dt) {
        //Update physics positions
        for (let idx in this.entities) {
            let ent = this.entities[idx];

            ent.x += ent.vx * dt;
            ent.y += ent.vy * dt;
            if (!ent.grounded) {
                ent.vy += GRAVITY * dt;
            }
        }
        for (let idx in this.entities) {
            let ent = this.entities[idx];

            ent.grounded = false;
            
            let lmx = Math.floor(ent.x / BLOCK_WIDTH);
            let lmy = Math.floor(ent.y / BLOCK_WIDTH);

            let hmx = Math.floor((ent.x + ent.w) / BLOCK_WIDTH);
            let hmy = Math.floor((ent.y + ent.h) / BLOCK_WIDTH);

            let mdx = hmx - lmx;
            let mdy = hmy - lmy;

            for (let a = 0; a <= mdx; a++) {
                for (let b = 0; b <= mdy; b++) {
                    let i = lmx + (ent.vx > 0 ? a : mdx - a);
                    let j = lmy + (ent.vy > 0 ? b : mdy - b);
                    if (this.world.map[j][i] !== ' ') {
                        let overlap = getRectOverlap(ent.x, ent.y, ent.w, ent.h, i * BLOCK_WIDTH, j * BLOCK_WIDTH, BLOCK_WIDTH, BLOCK_WIDTH);
                        if (!overlap) {
                            continue;
                        }

                        if (ent.handleMapCollision) {
                            if (ent.handleMapCollision(this.world.map[j][i], overlap[0], overlap[1], i, j) === true) {
                                if (Math.abs(overlap[0]) > .1) {
                                    ent.x += overlap[0] * .9;
                                }
                                if (Math.abs(overlap[1]) > .1) {
                                    ent.y += overlap[1] * .9;
                                }
                                if (overlap[1] < 0) {
                                    if (ent.vy > 0) {
                                        ent.grounded = true;
                                        ent.vy = 0;
                                    }
                                }
                                if (overlap[1] > 0) {
                                    ent.vy = Math.max(0, ent.vy);
                                }
    
                                if (overlap[0] < 0) {
                                    ent.vx = Math.min(0, ent.vx);
                                }
                                if (overlap[0] > 0) {
                                    ent.vx = Math.max(0, ent.vx);
                                }
                            }
                        } else {
                            if (Math.abs(overlap[0]) > .1) {
                                ent.x += overlap[0] * .9;
                            }
                            if (Math.abs(overlap[1]) > .1) {
                                ent.y += overlap[1] * .9;
                            }
                            if (overlap[1] < 0) {
                                if (ent.vy > 0) {
                                    ent.grounded = true;
                                    ent.vy = 0;
                                }
                            }
                            if (overlap[1] > 0) {
                                ent.vy = Math.max(0, ent.vy);
                            }

                            if (overlap[0] < 0) {
                                ent.vx = Math.min(0, ent.vx);
                            }
                            if (overlap[0] > 0) {
                                ent.vx = Math.max(0, ent.vx);
                            }
                        }
                    }
                }
            }
        }
    }
}

function getRectOverlap(x1, y1, w1, h1, x2, y2, w2, h2) {
    let mx1 = x1 + w1/2;
    let my1 = y1 + h1/2;

    let mx2 = x2 + w2/2;
    let my2 = y2 + h2/2;

    let dx = mx1 - mx2;
    let dy = my1 - my2;
    if (Math.abs(dx) - (w1 + w2) / 2 > Math.abs(dy) - (h1 + h2) / 2) {
        if (dx > 0) {
            dx -= (w1 + w2) / 2;
        } else {
            dx += (w1 + w2) / 2;
        }
        return [-dx, 0];
    }
    if (dy > 0) {
        dy -= (h1 + h2) / 2;
    } else {
        dy += (h1 + h2) / 2;
    }
    return [0, -dy];
}