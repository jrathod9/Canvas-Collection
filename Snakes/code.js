var canvas = document.querySelector('#canvas');
var c = canvas.getContext('2d');
canvas.width = window.innerWidth-40;	
canvas.height = window.innerHeight-30;	

var FPS = 10;
var side = 18; 		//segment side length 
var keys = [];
var Alive = 1;
var speedRegulator = 8;
var restoreSpeed = 7;

var score = 0;

keys[39]=true;

var pressed = 39;
var prev = 39;

var fruitx = Math.random()*(canvas.width- 40) + 18, fruity = Math.random()*(canvas.height-40) + 18;

var segment  = function(x,y,clr){
	this.x = x;		//center coordinates
	this.y = y;
	this.clr = clr;
}

var coordx = canvas.width/2-side, coordy = canvas.height/3-side;

var left = 37,up = 38,right = 39,down = 40;

var len = 6;

var Segments = new Array();

var i;
var initialSegment =  new segment(coordx,coordy,"red");
Segments.push(initialSegment);

for(i=1;i<len;i++){
	var r = Math.random()*255;
	var g =Math.random()*255;
	var b = Math.random()*255;
	var clr = "rgb(" + r + "," + g + "," + b + ")";
	console.log(clr);
	var temp = new segment(Segments[i-1].x-side, Segments[i-1].y , clr);
	Segments.push(temp);
}
console.log(Segments);

requestAnimationFrame(draw);

function draw(){

	if(Alive){

		
		FPS = FPS%speedRegulator;
		if(FPS == 0){	
			if((pressed == up && prev!=down)||(pressed == down && prev!=up) || (pressed == left && prev!=right) || (pressed == right && prev!=left))
			{
				keys[pressed]=true;
			
				if(keys[up])
					Segments[0].y-=side;
				if(keys[down])
					Segments[0].y+=side;
				if(keys[left])
					Segments[0].x-=side;
				if(keys[right])
					Segments[0].x+=side;

				for(i=len-1;i>0;i--){
					Segments[i].x = Segments[i-1].x;
					Segments[i].y = Segments[i-1].y;
				}
			}

			else
			{
				if(prev==up)
					Segments[0].y-=side;
				if(prev==down)
					Segments[0].y+=side;
				if(prev==left)
					Segments[0].x-=side;
				if(prev==right)
					Segments[0].x+=side;

				for(i=len-1;i>0;i--){
					Segments[i].x = Segments[i-1].x;
					Segments[i].y = Segments[i-1].y;
				}	
			}
			
		}

		FPS++;
		c.clearRect(0,0,window.innerWidth,window.innerHeight);
		
		c.fillStyle = "rgba(170,150,244,1)";
		c.font = "30px Calibri";
		c.fillText("Score : " + score , 10 , 30 );
		c.font = "17px Calibri";
		c.fillText("Arrow keys : Direct", 10 , 50 );
		c.fillText("Spacebar : Sprint", 10 , 65 );
		c.font = "15px Calibri";
		c.fillText("Look out for the plus", 10 , 80 );
		c.fillText("obstacle after 100 points.", 10 ,95 );

		// DRAW SNAKE
		c.fillStyle = "teal";
		
		c.beginPath();
		for(i=0;i<len;i++){
			
			c.fillStyle = Segments[i].clr;	
			c.fillRect(Segments[i].x-side/2 ,Segments[i].y-side/2,side,side);
			
		}
		c.closePath();		

		if(Math.abs(Segments[0].x - fruitx ) <= 12 && Math.abs(Segments[0].y - fruity) <= 12){
			score+=10;
			if(score%100==0)
				speedRegulator-=1;

			var r = Math.random()*255;
			var g =Math.random()*255;
			var b = Math.random()*255;
			var clr = "rgb(" + r + "," + g + "," + b + ")";

			temp = new segment(Segments[len-1].x,Segments[len-1].y,clr);
			Segments.push(temp);
			len++;

			while(1){
				fruitx = Math.random()*(canvas.width-40 )+ 18;			
				fruity = Math.random()*(canvas.height -40 ) +18 ;
				if((fruitx >= canvas.width/2 -20 && fruitx <= canvas.width/2 + 20 && fruity >= canvas.height/2 - 100 && fruity <= canvas.height/2 + 100)||(fruitx >= canvas.width/2 - 100 && fruitx <= canvas.width/2 + 100 && fruity >= canvas.height/2 - 20 && fruity >= canvas.height/2 + 20))
				{
					continue;
				}	
				else
				{
					break;
				}					
			}
			
		}		

		//DRAW FRUIT
		c.fillStyle = "rgba(255,0,0," + Math.random()+")";
		c.beginPath();
		c.arc(fruitx,fruity,5 , 0 , Math.PI*2,false);
		c.closePath();
		c.fill();


		//DRAW PLUS
		if(score >= 100)
		{
			c.fillStyle = "tomato";
			c.beginPath();
			c.fillRect(canvas.width/2 -20 , canvas.height/2 - 100 , 40,200);
			c.fillRect(canvas.width/2 -100 , canvas.height/2 - 20 , 200,40);
			c.closePath();
			c.fill();		
		}
		//OUT
		for(i=2;i<len;i++){
			if(Math.sqrt((Segments[0].x - Segments[i].x)**2 + (Segments[0].y - Segments[i].y)**2) <= 9 || Segments[0].x <= 9 || Segments[0].x >= window.innerWidth -29 || Segments[0].y <= 9 || Segments[0].y >= window.innerHeight-29 ){
				Alive = 0;
			}
			if(score > 100)
			{
				if(Segments[0].x >= canvas.width/2 -20 &&  Segments[0].x <= canvas.width/2 + 20 && Segments[0].y >= canvas.height/2 -100 && Segments[0].y <= canvas.height/2 + 100){
					Alive = 0;
				}
				if(Segments[0].x >= canvas.width/2 - 100 &&  Segments[0].x <= canvas.width/2 + 100 && Segments[0].y >= canvas.height/2 -20 && Segments[0].y <= canvas.height/2 + 20){
					Alive = 0;
				}
			}
		}
	}

	else{
		c.clearRect(0,0,window.innerWidth,window.innerHeight);
		c.beginPath();
		c.fillStyle = 'rgba(0,0,0,0.5)';
		c.font = "30px Calibri";
		c.fillText("GAME OVER!" , (window.innerWidth-20)/2 - 55 , (window.innerHeight-20)/2 - 30);
		c.fillText("Score : " + score , (window.innerWidth-20)/2 - 15 , (window.innerHeight-20)/2 );
		// c.fillText("Accuracy : " + (kills*100/totalBullets).toFixed(2), (window.innerWidth-20)/2 - 55 , (window.innerHeight-20)/2 + 30);
	}
	requestAnimationFrame(draw);
}

window.addEventListener("keydown", keysPressed, false );
window.addEventListener("keyup", keyReleased , false);

function keysPressed(e) {
	
	if(e.keyCode == up || e.keyCode == down ||e.keyCode == left ||e.keyCode == right){
		if(keys[up])
			prev = up;
		else if(keys[down])
			prev = down;
		else if(keys[left])
			prev = left;
		else if(keys[right])
			prev = right;

		keys[37] = false;
		keys[38] = false;
		keys[39] = false;
		keys[40] = false;
		
		pressed = e.keyCode;

	}
	if(e.keyCode == 32){
		speedRegulator = 3;
	}

}

function keyReleased(e){
	if(e.keyCode == 32){
		speedRegulator = restoreSpeed;
	}
}
