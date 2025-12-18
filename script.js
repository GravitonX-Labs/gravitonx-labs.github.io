// --- 1. INITIALIZE ANIMATIONS (AOS) ---
window.addEventListener('load', () => {
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 1000, once: true, offset: 50, easing: 'ease-out-cubic' });
    }
});

// --- 2. PAGE TRANSITION ---
document.addEventListener("DOMContentLoaded", () => {
    const curtain = document.querySelector('.page-transition');
    if(curtain) { curtain.style.transform = 'scaleY(0)'; } 
});

document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(e) {
        if(this.href.includes('#') || this.target === '_blank' || this.getAttribute('download')) return;
        e.preventDefault();
        const target = this.href;
        const curtain = document.querySelector('.page-transition');
        curtain.style.transformOrigin = 'bottom';
        curtain.style.transform = 'scaleY(1)';
        setTimeout(() => { window.location.href = target; }, 800);
    });
});

// --- 3. GLOBAL TYPING EFFECT ---
if (document.getElementById('typewriter')) {
    let pageText = [];
    if (window.location.href.includes("products")) {
        pageText = ['Accessing Product Database...', 'Loading PrismCore Modules...', 'Deploying Ecosystem.'];
    } else if (window.location.href.includes("focusguard")) {
        pageText = ['Initializing Strict Protocol...', 'Scanning Processes...', 'Flow State: ACTIVE.'];
    } else {
        pageText = ['System Status: ONLINE', 'Physics Engine: VERLET-X', 'Welcome to GravitonX.'];
    }
    new Typed('#typewriter', { strings: pageText, typeSpeed: 40, backSpeed: 20, startDelay: 500, backDelay: 2000, loop: true, showCursor: false });
}

// --- 4. CUSTOM CURSOR ---
const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');
if (window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener("mousemove", (e) => {
        const posX = e.clientX; const posY = e.clientY;
        if(dot) { dot.style.left = `${posX}px`; dot.style.top = `${posY}px`; }
        if(outline) { outline.animate({ left: `${posX}px`, top: `${posY}px` }, { duration: 500, fill: "forwards" }); }
    });
} else {
    if(dot) dot.style.display = "none";
    if(outline) outline.style.display = "none";
}

// --- 5. NEURAL BACKGROUND (ORIGINAL ELEGANT VERSION) ---
const canvas = document.getElementById('neural-canvas');
if(canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    const mouse = { x: null, y: null, radius: 150 };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            // ELEGANCE FACTOR 1: Small, varied sizes
            this.size = Math.random() * 2; 
            this.baseX = this.x;
            this.baseY = this.y;
            this.density = (Math.random() * 30) + 1;
            // ELEGANCE FACTOR 2: The Original Color Palette
            this.color = Math.random() > 0.5 ? "#5D5FEF" : "#00F0FF";
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        update() {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            let maxDistance = mouse.radius;
            let force = (maxDistance - distance) / maxDistance;
            let directionX = forceDirectionX * force * this.density;
            let directionY = forceDirectionY * force * this.density;

            if (distance < mouse.radius) {
                this.x -= directionX;
                this.y -= directionY;
            } else {
                if (this.x !== this.baseX) {
                    let dx = this.x - this.baseX;
                    this.x -= dx / 10;
                }
                if (this.y !== this.baseY) {
                    let dy = this.y - this.baseY;
                    this.y -= dy / 10;
                }
            }
        }
    }

    function init() {
        particles = [];
        // ELEGANCE FACTOR 3: Lower density (100 particles is cleaner than 150)
        for (let i = 0; i < 100; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].draw();
            particles[i].update();
            for (let j = i; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                // ELEGANCE FACTOR 4: Short distance and Low Opacity
                if (distance < 100) {
                    ctx.beginPath();
                    // Very subtle line color
                    ctx.strokeStyle = 'rgba(93, 95, 239, 0.15)'; 
                    ctx.lineWidth = 1; // Thin lines
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }

    init();
    animate();
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });
}
// HOLOGRAPHIC CARD EFFECT
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".product-card, .glass-card");
    const container = document.querySelector(".products-section"); // Parent container

    if(container) {
        container.onmousemove = e => {
            for(const card of cards) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty("--mouse-x", `${x}px`);
                card.style.setProperty("--mouse-y", `${y}px`);
            }
        };
    }
});