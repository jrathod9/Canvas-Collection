var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = window.innerWidth;		
canvas.height = window.innerHeight;	

var cwidth = canvas.width;
var cheight = canvas.height;
var maxSpeed = 1;
var maxDistance = 100;
var interactionDistance = 100;
var maxParticles = 200; 
var particleRadius = 0.1;
var mousex,mousey;
var tog = -1;
var i;
var Particles = new Array();

var particle = function(x , y , vx, vy){
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
}
 
for( i=0; i < maxParticles ; i++ ){
    var x = Math.random()*cwidth;
    var y = Math.random()*cheight;
    var velx = (Math.random()*2-1);
    var vely = (Math.random()*2-1);
    var temp = new particle( x,y,velx,vely);  //Math.random()*cwidth, Math.random()*cheight
    Particles.push(temp);
 }

 requestAnimationFrame(draw);
 function draw(){
    c.clearRect(0,0,cwidth,cheight);
    c.fillStyle = 'rgba(0,0,0,0.5)';
    c.font = '15px Arial';
    c.fillText("CLICK TO TOGGLE INTERACTION!" , cwidth/2 - 130 , cheight/2)
    for( i=0; i < maxParticles ; i++ ){
        c.beginPath();
        c.fillStyle = 'rgba(242, 242, 242,0.1)';
        c.arc(Particles[i].x,Particles[i].y,particleRadius,0,Math.PI*2,false);
        
        Particles[i].x += Particles[i].vx;
        Particles[i].y += Particles[i].vy;

        if(Particles[i].x >= cwidth){
            Particles[i].vx *= -1;
            Particles[i].x = cwidth-1;
        }
        if(Particles[i].x <= 0){
            Particles[i].vx *= -1;
            Particles[i].x = 1;
        }
        if(Particles[i].y >= cheight ){
            Particles[i].vy *= -1;
            Particles[i].y = cheight-1;
        }
        if(Particles[i].y <=0 ){
            Particles[i].vy *= -1;
            Particles[i].y = 1;
        }
        c.fill();
        c.closePath();
    }

    
    for(i=0; i < maxParticles ; i++ )
    {
        var distance = dist(mousex,mousey,Particles[i].x,Particles[i].y);
        if(distance<= interactionDistance){
           if(tog == 1)
            {
            if(Particles[i].x > mousex ){
                Particles[i].x += (interactionDistance - distance);
            }
            else if(Particles[i].x < mousex) {
                Particles[i].x -= (interactionDistance - distance);

            }
            if(Particles[i].y > mousey ){
                Particles[i].y += (interactionDistance - distance);
            }
            else if(Particles[i].y < mousey) {
                Particles[i].y -= (interactionDistance - distance);

            }
             
            Particles[i].y += (interactionDistance - distance);
            }
            else{
            c.beginPath();
            c.strokeStyle = 'rgba(157, 210, 255,' + (distance%11)/10 + ')';
            c.moveTo(mousex,mousey);
            c.lineTo(Particles[i].x,Particles[i].y);
            c.lineWidth = 0.3;
            c.closePath();
            c.stroke();
            }
            
            
        }
    }
    var j;
    for(i=0;i<maxParticles;i++)
    {
        for(j=i+1;j<maxParticles;j++)
        {
            var distance = dist(Particles[j].x,Particles[j].y,Particles[i].x,Particles[i].y);
            if(distance<=maxDistance)
            {
                c.beginPath();
            c.strokeStyle = 'rgba(157, 210, 255,' + (distance%11)/10 + ')';
            c.moveTo(Particles[j].x,Particles[j].y);
            c.lineTo(Particles[i].x,Particles[i].y);
            c.closePath();
            c.stroke();
            }
        }
    }

    requestAnimationFrame(draw);
 }

 function dist(x1,y1,x2,y2){
     var res = Math.sqrt((x1-x2)**2 + (y1-y2)**2);
     return res;
 }
 window.onmousemove = function(e){
     mousex = e.x;
     mousey = e.y;
 }
 window.onclick = function(){
     tog*=-1;
 }