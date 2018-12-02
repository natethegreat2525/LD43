let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let x = 0;

let lastTime = 0

let world = new World(lvl1);

let snow = new AllSnow(1000, canvas.width, canvas.height);

function update(timeStamp) {
  let dt = (Math.min(timeStamp - lastTime, 33)/1000.0);
  lastTime = timeStamp

  // Update world
  snow.update(dt);
  world.update(dt);

  // Render world
  ctx.fillStyle = "#16024F";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  snow.render();

  world.render();

  window.requestAnimationFrame(update);
}

reset = event => {
  world = new World(lvl1);
  event.preventDefault();
}

window.addEventListener("resetWorld", reset, false);

window.requestAnimationFrame(update);
