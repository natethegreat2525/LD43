let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let lastTime = 0
function render(timeStamp) {
  let dt = timeStamp - lastTime;
  lastTime = timeStamp
  console.log(dt);
  ctx.fillStyle = "#ff0000";
  ctx.fillRect(20, 20, 100, 50);

  testFunction();
  window.requestAnimationFrame(render);
}

window.requestAnimationFrame(render);
