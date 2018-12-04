const BLOCK_WIDTH = 32;

let present = false;

class World {
  constructor(map) {
    this.entities = [];
    this.physics = new Physics(this);
    this.parseMap(map)

  }

  getValue(x, y) {
    if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
      return ' ';
    }
    return this.map[y][x];
  }

  parseMap(map) {
    let parsed = map.split('\n').map(row => row.split(''));
    this.width = parsed[0].length;
    this.height = parsed.length;
    this.map = parsed;

    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        if (this.map[j][i] === 'e') {
          let elf = new Elf(i * BLOCK_WIDTH, j * BLOCK_WIDTH, 20, 40); //minWidth: 8 minHeight: 40
          this.entities.push(elf);
          this.physics.addEntity(elf);
          this.map[j][i] = ' ';
        }
        if (this.map[j][i] === 'f') {
          let elf = new Elf(i * BLOCK_WIDTH, j * BLOCK_WIDTH, 64, 40); //minWidth: 8 minHeight: 40
          this.entities.push(elf);
          this.physics.addEntity(elf);
          this.map[j][i] = ' ';
        }
        if (this.map[j][i] === 't') {
          let elf = new Elf(i * BLOCK_WIDTH, j * BLOCK_WIDTH - 40, 16, 80); //minWidth: 8 minHeight: 40
          this.entities.push(elf);
          this.physics.addEntity(elf);
          this.map[j][i] = ' ';
        }
        if (this.map[j][i] === '@') {
          let player = new Player(i * BLOCK_WIDTH, j * BLOCK_WIDTH);
          this.entities.push(player);
          this.physics.addEntity(player);
          this.map[j][i] = ' ';
        }
        if (this.map[j][i] === 'b') {
          let block = new Block(i * BLOCK_WIDTH, j * BLOCK_WIDTH);
          this.entities.push(block);
          this.physics.addEntity(block);
          this.map[j][i] = ' ';
        }
      }
    }
  }

  update(dt) {
    for (let idx in this.entities) {
      this.entities[idx].update(dt);
    }
    this.physics.update(dt);
  }

  render() {
    this.renderMap(0);
    for (let idx in this.entities) {
      this.entities[idx].render(0);
    }
    this.renderMap(1);
    for (let idx in this.entities) {
      this.entities[idx].render(1);
    }
  }

  renderMap(pass) {
    for (let i = this.width - 1; i >= 0; i--) {
      for (let j = this.height - 1; j >= 0; j--) {
        ctx.save();
        ctx.translate(BLOCK_WIDTH * i, BLOCK_WIDTH * j);
        switch (this.map[j][i]) {
          case 'g':
            drawGround(pass);
            break;
          case 'd':
            drawDirt(pass);
            break;
          case 's':
            drawSpikes(pass);
            break;
          case 'k':
            drawKid(pass);
            break;
        }
        ctx.restore();
      }
    }
  }

}



function drawKid(pass) {
    if (pass > 0) return;
    //Feet
    let fcxl = 2;
    let fcxr = 7;
    let fcy = 29;
    ctx.fillStyle = "#000000";
    ctx.fillRect(fcxl, fcy, 3, 3);
    ctx.fillRect(fcxr, fcy, 3, 3);
    //Body
    ctx.fillStyle = "#0551AA";
    ctx.fillRect(0, 15, 12, 14); //outline
    ctx.fillStyle = "#2183F7";
    ctx.fillRect(1, 16, 10, 12); //body
    //Face
    ctx.fillStyle = "#FEE3B7";
    ctx.fillRect(2, 6, 9, 9); //face
    //Eyes
    ctx.fillStyle = "#000000";
    ctx.fillRect(3, 10, 2, 2); //left eye
    ctx.fillRect(7, 10, 2, 2); //right eye
    
    if (present) {
        ctx.fillStyle = "#1018f2";
        ctx.fillRect(16, 25, 8, 8)   
        
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(19, 25, 2, 8);
        
        ctx.beginPath();
        ctx.moveTo(19, 25);
        ctx.lineTo(15, 24);
        ctx.lineTo(17, 22);
        ctx.lineTo(19, 25);
        ctx.lineTo(23, 24);
        ctx.lineTo(21, 22);
        ctx.closePath();
        ctx.strokeStyle = "#ff0000";
        ctx.stroke(); 
    }
}

function drawGround(pass) {
  let sp = 5;
  if (pass === 1) {
    ctx.fillStyle = 'rgba(220, 220, 240, 1)';
    ctx.fillRect(sp, sp, BLOCK_WIDTH, BLOCK_WIDTH);
  } else if (pass === 0) {
    ctx.fillStyle = 'rgba(200, 200, 220, 1)';
    ctx.beginPath();
    ctx.moveTo(-sp, -sp);
    ctx.lineTo(sp, sp);
    ctx.lineTo(sp, sp + BLOCK_WIDTH);
    ctx.lineTo(-sp, -sp + BLOCK_WIDTH);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = 'rgba(255, 255, 255, 1)';
    ctx.beginPath();
    ctx.moveTo(-sp-1, -sp);
    ctx.lineTo(BLOCK_WIDTH - sp, -sp);
    ctx.lineTo(BLOCK_WIDTH + sp, sp);
    ctx.lineTo(sp-1, sp);
    ctx.closePath();
    ctx.fill();
  }
}

function drawDirt(pass) {
  let sp = 5;
  if (pass === 1) {
    ctx.fillStyle = 'rgba(59, 25, 8, 1)';
    ctx.fillRect(sp, sp, BLOCK_WIDTH, BLOCK_WIDTH);
  } else if (pass === 0) {
    ctx.fillStyle = 'rgba(35, 15, 5, 1)';
    ctx.beginPath();
    ctx.moveTo(-sp, -sp);
    ctx.lineTo(sp, sp);
    ctx.lineTo(sp, sp + BLOCK_WIDTH);
    ctx.lineTo(-sp, -sp + BLOCK_WIDTH);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = 'rgba(69, 35, 10, 1)';
    ctx.beginPath();
    ctx.moveTo(-sp-1, -sp);
    ctx.lineTo(BLOCK_WIDTH - sp, -sp);
    ctx.lineTo(BLOCK_WIDTH + sp, sp);
    ctx.lineTo(sp-1, sp);
    ctx.closePath();
    ctx.fill();
  }
}


function drawSpikes(pass) {
  if (pass > 0) return;
  ctx.fillStyle = 'rgb(200, 200, 200)';
  ctx.strokeStyle = 'rgb(100, 100, 100)'
  sw = BLOCK_WIDTH / 6;
  ctx.beginPath();
  ctx.moveTo(sw, sw*2);
  ctx.lineTo(0, BLOCK_WIDTH);
  ctx.lineTo(sw*2, BLOCK_WIDTH);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(sw*3, sw*2);
  ctx.lineTo(sw*2, BLOCK_WIDTH);
  ctx.lineTo(sw*4, BLOCK_WIDTH);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(sw*5, sw*2);
  ctx.lineTo(sw*4, BLOCK_WIDTH);
  ctx.lineTo(sw*6, BLOCK_WIDTH);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}
