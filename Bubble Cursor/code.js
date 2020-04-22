var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
canvas.height = window.innerHeight-20;
canvas.width  = window.innerWidth - 20;
var cheight = canvas.height;
var cwidth = canvas.width;
initialopac = 0.00;

var particle = function(x,y,vx,vy,rad,opacity,clr){
    this.x = x ;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.rad = rad;
    this.opacity = opacity;
    this.clr = clr;
}

var maxDistance = 40;
var mousex = 0, mousey = 0;
var particleRadius = 5;
var maxParticles =1500;
var Particles = new Array();
var ParmArr = new Array();
var ParmLength = 0;

for( i=0; i < maxParticles ; i++ ){
    var x = Math.random()*cwidth;
    var y = Math.random()*cheight;
    var velx = (Math.random()*2-1)/2;
    var vely = (Math.random()*2-1)/2;
    var col = 'rgba('+Math.random()*255+ ',' + Math.random()*255 + ',' + Math.random()*255 + ',';
    var temp = new particle( x,y,velx,vely,particleRadius,initialopac,col);  //Math.random()*cwidth, Math.random()*cheight
    Particles.push(temp);
 }
    var opac = 0.5;
    var toggle=1;
 requestAnimationFrame(draw);
 function draw(){
    c.clearRect(0,0,cwidth,cheight);
    
    c.font = "20px Arial";
    c.fillStyle = 'rgba(23,12,34,0.5)';
    c.fillText("Move the pointer slowly over the screen..",window.innerWidth/2 - 150 , window.innerHeight/2- 20);

    if(opac > 1 || opac <= 0.5)
        toggle*=-1;
    
    if(toggle==-1)
        opac+=0.01;
    else   
        opac-=0.01;

    // for(i=0;i<ParmLength;i++)
    // {
    //     c.beginPath();
    //     c.fillStyle = Particles[i].clr + Particles[i].opacity + ')';
    //     c.arc(ParmArr[i].x,ParmArr[i].y,ParmArr[i].rad,0,Math.PI*2,false);
    //     c.closePath();
    //     c.fill();
    // }
    for( i=0; i < maxParticles ; i++ ){
        c.beginPath();
        c.fillStyle = Particles[i].clr + Particles[i].opacity + ')';
        c.arc(Particles[i].x,Particles[i].y,Particles[i].rad,0,Math.PI*2,false);

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

    var j;
    for(i=0;i<maxParticles;i++)
    {

        var distance = dist(Particles[i].x,Particles[i].y,mousex,mousey);
        if(distance<=maxDistance && Particles[i].rad<40)
        {
            Particles[i].rad+=2;
            if(Particles[i].opacity<=0.5)
                Particles[i].opacity+=0.1;
        }
        else if(Particles[i].rad > particleRadius )
        {
            Particles[i].rad-=2;
            if(Particles[i].opacity>0)
            Particles[i].opacity -= 0.1;
        }
        else{
            Particles[i].rad = particleRadius;
            Particles[i].opacity = initialopac;
        }
        
    }

    requestAnimationFrame(draw);
}

window.onclick = function(){

    var i=0;
    for(i=0;i<maxParticles;i++)
    {
    var distance = dist(Particles[i].x,Particles[i].y,mousex,mousey);
    if(distance<=maxDistance)
    {
        ParmArr.push(Particles[i]);
        ParmLength+=1;
    }
    }
}
function dist(x1,y1,x2,y2){
    var res = Math.sqrt((x1-x2)**2 + (y1-y2)**2);
    return res;
}
window.onmousemove = function(e){
    mousex = e.x;
    mousey = e.y;
}