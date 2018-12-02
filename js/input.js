function keyboard(keyCode) {
	let key = {};
	key.code = keyCode;
	key.isDown = false;
	key.isUp = true;
	key.isPressed = false;
	key.isReleased = false;

	key.press = function() {
		key.isPressed = true;
	}
	key.release = function() {
		key.isReleased = true;
	}
	
	//The `downHandler`
	key.downHandler = event => {
		if (event.keyCode === key.code) {
			key.isPressed = false;
			key.isReleased = false;
			if (key.isUp && key.press) key.press();
			key.isDown = true;
			key.isUp = false;
		}
		event.preventDefault();
	};

	//The `upHandler`
	key.upHandler = event => {
		if (event.keyCode === key.code) {
			key.isPressed = false;
			key.isReleased = false;
			if (key.isDown && key.release) key.release();
			key.isDown = false;
			key.isUp = true;
		}
		event.preventDefault();
	};

	//Attach event listeners
	window.addEventListener(
		"keydown", key.downHandler.bind(key), false
	);
	window.addEventListener(
		"keyup", key.upHandler.bind(key), false
	);
	return key;
}

// Add keys here
let spaceKey = keyboard(32);
let upKey = keyboard(38);

let leftKey = keyboard(37);
let rightKey = keyboard(39);

let aKey = keyboard(65);
let dKey = keyboard(68);
let wKey = keyboard(87);