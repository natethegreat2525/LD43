const LEFT = 0;
const RIGHT = 2;
const FRONT = 1;
const PLAYER_WIDTH = 20;
const PLAYER_HEIGHT = 47;

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.w = PLAYER_WIDTH;
        this.h = PLAYER_HEIGHT;
        this.fr = 0;
        this.dir = FRONT;
    }

    render() {
        //Feet
        let lFoot = null;
        let rFoot = null;
	
        //Left or Right
        if (this.dir == LEFT || this.dir == RIGHT) {
            let fcx = this.x+8;
            let fcy = this.y+44;
            let ox = Math.sin((this.fr + 4) / 5) * 6;
            ctx.fillStyle = "#000000";
            ctx.fillRect(fcx + ox, fcy, 3, 3);
            ctx.fillRect(fcx - ox, fcy, 3, 3);
        } else { //Forward
            let fcxl = this.x+3;
            let fcxr = this.x+13;
            let fcy = this.y+43;
            ctx.fillStyle = "#000000";
            ctx.fillRect(fcxl, fcy, 4, 4);
            ctx.fillRect(fcxr, fcy, 4, 4);
        }
    
        //Body
        ctx.fillStyle = "#000000";
        ctx.fillRect(this.x, this.y+21, 20, 22); //outline
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(this.x+1, this.y+22, 18, 20); //body
    
        ctx.fillStyle = "#ffffff";
        if (this.dir == LEFT) {
            ctx.fillRect(this.x+4, this.y+21, 4, 20);
        }
    
        if (this.dir == RIGHT) {
            ctx.fillRect(this.x+12, this.y+21, 4, 20);
        }
    
        if (this.dir == FRONT) {
            ctx.fillRect(this.x+8, this.y+21, 4, 20);
        }
    
        ctx.fillStyle = "#000000";
        ctx.fillRect(this.x, this.y+33, 20, 2);  //belt
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(this.x, this.y+39, 20, 3);  //horizontal sash
    
        //Face
        ctx.fillStyle = "#FEE3B7";
        ctx.fillRect(this.x+4, this.y+8, 13, 13); //face
    
        //Hat 
        ctx.beginPath();
        ctx.moveTo(this.x+12, this.y+1);
        ctx.lineTo(this.x+3, this.y+7);
        ctx.lineTo(this.x+17, this.y+7);
        ctx.closePath(); //hat shape
        
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#000000';
        ctx.stroke(); //hat outline
        
        ctx.fillStyle = "#ff0000";
        ctx.fill(); //hat triangle
    
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(this.x+11, this.y+0, 3, 3); //hat pompom
    
        ctx.fillStyle = "#000000";
        ctx.fillRect(this.x+2, this.y+7, 16, 2);  //hat stripe outline
        
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(this.x+3, this.y+7, 14, 2);  //hat stripe
    
        if (this.dir == LEFT) {
            //Eyes
            ctx.fillStyle = "#000000";
            ctx.fillRect(this.x+5, this.y+11, 3, 3); //eye
        
            //Beard Position
            ctx.beginPath();
            ctx.moveTo(this.x+7, this.y+30);
            ctx.lineTo(this.x+4, this.y+18);
            ctx.lineTo(this.x+10, this.y+18);
            ctx.closePath(); //beard shape
        }
    
        if (this.dir == RIGHT) {
                //Eyes

            ctx.fillStyle = "#000000";
            ctx.fillRect(this.x+13, this.y+11, 3, 3); //eye
        
            //Beard Position
            ctx.beginPath();
            ctx.moveTo(this.x+15, this.y+30);
            ctx.lineTo(this.x+11, this.y+18);
            ctx.lineTo(this.x+17, this.y+18);
            ctx.closePath(); //beard shape
        }
    
        if (this.dir == FRONT) {
                //Eyes

            ctx.fillStyle = "#000000";
            ctx.fillRect(this.x+5, this.y+12, 3, 3); //left eye
            ctx.fillRect(this.x+13, this.y+12, 3, 3); //right eye
        
            //Beard Position
            ctx.beginPath();
            ctx.moveTo(this.x+11, this.y+30);
            ctx.lineTo(this.x+5, this.y+18);
            ctx.lineTo(this.x+16, this.y+18);
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

    update(dt) {
        if (leftKey.isDown || aKey.isDown) { 
            this.vx = -200;
            this.dir = LEFT;
        } else if (rightKey.isDown || dKey.isDown) {
            this.vx = 200;
            this.dir = RIGHT;
        } else {
            this.vx *= .7;
            if ((downKey.isDown || sKey.isDown) && this.grounded) {
                this.dir = FRONT;
            }
        }

        if ((upKey.isDown || wKey.isDown) && this.grounded) {
            this.vy = -300;
            this.dir = FRONT;
        }
        
        this.fr = dt;
    }
}