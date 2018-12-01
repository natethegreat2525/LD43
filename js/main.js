let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let lastTime = 0

let world = new World(lvl1);

function render(timeStamp) {
  let dt = timeStamp - lastTime;
  lastTime = timeStamp

  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  world.render();

  window.requestAnimationFrame(render);
}

window.requestAnimationFrame(render);
