//events
window.addEventListener("load", function(){
  init();
});
window.addEventListener("keydown", function(event){
  keyeventdown(event);
});
window.addEventListener("keyup", function(event){
  keyeventup(event);
});
//variables
var fps = 60;

var blokSpeed = 400; //px
var blokspeedperfps = blokSpeed / fps;
var ballSpeed = 500;
var ballspeedperfps = ballSpeed / fps;
var blok1positie = 20;
var blok2positie = 20;

var qpressed = false;
var apressed = false;
var ppressed = false;
var lpressed = false;
var stopCalcUp1 = false;
var stopCalcUp2 = false;
var stopCalcDown1 = false;
var stopCalcDown2 = false;
//functions
function renderer(){
  //calculate opnieuw
  calculateNewPos();
  //calculate if stopped
  stop();
  //render opnieuw
  updateBlok1();
  updateBlok2();
}
function init(){
  setInterval(renderer, 1000 / fps);
}

function calculateNewPos(){
    if(qpressed && !stopCalcUp1){
      blok1positie += -blokspeedperfps;
    }
    if(apressed && !stopCalcDown1){
      blok1positie += blokspeedperfps;
    }
    if(ppressed && !stopCalcUp2){
      blok2positie += -blokspeedperfps;
    }
    if(lpressed && !stopCalcDown2){
      blok2positie += blokspeedperfps;
    }
}

function keyeventdown(event){
  switch(event.key){
    case 'q':
      qpressed = true;
      break;
    case 'a':
      apressed = true;
      break;
    case 'p':
      ppressed = true;
      break;
    case 'l':
      lpressed = true;
      break;
  }
}
function keyeventup(event){
  switch(event.key){
    case 'q':
      qpressed = false;
      break;
    case 'a':
      apressed = false;
      break;
    case 'p':
      ppressed = false;
      break;
    case 'l':
      lpressed = false;
      break;
  }
}
function updateBlok1(){
  var el = document.getElementById("blok1");
  el.style.top = blok1positie + "px"; //dit moet niet uitgevoerd wordens als el.style.top kleiner of gelijk aan 1
}

function updateBlok2(howmuch){
  var el = document.getElementById("blok2");
  el.style.top = blok2positie + "px";
}

function stop(){
  var blok1 = document.getElementById("blok1");
  var blok2 = document.getElementById("blok2");
  if(parseInt(blok1.style.top) <= 0){
    stopCalcUp1 = true;
  }else{
    stopCalcUp1 = false;
  }
  if(parseInt(blok2.style.top) <= 0){
    stopCalcUp2 = true;
  }else{
    stopCalcUp2 = false;
  }
  if(parseInt(blok1.style.top) >= window.innerHeight){
    stopCalcDown1 = true;
  }else{
    stopCalcDown1 = false;
  }
  if(parseInt(blok2.style.top) >= window.innerHeight){
    stopCalcDown2 = true;
  }else{
    stopCalcDown2 = false;
  }
}
