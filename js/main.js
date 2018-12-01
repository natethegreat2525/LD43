let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let x = 0;

let lastTime = 0
function render(timeStamp) {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  if (spaceKey.isDown) x++;
  let dt = timeStamp - lastTime;
  lastTime = timeStamp
  console.log(dt);
  ctx.fillStyle = "#ff0000";
  ctx.fillRect(20 + x, 20, 100, 50);

  testFunction();
  window.requestAnimationFrame(render);
}

window.requestAnimationFrame(render);
