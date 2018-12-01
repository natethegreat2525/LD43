
const GRAVITY = .1;
class Physics {
    constructor(world) {
        this.world = world;
        this.entities = [];
    }

    addEntity(entity) {
        this.entities.push(entity);
    }

    update(dt) {
        for (idx in this.entities) {
            let ent = this.entities[idx];

            ent.grounded = false;
            
            lmx = Math.floor(ent.x / BLOCK_SIZE);
            lmy = Math.floor(ent.y / BLOCK_SIZE);

            hmx = Math.floor((ent.x + ent.w) / BLOCK_SIZE);
            hmy = Math.floor((ent.y + ent.h) / BLOCK_SIZE);

            let mdx = hmx - lmx;
            let mdy = hmy - lmy;

            for (let a = 0; a <= mdx; a++) {
                for (let b = 0; b <= mdy; b++) {
                    let i = lmx + (ent.vx > 0 ? a : mdx - a);
                    let j = lmy + (ent.vy > 0 ? b : mdy - b);
                    if (this.world.map[i][j] !== ' ') {
                        overlap = getRectOverlap(ent.x, ent.y, ent.w, ent.h, i * BLOCK_SIZE, j * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                        if (!overlap) {
                            continue;
                        }

                        if (ent.handleMapCollision) {
                            if (ent.handleMapCollision(this.world.map[i][j], overlap[0], overlap[1]) === false) {
                                ent.x += overlap[0];
                                ent.y += overlap[1];
                                if (overlap[1] < 0) {
                                    ent.vy = Math.min(0, ent.vy);
                                    ent.grounded = true;
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
                            ent.x += overlap[0];
                            ent.y += overlap[1];
                        }
                    }
                }
            }
        }

        //Update physics positions
        for (idx in this.entities) {
            let ent = this.entities[idx];

            ent.x += ent.vx * dt;
            ent.y += ent.vy * dt;
            ent.vy += GRAVITY * dt;
        }
    }
}

function getRectOverlap(x1, y1, w1, h1, x2, y2, w2, h2) {
    let btwn = (pos, st, wid) => (pos > st && pos < st + wid);
    let x1b = btwn(x1, x2, w2);
    let x2b = btwn(x2, x1, w1);
    let y1b = btwn(y1, y2, h2);
    let y2b = btwn(y2, y1, w1);

    if (!((x1b || x2b) && (y1b || y2b))) {
        return null;
    }

    let minOvlp = (a1, s1, a2, s2) => Math.min(a2 + s2 - a1, a1 + s1 - a2);
    xovlp = minOvlp(x1, w1, x2, w2);
    yovlp = minOvlp(y1, h1, y2, h2);
    if (xovlp < yovlp) {
        yovlp = 0;
    } else {
        xovlp = 0;
    }
    if (x1+w1/2 < x2+w2/2) {
        xovlp = -xovlp;
    }
    if (y1+h1/2 < y2+h2/2) {
        yovlp = -yovlp
    }

    return [xovlp, yovlp];
}