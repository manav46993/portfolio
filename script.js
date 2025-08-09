// DOM elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const animatedText = document.getElementById('animated-text');
const contactForm = document.getElementById('contact-form');
const downloadBtn = document.getElementById('download-resume');

// Mobile navigation toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Animated text in hero section
const textArray = ['Developer', 'Designer', 'Problem Solver'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeWriter() {
    const currentText = textArray[textIndex];
    
    if (isDeleting) {
        animatedText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        animatedText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        typeSpeed = 500; // Pause before typing next word
    }

    setTimeout(typeWriter, typeSpeed);
}

// Start the typewriter effect
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeWriter, 1000);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 15, 35, 0.98)';
    } else {
        navbar.style.background = 'rgba(15, 15, 35, 0.95)';
    }
});

// Skill bars animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-width');
        bar.style.width = targetWidth + '%';
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-on-scroll');
            
            // Animate skill bars when skills section comes into view
            if (entry.target.classList.contains('skills')) {
                setTimeout(animateSkillBars, 500);
            }
        }
    });
}, observerOptions);

// Observe sections for animations
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Contact form handling
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    try {
        // Simulate form submission (replace with actual EmailJS or backend integration)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Success state
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.background = '#06d6a0';
        
        // Reset form
        contactForm.reset();
        
        // Show success message
        showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
        }, 3000);
        
    } catch (error) {
        // Error state
        submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error';
        submitBtn.style.background = '#e74c3c';
        
        showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
        }, 3000);
    }
});

// Download resume functionality
downloadBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Create a simple notification since we don't have an actual PDF file
    showNotification('Resume download will be available soon! Please contact me directly for my latest resume.', 'info');
    
    // In a real implementation, you would have:
    // const link = document.createElement('a');
    // link.href = 'path/to/your/resume.pdf';
    // link.download = 'Manav_K_Resume.pdf';
    // link.click();
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add notification styles
    const notificationStyles = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            max-width: 400px;
            padding: 1rem;
            border-radius: var(--border-radius);
            color: white;
            z-index: 9999;
            animation: slideInRight 0.3s ease-out;
            box-shadow: var(--shadow);
        }
        
        .notification-success {
            background: linear-gradient(135deg, #06d6a0, #059669);
        }
        
        .notification-error {
            background: linear-gradient(135deg, #e74c3c, #c0392b);
        }
        
        .notification-info {
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
        }
        
        .notification-content {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 1rem;
        }
        
        .notification-message {
            flex: 1;
            line-height: 1.4;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 0;
            opacity: 0.8;
            transition: opacity 0.2s;
        }
        
        .notification-close:hover {
            opacity: 1;
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @media (max-width: 480px) {
            .notification {
                right: 10px;
                left: 10px;
                max-width: none;
            }
        }
    `;
    
    // Add styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const styleElement = document.createElement('style');
        styleElement.id = 'notification-styles';
        styleElement.textContent = notificationStyles;
        document.head.appendChild(styleElement);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Add loading animation for images (if you add actual project screenshots)
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', () => {
        img.classList.add('loaded');
    });
});

// Add cursor trail effect (optional fancy feature)
document.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768) { // Only on desktop
        createCursorTrail(e.clientX, e.clientY);
    }
});

function createCursorTrail(x, y) {
    const trail = document.createElement('div');
    trail.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 6px;
        height: 6px;
        background: var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0.6;
        animation: trailFade 0.5s ease-out forwards;
    `;
    
    document.body.appendChild(trail);
    
    setTimeout(() => {
        trail.remove();
    }, 500);
}

// Add trail fade animation
const trailStyles = `
    @keyframes trailFade {
        to {
            opacity: 0;
            transform: scale(0);
        }
    }
`;

const trailStyleElement = document.createElement('style');
trailStyleElement.textContent = trailStyles;
document.head.appendChild(trailStyleElement);

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
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

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 15, 35, 0.98)';
    } else {
        navbar.style.background = 'rgba(15, 15, 35, 0.95)';
    }
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// Add page load animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add loading styles
    const loadingStyles = `
        body {
            opacity: 0;
            transition: opacity 0.3s ease-in;
        }
        
        body.loaded {
            opacity: 1;
        }
    `;
    
    const loadingStyleElement = document.createElement('style');
    loadingStyleElement.textContent = loadingStyles;
    document.head.appendChild(loadingStyleElement);
});

console.log('🚀 Manav K. Portfolio - Loaded successfully!');
console.log('Built with ❤️ using HTML, CSS & JavaScript');
