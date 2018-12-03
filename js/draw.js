function drawPlayer(x, y, vx, vy, w, h, atkFr, fr, dir, attack) {
    //Feet
    let lFoot = null;
    let rFoot = null;

    //Left or Right
    if (dir == LEFT || dir == RIGHT) {
        let fcx = x+8;
        let fcy = y+44;
        let ox = Math.sin((fr + 4) / 5) * 6;
        ctx.fillStyle = "#000000";
        ctx.fillRect(fcx + ox, fcy, 3, 3);
        ctx.fillRect(fcx - ox, fcy, 3, 3);
    } else { //Forward
        let fcxl = x+3;
        let fcxr = x+13;
        let fcy = y+43;
        ctx.fillStyle = "#000000";
        ctx.fillRect(fcxl, fcy, 4, 4);
        ctx.fillRect(fcxr, fcy, 4, 4);
    }

    //Body
    ctx.fillStyle = "#000000";
    ctx.fillRect(x, y+21, 20, 22); //outline
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(x+1, y+22, 18, 20); //body

    ctx.fillStyle = "#ffffff";
    if (dir == LEFT) {
        ctx.fillRect(x+4, y+21, 4, 20);
    }

    if (dir == RIGHT) {
        ctx.fillRect(x+12, y+21, 4, 20);
    }

    if (dir == FRONT) {
        ctx.fillRect(x+8, y+21, 4, 20);
    }

    ctx.fillStyle = "#000000";
    ctx.fillRect(x, y+33, 20, 2);  //belt
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(x, y+39, 20, 3);  //horizontal sash

    //Face
    ctx.fillStyle = "#FEE3B7";
    ctx.fillRect(x+4, y+8, 13, 13); //face

    //Hat
    ctx.beginPath();
    ctx.moveTo(x+12, y+1);
    ctx.lineTo(x+3, y+7);
    ctx.lineTo(x+17, y+7);
    ctx.closePath(); //hat shape

    ctx.lineWidth = 1;
    ctx.strokeStyle = '#000000';
    ctx.stroke(); //hat outline

    ctx.fillStyle = "#ff0000";
    ctx.fill(); //hat triangle

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(x+11, y+0, 3, 3); //hat pompom

    ctx.fillStyle = "#000000";
    ctx.fillRect(x+2, y+7, 16, 2);  //hat stripe outline

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(x+3, y+7, 14, 2);  //hat stripe

    if (dir == LEFT) {
        //Eyes
        ctx.fillStyle = "#000000";
        ctx.fillRect(x+5, y+11, 3, 3); //eye

        //Beard Position
        ctx.beginPath();
        ctx.moveTo(x+7, y+30);
        ctx.lineTo(x+4, y+18);
        ctx.lineTo(x+10, y+18);
        ctx.closePath(); //beard shape
    }

    if (dir == RIGHT) {
        //Eyes
        ctx.fillStyle = "#000000";
        ctx.fillRect(x+13, y+11, 3, 3); //eye

        //Beard Position
        ctx.beginPath();
        ctx.moveTo(x+15, y+30);
        ctx.lineTo(x+11, y+18);
        ctx.lineTo(x+17, y+18);
        ctx.closePath(); //beard shape
    }

    if (dir == FRONT) {
        //Eyes
        ctx.fillStyle = "#000000";
        ctx.fillRect(x+5, y+12, 3, 3); //left eye
        ctx.fillRect(x+13, y+12, 3, 3); //right eye

        //Beard Position
        ctx.beginPath();
        ctx.moveTo(x+11, y+30);
        ctx.lineTo(x+5, y+18);
        ctx.lineTo(x+16, y+18);
        ctx.closePath(); //beard shape
    }

    //Beard
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#B7B7B7';
    ctx.stroke(); //beard outline

    ctx.fillStyle = "#E2E2E2";
    ctx.fill(); //beard triangle

    //Toy Sack
    if (dir == RIGHT) {
        if (attack) {
            let ox = (Math.sin((atkFr + 29) / 5) * 12);
            ctx.fillStyle = "#BD974B";
            ctx.fillRect(x+ox+12, y+22, 8, 8);
    
            ctx.beginPath();
            ctx.moveTo(x+ox+4, y+22);
            ctx.lineTo(x+ox+12, y+22);
            ctx.lineTo(x+ox+12, y+30);
            ctx.closePath(); 
            ctx.fill();
        
            ctx.fillStyle = '#F3F701';
            ctx.fillRect(x+ox+8, y+23, 2, 2);
        
            ctx.fillStyle = '#01F738';
            ctx.fillRect(x+ox+10, y+25, 2, 2);
        } else {
            let ox = Math.sin((fr + 4) / 5) * 6;
    
            ctx.fillStyle = "#BD974B";
            ctx.fillRect(x-8, y+30, 8, 8);
    
            ctx.beginPath();
            ctx.moveTo(x-8, y+30);
            ctx.lineTo(x, y+22);
            ctx.lineTo(x, y+30);
            ctx.closePath(); 
            ctx.fill();
        
            ctx.fillStyle = '#F3F701';
            ctx.fillRect(x-3, y+25, 2, 2);
        
            ctx.fillStyle = '#01F738';
            ctx.fillRect(x-5, y+27, 2, 2);
        }
    } else if (dir == LEFT) {
        if (attack) {
            let ox = (Math.sin((atkFr + 40) / 5) * 12);
            ctx.fillStyle = "#BD974B";
            ctx.fillRect(x+ox-2, y+22, 8, 8);
    
            ctx.beginPath();
            ctx.moveTo(x+ox+14, y+22);
            ctx.lineTo(x+ox+6, y+22);
            ctx.lineTo(x+ox+6, y+30);
            ctx.closePath(); 
            ctx.fill();
        
            ctx.fillStyle = '#F3F701';
            ctx.fillRect(x+ox+8, y+23, 2, 2);
        
            ctx.fillStyle = '#01F738';
            ctx.fillRect(x+ox+6, y+25, 2, 2);
        } else {
            ctx.fillStyle = "#BD974B";
            ctx.fillRect(x+20, y+30, 8, 8);
    
            ctx.beginPath();
            ctx.moveTo(x+29, y+30);
            ctx.lineTo(x+20, y+22);
            ctx.lineTo(x+20, y+30);
            ctx.closePath(); 
            ctx.fill();
        
            ctx.fillStyle = '#F3F701';
            ctx.fillRect(x+21, y+25, 2, 2);
        
            ctx.fillStyle = '#01F738';
            ctx.fillRect(x+23, y+27, 2, 2);
        }
    } else {
        if (attack) {
            let ox = (Math.sin((atkFr + 29) / 5) * 12);
            ctx.fillStyle = "#BD974B";
            ctx.fillRect(x+ox+12, y+22, 8, 8);
    
            ctx.beginPath();
            ctx.moveTo(x+ox+4, y+22);
            ctx.lineTo(x+ox+12, y+22);
            ctx.lineTo(x+ox+12, y+30);
            ctx.closePath(); 
            ctx.fill();
        
            ctx.fillStyle = '#F3F701';
            ctx.fillRect(x+ox+8, y+23, 2, 2);
        
            ctx.fillStyle = '#01F738';
            ctx.fillRect(x+ox+10, y+25, 2, 2);
        } else {
            ctx.fillStyle = "#BD974B";
            ctx.fillRect(x-4, y+30, 4, 8);
    
            ctx.beginPath();
            ctx.moveTo(x-4, y+30);
            ctx.lineTo(x, y+22);
            ctx.lineTo(x, y+30);
            ctx.closePath(); 
            ctx.fill();
        
            ctx.fillStyle = '#01F738';
            ctx.fillRect(x-3, y+26, 2, 2);
        }
    }

    return;
}

