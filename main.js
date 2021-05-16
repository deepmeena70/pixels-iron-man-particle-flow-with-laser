const action = document.getElementById("action");
var status = 0;
var raf = 0;
const imgWidth = 231;
const imgHeight = 457;


const canvas = document.getElementById("canvas");
canvas.width = 231 * 5;
canvas.height = 600;
const ctx = canvas.getContext("2d");
const img = new Image();
img.src = 'ironman.png';


function drawImage() {
    ctx.drawImage(img, 450, 80, imgWidth, imgHeight);
}

img.addEventListener('load', () => {
    drawImage();
});

function change() {
    ctx.drawImage(img, 0, 0);

    let numberOfParticles = 2000;
    let particlesArray = [];
    let rayArray = [];
    let rayArray2 = [];

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vy = Math.random() * 4;
            this.vx = Math.random() * 1.4;
            this.size = Math.random() * 2 + 0.1;
        }

        update() {
            if (this.y < 0) {
                this.y = canvas.height;
            }
            this.y -= this.vy;
            if (this.x >= 340 && this.x < 600) {
                this.x -= this.vx * 2;
            }
            if (this.x >= 590 && this.x < 830) {
                this.x += this.vx * 2;
            }
        }
        draw() {
            ctx.beginPath();
            ctx.fillStyle = 'rgb(77,238,234)';
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    class Ray {
        constructor() {
            this.x = 590 + Math.random() * 6;
            this.y = Math.random() * canvas.height;
            this.velocity = Math.random() * 3;
            this.size = Math.random() * 2 + 0.1;
        }
        update() {
            if (this.y > canvas.height) {
                this.y = 0;
            }
            this.y += this.velocity;
            if (this.x >= 10 && this.x < 600) {
                this.x--;
            }
        }
        updateRay2() {
            if (this.y > canvas.height) {
                this.y = 0;
            }
            this.y += this.velocity;
            if (this.x >= 590 && this.x <= canvas.width - 12) {
                this.x++;
            }
        }
        draw() {
            ctx.beginPath();
            ctx.fillStyle = 'rgb(77,238,234)';
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
            rayArray.push(new Ray());
            rayArray2.push(new Ray());
        }
    }
    init();

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawImage();
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        for (let i = 0; i < rayArray.length; i++) {
            rayArray[i].update();
            rayArray[i].draw();
        }
        for (let i = 0; i < rayArray2.length; i++) {
            rayArray2[i].updateRay2();
            rayArray2[i].draw();
        }

        raf = requestAnimationFrame(animate);
    }
    animate();

}
action.addEventListener("click", () => {
    if (status == 0) {
        action.innerHTML = "Stop";
        status = 1;
        change();
        action.style.animation = "glow 800ms linear forwards";
        document.getElementById('text').style.animation = "textglow 500ms linear forwards";
        document.getElementById('text2').style.animation = "textglow 500ms linear forwards";
    } else {
        action.innerHTML = "Play";
        status = 0;
        cancelAnimationFrame(raf);
        action.style.animation = "glowoff 800ms linear forwards";
        document.getElementById('text').style.animation = "textglowoff 500ms linear forwards";
        document.getElementById('text2').style.animation = "textglowoff 500ms linear forwards";
    }
});