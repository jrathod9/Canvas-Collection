var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var striker = function(x,y,radii){
	this.x = x;
	this.y = y;
	this.radii = radii;
}

c.strokeStyle = 'white';
var flag = 0;
var mousex,mousey,strikerx=300,strikery=300;
var vx=0,vy=0,fric = 0,k=2;	//fric = board friction ; k = elastic const
var initx=300,inity=300;
var radius = 10;
var holeradius = 40;
requestAnimationFrame(draw);



function draw(){
	
	c.clearRect(0,0,window.innerWidth,window.innerHeight);
  
c.font = "14px Arial";
c.fillText("ENTER", 18, 46);
c.fillText("EXIT", window.innerWidth - 2*holeradius +20, window.innerHeight - holeradius);
c.font = "30px Arial";
c.fillText("DRAG AND LEAVE",window.innerWidth/2-100,window.innerHeight/2);  
	c.fillStyle = 'teal';
	c.beginPath();
	c.arc(holeradius+1,holeradius+1,holeradius,0,Math.PI*2,false);
	c.strokeStyle = 'teal';
	c.closePath();
	c.stroke();

	c.beginPath();
	c.arc(window.innerWidth-holeradius-1,window.innerHeight-holeradius-1,holeradius,0,Math.PI*2,false);
	c.closePath();
	c.stroke();


	if(flag == 1)
	{		
		c.beginPath();
		c.moveTo(initx,inity);
		c.lineTo(mousex,mousey);
		c.closePath();
		c.stroke();
		c.beginPath();
		c.arc(mousex,mousey,radius,0,Math.PI*2,false);
		c.closePath();
		c.fill();	
		c.stroke();
		strikerx = mousex;
		strikery = mousey;
	}
	else
	{
		c.beginPath();
		c.arc(strikerx,strikery,radius,0,Math.PI*2,false);
		c.closePath();
		c.fill();
		c.stroke();
		if((strikerx-holeradius-1)**2 + (strikery-holeradius-1)**2 <= holeradius**2) 
		{
			strikerx = window.innerWidth-radius-1;
			strikery = window.innerHeight -radius-1;
		}
		strikerx+=vx;
		strikery+=vy;
		
		//to prevent direction change due to drag

		//for walls

		if(strikerx + radius >= window.innerWidth || strikerx-radius <= 0)
		{
			vx*=-1;
			dragx*=-1;
		}
		if(strikery + radius >= window.innerHeight || strikery - radius <=0)
		{
			vy*=-1;
			dragy*=-1;
		}
		
	}

	window.onmousedown = function(e){
		// if((e.x - strikerx)**2+(e.y - strikery)**2 <= 40**2)
		// {
			flag = 1;
			initx = e.x;
			inity = e.y;
		// }
	}

	window.onclick = function(e){
		vx = (-strikerx+initx)/5;
		vy = (-strikery+inity)/5;	
		if(vx > 0){
			dragx = -0.5; 
		}
		else{
			dragx = 0.5;
		}
		if(vy > 0)
		{
			dragy = -0.5;
		}
		 else{
		 	dragy = 0.5;
		 }
		flag = 0;
		 
	}
	requestAnimationFrame(draw);
}

window.onmousemove = function(e){
	mousex = e.x;
	mousey = e.y;		
}

