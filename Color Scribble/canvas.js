var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


c.beginPath();
c.moveTo(0,0);
var x=0,y=0;
c.beginPath();
requestAnimationFrame(draw);
function draw(){
	c.moveTo(x,y);
	
	x = Math.random()*1325;
	y = Math.random()*600;
	c.lineTo(x,y);
	c.stroke();
	c.strokeStyle ='rgb('+Math.random()*255+','+Math.random()*255+','+Math.random()*255+')'; 
	requestAnimationFrame(draw);
}

// TO CHANGE LINE COLOR EVERYTIME

// c.beginPath();
// // c.moveTo(0,0);
// var x=0,y=0;
// requestAnimationFrame(draw);
// function draw(){
// 	c.beginPath();
// 	c.moveTo(x,y);
// 	x = Math.random()*600;
// 	y = Math.random()*600;
// 	c.lineTo(x,y);
// 	// c.moveTo(x,y);
// 	c.closePath();
// 	c.stroke();
// 	c.strokeStyle ='rgb('+Math.random()*255+','+Math.random()*255+','+Math.random()*255+')'; 
// 	requestAnimationFrame(draw);
// }

