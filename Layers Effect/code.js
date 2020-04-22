var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
canvas.height = window.innerHeight-20;
canvas.width  = window.innerWidth - 20;

var ob = function(x,y,clr){
    this.x = x;
    this.y = y;
    this.clr = clr;
}

var centerx  = window.innerWidth/2 - 240;
var centery = window.innerHeight/2;
var scalerx = 50 ,scalery = 20;

var mousex=0,mousey=0;
var thresholdx=0,thresholdy=0;

var str = "Jay Rathod";
var layers = new Array();

var first = new ob(window.innerWidth/2-240, window.innerHeight/2 , "tomato"); //yellow

var middle = new ob(window.innerWidth/2-240,window.innerHeight/2,"aquamarine");   //red

var bottom = new ob(window.innerWidth/2-240,window.innerHeight/2 ,"white");

// layers.push(top);
layers.push(first);
layers.push(middle);
layers.push(bottom);


requestAnimationFrame(draw);
function draw(){

    //calculate threshold
    thresholdx = (centerx-mousex)/scalerx;
    thresholdy = (centery-mousey)/scalerx;

    layers[0].x = centerx-thresholdx;
    layers[2].x = centerx+thresholdx;
    layers[0].y = centery-thresholdy;
    layers[2].y = centery+thresholdy;

    c.clearRect(0,0,window.innerWidth,window.innerHeight);
    var i;
    c.font = "100px Pacifico";
    c.beginPath();
    c.globalAlpha = 0.6;
    for(i=0;i<layers.length;i++){
        console.log(layers[i]);
        c.fillStyle = layers[i].clr;
        c.fillText(str,layers[i].x,layers[i].y);
    }
    c.closePath();

    requestAnimationFrame(draw);
}

window.onmousemove = function(e) {
	mousex = e.x;
	mousey = e.y;
}
