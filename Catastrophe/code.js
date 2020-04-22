var canvas = document.getElementById('main');
canvas.width = 600;
canvas.height = 500;
var c = canvas.getContext('2d');

var max_particles = 50;     //ALTER PARTICLES

function randomNumber(upper, lower) {
return (Math.random()*(upper-lower)+1)+lower-1;
}


var particle = function(x,y,vx,vy,ax,ay){
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.ax = ax;
  this.ay = ay;
}

var colors = ['148, 0, 211','75, 0, 130','0, 0, 255','0, 255, 0','	255, 255, 0','	255, 127, 0','255, 0 , 0']

var particles = new Array();

var i;
// var toggler = 1;
for(i=0;i<max_particles;i++){
  let vxx = randomNumber(-2,2);
  let vyy = randomNumber(-2,2);
  let axx = randomNumber(-2,2);
  let ayy = randomNumber(-2,2);
  let temp = new particle(300,250,vxx,vyy,axx,ayy);
  particles.push(temp);
}


i=0;

// canvas.addEventListener('click',attract);

// function attract(){
//   for(i=0;i<max_particles;i++)
//    {
      
//    }
  
// }

function draw(){
  // c.clearRect(0,0,600,500);
  c.fillStyle = 'rgba(0,0,0,0.1)';
  c.fillRect(0, 0 ,600, 500);
  for(i=0;i<max_particles;i++){
    c.strokeStyle = 'rgb(' + colors[Math.floor(Math.random()*7)] + ')';
    c.beginPath();
    c.arc(particles[i].x, particles[i].y, 6, 0, 2*Math.PI, false);
    c.closePath();
    c.stroke();
    c.fill();
    particles[i].x += particles[i].vx;
    particles[i].y += particles[i].vy;
    particles[i].vx += particles[i].ax;
    particles[i].vy += particles[i].ay;
    particles[i].vx %= 50;
    particles[i].vy %= 50;
    
    // particles[i].vx %= 30;
    // particles[i].vy %= 30;
    
    if(particles[i].x > 600){
      particles[i].vx *= -1;
      particles[i].x = 600;
    }
    if(particles[i].x < 0){
     particles[i].vx *= -1;
     particles[i].x = 0;
    }
    if(particles[i].y > 500){
      particles[i].vy *= -1;
      particles[i].y = 500;
    }
    if(particles[i].y < 0){
      particles[i].vy *= -1;
      particles[i].y = 0;
    }
  }

  requestAnimationFrame(draw);
}
draw();

