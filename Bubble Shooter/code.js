var g = 0;					//GRAVITY for bullets
var maxEnemies = 20;			//Number of bubbles

// var bulletSound = new Howl({
// 	src: ['sound.mp3']
//   });
  
//   sound.play();

var canvas = document.querySelector('#canvas');
var c = canvas.getContext('2d');
canvas.width = window.innerWidth;		//0.7
canvas.height = window.innerHeight;	//0.9
c.fillStyle = 'black';
var cwidth = canvas.width;
var cheight = canvas.height;
var bullet = function(x,y,vx,vy){
	this.x = x;
	this.y = y;
	this.vx =  vx;
	this.vy = vy;
} 

var enemy = function(x,y,vx,vy){
	this.x = x;
	this.y = y;
	this.vx =  vx;
	this.vy = vy;
}

var Bullets = new Array();
var Enemies = new Array();
var j;
var ex,ey,evx,evy,eax,eay;
for(j=0;j<maxEnemies;j++)
{
	ex = Math.random()*(cwidth-50);
	ey = Math.random()*(cheight-50);
	evx = Math.random()*3;
	evy = Math.random()*3;
	var temp = new enemy(ex,ey,evx,evy);
	Enemies.push(temp);
}
var totalbullets = 0;
var i = 0;
var bulletradius = 5;
var enemyradius = 20;
var angle = 0;
var initialAngle = angle;
var pivotx = 20 , pivoty = 0;
var state = 0;
var clicks = 0;

requestAnimationFrame(draw);
var mousex,mousey;
function draw(){
	if(clicks == 0)
	{
		c.fillStyle = 'white';
		c.font = "14px Arial";
		c.fillText("| BUBBLE SHOOTER |", cwidth/2 - 40, cheight/2 - 20);
		c.fillText("(one bullet at a time recommended)", cwidth/2 -80, cheight/2);
		c.fillText("Click to begin!", cwidth/2 - 10, cheight/2 + 20);
	}
	else if(state == 0)
	{
		c.clearRect(0,0,window.innerWidth,window.innerHeight);
		c.beginPath();
		c.fillStyle = 'teal';
		c.arc(0,0,30,0,Math.PI*2,false);
		c.closePath();
		c.fill();

		for(i=0;i<totalbullets;i++)
		{	
			c.beginPath();
			c.fillStyle = 'rgb('+ Math.random()*255 + ',' + Math.random()*255 + ',' + Math.random()*255 + ')';
			c.arc(Bullets[i].x,Bullets[i].y,bulletradius,0,Math.PI*2,false);
			c.strokeStyle = 'red';
			c.closePath();
			c.fill();
			c.stroke();
			Bullets[i].x+=Bullets[i].vx;
			Bullets[i].vy += g;
			Bullets[i].y+=Bullets[i].vy;
			
		}
		for(i=0;i<Enemies.length;i++)
		{
			c.beginPath();
			c.arc(Enemies[i].x,Enemies[i].y,enemyradius,0,Math.PI*2,false);
			c.strokeStyle = 'teal';
			c.fillStyle = 'rgb(0, 191, 255,0.1)';
			c.closePath();
			c.fill();
			c.stroke();
			Enemies[i].x+=Enemies[i].vx;
			Enemies[i].y+=Enemies[i].vy;

			if(Enemies[i].x >= cwidth || Enemies[i].x <= 0)
			{
				Enemies[i].vx*=-1;
			}
			if(Enemies[i].y >= cheight || Enemies[i].y <= 0)
			{
				Enemies[i].vy*=-1;
			}

		}

		for(i=0;i<totalbullets;i++)
			{
				for(j=0;j<Enemies.length;j++)
				{
					if((Enemies[j].x-Bullets[i].x)**2 + (Enemies[j].y - Bullets[i].y)**2 <= (bulletradius+enemyradius)**2)
					{
						Enemies.splice(j,1);
					}
				}
			}
			
		var height = mousey - pivoty;
		var base = mousex - pivotx;
		var anglefrombase = Math.atan(height/base);
		var change = anglefrombase- initialAngle;
		var initialangle = anglefrombase;
		c.translate(pivotx,pivoty);
		c.rotate(change);
		c.translate(-1*pivotx, -1*pivoty);	
		c.fillStyle = 'teal';
		c.fillRect(pivotx, pivoty, 40,20 );			
		c.translate(pivotx,pivoty);
		c.rotate(-1*change);
		c.translate(-1*pivotx, -1*pivoty);	
		if(Enemies.length == 0)
			{
				state = 1;
			}
	}
	else{
		c.clearRect(0,0,window.innerWidth,window.innerHeight);
		c.font = "20px Arial";
		c.fillText("GOOD JOB!", cwidth/2-40, cheight/2 - 10);
		c.fillText("Bullets Used : " + Bullets.length , cwidth/2-45, cheight/2+10);
		c.fillText("(Refresh window to play again.) ", cwidth/2-115, cheight/2+30);

	}
	requestAnimationFrame(draw);
}
window.onmousemove = function(e) {
	mousex = e.x;
	mousey = e.y;
}

window.onmousedown= function(e){
	if(clicks==0)
		clicks=1;
	var ang = Math.atan((e.x - pivotx)/(e.y - pivoty));
	var temp = new bullet(40 * Math.sin(ang),40 * Math.cos(ang),(e.x-pivotx)/25 , (e.y-pivoty)/25);
	Bullets.push(temp);
	if(state==0)
		totalbullets+=1;
}