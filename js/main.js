let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let x = 0;

let lastTime = 0

let world = new World(lvl1);

let player = new Player(320, 288);
let phys = new Physics(world);
phys.addEntity(player);

let snow = new AllSnow(1000, canvas.width, canvas.height);

function update(timeStamp) {
  let dt = (Math.min(timeStamp - lastTime, 33)/1000.0);
  lastTime = timeStamp

  // Update world
  player.update();
  snow.update(dt);
  phys.update(dt);

  // Render world
  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  snow.render();

  world.render();
  player.render();

  window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);
