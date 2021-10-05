function sleep(ms) {
   return new Promise(resolve => setTimeout(resolve, ms));
}

window.onload = function() {
  loadingPage();
  var animeRight = document.querySelectorAll('div#anime-right');
  var animeLeft = document.querySelectorAll('div#anime-left');
  for (var i = 0; i < animeLeft.length; i++) {
    animeLeft[i].setAttribute('class', 'down geetha-left card h5');
    animeLeft[i].innerHTML = "<div class = 'line-1 anim-typewriter'>" + animeLeft[i].getAttribute('data') + "</div>";
  }
  for (var i = 0; i < animeRight.length; i++) {
    animeRight[i].setAttribute('class', 'down geetha-right card h5');
    animeRight[i].innerHTML = "<div class = 'line-1 anim-typewriter'>" + animeRight[i].getAttribute('data') + "</div>";
  }

// easal stuff goes hur
  var xCenter = 150;
  var yCenter = 150;
  var stage = new createjs.Stage('joystick');

  var psp = new createjs.Shape();
  psp.graphics.beginFill('#00000').drawCircle(xCenter, yCenter, 50);

  psp.alpha = 0.25;

  //var vertical = new createjs.Shape();
  //var horizontal = new createjs.Shape();
  //vertical.graphics.beginFill('#666').drawRect(150, 0, 2, 300);
  //horizontal.graphics.beginFill('#666').drawRect(0, 150, 300, 2);

  stage.addChild(psp);
  //stage.addChild(vertical);
  //stage.addChild(horizontal);
  createjs.Ticker.addEventListener('tick', stage);
  stage.update();

  var myElement = $('#joystick')[0];
  planetMaking();
  // create a simple instance
  // by default, it only adds horizontal recognizers
  var mc = new Hammer(myElement);

  mc.on("panstart", function(ev) {
    var pos = $('#joystick').position();
    xCenter = psp.x;
    yCenter = psp.y;
    psp.alpha = 0.5;
    document.getElementById('joystick').style.cursor = 'grabbing';
    stage.update();
  });

  // listen to events...
  mc.on("panmove", function(ev) {
    var pos = $('#joystick').position();
    var x = (ev.center.x - pos.left - 150);
    var y = (ev.center.y - pos.top - 150);
    $('#xVal').text('X: ' + x);
    $('#yVal').text('Y: ' + (-1 * y));

    var coords = calculateCoords(ev.angle, ev.distance);

    $('#angVal').text('Angle: ' + ev.angle);
    $('#disVal').text('Distance: ' + ev.distance);

    if(ev.angle > -45 && ev.angle < 45 && ev.distance > 60){
      TimelineOpen();
    }
    else if ((ev.angle < -135 || ev.angle > 135) && ev.distance > 60) {
      SkillsOpen();
    }

    psp.x = coords.x;
    psp.y = coords.y;

    psp.alpha = 0.5;

    stage.update();
  });

  mc.on("panend", function(ev) {
    document.getElementById('joystick').style.cursor = 'grab';
    psp.alpha = 0.25;
    createjs.Tween.get(psp).to({x:xCenter,y:yCenter},750,createjs.Ease.elasticOut);
  });
}

/* Open when someone clicks on the span element */
async function TimelineOpen() {
  document.getElementById('Timeline').style.left = 0;
  document.getElementById('innerTime').style.display = 'none';
  document.getElementById("Timeline").style.width = "100%";
  await sleep(360);
  document.getElementById('innerTime').style.display = 'inline';
}
/* Close when someone clicks on the "x" symbol inside the overlay */
function TimelineClose() {
  document.getElementById('innerTime').style.display = 'none';
  document.getElementById("Timeline").style.width = "0%";
}

async function SkillsOpen() {
  document.getElementById('Skills').style.right = 0;
  document.getElementById('innerSkills').style.display = 'none';
  document.getElementById("Skills").style.width = "100%";
  await sleep(360);
  document.getElementById('innerSkills').style.display = 'inline';
}
/* Close when someone clicks on the "x" symbol inside the overlay */
function SkillsClose() {
  document.getElementById('innerSkills').style.display = 'none';
  document.getElementById("Skills").style.width = "0%";
}

async function loadingPage(){
  var load = document.getElementById('pulse-wrapper');
  var content = document.getElementById('content');

  await sleep(5000);
  load.style.visibility = 'hidden';
  content.style.visibility = 'visible';
}

function calculateCoords(angle, distance) {
  var coords = {};
  distance = Math.min(distance, 100);
  var rads = (angle * Math.PI) / 180.0;

  coords.x = distance * Math.cos(rads);
  coords.y = distance * Math.sin(rads);

  return coords;
}

function planetMaking(){
  var myElement = $('#joystick')[0];
  myElement.style.boxShadow = 'inset -10px -10px 40px #111, inset 10px 10px 30px -10px rgba(255, 255, 255, 1)';
  myElement.style.background = 'url(../img/mars.png) repeat-x';
  myElement.style.animation = 'translateBackground 15s infinite linear';
  myElement.style.opacity = 1;

}

function showingArrow(){
  var showArrow = document.getElementById('customSwitch1');
  var arrow = document.querySelectorAll('.title');
  if (showArrow.checked){
    for ( var i=0; i< arrow.length; i++){
        arrow[i].style.visibility = 'hidden';
    }
  }
  else{
    for ( var i=0; i< arrow.length; i++){
        arrow[i].style.visibility = 'visible';
    }
  }
}

async function loadingPage(){
  var load = document.getElementById('pulse-wrapper');
  var content = document.getElementById('content');

  await sleep(2000);
  load.style.visibility = 'hidden';
  content.style.visibility = 'visible';
}
