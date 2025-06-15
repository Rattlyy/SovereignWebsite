

// Mobile Nav Toggles

function openNavbar() {
    var navbar = document.getElementsByClassName("mobile-nav-bar")[0];
    var p_content = document.getElementsByClassName("main-content")[0];
    if (navbar !== null & p_content !== null) {
      navbar.removeAttribute("closed");
      p_content.removeAttribute("closed");
    }
}
function closeNavbar() {
    var navbar = document.getElementsByClassName("mobile-nav-bar")[0];
    var p_content = document.getElementsByClassName("main-content")[0];
    if (navbar !== null & p_content !== null) {
      navbar.setAttribute("closed","");
      p_content.setAttribute("closed","");
    }
}

// Accordion Open / Close

document.addEventListener("DOMContentLoaded", function() {
    var activeItems = document.querySelectorAll(".accordion > .accordion-item.is-active");
    activeItems.forEach(function(item) {
    });

    var accordionItems = document.querySelectorAll(".accordion > .accordion-item");
    accordionItems.forEach(function(item) {
        item.addEventListener("click", function() {
            accordionItems.forEach(function(sibling) {
                if (sibling !== item) {
                    sibling.classList.remove("is-active");
                }
            });

            item.classList.toggle("is-active");
        });
    });
});


// Particle background

class Particle {
    constructor(canvas, ctx) {
      this.canvas = canvas;
      this.ctx = ctx;
      this.reset();
      this.y = Math.random() * canvas.height;
      this.fadeDelay = Math.random() * 600 + 100;
      this.fadeStart = Date.now() + this.fadeDelay;
      this.fadingOut = false;
    }

    reset() {
      this.x = Math.random() * this.canvas.width;
      this.y = Math.random() * this.canvas.height;
      this.speed = Math.random() / 5 + 0.1;
      this.opacity = 1;
      this.fadeDelay = Math.random() * 600 + 100;
      this.fadeStart = Date.now() + this.fadeDelay;
      this.fadingOut = false;
    }

    update() {
      this.y -= this.speed;
      if (this.y < 0) {
        this.reset();
      }

      this.opacity = 1 - (this.y / this.canvas.height);

      if (!this.fadingOut && Date.now() > this.fadeStart) {
        this.fadingOut = true;
      }

      if (this.fadingOut) {
        this.opacity -= 0.008;
        if (this.opacity <= 0) {
          this.reset();
        }
      }

      //this.opacity = Math.max(0, Math.min(1, this.opacity));
    }

    draw() {
      this.ctx.fillStyle = `rgba(${255 - Math.random() * 255}, 255, 255, ${this.opacity})`;
      var rs = Math.random() * 2;
      this.ctx.fillRect(this.x, this.y, rs, rs + 1);
    }
  }

  class ParticleSystem {
    constructor() {
      this.canvas = document.querySelector('.canvas');
      this.ctx = this.canvas.getContext('2d');
      this.particles = [];
      this.updateCanvasSize();
      this.initParticles();
      this.animate();
      window.addEventListener('resize', () => this.onResize());
    }

    updateCanvasSize() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }

    calculateParticleCount() {
      return Math.floor((this.canvas.width * this.canvas.height) / 4000);
    }

    initParticles() {
      this.particles = [];
      const particleCount = this.calculateParticleCount();
      for (let i = 0; i < particleCount; i++) {
        this.particles.push(new Particle(this.canvas, this.ctx));
      }
    }

    animate() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(() => this.animate());
    }

    onResize() {
      this.updateCanvasSize();
      this.initParticles();
    }
  }
  addEventListener("DOMContentLoaded", (event) => {
    new ParticleSystem();
  });


  // Copy to clipboard
  
  function copyToClipboard(content) {
    navigator.clipboard.writeText(content);
    console.log("Copied to clipboard.");
  }