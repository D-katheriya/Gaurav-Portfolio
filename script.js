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
    initParallaxEffect();
    initLoadingAnimation();
    initStatsCounter();
    initIntersectionObserver();
    initGallery();
    
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
    const titleEl = document.getElementById('lightboxTitle');

    if (item.type === 'video') {
        img.style.display = 'none';
        video.style.display = 'block';
        video.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(item.url)}?autoplay=1&rel=0`;
    } else {
        video.style.display = 'none';
        video.src = '';
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
    lightbox.classList.remove('active');
    video.src = '';
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
