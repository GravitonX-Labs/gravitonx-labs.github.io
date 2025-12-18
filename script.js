// script.js - ULTRA BRIGHT INTERACTIVE VERSION

document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. SAFE ANIMATION INIT (AOS) ---
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, once: true, offset: 50 });
    }

    // --- 2. TYPING EFFECT ---
    const typeElement = document.getElementById('typewriter');
    if (typeElement && typeof Typed !== 'undefined') {
        let pageText = ['System Status: ONLINE', 'Physics Engine: VERLET-X', 'Welcome to GravitonX.'];
        if (window.location.href.includes("products")) {
            pageText = ['Accessing Database...', 'Loading Modules...', 'Deploying Ecosystem.'];
        }
        new Typed('#typewriter', { 
            strings: pageText, typeSpeed: 40, backSpeed: 20, startDelay: 500, backDelay: 2000, loop: true, showCursor: false 
        });
    }

    // --- 3. CUSTOM CURSOR (Desktop Only) ---
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');

    if (window.matchMedia("(pointer: fine)").matches && dot && outline) {
        window.addEventListener("mousemove", (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            
            dot.style.transform = `translate(${posX}px, ${posY}px)`;
            
            outline.animate({
                transform: `translate(${posX}px, ${posY}px)`
            }, { duration: 500, fill: "forwards" });
        });
    } else {
        if(dot) dot.style.display = "none";
        if(outline) outline.style.display = "none";
    }

    // --- 4. NEURAL BACKGROUND (HIGH VISIBILITY) ---
    const canvas = document.getElementById('neural-canvas');
    if(canvas) {
        const ctx = canvas.getContext('2d');
        let width, height, particles;

        let mouse = { x: null, y: null, radius: 250 };

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.x;
            mouse.y = e.y;
        });

        window.addEventListener('touchmove', (e) => {
            if(e.touches.length > 0) {
                mouse.x = e.touches[0].clientX;
                mouse.y = e.touches[0].clientY;
            }
        });

        window.addEventListener('touchend', () => { mouse.x = null; mouse.y = null; });
        window.addEventListener('mouseout', () => { mouse.x = null; mouse.y = null; });

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
                this.baseSize = this.size;
                this.baseColor = Math.random() > 0.5 ? "#5D5FEF" : "#bd00ff";
                this.color = this.baseColor;
                this.density = (Math.random() * 30) + 1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;

                if(mouse.x != null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx*dx + dy*dy);
                    
                    if (distance < mouse.radius) {
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        const force = (mouse.radius - distance) / mouse.radius;
                        const directionX = forceDirectionX * force * this.density * 0.6;
                        const directionY = forceDirectionY * force * this.density * 0.6;
                        
                        this.x -= directionX;
                        this.y -= directionY;

                        this.color = "#00F0FF"; 
                        this.size = this.baseSize * 2.5; 
                    } else {
                        this.color = this.baseColor;
                        if(this.size > this.baseSize) this.size -= 0.1; 
                    }
                } else {
                    this.color = this.baseColor;
                    this.size = this.baseSize;
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                
                if(this.color === "#00F0FF") {
                    ctx.shadowBlur = 15;
                    ctx.shadowColor = "#00F0FF";
                } else {
                    ctx.shadowBlur = 0;
                }
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        const initParticles = () => {
            resize();
            particles = [];
            const count = window.innerWidth < 900 ? 50 : 110; 
            for (let i = 0; i < count; i++) particles.push(new Particle());
        };

        const animateParticles = () => {
            ctx.clearRect(0, 0, width, height);
            
            for (let i = 0; i < particles.length; i++) {
                let p = particles[i];
                p.update();
                p.draw();

                // 1. MOUSE CONNECTIONS (BRIGHTER & THICKER)
                if (mouse.x != null) {
                    let dx = p.x - mouse.x;
                    let dy = p.y - mouse.y;
                    let distance = Math.sqrt(dx*dx + dy*dy);

                    if (distance < 200) {
                        ctx.beginPath();
                        // 100% Opacity at center (1 * ...)
                        ctx.strokeStyle = `rgba(255, 255, 255, ${1 * (1 - distance/200)})`;
                        ctx.lineWidth = 2.5; // Thicker line
                        
                        // Add White Glow to the Line
                        ctx.shadowBlur = 10;
                        ctx.shadowColor = "white";

                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();
                        
                        // Reset Shadow
                        ctx.shadowBlur = 0;
                    }
                }

                // 2. AMBIENT CONNECTIONS (Subtle)
                for (let j = i; j < particles.length; j++) {
                    let p2 = particles[j];
                    let dx = p.x - p2.x;
                    let dy = p.y - p2.y;
                    let distance = Math.sqrt(dx*dx + dy*dy);

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(93, 95, 239, ${0.2 * (1 - distance/100)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animateParticles);
        };

        window.addEventListener('resize', initParticles);
        initParticles();
        animateParticles();
    }

    // --- 5. PAGE TRANSITION ENGINE ---
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            const target = this.getAttribute('href');
            if (!target || target.startsWith('#') || this.target === '_blank' || 
                this.hasAttribute('download') || this.classList.contains('no-transition')) {
                return;
            }
            e.preventDefault();
            const curtain = document.querySelector('.page-transition');
            if (curtain) {
                curtain.style.transformOrigin = 'bottom';
                curtain.style.transform = 'scaleY(1)';
                setTimeout(() => { window.location.href = target; }, 600);
            } else {
                window.location.href = target;
            }
        });
    });

    window.addEventListener('pageshow', (event) => {
        const curtain = document.querySelector('.page-transition');
        if (curtain) {
            setTimeout(() => {
                curtain.style.transformOrigin = 'top';
                curtain.style.transform = 'scaleY(0)';
            }, 50);
        }
    });

    // HOLOGRAPHIC CARD EFFECT
    const cards = document.querySelectorAll(".glass-card, .holo-card");
    if(cards.length > 0) {
        document.addEventListener("mousemove", e => {
            for(const card of cards) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty("--mouse-x", `${x}px`);
                card.style.setProperty("--mouse-y", `${y}px`);
            }
        });
    }

});
