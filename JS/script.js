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

var blokSpeed = 800; //px
var blokspeedperfps = blokSpeed / fps;

var ballSpeed = 250;
var ballSpeedPlusPerFPS = 0.3;
var balPositieX = 0;
var balPositieY = 0;
var balRichting = 0;
var balinhetveld = true;
var ballspeedperfps = ballSpeed / fps;

var blok1positie = 20;
var blok2positie = 20;
var blokBreedte = 10;
var margin = 40;
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
var balRaaktBlok1 = false;
//functions
//event funtions
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

function init(){
  setInterval(renderer, 1000 / fps); //laat de functie renderer 60 per seconde runnen
  alert("Welkom!\n\nQ/P: Up\nA/L: Down"); //show info
  balReset(); //reset de bal
}

function renderer(){//word 60 keer per seconde gecalled
  //calculate de nieuwe posities aan de hand van dat iemand de knop indrukt of niet
  calculateNewPos();
  //calculate wanneer de verplaatsing van een blok moet worden stopgezet
  collisionDetection();
  //recalculate the ballSpeed
  recalculateBalSpeed();
  //check if walls are getting hit
  hitwall();
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
  //recalculate ball position
  ballspeedperfps = ballSpeed / fps;
  hoekS = 90;
  hoekR2 = 90 - balRichting;
  hoekR1 = 180 - hoekS - hoekR2;
  lengteS = ballspeedperfps;
  lengteR1 = Math.cos(toRadians(hoekR2)) * ballspeedperfps;
  lengteR2 = Math.sin(toRadians(hoekR2)) * ballspeedperfps;
  //set
  balPositieX += lengteR1;
  balPositieY += lengteR2;
}

function collisionDetection(){//kijk of de blokken de randen niet raken
  //elementen
  var blok1 = document.getElementById("blok1");
  var blok2 = document.getElementById("blok2");

  //blokken
  if(blok1positie <= 0){
    blok1RaaktBovenkant = true;
  }else{
    blok1RaaktBovenkant = false;
  }
  if(blok2positie <= 0){
    blok2RaaktBovenkant = true;
  }else{
    blok2RaaktBovenkant = false;
  }
  if(blok1positie + bloklengte >= window.innerHeight){
    blok1RaaktOnderkant = true;
  }else{
    blok1RaaktOnderkant = false;
  }
  if(blok2positie + bloklengte >= window.innerHeight){
    blok2RaaktOnderkant = true;
  }else{
    blok2RaaktOnderkant = false;
  }
  //bal
  if(balPositieY <= 0 || balPositieY + balBreedte >= window.innerHeight){//bal raakt een van de wanden
    balRichting = 180 - balRichting;
  }

  if(balPositieX < (blokBreedte + margin) && (balPositieY + balBreedte > blok1positie && balPositieY < (blok1positie + bloklengte)) && balRichting.mod(360) > 180 && balRichting.mod(360) < 360) {//bal raakt linker blok
    balRichting = 340 - balRichting + Math.round(Math.random() * 40); //invert balrichting met 40 graden random
  }

  if(balPositieX + balBreedte > (window.innerWidth - (blokBreedte + margin)) && (balPositieY + balBreedte > blok2positie && balPositieY < (blok2positie + bloklengte)) && balRichting.mod(360) < 180) {//bal raakt rechter blok
    balRichting = 340 - balRichting + Math.round(Math.random() * 40); //invert balrichting met 40 graden random
  }

}

function hitwall() {//check if de wall get hit
  if(balPositieX + balBreedte/2 <= 0){ //linker muur
    scoreR++;
    balReset();
  }
  if(balPositieX + balBreedte/2 >= window.innerWidth){//rechtermuur
    scoreL++;
    balReset();
  }
  checkReset();
}

function checkReset() {//check if score needs to be reset
  if(scoreL == 10){
    scoreL = 0;
    scoreR = 0;
  alert('left side wins!!!!!');
  }
  if(scoreR == 10){
    scoreL = 0;
    scoreR = 0;
  alert('right side wins!!!!!');
  }
}

function recalculateBalSpeed(){
  ballSpeed += ballSpeedPlusPerFPS;
}

function balReset(){//reset de bal
  //save highscore
  if(parseInt(localStorage.getItem("hs")) < ballSpeed || localStorage.getItem("hs") == null){
    localStorage.setItem("hs", parseInt(ballSpeed));
  }
  balPositieX = window.innerWidth / 2;
  balPositieY = window.innerHeight / 2;
  balRichting = generateRandomDegree();
  ballSpeed = 200; //reset ballspeed
}

function generateRandomDegree(){
  //choose left(0) or right(1)
  var lr = Math.round(Math.random());
  if(lr == 0){
    return Math.round(Math.random() * 90 + 45);
  }else{
    return Math.round(Math.random() * 90 + 235);
  }
}

//render functies
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
  var speed = document.getElementById("speed");
  var hs = document.getElementById("highscore");
  hs.innerHTML = localStorage.getItem("hs");
  speed.innerHTML = Math.round(ballSpeed);
  elL.innerHTML = scoreL;
  elR.innerHTML = scoreR;
}

//niet zelf gescreven functies
function toDegrees (angle) {
  return angle * (180 / Math.PI);
}
function toRadians (angle) {
  return angle * (Math.PI / 180);
}
Number.prototype.mod = function(n) {
    return ((this % n) + n) % n;
}
