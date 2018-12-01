
class Flake {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.sway = Math.random() * Math.PI * 2;
  }

  render() {
    ctx.save();
    ctx.translate(this.x + Math.sin(this.sway) * 10 * this.size, this.y);
    ctx.fillStyle = "rgba(255, 255, 255, 1)";
    ctx.fillRect(0, 0, this.size, this.size);
    ctx.restore();
  }

  update(dt) {
    this.y += this.size * dt * 1000 / 64;
    this.sway += dt / 2;
  }
}

class AllSnow {
  constructor(numFlakes, width, height) {
    this.flakes = [];
    this.width = width;
    this.height = height;
    for (let i = 0; i < numFlakes; i++) {
      this.flakes.push(new Flake(Math.random() * width, Math.random() * height, Math.random() + 1));
    }
  }

  update(dt) {
    for (let i = 0; i < this.flakes.length; i++) {
      this.flakes[i].update(dt);
      if (this.flakes[i].y > this.height) {
        this.flakes[i].y = -3;
      }
    }
  }

  render() {
    for (let i = 0; i < this.flakes.length; i++) {
      this.flakes[i].render();
    }
  }
}
