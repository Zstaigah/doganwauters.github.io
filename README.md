# Red Team Cybersecurity Portfolio

A modern, widget-based portfolio website designed specifically for red team operators, penetration testers, and cybersecurity professionals. Features a sleek terminal-inspired dark theme with red accents and easy customization through a simple configuration file.

## 🎯 Features

- **Widget-Based Architecture**: Modular design with independent, reusable widgets
- **Easy Customization**: All content managed through a single `config.js` file
- **Red Team Theme**: Dark cybersecurity aesthetic with terminal-style elements
- **Fully Responsive**: Optimized for all devices (desktop, tablet, mobile)
- **Smooth Animations**: Scroll-triggered animations and typing effects
- **Project Filtering**: Categorize and filter portfolio projects
- **Contact Form**: Ready-to-integrate contact form
- **Performance Optimized**: Fast loading with lazy-loaded images
- **Well Commented**: Every file thoroughly documented
- **SEO Friendly**: Semantic HTML and meta tags included

## 📁 Project Structure

```
doganwauters.github.io/
├── index.html              # Main HTML file with widget containers
├── README.md               # This file - documentation
│
├── css/                    # Stylesheets directory
│   ├── theme.css          # Color scheme and base styling
│   ├── widgets.css        # Widget-specific styles
│   └── main.css           # Additional layout and utilities
│
├── js/                     # JavaScript directory
│   ├── config.js          # ⭐ MAIN CONFIGURATION FILE
│   ├── widgets.js         # Widget rendering logic
│   └── main.js            # Core functionality (nav, scroll, etc.)
│
└── assets/                 # Media assets directory
    ├── images/            # Image files
    │   └── profile.jpg    # Your profile picture
    └── icons/             # Icon files
```

## 🚀 Quick Start

### 1. Customize Your Content

Open `js/config.js` and update with your information:

```javascript
// Update hero section
const heroConfig = {
    title: "YOUR NAME",
    typingPhrases: [
        "your custom phrases here",
        "penetration tester",
        "security researcher"
    ]
};

// Update about section
const aboutConfig = {
    profileImage: "assets/images/your-photo.jpg",
    text1: "Your introduction here...",
    text2: "More about you..."
};

// Add your skills, projects, certifications, etc.
```

### 2. Add Your Profile Picture

Replace the placeholder image:
- Place your photo in `assets/images/`
- Update the path in `js/config.js`

### 3. Open in Browser

Simply open `index.html` in your web browser or use a local development server:

```bash
# Using Python 3
python -m http.server 8000

# Using PHP
php -S localhost:8000

# Using Node.js (with http-server)
npx http-server
```

Then visit `http://localhost:8000`

## 📝 Customization Guide

### Editing Content

All content is managed in `js/config.js`. No need to touch HTML or CSS!

#### Hero Section

```javascript
const heroConfig = {
    title: "RED TEAM OPERATOR",
    typingPhrases: [
        "whoami: penetration tester",
        "nmap -sV target.com",
        // Add more phrases...
    ],
    typingSpeed: 100,
    typingDelay: 2000
};
```

#### Skills Section

```javascript
const skillsConfig = [
    {
        name: "Penetration Testing",
        level: 95,  // 0-100
        category: "offensive",
        tags: ["OWASP", "Burp Suite", "PTES"]
    },
    // Add more skills...
];
```

#### Projects Section

```javascript
const projectsConfig = [
    {
        title: "Project Name",
        description: "Project description...",
        image: "assets/images/project1.jpg",
        category: "pentest",  // pentest, malware, osint, tools
        tags: ["Tag1", "Tag2"],
        links: [
            { text: "GitHub", url: "https://github.com/..." }
        ]
    },
    // Add more projects...
];
```

#### Contact Information

```javascript
const contactConfig = {
    email: "your@email.com",
    phone: "+1 234 567 8900",
    location: "Your City",
    social: [
        { platform: "GitHub", url: "https://github.com/...", icon: "💻" },
        { platform: "LinkedIn", url: "https://linkedin.com/in/...", icon: "💼" }
    ]
};
```

### Changing Colors

Edit `css/theme.css` to customize the color scheme:

```css
:root {
    --color-primary: #FF0000;           /* Main red color */
    --color-bg-primary: #0a0a0a;        /* Background color */
    --color-terminal-green: #00ff00;    /* Terminal green */
    /* Modify other colors as needed */
}
```

### Color Scheme Examples

#### Matrix Green Theme
```css
:root {
    --color-primary: #00ff00;
    --color-border: #00ff00;
}
```

#### Purple Hacker Theme
```css
:root {
    --color-primary: #a855f7;
    --color-border: #a855f7;
}
```

#### Cyan/Blue Theme
```css
:root {
    --color-primary: #00d9ff;
    --color-border: #00d9ff;
}
```

## 🔧 Advanced Configuration

### Form Integration

To connect the contact form to an email service:

**Using Formspree** (Free):
- Sign up at https://formspree.io
- Get your form endpoint
- Update `js/config.js`:
```javascript
const contactConfig = {
    formAction: "https://formspree.io/f/your-form-id"
};
```

### Google Analytics

Enable analytics in `js/config.js`:

```javascript
const generalConfig = {
    googleAnalyticsId: "G-XXXXXXXXXX"
};
```

### Particle Effects

Configure particle animation:

```javascript
const generalConfig = {
    enableParticles: true,
    particleCount: 50  // Adjust for performance
};
```

## 📱 Responsive Breakpoints

- **Mobile**: < 480px
- **Tablet**: 481px - 768px
- **Desktop**: 769px - 1280px
- **Large Desktop**: > 1280px

## 🌐 Deployment

### GitHub Pages

1. Push your code to GitHub
2. Go to repository Settings → Pages
3. Select branch (usually `main`)
4. Your site will be live at `https://yourusername.github.io`

### Netlify

1. Sign up at https://netlify.com
2. Connect your Git repository
3. Deploy with one click

## 🐛 Troubleshooting

### Widgets not loading?
- Check browser console for errors
- Ensure `config.js` loads before `widgets.js`
- Verify all configuration objects are properly formatted

### Animations not working?
- Check `generalConfig.enableAnimations` is `true`
- Ensure browser supports IntersectionObserver

### Contact form not working?
- Verify `formAction` is set in `contactConfig`
- Check browser console for errors
- Test with a service like Formspree

### Images not showing?
- Verify image paths are correct
- Ensure images are in `assets/images/` directory

## 📚 File Documentation

### HTML Files
- **index.html**: Main structure with widget containers and semantic HTML

### CSS Files
- **theme.css**: Color variables, typography, base styles
- **widgets.css**: Individual widget styling (nav, hero, projects, etc.)
- **main.css**: Utility classes, animations, responsive helpers

### JavaScript Files
- **config.js**: All customizable content (update this!)
- **widgets.js**: Widget rendering and initialization logic
- **main.js**: Core functionality (navigation, scroll, animations)

## 💡 Tips & Best Practices

1. **Update Regularly**: Keep your portfolio current with latest projects
2. **Test Responsively**: Check on multiple devices and browsers
3. **Optimize Images**: Compress before uploading (aim for < 200KB)
4. **Backup Config**: Keep a copy of your `config.js` settings
5. **Check Console**: Open browser DevTools to see welcome message and debug info

## 🎯 Recommended Additions

- Add a blog section for security writeups
- Include CTF achievements
- Add dark/light theme toggle
- Implement animated terminal window
- Include vulnerability disclosure timeline

---

**Built with ❤️ for offensive security professionals**

*Fully commented and easy to customize!*
