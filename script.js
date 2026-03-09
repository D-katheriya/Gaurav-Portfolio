// ===== Configuration =====
const config = {
    typingSpeed: 100,
    deletingSpeed: 50,
    pauseTime: 2000,
    titles: [
        "3D Artist",
        "Motion Graphic Designer",
        "Graphic Designer",
        "Video Editor",
        "VFX Compositor"
    ]
};

// ===== Typing Effect =====
class TypeWriter {
    constructor(element, texts, typingSpeed, deletingSpeed, pauseTime) {
        this.element = element;
        this.texts = texts;
        this.typingSpeed = typingSpeed;
        this.deletingSpeed = deletingSpeed;
        this.pauseTime = pauseTime;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.type();
    }

    type() {
        const currentText = this.texts[this.textIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        let typeSpeed = this.isDeleting ? this.deletingSpeed : this.typingSpeed;

        if (!this.isDeleting && this.charIndex === currentText.length) {
            typeSpeed = this.pauseTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// ===== Smooth Scrolling =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                const navMenu = document.querySelector('.nav-menu');
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
            }
        });
    });
}

// ===== Active Navigation Link =====
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// ===== Navbar Scroll Effect =====
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ===== Mobile Menu Toggle =====
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger
        hamburger.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// ===== Scroll Reveal Animation =====
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;
        
        reveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Check on initial load
}

// ===== Skill Progress Animation =====
function initSkillAnimation() {
    const skillBars = document.querySelectorAll('.skill-progress');
    let animated = false;
    
    const animateSkills = () => {
        const skillsSection = document.getElementById('skills');
        const sectionTop = skillsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75 && !animated) {
            skillBars.forEach(bar => {
                const progress = bar.getAttribute('data-progress');
                bar.style.setProperty('--progress', progress + '%');
                bar.classList.add('animate');
            });
            animated = true;
        }
    };
    
    window.addEventListener('scroll', animateSkills);
    animateSkills(); // Check on initial load
}

// ===== Project Card Tilt Effect =====
function initProjectCardEffects() {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ===== Parallax Effect for Hero Orbs =====
function initParallaxEffect() {
    const orbs = document.querySelectorAll('.gradient-orb');
    
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 20;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            
            orb.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// ===== Add Reveal Classes to Elements =====
function addRevealClasses() {
    // Add reveal class to sections for scroll animation
    const sectionsToReveal = [
        '.about-text',
        '.about-stats',
        '.project-card',
        '.skill-item',
        '.tools-list',
        '.timeline-item',
        '.contact-card',
        '.social-links'
    ];
    
    sectionsToReveal.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.classList.add('reveal');
        });
    });
}

// ===== Loading Animation =====
function initLoadingAnimation() {
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Animate hero content
        const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .hero-buttons');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '0';
                element.style.animation = 'fadeInUp 0.8s ease forwards';
                element.style.animationDelay = `${index * 0.2}s`;
            }, 100);
        });
    });
}

// ===== Stats Counter Animation =====
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    let counted = false;
    
    const countStats = () => {
        const aboutSection = document.getElementById('about');
        const sectionTop = aboutSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75 && !counted) {
            stats.forEach(stat => {
                const target = parseInt(stat.textContent);
                const increment = target / 50;
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        stat.textContent = stat.textContent.includes('+') ? target + '+' : target;
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '');
                    }
                }, 30);
            });
            counted = true;
        }
    };
    
    window.addEventListener('scroll', countStats);
    countStats();
}

// ===== Cursor Effect (Optional Enhancement) =====
function initCustomCursor() {
    // Only enable on desktop
    if (window.innerWidth > 768) {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);
        
        const cursorDot = document.createElement('div');
        cursorDot.className = 'cursor-dot';
        document.body.appendChild(cursorDot);
        
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let dotX = 0, dotY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dotX = e.clientX;
            dotY = e.clientY;
        });
        
        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            cursorDot.style.left = dotX + 'px';
            cursorDot.style.top = dotY + 'px';
            
            requestAnimationFrame(animateCursor);
        }
        
        animateCursor();
        
        // Add hover effect
        const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }
}

// ===== Intersection Observer for Performance =====
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.reveal').forEach(element => {
        observer.observe(element);
    });
}

// ===== Initialize All Functions =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize typing effect
    const typedTextElement = document.querySelector('.typed-text');
    if (typedTextElement) {
        new TypeWriter(
            typedTextElement,
            config.titles,
            config.typingSpeed,
            config.deletingSpeed,
            config.pauseTime
        );
    }
    
    // Initialize all features
    initSmoothScroll();
    updateActiveNavLink();
    initNavbarScroll();
    initMobileMenu();
    addRevealClasses();
    initScrollReveal();
    initSkillAnimation();
    initProjectCardEffects();
    initParallaxEffect();
    initLoadingAnimation();
    initStatsCounter();
    initIntersectionObserver();
    
    // Optional: Custom cursor (can be disabled if not needed)
    // initCustomCursor();
    
    console.log('Portfolio initialized successfully! 🚀');
});

// ===== Prevent FOUC (Flash of Unstyled Content) =====
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ===== Handle Resize =====
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Re-initialize features that depend on window size
        console.log('Window resized, adjusting layout...');
    }, 250);
});

// ===== Keyboard Navigation Enhancement =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    }
});

// ===== Console Message =====
console.log(
    '%c👋 Welcome to Gaurav Prajapati\'s Portfolio!',
    'color: #00d4ff; font-size: 20px; font-weight: bold;'
);
console.log(
    '%cInterested in working together? Let\'s connect!',
    'color: #94a3b8; font-size: 14px;'
);
console.log(
    '%cEmail: Gauravprajapati7196@gmail.com',
    'color: #00d4ff; font-size: 12px;'
);
