/* ============================================
   WIDGET SYSTEM

   This file handles rendering and initialization
   of all portfolio widgets based on config.js

   Each widget is self-contained and can be
   easily modified or removed
   ============================================ */

// ========================================
// HERO WIDGET
// Handles typing animation and hero content
// ========================================
const HeroWidget = {
    /**
     * Initialize the hero widget
     */
    init() {
        this.setupTypingAnimation();
        this.updateTitle();
    },

    /**
     * Update hero title from config
     */
    updateTitle() {
        const titleElement = document.getElementById('heroTitle');
        if (titleElement && heroConfig.title) {
            titleElement.textContent = heroConfig.title;
            // Update data attribute for glitch effect
            titleElement.parentElement.setAttribute('data-text', heroConfig.title);
        }
    },

    /**
     * Create typing animation effect
     */
    setupTypingAnimation() {
        const typedTextElement = document.getElementById('typedText');
        if (!typedTextElement || !heroConfig.typingPhrases) return;

        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const type = () => {
            const currentPhrase = heroConfig.typingPhrases[phraseIndex];

            if (isDeleting) {
                // Remove characters
                typedTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                // Add characters
                typedTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }

            // Determine typing speed
            let typeSpeed = isDeleting ? 50 : heroConfig.typingSpeed || 100;

            // Check if phrase is complete
            if (!isDeleting && charIndex === currentPhrase.length) {
                // Pause at end of phrase
                typeSpeed = heroConfig.typingDelay || 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                // Move to next phrase
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % heroConfig.typingPhrases.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        };

        // Start typing animation
        type();
    }
};

// ========================================
// ABOUT WIDGET
// Handles about section content and stats
// ========================================
const AboutWidget = {
    /**
     * Initialize the about widget
     */
    init() {
        this.loadContent();
        this.setupStatsAnimation();
    },

    /**
     * Load about content from config
     */
    loadContent() {
        // Load profile image
        const profileImage = document.getElementById('profileImage');
        if (profileImage && aboutConfig.profileImage) {
            profileImage.src = aboutConfig.profileImage;
            profileImage.alt = "Profile Picture";
        }

        // Load about text
        const text1Element = document.getElementById('aboutText1');
        if (text1Element && aboutConfig.text1) {
            text1Element.textContent = aboutConfig.text1;
        }

        const text2Element = document.getElementById('aboutText2');
        if (text2Element && aboutConfig.text2) {
            text2Element.textContent = aboutConfig.text2;
        }
    },

    /**
     * Animate statistics counter on scroll
     */
    setupStatsAnimation() {
        const statNumbers = document.querySelectorAll('.stat-number');

        const animateCounter = (element) => {
            const target = parseInt(element.getAttribute('data-target'));
            const duration = 2000; // Animation duration in ms
            const increment = target / (duration / 16); // 60fps
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    element.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = target;
                }
            };

            updateCounter();
        };

        // Use Intersection Observer to trigger animation when visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => observer.observe(stat));
    }
};

// ========================================
// SKILLS WIDGET
// Renders skills with progress bars
// ========================================
const SkillsWidget = {
    /**
     * Initialize the skills widget
     */
    init() {
        this.renderSkills();
        this.setupProgressAnimation();
    },

    /**
     * Render skills from config
     */
    renderSkills() {
        const skillsGrid = document.getElementById('skillsGrid');
        if (!skillsGrid || !skillsConfig) return;

        skillsGrid.innerHTML = ''; // Clear existing content

        skillsConfig.forEach(skill => {
            const skillCard = this.createSkillCard(skill);
            skillsGrid.appendChild(skillCard);
        });
    },

    /**
     * Create a skill card element
     * @param {Object} skill - Skill configuration object
     * @returns {HTMLElement} Skill card element
     */
    createSkillCard(skill) {
        const card = document.createElement('div');
        card.className = 'skill-card';
        card.setAttribute('data-category', skill.category);

        card.innerHTML = `
            <div class="skill-header">
                <span class="skill-name">${skill.name}</span>
                <span class="skill-level">${skill.level}%</span>
            </div>
            <div class="skill-bar">
                <div class="skill-progress" data-level="${skill.level}" style="width: 0%"></div>
            </div>
            <div class="skill-tags">
                ${skill.tags.map(tag => `<span class="skill-tag">${tag}</span>`).join('')}
            </div>
        `;

        return card;
    },

    /**
     * Animate progress bars on scroll
     */
    setupProgressAnimation() {
        const progressBars = document.querySelectorAll('.skill-progress');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const level = entry.target.getAttribute('data-level');
                    setTimeout(() => {
                        entry.target.style.width = `${level}%`;
                    }, 100);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        progressBars.forEach(bar => observer.observe(bar));
    }
};

// ========================================
// PROJECTS WIDGET
// Renders project cards with filtering
// ========================================
const ProjectsWidget = {
    /**
     * Initialize the projects widget
     */
    init() {
        this.renderProjects();
        this.setupFiltering();
    },

    /**
     * Render projects from config
     */
    renderProjects() {
        const projectsGrid = document.getElementById('projectsGrid');
        if (!projectsGrid || !projectsConfig) return;

        projectsGrid.innerHTML = ''; // Clear existing content

        projectsConfig.forEach(project => {
            const projectCard = this.createProjectCard(project);
            projectsGrid.appendChild(projectCard);
        });
    },

    /**
     * Create a project card element
     * @param {Object} project - Project configuration object
     * @returns {HTMLElement} Project card element
     */
    createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.setAttribute('data-category', project.category);

        // Generate links HTML
        const linksHTML = project.links.map(link =>
            `<a href="${link.url}" class="project-link" target="_blank" rel="noopener">
                ${link.text} →
            </a>`
        ).join('');

        card.innerHTML = `
            <div class="project-image" style="background-image: url('${project.image || ''}')"></div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
                <div class="project-links">
                    ${linksHTML}
                </div>
            </div>
        `;

        return card;
    },

    /**
     * Setup project filtering
     */
    setupFiltering() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Get filter value
                const filter = button.getAttribute('data-filter');

                // Filter projects
                projectCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }
};

