const ELF_WIDTH = 16;
const ELF_HEIGHT = 40;

class Elf {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.w = ELF_WIDTH;
        this.h = ELF_HEIGHT;
        this.fr = 0;
        this.dir = FRONT;
    }
    
    render(x, y, dir, fr) {
    
        //Feet
        let lFoot = null;
        let rFoot = null;
    
        //Left or Right
        if (this.dir == LEFT || this.dir == RIGHT) {
            let fcx = this.x+6;
            let fcy = this.y+38;
            let ox = Math.sin((this.fr + 4) / 5) * 6;
            ctx.fillStyle = "#000000";
            ctx.fillRect(fcx + ox, fcy, 3, 3);
            ctx.fillRect(fcx - ox, fcy, 3, 3);
        } else { //Forward
            let fcxl = this.x+1;
            let fcxr = this.x+11;
            let fcy = this.y+37;
            ctx.fillStyle = "#000000";
            ctx.fillRect(fcxl, fcy, 4, 4);
            ctx.fillRect(fcxr, fcy, 4, 4);
        }
    
        //Body
        ctx.fillStyle = "#137703";
        ctx.fillRect(this.x, this.y+19, 16, 16); //outline
        ctx.fillStyle = "#02A42C";
        ctx.fillRect(this.x+1, this.y+20, 14, 14); //body
    
        ctx.fillStyle = "#ff0000";
        if (this.dir == LEFT) {
            ctx.fillRect(this.x+2, this.y+17, 4, 18);
        }
    
        if (this.dir == RIGHT) {
            ctx.fillRect(this.x+10, this.y+17, 4, 18);
        }
    
        if (this.dir == FRONT) {
            ctx.fillRect(this.x+6, this.y+17, 4, 18);
        }
    
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(this.x+0, this.y+33, 16, 3);  //horizontal sash
    
        //Face
        ctx.fillStyle = "#FEE3B7";
        ctx.fillRect(this.x+2, this.y+8, 11, 11); //face
    
        //Ears
        if (this.dir == FRONT) {
    
            //Left Ear
            ctx.beginPath();
            ctx.moveTo(this.x+2, this.y+12);
            ctx.lineTo(this.x+2, this.y+14);
            ctx.lineTo(this.x, this.y+10);
            ctx.closePath();
        
            ctx.fillStyle = "#FCD179";
            ctx.fill(); //ear
        
            //Right Ear
            ctx.beginPath();
            ctx.moveTo(this.x+13, this.y+12);
            ctx.lineTo(this.x+13, this.y+14);
            ctx.lineTo(this.x+15, this.y+10);
            ctx.closePath();
        
            ctx.fillStyle = "#FCD179";
            ctx.fill(); //ear
        }

        //Hat 
        ctx.beginPath();
        ctx.moveTo(this.x+9, this.y+1);
        ctx.lineTo(this.x+2, this.y+7);
        ctx.lineTo(this.x+13, this.y+7);
        ctx.closePath(); //hat shape
        
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#000000';
        ctx.stroke(); //hat outline
        
        ctx.fillStyle = "#02A42C";
        ctx.fill(); //hat triangle
    
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(this.x+9, this.y+0, 3, 3); //hat pompom
    
        ctx.fillStyle = "#000000";
        ctx.fillRect(this.x+1, this.y+7, 13, 2);  //hat stripe outline
        
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(this.x+1, this.y+7, 13, 2);  //hat stripe
    
        if (this.dir == LEFT) {
            //Eyes
            ctx.fillStyle = "#000000";
            ctx.fillRect(this.x+3, this.y+12, 2, 2); //eye    
        }
    
        if (this.dir == RIGHT) {
                //Eyes

            ctx.fillStyle = "#000000";
            ctx.fillRect(this.x+11, this.y+12, 2, 2); //eye
        }
    
        if (this.dir == FRONT) {
                //Eyes

            ctx.fillStyle = "#000000";
            ctx.fillRect(this.x+4, this.y+12, 2, 2); //left eye
            ctx.fillRect(this.x+9, this.y+12, 2, 2); //right eye
        }
	
	    return;
	}
	
	update(dt) {
        this.dir = FRONT;
        this.fr++;
    }
}