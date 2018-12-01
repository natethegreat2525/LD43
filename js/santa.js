function makeSanta(x, y, dir, fr) {

    ctx.clearRect(0,0,50,50);
	
	//Feet
	let lFoot = null;
	let rFoot = null;
	
	//Left or Right
	if (dir == LEFT || dir == RIGHT) {
		let fcx = 8;
		let fcy = 44;
		let ox = Math.sin((fr + 4) / 5) * 6;
		ctx.fillStyle = "#000000";
		ctx.fillRect(fcx + ox, fcy, 3, 3);
		ctx.fillRect(fcx - ox, fcy, 3, 3);
	} else { //Forward
		let fcxl = 3;
		let fcxr = 13;
		let fcy = 43;
		ctx.fillStyle = "#000000";
		ctx.fillRect(fcxl, fcy, 4, 4);
		ctx.fillRect(fcxr, fcy, 4, 4);
	}
	
	//Body
	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 21, 20, 22); //outline
    ctx.fillStyle = "#ff0000";
	ctx.fillRect(1, 22, 18, 20); //body
	
	ctx.fillStyle = "#ffffff";
	if (dir == LEFT) {
	    ctx.fillRect(4, 21, 4, 20);
	}
	
	if (dir == RIGHT) {
	    ctx.fillRect(12, 21, 4, 20);
	}
	
	if (dir == FRONT) {
		ctx.fillRect(8, 21, 4, 20);
	}
	
	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 33, 20, 2);  //belt
	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0, 39, 20, 3);  //horizontal sash
	
	//Face
	ctx.fillStyle = "#FEE3B7";
	ctx.fillRect(4, 8, 13, 13); //face
	
	//Hat 
	ctx.beginPath();
    ctx.moveTo(12, 1);
    ctx.lineTo(3, 7);
    ctx.lineTo(17, 7);
    ctx.closePath(); //hat shape
        
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#000000';
    ctx.stroke(); //hat outline
        
    ctx.fillStyle = "#ff0000";
    ctx.fill(); //hat triangle
    
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(11, 0, 3, 3); //hat pompom
    
    ctx.fillStyle = "#000000";
	ctx.fillRect(2, 7, 16, 2);  //hat stripe outline
        
    ctx.fillStyle = "#ffffff";
	ctx.fillRect(3, 7, 14, 2);  //hat stripe
	
	if (dir == LEFT) {
        //Eyes
	    ctx.fillStyle = "#000000";
	    ctx.fillRect(5, 11, 3, 3); //eye
	    
		//Beard Position
        ctx.beginPath();
        ctx.moveTo(7, 30);
        ctx.lineTo(4, 18);
        ctx.lineTo(10, 18);
        ctx.closePath(); //beard shape
	}
	
	if (dir == RIGHT) {
	        //Eyes

		ctx.fillStyle = "#000000";
		ctx.fillRect(13, 11, 3, 3); //eye
		
		//Beard Position
        ctx.beginPath();
        ctx.moveTo(15, 30);
        ctx.lineTo(11, 18);
        ctx.lineTo(17, 18);
        ctx.closePath(); //beard shape
	}
	
	if (dir == FRONT) {
	        //Eyes

	    ctx.fillStyle = "#000000";
		ctx.fillRect(5, 12, 3, 3); //left eye
		ctx.fillRect(13, 12, 3, 3); //right eye
		
		//Beard Position
        ctx.beginPath();
        ctx.moveTo(11, 30);
        ctx.lineTo(5, 18);
        ctx.lineTo(16, 18);
        ctx.closePath(); //beard shape
	}
	
	//Beard 
	ctx.lineWidth = 1;
    ctx.strokeStyle = '#B7B7B7';
    ctx.stroke(); //beard outline
        
    ctx.fillStyle = "#E2E2E2";
    ctx.fill(); //beard triangle
	return;
}