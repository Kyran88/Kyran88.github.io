var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var freq = 0.01;
var timer = 0;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.fillStyle="#000000";
ctx.fillRect(0, 0, canvas.width, canvas.height);
window.addEventListener('resize',resize,false);
render()

function drawSine(amp,color,pha,lineWeight){
  var gradient;
  ctx.beginPath();
  ctx.moveTo(0,window.innerHeight/2);
  for(var i = 0; i<window.innerWidth ;i++){
    var a = 1 - Math.abs(i - window.innerWidth/2) / (window.innerWidth/2);
    var o = a*amp;
    ctx.lineTo(i, (window.innerHeight/2 + 120*o*Math.sin(freq*i+timer+pha)));
  }
  
  if(lineWeight==1){
    ctx.lineWidth = 2;
  }else{
    ctx.lineWidth = 0.5;
  }
  gradient = ctx.createLinearGradient(0,0,window.innerWidth,0);
    gradient.addColorStop(0,"rgba(25, 255, 255, 0)");
    gradient.addColorStop(0.5,"rgba(255, 25, 255, 0.75)");
    gradient.addColorStop(1,"rgba(255, 255, 25, 0");
  ctx.strokeStyle = gradient;
  ctx.stroke();
}

function render(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle="#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawSine(1,"#ffffff",0,1);
  drawSine(-0.5,"#ffffff",0.5,0);
  drawSine(0.5,"#ffffff",1,0);
  drawSine(-0.3,"#ffffff",1.2,0);
  drawSine(0.3,"#ffffff",2,0);
  timer += 0.08;
  requestAnimationFrame(render)
}
function resize(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
