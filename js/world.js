const BLOCK_WIDTH = 32;

class World {
  constructor(map) {
    let parsed = map.split('\n').map(row => row.split(''));
    this.width = parsed[0].length;
    this.height = parsed.length;
    this.map = parsed;
  }

  render() {
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        ctx.save();
        ctx.translate(BLOCK_WIDTH * i, BLOCK_WIDTH * j);
        switch (this.map[j][i]) {
          case 'g':
            drawGround();
            break;
          case 'd':
            drawDirt();
            break;
        }
        ctx.restore();
      }
    }
  }

}

function drawGround() {
  ctx.fillStyle = 'rgba(240, 240, 240, 1)';
  ctx.fillRect(0, 0, BLOCK_WIDTH, BLOCK_WIDTH)
}

function drawDirt() {
  ctx.fillStyle = 'rgba(69, 35, 10, 1)';
  ctx.fillRect(0, 0, BLOCK_WIDTH, BLOCK_WIDTH)
}
