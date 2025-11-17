/* ============================================
   PORTFOLIO CONFIGURATION FILE

   EASY CUSTOMIZATION - Edit your content here!
   All the text, links, and data for your portfolio

   Instructions:
   1. Replace placeholder text with your information
   2. Update URLs, emails, and links
   3. Add/remove items from arrays as needed
   4. Save and refresh your browser
   ============================================ */

// ========================================
// HERO SECTION CONFIGURATION
// Main landing page content
// ========================================
const heroConfig = {
    // Main title - shown with glitch effect
    title: "RED TEAM OPERATOR",

    // Typing animation phrases - will cycle through these
    typingPhrases: [
        "whoami: penetration tester",
        "cat /etc/passwd | grep hacker",
        "sudo apt-get install offensive-security",
        "nmap -sV -O target.com",
        "exploit.py --target 192.168.1.1",
        "metasploit > use exploit/multi/handler"
    ],

    // Typing speed in milliseconds
    typingSpeed: 100,

    // Delay between phrases in milliseconds
    typingDelay: 2000
};

// ========================================
// ABOUT SECTION CONFIGURATION
// Personal introduction and stats
// ========================================
const aboutConfig = {
    // Profile image path (place your image in assets/images/)
    profileImage: "assets/images/profile.jpg",

    // About text - first paragraph
    text1: "I'm a passionate Red Team operator specializing in offensive security, penetration testing, and vulnerability research. With a deep understanding of attack vectors and defensive mechanisms, I help organizations identify and remediate security weaknesses before malicious actors can exploit them.",

    // About text - second paragraph
    text2: "My expertise spans across web application security, network penetration testing, social engineering, and custom exploit development. I believe in continuous learning and staying ahead of emerging threats in the ever-evolving cybersecurity landscape.",

    // Statistics - these will animate on scroll
    stats: [
        {
            number: 5,        // Years of experience
            label: "Years Experience"
        },
        {
            number: 50,       // Projects completed
            label: "Projects Completed"
        },
        {
            number: 100,      // Vulnerabilities found
            label: "Vulnerabilities Found"
        }
    ]
};

// ========================================
// SKILLS SECTION CONFIGURATION
// Technical skills with proficiency levels
// ========================================
const skillsConfig = [
    {
        name: "Penetration Testing",
        level: 95,              // Proficiency level (0-100)
        category: "offensive",
        tags: ["OWASP", "Burp Suite", "PTES"]
    },
    {
        name: "Network Security",
        level: 90,
        category: "infrastructure",
        tags: ["Nmap", "Wireshark", "Firewall Bypass"]
    },
    {
        name: "Web Application Security",
        level: 92,
        category: "web",
        tags: ["XSS", "SQLi", "CSRF", "API Testing"]
    },
    {
        name: "Exploit Development",
        level: 85,
        category: "development",
        tags: ["Python", "C", "Assembly", "Buffer Overflow"]
    },
    {
        name: "Social Engineering",
        level: 88,
        category: "human",
        tags: ["Phishing", "Pretexting", "OSINT"]
    },
    {
        name: "Malware Analysis",
        level: 82,
        category: "analysis",
        tags: ["Reverse Engineering", "IDA Pro", "Ghidra"]
    },
    {
        name: "Cloud Security",
        level: 80,
        category: "cloud",
        tags: ["AWS", "Azure", "GCP", "Container Security"]
    },
    {
        name: "Red Team Operations",
        level: 93,
        category: "operations",
        tags: ["C2", "Cobalt Strike", "Empire", "Covenant"]
    },
    {
        name: "Wireless Security",
        level: 78,
        category: "wireless",
        tags: ["WiFi", "Bluetooth", "Aircrack-ng"]
    }
];

// ========================================
// PROJECTS SECTION CONFIGURATION
// Portfolio projects showcase
// ========================================
const projectsConfig = [
    {
        title: "Corporate Network Penetration Test",
        description: "Comprehensive security assessment of a Fortune 500 company's internal network, identifying 23 critical vulnerabilities and providing detailed remediation strategies.",
        image: "assets/images/project1.jpg",  // Optional project image
        category: "pentest",                   // Used for filtering
        tags: ["Active Directory", "Privilege Escalation", "Lateral Movement"],
        links: [
            {
                text: "View Report",
                url: "#"  // Replace with actual link
            }
        ]
    },
    {
        title: "Custom Exploit Development",
        description: "Developed a zero-day exploit for a critical vulnerability in a widely-used enterprise application, responsibly disclosed to the vendor.",
        image: "assets/images/project2.jpg",
        category: "tools",
        tags: ["Python", "Buffer Overflow", "CVE-2024-XXXXX"],
        links: [
            {
                text: "GitHub",
                url: "https://github.com/yourusername/exploit"
            }
        ]
    },
    {
        title: "Advanced OSINT Framework",
        description: "Built an automated OSINT collection framework that aggregates data from multiple sources for reconnaissance and threat intelligence.",
        image: "assets/images/project3.jpg",
        category: "osint",
        tags: ["Python", "API Integration", "Data Mining"],
        links: [
            {
                text: "GitHub",
                url: "https://github.com/yourusername/osint-framework"
            },
            {
                text: "Demo",
                url: "#"
            }
        ]
    },
    {
        title: "Malware Analysis Lab",
        description: "Reverse-engineered several APT malware samples to understand TTPs and develop detection signatures for enterprise EDR solutions.",
        image: "assets/images/project4.jpg",
        category: "malware",
        tags: ["Reverse Engineering", "IDA Pro", "Threat Intelligence"],
        links: [
            {
                text: "Analysis Report",
                url: "#"
            }
        ]
    },
    {
        title: "Red Team Exercise",
        description: "Led a comprehensive red team engagement simulating advanced persistent threat actors, achieving full domain compromise within 48 hours.",
        image: "assets/images/project5.jpg",
        category: "pentest",
        tags: ["Red Team", "Social Engineering", "Physical Security"],
        links: [
            {
                text: "Case Study",
                url: "#"
            }
        ]
    },
    {
        title: "Security Automation Suite",
        description: "Created a comprehensive toolkit for automating common penetration testing tasks, reducing assessment time by 40%.",
        image: "assets/images/project6.jpg",
        category: "tools",
        tags: ["Automation", "Python", "Bash", "DevSecOps"],
        links: [
            {
                text: "GitHub",
                url: "https://github.com/yourusername/security-automation"
            },
            {
                text: "Documentation",
                url: "#"
            }
        ]
    }
];

