/* ============================================
   MAIN JAVASCRIPT FILE

   Handles general functionality:
   - Navigation
   - Smooth scrolling
   - Scroll animations
   - Mobile menu
   - Back to top button
   - And more...
   ============================================ */

// ========================================
// NAVIGATION FUNCTIONALITY
// Sticky nav, mobile menu, active links
// ========================================
const Navigation = {
    /**
     * Initialize navigation
     */
    init() {
        this.setupStickyNav();
        this.setupMobileMenu();
        this.setupActiveLinks();
        this.setupSmoothScroll();
    },

    /**
     * Add shadow to navigation on scroll
     */
    setupStickyNav() {
        const nav = document.querySelector('.widget-nav');
        if (!nav) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    },

    /**
     * Setup mobile menu toggle
     */
    setupMobileMenu() {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');

        if (!navToggle || !navMenu) return;

        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    },

    /**
     * Highlight active navigation link based on scroll position
     */
    setupActiveLinks() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        if (sections.length === 0 || navLinks.length === 0) return;

        const observerOptions = {
            threshold: 0.3,
            rootMargin: '-100px 0px -50% 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    },

    /**
     * Enable smooth scrolling for anchor links
     */
    setupSmoothScroll() {
        if (!generalConfig.smoothScroll) return;

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');

                // Skip empty or just "#" links
                if (!href || href === '#') return;

                e.preventDefault();

                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 70; // Account for fixed nav

                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
};

// ========================================
// SCROLL ANIMATIONS
// Fade in elements on scroll
// ========================================
const ScrollAnimations = {
    /**
     * Initialize scroll animations
     */
    init() {
        if (!generalConfig.enableAnimations) return;

        this.setupScrollObserver();
    },

    /**
     * Setup intersection observer for scroll animations
     */
    setupScrollObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all sections and cards
        const elements = document.querySelectorAll(`
            .widget-about,
            .widget-skills,
            .widget-projects,
            .widget-certifications,
            .widget-contact,
            .project-card,
            .skill-card,
            .cert-card
        `);

        elements.forEach((el, index) => {
            el.classList.add('fade-in-up');
            // Stagger animations slightly
            el.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(el);
        });
    }
};

// ========================================
// BACK TO TOP BUTTON
// Shows button when scrolled down
// ========================================
const BackToTop = {
    /**
     * Initialize back to top button
     */
    init() {
        this.createButton();
        this.setupScrollListener();
    },

    /**
     * Create back to top button element
     */
    createButton() {
        const button = document.createElement('button');
        button.className = 'back-to-top';
        button.innerHTML = '↑';
        button.setAttribute('aria-label', 'Back to top');
        button.setAttribute('title', 'Back to top');

        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        document.body.appendChild(button);
        this.button = button;
    },

    /**
     * Show/hide button based on scroll position
     */
    setupScrollListener() {
        const threshold = generalConfig.backToTopThreshold || 300;

        window.addEventListener('scroll', () => {
            if (window.scrollY > threshold) {
                this.button.classList.add('visible');
            } else {
                this.button.classList.remove('visible');
            }
        });
    }
};

// ========================================
// UTILITY FUNCTIONS
// Helper functions used throughout the site
// ========================================
const Utils = {
    /**
     * Update copyright year
     */
    updateCopyrightYear() {
        const yearElement = document.getElementById('currentYear');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    },

    /**
     * Initialize Google Analytics if configured
     */
    initializeAnalytics() {
        if (!generalConfig.googleAnalyticsId) return;

        // Create script tag for GA
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${generalConfig.googleAnalyticsId}`;
        document.head.appendChild(script);

        // Initialize GA
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', generalConfig.googleAnalyticsId);
    },

    /**
     * Handle external links (open in new tab)
     */
    setupExternalLinks() {
        const links = document.querySelectorAll('a[href^="http"]');
        links.forEach(link => {
            if (!link.hasAttribute('target')) {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
            }
        });
    },

    /**
     * Add CSS animation for floating particles
     */
    addParticleAnimation() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0%, 100% {
                    transform: translateY(0) translateX(0);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    },

    /**
     * Log welcome message to console
     */
    logWelcomeMessage() {
        const styles = [
            'color: #ff0000',
            'font-size: 20px',
            'font-weight: bold',
            'font-family: monospace',
            'text-shadow: 0 0 10px rgba(255, 0, 0, 0.5)'
        ].join(';');

        console.log('%c██████╗ ███████╗██████╗     ████████╗███████╗ █████╗ ███╗   ███╗', styles);
        console.log('%c██╔══██╗██╔════╝██╔══██╗    ╚══██╔══╝██╔════╝██╔══██╗████╗ ████║', styles);
        console.log('%c██████╔╝█████╗  ██║  ██║       ██║   █████╗  ███████║██╔████╔██║', styles);
        console.log('%c██╔══██╗██╔══╝  ██║  ██║       ██║   ██╔══╝  ██╔══██║██║╚██╔╝██║', styles);
        console.log('%c██║  ██║███████╗██████╔╝       ██║   ███████╗██║  ██║██║ ╚═╝ ██║', styles);
        console.log('%c╚═╝  ╚═╝╚══════╝╚═════╝        ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝', styles);
        console.log('%c\n[+] Welcome to the Red Team Portfolio', 'color: #00ff00; font-size: 14px; font-family: monospace;');
        console.log('%c[+] Developed with offensive security in mind', 'color: #00ff00; font-size: 12px; font-family: monospace;');
        console.log('%c[+] Customize your content in js/config.js\n', 'color: #00ff00; font-size: 12px; font-family: monospace;');
    },

    /**
     * Handle page visibility for performance
     */
    setupVisibilityHandling() {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                // Pause animations when page is hidden
                console.log('[i] Page hidden - pausing animations');
            } else {
                // Resume animations when page is visible
                console.log('[i] Page visible - resuming animations');
            }
        });
    },

    /**
     * Add keyboard navigation support
     */
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Press 'Escape' to close mobile menu
            if (e.key === 'Escape') {
                const navToggle = document.getElementById('navToggle');
                const navMenu = document.getElementById('navMenu');
                if (navToggle && navMenu) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }

            // Press 'Home' to scroll to top
            if (e.key === 'Home' && e.ctrlKey) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }

            // Press 'End' to scroll to bottom
            if (e.key === 'End' && e.ctrlKey) {
                e.preventDefault();
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            }
        });
    },

    /**
     * Performance optimization: Lazy load images
     */
    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
};

// ========================================
// ERROR HANDLING
// Global error handler
// ========================================
const ErrorHandler = {
    /**
     * Initialize error handling
     */
    init() {
        this.setupGlobalErrorHandler();
    },

    /**
     * Setup global error handler
     */
    setupGlobalErrorHandler() {
        window.addEventListener('error', (e) => {
            console.error('[ERROR]', e.message, e.filename, e.lineno, e.colno);
            // You can add error reporting service here
        });

        window.addEventListener('unhandledrejection', (e) => {
            console.error('[UNHANDLED PROMISE REJECTION]', e.reason);
            // You can add error reporting service here
        });
    }
};

// ========================================
// PERFORMANCE MONITORING
// Track page load performance
// ========================================
const Performance = {
    /**
     * Log performance metrics
     */
    logMetrics() {
        if (!window.performance) return;

        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                const connectTime = perfData.responseEnd - perfData.requestStart;
                const renderTime = perfData.domComplete - perfData.domLoading;

                console.log('%c[PERFORMANCE METRICS]', 'color: #00ff00; font-weight: bold;');
                console.log(`  Page Load Time: ${pageLoadTime}ms`);
                console.log(`  Connection Time: ${connectTime}ms`);
                console.log(`  Render Time: ${renderTime}ms`);
            }, 0);
        });
    }
};

// ========================================
// MAIN INITIALIZATION
// Initialize everything when DOM is ready
// ========================================
function initializeApp() {
    // Initialize core functionality
    Navigation.init();
    ScrollAnimations.init();
    BackToTop.init();

    // Initialize utilities
    Utils.updateCopyrightYear();
    Utils.initializeAnalytics();
    Utils.setupExternalLinks();
    Utils.addParticleAnimation();
    Utils.logWelcomeMessage();
    Utils.setupVisibilityHandling();
    Utils.setupKeyboardNavigation();
    Utils.setupLazyLoading();

    // Initialize error handling
    ErrorHandler.init();

    // Log performance metrics
    Performance.logMetrics();

    console.log('%c[✓] Application initialized successfully', 'color: #00ff00; font-weight: bold;');
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Export for use in other scripts if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Navigation,
        ScrollAnimations,
        BackToTop,
        Utils,
        ErrorHandler,
        Performance
    };
}
