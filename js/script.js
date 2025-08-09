// EvolveMe Kenya Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations and interactions
    initializeNavigation();
    initializeCounters();
    initializeScrollAnimations();
    initializeTypingAnimation();
    initializeColorSchemes();
});

// Navigation functionality
function initializeNavigation() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active nav link highlighting
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        const navHeight = document.querySelector('.navbar').offsetHeight;
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && 
                window.pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(0, 123, 255, 0.98)';
        } else {
            navbar.style.background = 'rgba(0, 123, 255, 0.95)';
        }
    });
}

// Counter animation
function initializeCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 2000; // Animation duration in milliseconds
    
    const countUp = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / (speed / 16); // 60 FPS
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    // Intersection Observer for counter animation
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                if (!counter.classList.contains('counted')) {
                    counter.classList.add('counted');
                    countUp(counter);
                }
            }
        });
    }, { threshold: 0.7 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Scroll animations
function initializeScrollAnimations() {
    // Add animation classes to elements
    const animateElements = document.querySelectorAll('.service-card, .team-card, .stat-card');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
    });
    
    // Intersection Observer for scroll animations
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        scrollObserver.observe(el);
    });
}

// Typing animation for hero text
function initializeTypingAnimation() {
    const heroTitle = document.querySelector('.hero-section h1');
    if (!heroTitle) return;
    
    const originalText = heroTitle.innerHTML;
    heroTitle.innerHTML = '';
    
    let charIndex = 0;
    const typeSpeed = 50;
    
    function typeChar() {
        if (charIndex < originalText.length) {
            heroTitle.innerHTML += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeChar, typeSpeed);
        }
    }
    
    // Start typing animation after a delay
    setTimeout(typeChar, 500);
}

// Floating cards animation enhancement
function enhanceFloatingCards() {
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach((card, index) => {
        // Add mouse interaction
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-30px) scale(1.05)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0px) scale(1)';
        });
        
        // Add staggered entrance animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.8s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0px)';
        }, 1000 + (index * 200));
    });
}

// Service card hover effects
function initializeServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.transition = 'all 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

// Team card interactions
function initializeTeamCards() {
    const teamCards = document.querySelectorAll('.team-card');
    
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const avatar = this.querySelector('.avatar-placeholder');
            if (avatar) {
                avatar.style.transform = 'scale(1.1)';
                avatar.style.transition = 'all 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const avatar = this.querySelector('.avatar-placeholder');
            if (avatar) {
                avatar.style.transform = 'scale(1)';
            }
        });
    });
}

// Button click effects
function initializeButtons() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Lazy loading for images (if any are added later)
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Page load animations
window.addEventListener('load', function() {
    // Remove loading class from body if it exists
    document.body.classList.add('loaded');
    
    // Initialize enhanced animations
    enhanceFloatingCards();
    initializeServiceCards();
    initializeTeamCards();
    initializeButtons();
    initializeLazyLoading();
});

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Scroll performance optimization
const optimizedScroll = debounce(() => {
    // Any scroll-heavy operations can go here
}, 10);

window.addEventListener('scroll', optimizedScroll);

// Color scheme functionality
function initializeColorSchemes() {
    const colorSchemes = {
        kenya: {
            primary: '#2E8B57',
            secondary: '#FF6B35', 
            accent: '#FFD700',
            success: '#27AE60',
            info: '#3498DB',
            warning: '#F39C12',
            danger: '#E74C3C',
            dark: '#2C3E50'
        },
        ocean: {
            primary: '#006B96',
            secondary: '#fffff',
            accent: '#26C6DA',
            success: '#00ACC1',
            info: '#29B6F6',
            warning: '#FFB74D',
            danger: '#EF5350',
            dark: '#37474F'
        },
        sunset: {
            primary: '#FF5722',
            secondary: '#FF9800',
            accent: '#FFC107',
            success: '#8BC34A',
            info: '#03DAC6',
            warning: '#FF7043',
            danger: '#F44336',
            dark: '#424242'
        },
        forest: {
            primary: '#388E3C',
            secondary: '#689F38',
            accent: '#8BC34A',
            success: '#4CAF50',
            info: '#26A69A',
            warning: '#FFA726',
            danger: '#EF5350',
            dark: '#2E7D32'
        },
        corporate: {
            primary: '#1565C0',
            secondary: '#424242',
            accent: '#37474F',
            success: '#43A047',
            info: '#039BE5',
            warning: '#FB8C00',
            danger: '#E53935',
            dark: '#263238'
        }
    };

    const schemeButtons = document.querySelectorAll('.color-scheme-btn');
    
    schemeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const scheme = this.getAttribute('data-scheme');
            const colors = colorSchemes[scheme];
            
            // Remove active class from all buttons
            schemeButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.style.border = '2px solid transparent';
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            this.style.border = '2px solid white';
            
            // Apply new color scheme
            applyColorScheme(colors);
            
            // Store preference
            localStorage.setItem('selectedColorScheme', scheme);
        });
    });
    
    // Load saved scheme
    const savedScheme = localStorage.getItem('selectedColorScheme') || 'kenya';
    const savedButton = document.querySelector(`[data-scheme="${savedScheme}"]`);
    if (savedButton) {
        savedButton.click();
    }
}

function applyColorScheme(colors) {
    const root = document.documentElement;
    
    // Update CSS custom properties
    root.style.setProperty('--primary-color', colors.primary);
    root.style.setProperty('--secondary-color', colors.secondary);
    root.style.setProperty('--accent-color', colors.accent);
    root.style.setProperty('--success-color', colors.success);
    root.style.setProperty('--info-color', colors.info);
    root.style.setProperty('--warning-color', colors.warning);
    root.style.setProperty('--danger-color', colors.danger);
    root.style.setProperty('--dark-color', colors.dark);
    
    // Update navbar background
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.background = `rgba(${hexToRgb(colors.primary)}, 0.95) !important`;
    }
    
    // Update hero gradient
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.style.background = `linear-gradient(135deg, ${colors.primary} 0%, ${colors.dark} 100%)`;
    }
    
    // Update accent text color
    const accentText = document.querySelector('[style*="color: var(--accent-color)"]');
    if (accentText) {
        accentText.style.color = colors.accent;
    }
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? 
        `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
}

// Add CSS for ripple effect and color scheme buttons
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .color-scheme-btn {
        cursor: pointer;
        transition: all 0.3s ease;
        opacity: 0.8;
    }
    
    .color-scheme-btn:hover {
        opacity: 1;
        transform: scale(1.1);
    }
    
    .color-scheme-btn.active {
        opacity: 1;
        transform: scale(1.1);
    }
`;
document.head.appendChild(style);
