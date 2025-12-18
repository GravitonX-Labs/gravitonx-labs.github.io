// script.js - FINAL INTERACTIVE VERSION (Enhanced Mesh)

document.addEventListener("DOMContentLoaded", () => {

    // --- 1. SAFE ANIMATION INIT (AOS) ---
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, once: true, offset: 50 });
    }

    // --- 2. TYPING EFFECT ---
    const typeElement = document.getElementById('typewriter');
    if (typeElement && typeof Typed !== 'undefined') {
        let pageText = [
            'System Status: ONLINE',
            'Physics Engine: VERLET-X',
            'Welcome to GravitonX.'
        ];

        if (window.location.href.includes("products")) {
            pageText = [
                'Accessing Database...',
                'Loading Modules...',
                'Deploying Ecosystem.'
            ];
        }

        new Typed('#typewriter', {
            strings: pageText,
            typeSpeed: 40,
            backSpeed: 20,
            startDelay: 500,
            backDelay: 2000,
            loop: true,
            showCursor: false
        });
    }

    // --- 3. CUSTOM CURSOR (Desktop Only) ---
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');

    if (window.matchMedia("(pointer: fine)").matches && dot && outline) {
        window.addEventListener("mousemove", (e) => {
            const x = e.clientX;
            const y = e.clientY;

            dot.style.transform = `translate(${x}px, ${y}px)`;
            outline.animate(
                { transform: `translate(${x}px, ${y}px)` },
                { duration: 500, fill: "forwards" }
            );
        });
    } else {
        if (dot) dot.style.display = "none";
        if (outline) outline.style.display = "none";
    }

    // --- 4. NEURAL BACKGROUND (ENHANCED MESH) ---
    const canvas = document.getElementById('neural-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height, particles = [];

        // Mouse / Touch tracker
        let mouse = { x: null, y: null, radius: 150 };

        window.addEventListener('mousemove', e => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        window.addEventListener('touchmove', e => {
            if (e.touches.length > 0) {
                mouse.x = e.touches[0].clientX;
                mouse.y = e.touches[0].clientY;
            }
        });

        window.addEventListener('touchend', () => {
            mouse.x = null;
            mouse.y = null;
        });

        window.addEventListener('mouseout', () => {
            mouse.x = null;
            mouse.y = null;
        });

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
                this.size = Math.random() * 1.2; // UNCHANGED
                this.color = Math.random() > 0.5 ? "#5D5FEF" : "#00F0FF";
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;

                // Mouse push effect
                if (mouse.x !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < mouse.radius) {
                        const force = (mouse.radius - dist) / mouse.radius;
                        this.x -= (dx / dist) * force * 0.5;
                        this.y -= (dy / dist) * force * 0.5;
                    }
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        const initParticles = () => {
            resize();
            particles = [];
            const count = window.innerWidth < 900 ? 50 : 100;
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        };

        const animateParticles = () => {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.update();
                p.draw();

                // --- Mouse connection lines ---
                if (mouse.x !== null) {
                    const dx = p.x - mouse.x;
                    const dy = p.y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(93, 95, 239, ${0.8 * (1 - dist / 150)})`;
                        ctx.lineWidth = 1.2;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();
                    }
                }

                // --- Particle-to-particle mesh (ENHANCED) ---
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 100) {
                        let mouseBoost = 1;
                        if (mouse.x !== null) {
                            const mdx = p.x - mouse.x;
                            const mdy = p.y - mouse.y;
                            const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
                            if (mDist < 200) mouseBoost = 1.8;
                        }

                        const speed = Math.abs(p.vx) + Math.abs(p.vy);
                        const opacity = 0.45 * mouseBoost * (1 - dist / 100);

                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(93, 95, 239, ${opacity})`;
                        ctx.lineWidth = 0.6 + speed * 1.5;
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
        link.addEventListener('click', function (e) {
            const target = this.getAttribute('href');

            if (!target || target.startsWith('#') ||
                this.target === '_blank' ||
                this.hasAttribute('download') ||
                this.classList.contains('no-transition')) {
                return;
            }

            e.preventDefault();
            const curtain = document.querySelector('.page-transition');

            if (curtain) {
                curtain.style.transformOrigin = 'bottom';
                curtain.style.transform = 'scaleY(1)';
                setTimeout(() => {
                    window.location.href = target;
                }, 600);
            } else {
                window.location.href = target;
            }
        });
    });

    window.addEventListener('pageshow', () => {
        const curtain = document.querySelector('.page-transition');
        if (curtain) {
            setTimeout(() => {
                curtain.style.transformOrigin = 'top';
                curtain.style.transform = 'scaleY(0)';
            }, 50);
        }
    });

    // --- 6. HOLOGRAPHIC CARD EFFECT ---
    const cards = document.querySelectorAll(".glass-card, .holo-card");
    if (cards.length > 0) {
        document.addEventListener("mousemove", e => {
            for (const card of cards) {
                const rect = card.getBoundingClientRect();
                card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
                card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
            }
        });
    }

});

