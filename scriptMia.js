// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create butterflies with random flight paths
    function createButterflies() {
        const container = document.querySelector('.butterfly-container');
        if (!container) return;
        
        const butterflyCount = 12; // Optimal number for performance

        // Clear existing butterflies
        container.innerHTML = '';

        for (let i = 0; i < butterflyCount; i++) {
            const butterfly = document.createElement('div');
            butterfly.className = 'butterfly';

            const startX = Math.random() * 100;
            const startY = Math.random() * 100;
            const endX = (Math.random() > 0.5 ? 1 : -1) * (100 + Math.random() * 50);
            const endY = (Math.random() > 0.5 ? 1 : -1) * (100 + Math.random() * 50);
            const flightDuration = 15 + Math.random() * 10;
            const flapSpeed = 0.2 + Math.random() * 0.1;
            const flightDelay = Math.random() * 10;

            butterfly.style.setProperty('--start-x', `${startX}%`);
            butterfly.style.setProperty('--start-y', `${startY}%`);
            butterfly.style.setProperty('--end-x', `${endX}%`);
            butterfly.style.setProperty('--end-y', `${endY}%`);
            butterfly.style.setProperty('--flight-duration', `${flightDuration}s`);
            butterfly.style.setProperty('--flap-speed', `${flapSpeed}s`);
            butterfly.style.setProperty('--flight-delay', `${flightDelay}s`);

            const leftWing = document.createElement('div');
            leftWing.className = 'left-wing';

            const rightWing = document.createElement('div');
            rightWing.className = 'right-wing';

            butterfly.appendChild(leftWing);
            butterfly.appendChild(rightWing);
            container.appendChild(butterfly);
        }
    }

    createButterflies();
    setInterval(createButterflies, 60000);

    // Loading animation
    const loadingAnimation = document.querySelector('.loading-animation');
    if (loadingAnimation) {
        window.addEventListener('load', function() {
            loadingAnimation.classList.add('hidden');
        });
        setTimeout(() => {
            loadingAnimation.classList.add('hidden');
        }, 3000);
    }

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            this.setAttribute('aria-expanded', this.classList.contains('active'));
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
        });

        navItems.forEach(item => {
            item.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = 'auto';
            });
        });
    }

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.tagName === 'BUTTON' || this.classList.contains('no-smooth-scroll')) return;

            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                if (history.pushState) history.pushState(null, null, targetId);
                else location.hash = targetId;
            }
        });
    });

    // Sticky navbar
    const navbar = document.querySelector('.navbar');
    function updateNavbar() {
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.boxShadow = '0 10px 30px -10px rgba(2, 12, 27, 0.7)';
                navbar.style.background = 'rgba(10, 25, 47, 0.95)';
            } else {
                navbar.style.boxShadow = 'none';
                navbar.style.background = 'rgba(10, 25, 47, 0.9)';
            }
        }
    }
    window.addEventListener('scroll', updateNavbar);
    updateNavbar();

    // Back to top
    const backToTopButton = document.querySelector('.back-to-top');
    function toggleBackToTop() {
        if (backToTopButton) {
            backToTopButton.classList.toggle('visible', window.scrollY > 300);
        }
    }
    window.addEventListener('scroll', toggleBackToTop);
    toggleBackToTop();

    // Typed.js - Wait for library to load
    function initTypedJS() {
        const typedTextElement = document.querySelector('.typed-text');
        if (typedTextElement && typeof Typed !== 'undefined') {
            new Typed('.typed-text', {
                strings: ['digital experiences', 'web applications', 'software solutions', 'user interfaces'],
                typeSpeed: 50,
                backSpeed: 30,
                loop: true,
                showCursor: true,
                cursorChar: '|',
                smartBackspace: true
            });
        } else if (typedTextElement) {
            // Retry after a short delay if Typed isn't loaded yet
            setTimeout(initTypedJS, 100);
        }
    }
    initTypedJS();

    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = this.querySelector('#name').value.trim();
            const email = this.querySelector('#email').value.trim();
            const message = this.querySelector('#message').value.trim();

            if (!name || !email || !message) {
                showFormMessage('Please fill in all fields.', 'error');
                return;
            }
            if (!validateEmail(email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }

            console.log({ name, email, message });
            showFormMessage(`Thank you, ${name}! Your message has been sent successfully.`, 'success');
            this.reset();
        });
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showFormMessage(message, type) {
        const formMessage = document.getElementById('formMessage');
        if (formMessage) {
            formMessage.textContent = message;
            formMessage.className = 'form-message ' + type;
            formMessage.style.display = 'block';
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }

    // Copyright year
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Scroll animation - Add initial styles to sections
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    // Lazy loading
    if ('loading' in HTMLImageElement.prototype) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    } else if (window.LazyLoad) {
        new LazyLoad({
            elements_selector: 'img[loading="lazy"]',
            threshold: 100
        });
    }

    // PWA support
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').then(registration => {
                console.log('ServiceWorker registration successful');
            }).catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
        });
    }
});