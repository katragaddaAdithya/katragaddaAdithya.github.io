function sleep(ms) {
   return new Promise(resolve => setTimeout(resolve, ms));
}

var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        }

        setTimeout(function() {
        that.tick();
        }, delta);
    };

    var slider = function(el, toRotate, period) {
            this.toRotate = toRotate;
            this.el = el;
            this.txt = '';
            this.tick();
        };

        slider.prototype.tick = function() {
            var fullTxt = this.toRotate;
            this.txt = fullTxt.substring(0, this.txt.length + 3);

            var that = this;
            var delta = 100;
            this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
            setTimeout(function() {
            that.tick();
          }, delta);
        };

    window.onload = function() {
        var slide = document.getElementsByClassName('slide');
        for (var i=0; i<slide.length; i++) {
            var data = slide[i].getAttribute('data');
            var period = slide[i].getAttribute('data-period');
            if(i < 3)
            {
              slide[i].setAttribute('class', 'down geetha-left card h4 slide');
              new slider(slide[i], data, period);
            }
            else {
              {
                slide[i].setAttribute('class', 'down geetha-right card h5 slide');
                new slider(slide[i], data, period);
              }
            }
            }
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
        document.body.appendChild(css);
    };

    async function loadingPage(){
      var load = document.getElementById('pulse-wrapper');
      var content = document.getElementById('content');

      await sleep(1000);
      load.style.visibility = 'hidden';
      content.style.visibility = 'visible';
    }
