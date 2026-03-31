// ===== Configuration =====
const config = {
    typingSpeed: 100,
    deletingSpeed: 50,
    pauseTime: 2000,
    titles: [
        "Graphic Designer",
        "Motion Graphic Designer",
        "Video Editor",
        "2D Animator",
        "3D Artist",
        "VFX Artist"
    ]
};

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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



// ===== Parallax Effect for Hero Orbs =====
function initParallaxEffect() {
    const orbs = document.querySelectorAll('.gradient-orb');

    if (prefersReducedMotion || orbs.length === 0) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    window.addEventListener('mousemove', (e) => {
        targetX = (e.clientX / window.innerWidth) - 0.5;
        targetY = (e.clientY / window.innerHeight) - 0.5;
    });

    const animate = () => {
        currentX += (targetX - currentX) * 0.08;
        currentY += (targetY - currentY) * 0.08;

        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 20;
            const x = currentX * speed;
            const y = currentY * speed;
            orb.style.transform = `translate(${x}px, ${y}px)`;
        });

        requestAnimationFrame(animate);
    };

    animate();
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
    if (window.innerWidth <= 768 || prefersReducedMotion) return;

    document.body.classList.add('cursor-enabled');

    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;

    let trailTick = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        trailTick += 1;
        if (trailTick % 3 === 0) {
            const trail = document.createElement('span');
            trail.className = 'cursor-trail';
            trail.style.left = `${mouseX}px`;
            trail.style.top = `${mouseY}px`;
            document.body.appendChild(trail);
            setTimeout(() => trail.remove(), 650);
        }
    });

    const animateCursor = () => {
        cursorX += (mouseX - cursorX) * 0.18;
        cursorY += (mouseY - cursorY) * 0.18;

        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;

        requestAnimationFrame(animateCursor);
    };

    animateCursor();

    const interactiveElements = document.querySelectorAll('a, button, .btn, .work-card, .tool-card, .social-icon, .work-filter');
    interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

function initScrollProgress() {
    const progressWrap = document.createElement('div');
    progressWrap.className = 'scroll-progress';
    progressWrap.innerHTML = '<div class="scroll-progress-bar" id="scrollProgressBar"></div>';
    document.body.appendChild(progressWrap);

    const bar = document.getElementById('scrollProgressBar');
    const updateProgress = () => {
        const scrollTop = window.scrollY;
        const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = pageHeight > 0 ? (scrollTop / pageHeight) * 100 : 0;
        bar.style.width = `${Math.min(100, Math.max(0, progress)).toFixed(2)}%`;
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress();
}

function initCardTilt() {
    if (window.innerWidth <= 768 || prefersReducedMotion) return;

    const tiltCards = document.querySelectorAll('.work-card, .tool-card, .stat-card, .timeline-content');
    tiltCards.forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const px = (e.clientX - rect.left) / rect.width;
            const py = (e.clientY - rect.top) / rect.height;
            const rotateY = (px - 0.5) * 8;
            const rotateX = (0.5 - py) * 8;
            card.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
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
    initParallaxEffect();
    initLoadingAnimation();
    initStatsCounter();
    initIntersectionObserver();
    initGallery();
    initCustomCursor();
    initScrollProgress();
    initCardTilt();
    
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
        closeLightbox();
    }
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
});

// ===== Behance-Style Gallery System =====
// Architecture: Cloudinary (images) + YouTube (videos) + Firebase Firestore (metadata)
let firebaseDB = null;
let allPortfolioWorks = [];
let filteredWorks = [];
let currentLightboxIndex = 0;
let currentFilter = 'all';

const categoryLabels = {
    'graphic-design': 'Graphic Design',
    'motion-graphics': 'Motion Graphics',
    'video-editing': 'Video Editing',
    '2d-animation': '2D Animation',
    '3d-art': '3D Art',
    'vfx': 'VFX'
};

function initGallery() {
    // Initialize Firebase if configured
    if (typeof firebaseConfig !== 'undefined' && firebaseConfig.apiKey) {
        try {
            if (!firebase.apps.length) {
                firebase.initializeApp(firebaseConfig);
            }
            firebaseDB = firebase.firestore();
        } catch (e) {
            console.log('Firebase not configured yet');
        }
    }

    // Attach filter tab click handlers
    document.querySelectorAll('.work-filter').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.work-filter').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter');
            renderGallery();
        });
    });

    // Load works from Firebase
    loadPortfolioWorks();
}

async function loadPortfolioWorks() {
    const gallery = document.getElementById('worksGallery');

    if (!firebaseDB) {
        gallery.innerHTML = `
            <div class="gallery-empty-state">
                <div class="empty-icon">🎨</div>
                <p>Portfolio setup pending — works will appear here once configured</p>
                <a href="admin.html" class="admin-link">Open Admin Panel</a>
            </div>`;
        return;
    }

    try {
        const snapshot = await firebaseDB.collection('works')
            .orderBy('timestamp', 'desc')
            .get();

        allPortfolioWorks = [];
        snapshot.forEach(doc => allPortfolioWorks.push({ id: doc.id, ...doc.data() }));

        renderGallery();
    } catch (e) {
        console.error('Error loading portfolio works:', e);
        gallery.innerHTML = `
            <div class="gallery-empty-state">
                <div class="empty-icon">⚠️</div>
                <p>Could not load works. Check Firebase setup.</p>
                <a href="admin.html" class="admin-link">Open Admin Panel</a>
            </div>`;
    }
}

