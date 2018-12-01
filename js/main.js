let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let x = 0;

let lastTime = 0

let world = new World(lvl1);
let snow = new AllSnow(1000, canvas.width, canvas.height);

function render(timeStamp) {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  let dt = timeStamp - lastTime;
  lastTime = timeStamp

  snow.update(dt);

  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  snow.render();

  world.render();

  window.requestAnimationFrame(render);
}

window.requestAnimationFrame(render);
