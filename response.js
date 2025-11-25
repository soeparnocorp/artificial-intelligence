// response.js - Advanced Visual Effects for Anna Laura AI Landing Page

class AIVisualEffects {
    constructor() {
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

    // Matrix Rain Effect
    initMatrixRain() {
        const canvas = document.getElementById("matrixCanvas");
        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const fontSize = 14;
        const columns = Math.floor(canvas.width / fontSize);
        const drops = new Array(columns).fill(1);

        const drawMatrix = () => {
            ctx.fillStyle = "rgba(0,0,0,0.08)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "rgba(255,255,255,0.7)";
            ctx.font = fontSize + "px monospace";

            for (let i = 0; i < drops.length; i++) {
                const char = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(char, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        setInterval(drawMatrix, 40);

        window.addEventListener("resize", () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // Floating Particles System
    createParticles() {
        const particlesContainer = document.querySelector('.floating-particles');
        const particleCount = 30;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 3 + 1;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 20;
            const duration = Math.random() * 10 + 10;
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2});
                border-radius: 50%;
                left: ${posX}%;
                top: ${posY}%;
                animation: floatParticle ${duration}s ease-in-out ${delay}s infinite;
                filter: blur(${Math.random() * 1}px);
            `;

            particlesContainer.appendChild(particle);
        }

        this.addParticleAnimationStyle();
    }

    addParticleAnimationStyle() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatParticle {
                0%, 100% {
                    transform: translate(0, 0) rotate(0deg);
                    opacity: 0.3;
                }
                25% {
                    transform: translate(100px, -50px) rotate(90deg);
                    opacity: 0.7;
                }
                50% {
                    transform: translate(50px, -100px) rotate(180deg);
                    opacity: 0.4;
                }
                75% {
                    transform: translate(-50px, -50px) rotate(270deg);
                    opacity: 0.8;
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
                    this.animateFeatureCards(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.feature-card, .stat-item, .package-box').forEach(el => {
            observer.observe(el);
        });

        window.addEventListener('scroll', this.handleParallax.bind(this));
    }

    handleParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.background-effects, .orb');
        
        parallaxElements.forEach((el, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    }

    animateFeatureCards(section) {
        if (section.classList.contains('features')) {
            const cards = section.querySelectorAll('.feature-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.animation = `slideUp 0.6s ease-out ${index * 0.2}s both`;
                }, 100);
            });
        }
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
            const x = mouseX * 100 * speed;
            const y = mouseY * 100 * speed;
            
            orb.style.transform += ` translate(${x}px, ${y}px)`;
        });
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
`;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = additionalStyles;
    document.head.appendChild(styleSheet);
    
    new AIVisualEffects();
});
