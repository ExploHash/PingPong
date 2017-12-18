//events
window.addEventListener("load", function(){
  init();
});
window.addEventListener("keydown", function(event){//als je de knop indrukt wordt deze funtie uitgevoerd
  keyeventdown(event);
});
window.addEventListener("keyup", function(event){//als je de knop los laat wordt deze functie uitegvoerd
  keyeventup(event);
});
//variables
var fps = 60;

var blokSpeed = 400; //px
var blokspeedperfps = blokSpeed / fps;

var ballSpeed = 500;
var balPositieX = 200;
var balPositieY = 200;
var balRichting = Math.round(Math.random() * 90) + 45;
var ballspeedperfps = ballSpeed / fps;

var blok1positie = 20;
var blok2positie = 20;
var bloklengte = 120;

var qpressed = false;
var apressed = false;
var ppressed = false;
var lpressed = false;

var blok1RaaktBovenkant = false;
var blok1RaaktOnderkant = false;
var blok2RaaktBovenkant = false;
var blok2RaaktOnderkant = false;
var balRaaktBovenkant = false;
var balRaaktOnderkant = false;
var balBreedte = 40;
var scoreL = 0;
var scoreR = 0;
//functions

function init(){
  setInterval(renderer, 1000 / fps); //laat de functie renderer 60 per seconde runnen
}

function renderer(){
  //calculate de nieuwe posities aan de hand van dat iemand de knop indrukt of niet
  calculateNewPos();
  //calculate wanneer de verplaatsing van een blok moet worden stopgezet
  collisionDetection();
  //render opnieuw
  updateBlok1();
  updateBlok2();
  updateBal();
  updateScorebord();
}

function calculateNewPos(){//calculate de nieuwe posities aan de hand van dat iemand de knop indrukt of niet
  //blokken
  if(qpressed && !blok1RaaktBovenkant){//als q is ingedrukt en het blok raakt niet de bovenkant
    blok1positie += -blokspeedperfps;
  }
  if(apressed && !blok1RaaktOnderkant){//als a is ingedrukt en het blok raakt niet de onderkant
    blok1positie += blokspeedperfps;
  }
  if(ppressed && !blok2RaaktBovenkant){//als p is ingedrukt en het blok raakt niet de boventkant
    blok2positie += -blokspeedperfps;
  }
  if(lpressed && !blok2RaaktOnderkant){//als l is ingedrukt en het blok raakt niet de onderkant
    blok2positie += blokspeedperfps;
  }
  //ball
  var hoekS = 90;
  var hoekR2 = 90 - balRichting;
  var hoekR1 = 180 - hoekS - hoekR2;
  var lengteS = ballspeedperfps;
  var lengteR1 = Math.cos(hoekR2) * ballspeedperfps;
  var lengteR2 = Math.sin(hoekR2) * ballspeedperfps;
  balPositieX += lengteR1;
  balPositieY += lengteR2;
}

function keyeventdown(event){//als een key wordt ingedrukt wordt die boolean true
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
function keyeventup(event){//als een key wordt losgelaten wordt die boolean false
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
function updateBlok1(){//update de postie van blok1
  var el = document.getElementById("blok1");
  el.style.top = blok1positie + "px";
}
function updateBlok2(howmuch){//update de positie van blok2
  var el = document.getElementById("blok2");
  el.style.top = blok2positie + "px";
}
function updateBal(){
  var el = document.getElementById("pingball");
  el.style.left = balPositieX + "px";
  el.style.top = balPositieY + "px";
}
function updateScorebord(){
  var elL = document.getElementById("scoreL");
  var elR = document.getElementById("scoreR");
  elL.innerHTML = scoreL;
  elR.innerHTML = scoreR;

}
function collisionDetection(){//kijk of de blokken de randen niet raken
  //elementen
  var blok1 = document.getElementById("blok1");
  var blok2 = document.getElementById("blok2");

  if(parseInt(blok1.style.top) <= 0){
    blok1RaaktBovenkant = true;
  }else{
    blok1RaaktBovenkant = false;
  }
  if(parseInt(blok2.style.top) <= 0){
    blok2RaaktBovenkant = true;
  }else{
    blok2RaaktBovenkant = false;
  }
  if(parseInt(blok1.style.top) + bloklengte >= window.innerHeight){
    blok1RaaktOnderkant = true;
  }else{
    blok1RaaktOnderkant = false;
  }
  if(parseInt(blok2.style.top) + bloklengte >= window.innerHeight){
    blok2RaaktOnderkant = true;
  }else{
    blok2RaaktOnderkant = false;
  }
  //ball
}
function hitwall() {
  if(balPositieX <= 0){
    scoreR++;
  }
  if(balPositieX + balBreedte/2 >= window.innerWidth){
    scoreL++;
  }
}
function resetscore() {
  if(scoreL==10){
  //resetScore();
}else{
  //
}
