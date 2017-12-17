//events
window.addEventListener("load", function(){
  init();
});
window.addEventListener("keydown", function(event){
  keyevent(event);
});
//variables
var blokSpeed = 10; //px

//functions
function init(){
  alert("hello");
}

function keyevent(event){
  switch(event.key){
    case 'q':
      moveBlok1(blokSpeed);
      break;
    case 'a':
      moveBlok1(-blokSpeed);
      break;
    case 'p':
      moveBlok2(blokSpeed);
      break;
    case 'l':
      moveBlok2
  }
  if(event.key == "a"){

  }
}

function moveBlok1(howmuch){
  var el = document.getElementById("blok1");
  el.style.top = parseInt(el.style.top) + howmuch + "px";
}