function renderGallery() {
    const gallery = document.getElementById('worksGallery');

    filteredWorks = currentFilter === 'all'
        ? allPortfolioWorks
        : allPortfolioWorks.filter(w => w.category === currentFilter);

    if (filteredWorks.length === 0) {
        gallery.innerHTML = `
            <div class="gallery-empty-state">
                <div class="empty-icon">📭</div>
                <p>No works uploaded yet${currentFilter !== 'all' ? ' for this category' : ''}</p>
                <a href="admin.html" class="admin-link">Upload from Admin Panel</a>
            </div>`;
        return;
    }

    gallery.innerHTML = filteredWorks.map((work, index) => {
        const isVideo = work.type === 'video';
        const thumb = work.thumbnail || work.url;
        const catLabel = categoryLabels[work.category] || work.category;

        if (isVideo) {
            return `
                <div class="work-card reveal" onclick="openLightbox(${index})">
                    <div class="work-card-media">
                        <div class="yt-thumb-wrapper">
                            <img src="${thumb}" alt="${work.title}" loading="lazy">
                            <div class="yt-play-btn"></div>
                        </div>
                    </div>
                    <span class="video-tag">VIDEO</span>
                    <div class="work-card-overlay">
                        <div class="work-card-title">${work.title}</div>
                        <div class="work-card-category">${catLabel}</div>
                    </div>
                </div>`;
        } else if (work.type === 'model3d') {
            return `
                <div class="work-card reveal" onclick="openLightbox(${index})">
                    <div class="work-card-media">
                        <img src="${thumb}" alt="${work.title}" loading="lazy">
                    </div>
                    <span class="model-badge">3D MODEL</span>
                    <div class="work-card-overlay">
                        <div class="work-card-title">${work.title}</div>
                        <div class="work-card-category">${catLabel}</div>
                    </div>
                </div>`;
        } else {
            return `
                <div class="work-card reveal" onclick="openLightbox(${index})">
                    <div class="work-card-media">
                        <img src="${thumb}" alt="${work.title}" loading="lazy">
                    </div>
                    <div class="work-card-overlay">
                        <div class="work-card-title">${work.title}</div>
                        <div class="work-card-category">${catLabel}</div>
                    </div>
                </div>`;
        }
    }).join('');

    // Re-apply reveal animation to new cards
    document.querySelectorAll('.work-card.reveal').forEach(card => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });
        observer.observe(card);
    });
}

function openLightbox(index) {
    currentLightboxIndex = index;
    const item = filteredWorks[index];
    if (!item) return;

    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImg');
    const video = document.getElementById('lightboxVideo');
    const model = document.getElementById('lightboxModel');
    const titleEl = document.getElementById('lightboxTitle');
    const lightboxContent = document.getElementById('lightboxContent');

    let hint = document.getElementById('lightboxHint');
    if (!hint) {
        hint = document.createElement('div');
        hint.id = 'lightboxHint';
        hint.className = 'lightbox-hint hide';
        hint.textContent = 'Drag to rotate | Scroll to zoom';
        lightboxContent.appendChild(hint);
    }

    if (item.type === 'video') {
        img.style.display = 'none';
        video.style.display = 'block';
        model.style.display = 'none';
        model.removeAttribute('src');
        model.removeAttribute('poster');
        hint.classList.add('hide');
        video.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(item.url)}?autoplay=1&rel=0`;
    } else if (item.type === 'model3d') {
        img.style.display = 'none';
        video.style.display = 'none';
        video.src = '';
        model.style.display = 'block';
        model.setAttribute('src', item.url);
        if (item.thumbnail) {
            model.setAttribute('poster', item.thumbnail);
        } else {
            model.removeAttribute('poster');
        }
        hint.classList.remove('hide');
    } else {
        video.style.display = 'none';
        video.src = '';
        model.style.display = 'none';
        model.removeAttribute('src');
        model.removeAttribute('poster');
        hint.classList.add('hide');
        img.style.display = 'block';
        // Use full resolution for lightbox (remove Cloudinary transformations)
        img.src = item.url;
        img.alt = item.title;
    }

    titleEl.textContent = item.title;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const video = document.getElementById('lightboxVideo');
    const model = document.getElementById('lightboxModel');
    const hint = document.getElementById('lightboxHint');
    lightbox.classList.remove('active');
    video.src = '';
    if (model) {
        model.removeAttribute('src');
        model.removeAttribute('poster');
        model.style.display = 'none';
    }
    if (hint) hint.classList.add('hide');
    document.body.style.overflow = '';
}

function navigateLightbox(direction) {
    if (filteredWorks.length === 0) return;
    currentLightboxIndex += direction;
    if (currentLightboxIndex < 0) currentLightboxIndex = filteredWorks.length - 1;
    if (currentLightboxIndex >= filteredWorks.length) currentLightboxIndex = 0;
    openLightbox(currentLightboxIndex);
}

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