function drawElf(x, y, vx, vy, w, h, fr, dir, alive, mode, pushTimer) {
    //Feet
    let lFoot = null;
    let rFoot = null;

    //Left or Right
    if (dir == LEFT || dir == RIGHT) {
        let fcx = x+(w/2);
        let fcy = y+h-40+38;
        let ox = Math.sin((fr + 4) / 5) * 6;
        ctx.fillStyle = "#000000";
        ctx.fillRect(fcx + ox, fcy, 3, 3);
        ctx.fillRect(fcx - ox, fcy, 3, 3);
    } else { //Forward
        let fcxl = x+(w/2 - w/6)-2;
        let fcxr = x+(w/2 + w/6)-2;
        let fcy = y+h-40+37;
        ctx.fillStyle = "#000000";
        ctx.fillRect(fcxl, fcy, 4, 4);
        ctx.fillRect(fcxr, fcy, 4, 4);
    }

    //Body
    ctx.fillStyle = "#137703";
    ctx.fillRect(x, y+19, w, h-40+16); //outline
    ctx.fillStyle = "#02A42C";
    ctx.fillRect(x+1, y+20, w-2, h-40+14); //body

    //Vertical sash
    ctx.fillStyle = "#ff0000";
    if (dir == LEFT) {
        ctx.fillRect(x+((w-2)/4), y+19, 4, h-40+16);
    }

    if (dir == RIGHT) {
        ctx.fillRect(x+((w-2)*3/4), y+19, 4, h-40+16);
    }

    if (dir == FRONT) {
        ctx.fillRect(x+((w-2)/2), y+19, 4, h-40+16);
    }

    ctx.fillStyle = "#ff0000";
    ctx.fillRect(x+0, y+h-40+33, w, 3);  //horizontal sash
    
    if (!alive) {
        ctx.fillStyle = "#B70000";
        ctx.fillRect(x+(w-2), y, 3, h);  
    }
    
    //Face
    ctx.fillStyle = "#FEE3B7";
    ctx.fillRect(x+(w/2 - 11/2), y+8, 11, 11); //face

    //Ears
    if (dir == FRONT) {

        //Left Ear
        ctx.beginPath();
        ctx.moveTo(x+(w/2 - 11/2)-1, y+12);
        ctx.lineTo(x+(w/2 - 11/2)-1, y+14);
        ctx.lineTo(x+(w/2 - 11/2)-3, y+10);
        ctx.closePath();

        ctx.fillStyle = "#FCD179";
        ctx.fill(); //ear

        //Right Ear
        ctx.beginPath();
        ctx.moveTo(x+(w/2 - 11/2)+12, y+12);
        ctx.lineTo(x+(w/2 - 11/2)+12, y+14);
        ctx.lineTo(x+(w/2 - 11/2)+14, y+10);
        ctx.closePath();

        ctx.fillStyle = "#FCD179";
        ctx.fill(); //ear
    }

    //Hat
    ctx.beginPath();
    ctx.moveTo(x+(w/2 - 11/2)+7, y+1);
    ctx.lineTo(x+(w/2 - 11/2), y+7);
    ctx.lineTo(x+(w/2 - 11/2)+11, y+7);
    ctx.closePath(); //hat shape

    ctx.lineWidth = 1;
    ctx.strokeStyle = '#000000';
    ctx.stroke(); //hat outline

    ctx.fillStyle = "#02A42C";
    ctx.fill(); //hat triangle

    ctx.fillStyle = "#ff0000";
    ctx.fillRect(x+(w/2 - 3/2)+2, y+0, 3, 3); //hat pompom

    ctx.fillStyle = "#000000";
    ctx.fillRect(x+(w/2 - 13/2), y+7, 13, 2);  //hat stripe outline

    ctx.fillStyle = "#ff0000";
    ctx.fillRect(x+(w/2 - 13/2), y+7, 13, 2);  //hat stripe
    if (alive) {
        if (dir == LEFT) {
            //Eyes
            ctx.fillStyle = "#000000";
            ctx.fillRect(x+(w/2 - 4), y+12, 2, 2); //eye
        }

        if (dir == RIGHT) {
                //Eyes

            ctx.fillStyle = "#000000";
            ctx.fillRect(x+(w/2 + 2), y+12, 2, 2); //eye
        }

        if (dir == FRONT) {
                //Eyes

            ctx.fillStyle = "#000000";
            ctx.fillRect(x+(w/2 - 4), y+12, 2, 2); //left eye
            ctx.fillRect(x+(w/2 + 2), y+12, 2, 2); //right eye
        }
    } else {
        ctx.beginPath();
        ctx.moveTo(x+(w/2 - 5), y+12);
        ctx.lineTo(x+(w/2 - 2), y+15);
        ctx.closePath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#000000';
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(x+(w/2 - 2), y+12);
        ctx.lineTo(x+(w/2 - 5), y+15);
        ctx.closePath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#000000';
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(x+(w/2 + 1), y+12);
        ctx.lineTo(x+(w/2 + 4), y+15);
        ctx.closePath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#000000';
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(x+(w/2 + 4), y+12);
        ctx.lineTo(x+(w/2 + 1), y+15);
        ctx.closePath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#000000';
        ctx.stroke();
    }
    return;
}

function drawOptions(x, y, opts) {
    ctx.fillStyle = 'rgba(0, 0, 0, .5)';
    for (let i = 0; i < opts.length; i++) {
        ctx.fillRect(x - 60, y - 80 + i * 20, 200, 18);
    }

    ctx.fillStyle = '#ffffff';
    ctx.font = '16px Arial';

    for (let i = 0; i < opts.length; i++) {
        ctx.fillText(opts[i], x - 58, y - 66 + i * 20);
    }
}

function drawSayHi(x, y) {
    ctx.fillStyle = 'rgba(0, 0, 0, .5)';
    ctx.fillRect(x - 30, y - 30, 60, 18);

    ctx.fillStyle = '#ffffff';
    ctx.font = '16px Arial';
    ctx.fillText("Hi Santa!", x - 28, y - 15);
}