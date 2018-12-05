let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let x = 0;

let lastTime = 0

let world = new World(level[0]);

let snow = new AllSnow(1000, canvas.width, canvas.height);

let showMenu = true;

function update(timeStamp) {
  let dt = (Math.min(timeStamp - lastTime, 33)/1000.0);
  lastTime = timeStamp

  // Update world
  snow.update(dt);
  if (!showMenu) {
    world.update(dt);
  }

  // Render world
  ctx.fillStyle = "#16024F";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  snow.render();

  if (!showMenu) {
    world.render();
    renderButtons();
  } else {
    renderMenu();
  }

  window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);


function renderMenu() {
  let onPlay = (mouseY > 100 && mouseY < 200 && mouseX > 200 && mouseX < 600);
  let onSelect = (mouseY > 300 && mouseY < 400);
  
  ctx.font = '100px Arial';
  if (onPlay) {
    ctx.fillStyle = '#aaaaaa';
  } else {
    ctx.fillStyle = '#ffffff';
  }
  ctx.fillText("PLAY", 270, 200);
  if (onSelect) {
    ctx.fillStyle = '#aaaaaa';
  } else {
    ctx.fillStyle = '#ffffff';
  }
  ctx.fillText("LEVEL SELECT", 30, 400);
}

function renderButtons() {
  let onReset = (mouseY > 0 && mouseY < 30 && mouseX > 0 && mouseX < 80);
  let onMenu = (mouseY > 0 && mouseY < 30 && mouseX > 90 && mouseX < 170);

  ctx.font = '20px Arial';
  if (onReset) {
    ctx.fillStyle = '#aaaaaa';
  } else {
    ctx.fillStyle = '#ffffff';
  }
  ctx.fillText("RESET", 10, 20);

  if (onMenu) {
    ctx.fillStyle = '#aaaaaa';
  } else {
    ctx.fillStyle = '#ffffff';
  }
  ctx.fillText("MENU", 100, 20);
}

document.addEventListener("click", (evt) => {
  if (!showMenu) {
    let onReset = (mouseY > 0 && mouseY < 30 && mouseX > 0 && mouseX < 80);
    let onMenu = (mouseY > 0 && mouseY < 30 && mouseX > 90 && mouseX < 170);
    if (onReset) {
      window.dispatchEvent(resetWorldEvent);
    }
    if (onMenu) {
      showMenu = true;
    }
    return;
  }
  let onPlay = (mouseY > 100 && mouseY < 200 && mouseX > 200 && mouseX < 600);
  let onSelect = (mouseY > 300 && mouseY < 400);
  
  if (onPlay) {
    showMenu = false;
    currentLevel = 1;
    world = new World(level[0]);
  }
  if (onSelect) {
    setTimeout(() => {
      let lvl = window.prompt("What level? (1-12)")
      try {
        let v = parseInt(lvl);
        if (v >= 1 && v <= 12) {
          currentLevel = v;
          showMenu = false;
          window.dispatchEvent(resetWorldEvent);
        }
      } catch (err) {}
    }, 0);
  }
});

let mouseX = 0;
let mouseY = 0;

document.onmousemove = handleMouseMove;
function handleMouseMove(event) {
    event = event || window.event;
    mouseX = event.pageX;
    mouseY = event.pageY;
}