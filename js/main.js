let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let x = 0;

let lastTime = 0

let world = new World(lvl1);

function render(timeStamp) {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  if (spaceKey.isDown) x++;
  let dt = timeStamp - lastTime;
  lastTime = timeStamp

  console.log(dt);
  ctx.fillStyle = "#ff0000";
  ctx.fillRect(20 + x, 20, 100, 50);

  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  world.render();

  window.requestAnimationFrame(render);
}

window.requestAnimationFrame(render);