// ========================================
// CERTIFICATIONS SECTION CONFIGURATION
// Professional certifications
// ========================================
const certificationsConfig = [
    {
        name: "OSCP",
        fullName: "Offensive Security Certified Professional",
        issuer: "Offensive Security",
        date: "2023",
        icon: "🎯"  // You can use emojis or replace with image path
    },
    {
        name: "CEH",
        fullName: "Certified Ethical Hacker",
        issuer: "EC-Council",
        date: "2022",
        icon: "🔓"
    },
    {
        name: "GPEN",
        fullName: "GIAC Penetration Tester",
        issuer: "GIAC",
        date: "2023",
        icon: "🛡️"
    },
    {
        name: "CRTP",
        fullName: "Certified Red Team Professional",
        issuer: "Pentester Academy",
        date: "2024",
        icon: "🔴"
    },
    {
        name: "eWPTX",
        fullName: "eLearnSecurity Web Penetration Tester eXtreme",
        issuer: "eLearnSecurity",
        date: "2023",
        icon: "🌐"
    },
    {
        name: "OSWE",
        fullName: "Offensive Security Web Expert",
        issuer: "Offensive Security",
        date: "2024",
        icon: "💻"
    }
];

// ========================================
// CONTACT SECTION CONFIGURATION
// Contact information and social links
// ========================================
const contactConfig = {
    // Contact details
    email: "contact@redteam.pro",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    availability: "Available for freelance work",

    // Social media links
    social: [
        {
            platform: "GitHub",
            url: "https://github.com/yourusername",
            icon: "💻"  // You can replace with SVG or font icon
        },
        {
            platform: "LinkedIn",
            url: "https://linkedin.com/in/yourusername",
            icon: "💼"
        },
        {
            platform: "Twitter",
            url: "https://twitter.com/yourusername",
            icon: "🐦"
        },
        {
            platform: "HackTheBox",
            url: "https://hackthebox.eu/profile/yourusername",
            icon: "📦"
        },
        {
            platform: "Blog",
            url: "https://yourblog.com",
            icon: "📝"
        }
    ],

    // Form submission endpoint
    // You can use services like Formspree, EmailJS, or your own backend
    formAction: "https://formspree.io/f/your-form-id",

    // Success message after form submission
    successMessage: "Thank you for your message! I'll get back to you soon.",

    // Error message if form submission fails
    errorMessage: "Oops! Something went wrong. Please try again."
};

// ========================================
// NAVIGATION CONFIGURATION
// Navigation menu items
// ========================================
const navConfig = {
    // Brand text in navigation
    brand: "root@portfolio:~$",

    // Menu items - must match section IDs in HTML
    menuItems: [
        { text: "Home", href: "#hero" },
        { text: "About", href: "#about" },
        { text: "Skills", href: "#skills" },
        { text: "Projects", href: "#projects" },
        { text: "Certifications", href: "#certifications" },
        { text: "Contact", href: "#contact" }
    ]
};

// ========================================
// GENERAL SETTINGS
// Misc configuration options
// ========================================
const generalConfig = {
    // Enable/disable animations
    enableAnimations: true,

    // Enable/disable particle background
    enableParticles: true,

    // Number of particles
    particleCount: 50,

    // Enable smooth scroll
    smoothScroll: true,

    // Show back to top button after scrolling this many pixels
    backToTopThreshold: 300,

    // Google Analytics tracking ID (optional)
    // Set to null or empty string to disable
    googleAnalyticsId: "",

    // Page title format
    pageTitle: "Red Team Portfolio | Cybersecurity Professional",

    // Copyright year (auto-updates to current year)
    copyrightName: "Red Team Portfolio"
};

// ========================================
// EXPORT CONFIGURATION
// Make config available to other scripts
// ========================================

// Don't modify this section unless you know what you're doing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        heroConfig,
        aboutConfig,
        skillsConfig,
        projectsConfig,
        certificationsConfig,
        contactConfig,
        navConfig,
        generalConfig
    };
}
