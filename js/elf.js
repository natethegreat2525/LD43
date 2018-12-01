function makeElf(x, y, dir, fr) {

    ctx.clearRect(0,0,50,50);
	
	//Feet
	let lFoot = null;
	let rFoot = null;
	
	//Left or Right
	if (dir == LEFT || dir == RIGHT) {
		let fcx = 6;
		let fcy = 38;
		let ox = Math.sin((fr + 4) / 5) * 6;
		ctx.fillStyle = "#000000";
		ctx.fillRect(fcx + ox, fcy, 3, 3);
		ctx.fillRect(fcx - ox, fcy, 3, 3);
	} else { //Forward
		let fcxl = 1;
		let fcxr = 11;
		let fcy = 37;
		ctx.fillStyle = "#000000";
		ctx.fillRect(fcxl, fcy, 4, 4);
		ctx.fillRect(fcxr, fcy, 4, 4);
	}
	
	//Body
	ctx.fillStyle = "#137703";
	ctx.fillRect(0, 19, 16, 16); //outline
    ctx.fillStyle = "#02A42C";
	ctx.fillRect(1, 20, 14, 14); //body
	
	ctx.fillStyle = "#ff0000";
	if (dir == LEFT) {
	    ctx.fillRect(2, 17, 4, 18);
	}
	
	if (dir == RIGHT) {
	    ctx.fillRect(10, 17, 4, 18);
	}
	
	if (dir == FRONT) {
		ctx.fillRect(6, 17, 4, 18);
	}
	
	ctx.fillStyle = "#ff0000";
	ctx.fillRect(0, 33, 16, 3);  //horizontal sash
	
	//Face
	ctx.fillStyle = "#FEE3B7";
	ctx.fillRect(2, 8, 11, 11); //face
	
	//Ears
	if (dir == FRONT) {
	
	    //Left Ear
	    ctx.beginPath();
        ctx.moveTo(2, 12);
        ctx.lineTo(2, 14);
        ctx.lineTo(0, 10);
        ctx.closePath();
        
        ctx.fillStyle = "#FCD179";
        ctx.fill(); //ear
        
        //Right Ear
	    ctx.beginPath();
        ctx.moveTo(13, 12);
        ctx.lineTo(13, 14);
        ctx.lineTo(15, 10);
        ctx.closePath();
        
        ctx.fillStyle = "#FCD179";
        ctx.fill(); //ear
	}

	//Hat 
	ctx.beginPath();
    ctx.moveTo(9, 1);
    ctx.lineTo(2, 7);
    ctx.lineTo(13, 7);
    ctx.closePath(); //hat shape
        
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#000000';
    ctx.stroke(); //hat outline
        
    ctx.fillStyle = "#02A42C";
    ctx.fill(); //hat triangle
    
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(9, 0, 3, 3); //hat pompom
    
    ctx.fillStyle = "#000000";
	ctx.fillRect(1, 7, 13, 2);  //hat stripe outline
        
    ctx.fillStyle = "#ff0000";
	ctx.fillRect(1, 7, 13, 2);  //hat stripe
	
	if (dir == LEFT) {
        //Eyes
	    ctx.fillStyle = "#000000";
	    ctx.fillRect(3, 11, 3, 3); //eye    
	}
	
	if (dir == RIGHT) {
	        //Eyes

		ctx.fillStyle = "#000000";
		ctx.fillRect(11, 11, 3, 3); //eye
	}
	
	if (dir == FRONT) {
	        //Eyes

	    ctx.fillStyle = "#000000";
		ctx.fillRect(4, 12, 2, 2); //left eye
		ctx.fillRect(9, 12, 2, 2); //right eye
	}
	return;
}