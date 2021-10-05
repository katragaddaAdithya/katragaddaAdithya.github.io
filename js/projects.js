function sleep(ms) {
   return new Promise(resolve => setTimeout(resolve, ms));
}

var Dot = function(el, toRotate, period) {
        this.el = el;
        this.toRotate = toRotate;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    Dot.prototype.tick = function() {
        var fullTxt = this.toRotate;

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, 0);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<div>Working on IT'+this.txt+'</div>';
        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        delta = 500;
        }
        setTimeout(function() {
        that.tick();
        }, delta);
    };

    window.onload = function(){
      loadingPage();
      var elements = document.getElementsByClassName('Dot');
      for (var i=0; i<elements.length; i++) {
          var period = elements[i].getAttribute('data-period');
          new Dot(elements[i],'......🎈', period);
      }
    }

function contentSize(i){
  var img = document.getElementsByTagName('img');
  img[i-1].style.opacity = 0.02;
}

function setOpacity(i) {
  var img = document.getElementsByTagName('img');
  img[i-1].style.opacity = 1;
}

async function loadingPage(){
  var load = document.getElementById('pulse-wrapper');
  var content = document.getElementById('content');

  await sleep(2000);
  load.style.visibility = 'hidden';
  content.style.visibility = 'visible';
}