// ========================================
// CERTIFICATIONS WIDGET
// Renders certification cards
// ========================================
const CertificationsWidget = {
    /**
     * Initialize the certifications widget
     */
    init() {
        this.renderCertifications();
    },

    /**
     * Render certifications from config
     */
    renderCertifications() {
        const certsGrid = document.getElementById('certificationsGrid');
        if (!certsGrid || !certificationsConfig) return;

        certsGrid.innerHTML = ''; // Clear existing content

        certificationsConfig.forEach(cert => {
            const certCard = this.createCertCard(cert);
            certsGrid.appendChild(certCard);
        });
    },

    /**
     * Create a certification card element
     * @param {Object} cert - Certification configuration object
     * @returns {HTMLElement} Certification card element
     */
    createCertCard(cert) {
        const card = document.createElement('div');
        card.className = 'cert-card';

        card.innerHTML = `
            <div class="cert-icon">${cert.icon}</div>
            <h3 class="cert-name">${cert.name}</h3>
            <p class="cert-issuer">${cert.issuer}</p>
            <p class="cert-date">${cert.date}</p>
        `;

        // Add tooltip with full name
        if (cert.fullName) {
            card.setAttribute('data-tooltip', cert.fullName);
            card.classList.add('tooltip');
        }

        return card;
    }
};

// ========================================
// CONTACT WIDGET
// Handles contact form and info
// ========================================
const ContactWidget = {
    /**
     * Initialize the contact widget
     */
    init() {
        this.loadContactInfo();
        this.loadSocialLinks();
        this.setupContactForm();
    },

    /**
     * Load contact information from config
     */
    loadContactInfo() {
        const contactDetails = document.getElementById('contactDetails');
        if (!contactDetails || !contactConfig) return;

        contactDetails.innerHTML = `
            <p><span class="text-primary">📧</span> ${contactConfig.email}</p>
            <p><span class="text-primary">📱</span> ${contactConfig.phone}</p>
            <p><span class="text-primary">📍</span> ${contactConfig.location}</p>
            <p><span class="text-success">✓</span> ${contactConfig.availability}</p>
        `;
    },

    /**
     * Load social media links from config
     */
    loadSocialLinks() {
        const socialLinks = document.getElementById('socialLinks');
        if (!socialLinks || !contactConfig.social) return;

        socialLinks.innerHTML = ''; // Clear existing content

        contactConfig.social.forEach(social => {
            const link = document.createElement('a');
            link.href = social.url;
            link.className = 'social-link';
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.setAttribute('data-tooltip', social.platform);
            link.classList.add('tooltip');
            link.innerHTML = social.icon;
            socialLinks.appendChild(link);
        });
    },

    /**
     * Setup contact form submission
     */
    setupContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            try {
                // If form action is configured, submit to endpoint
                if (contactConfig.formAction) {
                    const response = await fetch(contactConfig.formAction, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Accept': 'application/json'
                        }
                    });

                    if (response.ok) {
                        this.showMessage('success', contactConfig.successMessage);
                        form.reset();
                    } else {
                        throw new Error('Form submission failed');
                    }
                } else {
                    // No form action configured - just show success message
                    console.log('Form data:', data);
                    this.showMessage('info', 'Form action not configured. Check console for form data.');
                }
            } catch (error) {
                console.error('Form submission error:', error);
                this.showMessage('error', contactConfig.errorMessage);
            }
        });
    },

    /**
     * Show form submission message
     * @param {string} type - Message type (success, error, info)
     * @param {string} message - Message text
     */
    showMessage(type, message) {
        const form = document.getElementById('contactForm');

        // Remove existing messages
        const existingAlert = form.querySelector('.alert');
        if (existingAlert) {
            existingAlert.remove();
        }

        // Create new message
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.textContent = message;

        // Insert before form
        form.parentNode.insertBefore(alert, form);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            alert.remove();
        }, 5000);
    }
};

// ========================================
// PARTICLES WIDGET
// Animated background particles
// ========================================
const ParticlesWidget = {
    /**
     * Initialize particles
     */
    init() {
        if (!generalConfig.enableParticles) return;

        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;

        this.createParticles(particlesContainer);
    },

    /**
     * Create particle elements
     * @param {HTMLElement} container - Container element
     */
    createParticles(container) {
        const particleCount = generalConfig.particleCount || 50;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '2px';
            particle.style.height = '2px';
            particle.style.backgroundColor = 'var(--color-primary)';
            particle.style.borderRadius = '50%';
            particle.style.boxShadow = '0 0 10px var(--color-primary)';

            // Random position
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';

            // Random animation
            const duration = 5 + Math.random() * 10;
            const delay = Math.random() * 5;
            particle.style.animation = `float ${duration}s ${delay}s infinite ease-in-out`;

            container.appendChild(particle);
        }
    }
};

// ========================================
// INITIALIZE ALL WIDGETS
// Call this function when DOM is ready
// ========================================
function initializeWidgets() {
    // Initialize all widgets
    HeroWidget.init();
    AboutWidget.init();
    SkillsWidget.init();
    ProjectsWidget.init();
    CertificationsWidget.init();
    ContactWidget.init();
    ParticlesWidget.init();

    console.log('%c[✓] All widgets initialized successfully', 'color: #00ff00; font-weight: bold;');
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeWidgets);
} else {
    initializeWidgets();
}
