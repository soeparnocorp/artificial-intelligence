// response.js - Advanced Visual Effects for Anna Laura AI Landing Page

class AIVisualEffects {
    constructor() {
        this.matrixInitialized = false;
        this.init();
    }

    init() {
        this.initMatrixRain();
        this.createParticles();
        this.initScrollAnimations();
        this.initButtonEffects();
        this.initCounterAnimation();
        this.initInteractiveBackground();
    }

    // Matrix Rain Effect - PRIORITY
    initMatrixRain() {
        const canvas = document.getElementById("matrixCanvas");
        if (!canvas) {
            console.error("Matrix canvas not found!");
            return;
        }

        const ctx = canvas.getContext("2d");
        
        // Set canvas size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        console.log("Matrix Canvas initialized:", canvas.width, "x", canvas.height);

        const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const fontSize = 14;
        const columns = Math.floor(canvas.width / fontSize);
        const drops = new Array(columns).fill(1);

        const drawMatrix = () => {
            // Clear with semi-transparent black for trail effect
            ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
            ctx.font = `${fontSize}px monospace`;
            
            for (let i = 0; i < drops.length; i++) {
                // Random character
                const text = chars[Math.floor(Math.random() * chars.length)];
                
                // Get x position
                const x = i * fontSize;
                
                // Get y position
                const y = drops[i] * fontSize;
                
                // Draw the character
                ctx.fillText(text, x, y);
                
                // Reset drop if it reaches bottom with random chance
                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                
                drops[i]++;
            }
        };

        // Start the matrix animation
        this.matrixInterval = setInterval(drawMatrix, 35);
        this.matrixInitialized = true;
        
        console.log("Matrix Rain started with", columns, "columns");

        // Handle window resize
        window.addEventListener("resize", () => {
            console.log("Window resized - resetting matrix");
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            // Reinitialize drops array for new column count
            const newColumns = Math.floor(canvas.width / fontSize);
            drops.length = newColumns;
            for (let i = 0; i < newColumns; i++) {
                if (!drops[i]) drops[i] = 1;
            }
        });
    }

    // Floating Particles System - Lighter version
    createParticles() {
        const particlesContainer = document.querySelector('.floating-particles');
        if (!particlesContainer) return;

        const particleCount = 20; // Reduced for better performance

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 2 + 1;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 20;
            const duration = Math.random() * 15 + 15;
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
                border-radius: 50%;
                left: ${posX}%;
                top: ${posY}%;
                animation: floatParticle ${duration}s ease-in-out ${delay}s infinite;
                filter: blur(${Math.random() * 0.5}px);
                pointer-events: none;
                z-index: -1;
            `;

            particlesContainer.appendChild(particle);
        }

        this.addParticleAnimationStyle();
    }

    addParticleAnimationStyle() {
        if (document.querySelector('#particle-animations')) return;
        
        const style = document.createElement('style');
        style.id = 'particle-animations';
        style.textContent = `
            @keyframes floatParticle {
                0%, 100% {
                    transform: translate(0, 0) rotate(0deg);
                    opacity: 0.2;
                }
                25% {
                    transform: translate(80px, -40px) rotate(90deg);
                    opacity: 0.5;
                }
                50% {
                    transform: translate(40px, -80px) rotate(180deg);
                    opacity: 0.3;
                }
                75% {
                    transform: translate(-40px, -40px) rotate(270deg);
                    opacity: 0.6;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Scroll Animations
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    if (entry.target.classList.contains('features')) {
                        this.animateFeatureCards(entry.target);
                    }
                }
            });
        }, observerOptions);

        document.querySelectorAll('.feature-card, .stat-item, .package-box').forEach(el => {
            observer.observe(el);
        });
    }

    animateFeatureCards(section) {
        const cards = section.querySelectorAll('.feature-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = `slideUp 0.6s ease-out ${index * 0.2}s both`;
            }, 100);
        });
    }

    // Button Effects
    initButtonEffects() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', this.createRipple.bind(this));
            button.addEventListener('click', this.createClickEffect.bind(this));
        });

        const exploreBtn = document.getElementById('exploreBtn');
        if (exploreBtn) {
            exploreBtn.addEventListener('click', this.exploreEffect.bind(this));
        }
    }

    createRipple(e) {
        const button = e.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
        `;

        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    createClickEffect(e) {
        const button = e.currentTarget;
        const particles = 6;
        
        for (let i = 0; i < particles; i++) {
            const particle = document.createElement('div');
            const angle = (i / particles) * Math.PI * 2;
            const speed = 2;
            
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(255, 255, 255, 0.8);
                border-radius: 50%;
                left: 50%;
                top: 50%;
                pointer-events: none;
            `;

            button.appendChild(particle);

            const animation = particle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${Math.cos(angle) * 40}px, ${Math.sin(angle) * 40}px) scale(0)`, opacity: 0 }
            ], {
                duration: 600,
                easing: 'ease-out'
            });

            animation.onfinish = () => particle.remove();
        }
    }

    exploreEffect(e) {
        e.preventDefault();
        
        const explosion = document.createElement('div');
        explosion.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            width: 100px;
            height: 100px;
            background: radial-gradient(circle, rgba(255,255,255,0.8), transparent 70%);
            border-radius: 50%;
            transform: translate(-50%, -50%) scale(0);
            animation: exploreExpand 0.8s ease-out forwards;
            pointer-events: none;
            z-index: 10000;
        `;

        document.body.appendChild(explosion);

        if (!document.querySelector('#explosion-style')) {
            const style = document.createElement('style');
            style.id = 'explosion-style';
            style.textContent = `
                @keyframes exploreExpand {
                    0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
                    100% { transform: translate(-50%, -50%) scale(15); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }

        setTimeout(() => {
            explosion.remove();
            // Redirect to demo page after animation
            window.location.href = e.currentTarget.href;
        }, 600);
    }

    // Counter Animation
    initCounterAnimation() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        });

        const statsSection = document.querySelector('.stats');
        if (statsSection) {
            observer.observe(statsSection);
        }
    }

    animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current);
            }, 16);
        });
    }

    // Interactive Background
    initInteractiveBackground() {
        document.addEventListener('mousemove', this.handleMouseMove.bind(this));
    }

    handleMouseMove(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        const orbs = document.querySelectorAll('.orb');
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.0001;
            const x = mouseX * 50 * speed;
            const y = mouseY * 50 * speed;
            
            orb.style.transform = `translate(${x}px, ${y}px)`;
        });
    }

    // Cleanup
    destroy() {
        if (this.matrixInterval) {
            clearInterval(this.matrixInterval);
        }
    }
}

// Additional CSS animations
const additionalStyles = `
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .animate-in {
        animation: slideUp 0.8s ease-out both;
    }

    .feature-card, .package-box {
        opacity: 0;
        transform: translateY(50px);
    }

    .feature-card.animate-in, .package-box.animate-in {
        opacity: 1;
        transform: translateY(0);
    }

    /* Ensure matrix canvas is properly layered */
    #matrixCanvas {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        z-index: -2 !important;
        display: block !important;
    }
`;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add additional styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = additionalStyles;
    document.head.appendChild(styleSheet);
    
    // Initialize visual effects
    window.visualEffects = new AIVisualEffects();
    
    console.log("Anna Laura AI Visual Effects initialized");
});

// Handle page unload
window.addEventListener('beforeunload', () => {
    if (window.visualEffects) {
        window.visualEffects.destroy();
    }
});
