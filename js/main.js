let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let x = 0;

let lastTime = 0

let world = new World(lvl1);
let player = new Player(320, 295);

function update(timeStamp) {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  let dt = timeStamp - lastTime;
  lastTime = timeStamp

  // Update world
  player.update();

  // Render world
  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  world.render();
  player.render();

  window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);
