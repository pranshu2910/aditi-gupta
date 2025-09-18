// Portfolio Website JavaScript
// Author: Aditi Sharma Portfolio

// Typing Animation
function initTypingAnimation() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;
    
    const words = ['Writer', 'Editor', 'Storyteller'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    
    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Deleting characters
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50; // Faster when deleting
        } else {
            // Typing characters
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100; // Normal speed when typing
        }
        
        if (!isDeleting && charIndex === currentWord.length) {
            // Finished typing current word, wait before deleting
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Finished deleting, move to next word
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before starting next word
        }
        
        setTimeout(type, typeSpeed);
    }
    
    // Start typing animation after a short delay
    setTimeout(type, 1000);
}

// Scroll Animations using Intersection Observer
function initScrollAnimations() {
    // Check if Intersection Observer is supported
    if (!('IntersectionObserver' in window)) {
        // Fallback: show all elements immediately
        const animatedElements = document.querySelectorAll('.scroll-animate');
        animatedElements.forEach(el => el.classList.add('animate-in'));
        return;
    }

    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class when element comes into view
                entry.target.classList.add('animate-in');
                
                // Unobserve the element after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, {
        // Trigger animation when element is 20% visible
        threshold: 0.2,
        // Start animation 50px before element comes into view
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all elements with scroll animation classes
    const animatedElements = document.querySelectorAll('.scroll-animate');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Special handling for staggered animations (portfolio items, blog posts)
    const staggeredContainers = document.querySelectorAll('.portfolio-grid, .blog-grid');
    staggeredContainers.forEach(container => {
        const items = container.querySelectorAll('.portfolio-item, .blog-post');
        items.forEach((item, index) => {
            // Add staggered delay classes
            if (index < 8) { // Limit to 8 items max for performance
                const delayClass = `delay-${(index + 1) * 100}`;
                item.classList.add(delayClass);
            }
        });
    });
}

// Performance optimizations
function initPerformanceOptimizations() {
    // Lazy loading for images with intersection observer
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.1
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Debounce scroll events for better performance
    let scrollTimeout;
    const originalScrollHandler = window.onscroll;
    
    window.onscroll = function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            if (originalScrollHandler) {
                originalScrollHandler();
            }
        }, 16); // ~60fps
    };
    
    // Optimize animations for better performance
    const animatedElements = document.querySelectorAll('.scroll-animate');
    if ('IntersectionObserver' in window) {
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(el => animationObserver.observe(el));
    }
    
    // Preload critical resources
    const criticalResources = [
        'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = resource;
        document.head.appendChild(link);
    });
    
    // Service Worker registration for caching
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
}

// Loading screen functionality
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Hide loading screen when everything is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            // Remove from DOM after animation
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 2000); // Show for at least 2 seconds
    });
    
    // Fallback: hide after 5 seconds regardless
    setTimeout(() => {
        if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }
    }, 5000);
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize performance optimizations first
    initPerformanceOptimizations();
    initLoadingScreen();
    
    // Initialize all functionality
    initNavigation();
    initScrollAnimations();
    initPortfolio();
    initContactForm();
    initThemeToggle();
    initSmoothScrolling();
    initMobileMenu();
    initTypingAnimation();
    initBlogSearch();
    initFloatingParticles();
    initParallaxEffect();
    initFAQ();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Active link highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}


// Portfolio functionality
function initPortfolio() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Modal functionality
function openModal(modalId) {
    console.log('Attempting to open modal:', modalId);
    const modal = document.getElementById(modalId);
    if (modal) {
        console.log('Modal found, opening...');
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Add animation
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.animation = 'modalSlideIn 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }
        console.log('Modal opened successfully');
    } else {
        console.error('Modal not found:', modalId);
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modals when clicking outside or on close button
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    if (e.target.classList.contains('close')) {
        const modal = e.target.closest('.modal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
});

// Close modals with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal[style*="block"]');
        if (openModal) {
            openModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
});

// Contact form functionality
function initContactForm() {
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    // Form validation
    function validateField(field, errorElement, validationFn, errorMessage) {
        const value = field.value.trim();
        const isValid = validationFn(value);
        
        if (!isValid) {
            field.style.borderColor = '#8B0000';
            errorElement.textContent = errorMessage;
            errorElement.style.display = 'block';
            return false;
        } else {
            field.style.borderColor = '#E0D5C7';
            errorElement.textContent = '';
            errorElement.style.display = 'none';
            return true;
        }
    }
    
    // Validation functions
    function validateName(name) {
        return name.length >= 2 && /^[a-zA-Z\s]+$/.test(name);
    }
    
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    function validateMessage(message) {
        return message.length >= 10;
    }
    
    // Real-time validation
    nameInput.addEventListener('blur', function() {
        validateField(nameInput, document.getElementById('name-error'), validateName, 'Name must be at least 2 characters and contain only letters');
    });
    
    emailInput.addEventListener('blur', function() {
        validateField(emailInput, document.getElementById('email-error'), validateEmail, 'Please enter a valid email address');
    });
    
    messageInput.addEventListener('blur', function() {
        validateField(messageInput, document.getElementById('message-error'), validateMessage, 'Message must be at least 10 characters long');
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateField(nameInput, document.getElementById('name-error'), validateName, 'Name must be at least 2 characters and contain only letters');
        const isEmailValid = validateField(emailInput, document.getElementById('email-error'), validateEmail, 'Please enter a valid email address');
        const isMessageValid = validateField(messageInput, document.getElementById('message-error'), validateMessage, 'Message must be at least 10 characters long');
        
        if (isNameValid && isEmailValid && isMessageValid) {
            // Simulate form submission
            showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
            form.reset();
            
            // In a real application, you would send the data to a server here
            console.log('Form submitted:', {
                name: nameInput.value,
                email: emailInput.value,
                message: messageInput.value
            });
        } else {
            showNotification('Please fix the errors above and try again.', 'error');
        }
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 3000;
        max-width: 400px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Set background color based on type
    if (type === 'success') {
        notification.style.backgroundColor = '#2F4F4F';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#8B0000';
    } else {
        notification.style.backgroundColor = '#8B4513';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference or default to dark mode
    const currentTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const themeIcon = document.querySelector('#theme-toggle i');
    if (theme === 'dark') {
        themeIcon.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    // Add click handler to scroll indicator
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                const offsetTop = aboutSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

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

// Performance optimization: Throttle scroll events
const throttledScrollHandler = debounce(function() {
    // Scroll-based animations and effects
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-background');
    
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
}, 10);

window.addEventListener('scroll', throttledScrollHandler);

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
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
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
initLazyLoading();

// Add loading states for better UX
function showLoadingState(element) {
    element.style.opacity = '0.6';
    element.style.pointerEvents = 'none';
}

function hideLoadingState(element) {
    element.style.opacity = '1';
    element.style.pointerEvents = 'auto';
}

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Tab navigation for modals
    if (e.key === 'Tab' && document.querySelector('.modal[style*="block"]')) {
        const modal = document.querySelector('.modal[style*="block"]');
        const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    }
});

// Add ARIA labels for accessibility
function initAccessibility() {
    // Add ARIA labels to interactive elements
    const buttons = document.querySelectorAll('button:not([aria-label])');
    buttons.forEach(button => {
        if (!button.getAttribute('aria-label')) {
            button.setAttribute('aria-label', button.textContent || 'Button');
        }
    });
    
    // Add role attributes where needed
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
    });
}

// Initialize accessibility features
initAccessibility();

// Add error handling for images
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.src = 'https://via.placeholder.com/300x400/8B4513/FFFFFF?text=Image+Not+Found';
        e.target.alt = 'Image not available';
    }
}, true);

// Parallax Effect for Hero Background
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    const animatedGradient = document.querySelector('.animated-gradient');
    const literaryElements = document.querySelector('.literary-elements');
    
    if (!hero || !animatedGradient || !literaryElements) return;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        const rate2 = scrolled * -0.3;
        
        animatedGradient.style.transform = `translateY(${rate}px)`;
        literaryElements.style.transform = `translateY(${rate2}px)`;
    }
    
    window.addEventListener('scroll', updateParallax);
}

// Floating Particles Effect
function initFloatingParticles() {
    const particlesContainer = document.getElementById('floating-particles');
    if (!particlesContainer) return;
    
    const particleCount = 15;
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size between 2px and 8px
        const size = Math.random() * 6 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random starting position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        
        // Random animation duration variation
        const duration = 20 + Math.random() * 10;
        particle.style.animationDuration = duration + 's';
        
        particlesContainer.appendChild(particle);
        
        // Remove particle after animation completes
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, duration * 1000);
    }
    
    // Create initial particles
    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => createParticle(), i * 1000);
    }
    
    // Continuously create new particles
    setInterval(() => {
        if (particlesContainer.children.length < particleCount) {
            createParticle();
        }
    }, 2000);
}

// FAQ Accordion Functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
}

// Blog Search and Filter Functionality
function initBlogSearch() {
    const searchInput = document.getElementById('blog-search');
    const searchClear = document.getElementById('search-clear');
    const filterButtons = document.querySelectorAll('.blog-filters .filter-btn');
    const blogPosts = document.querySelectorAll('.blog-post');
    const blogGrid = document.getElementById('blog-grid');
    const noResults = document.getElementById('no-results');
    
    let currentFilter = 'all';
    let currentSearchTerm = '';
    
    // Search functionality
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        currentSearchTerm = searchTerm;
        
        // Show/hide clear button
        searchClear.style.display = searchTerm ? 'block' : 'none';
        
        filterPosts();
    }
    
    // Filter functionality
    function filterPosts() {
        let visibleCount = 0;
        
        blogPosts.forEach((post, index) => {
            const category = post.getAttribute('data-category');
            const tags = post.getAttribute('data-tags').toLowerCase();
            const title = post.querySelector('.blog-title').textContent.toLowerCase();
            const excerpt = post.querySelector('.blog-excerpt').textContent.toLowerCase();
            
            const matchesFilter = currentFilter === 'all' || category === currentFilter;
            const matchesSearch = !currentSearchTerm || 
                title.includes(currentSearchTerm) || 
                excerpt.includes(currentSearchTerm) || 
                tags.includes(currentSearchTerm);
            
            if (matchesFilter && matchesSearch) {
                post.classList.remove('hidden');
                post.classList.add('visible');
                visibleCount++;
                
                // Add staggered animation delay
                post.style.animationDelay = `${index * 0.1}s`;
            } else {
                post.classList.add('hidden');
                post.classList.remove('visible');
            }
        });
        
        // Show/hide no results message
        if (visibleCount === 0) {
            noResults.classList.add('show');
            blogGrid.style.display = 'none';
        } else {
            noResults.classList.remove('show');
            blogGrid.style.display = 'grid';
        }
    }
    
    // Event listeners
    searchInput.addEventListener('input', performSearch);
    
    searchClear.addEventListener('click', () => {
        searchInput.value = '';
        searchClear.style.display = 'none';
        performSearch();
        searchInput.focus();
    });
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update current filter
            currentFilter = button.getAttribute('data-filter');
            
            // Filter posts
            filterPosts();
        });
    });
    
    // Clear search on Escape key
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchInput.value = '';
            searchClear.style.display = 'none';
            performSearch();
        }
    });
    
    // Initialize with all posts visible
    filterPosts();
}

// Error handling for 404 redirects
window.addEventListener('error', function(e) {
    console.error('Page error:', e.error);
});

// Handle broken links
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A') {
        const href = e.target.getAttribute('href');
        if (href && href.startsWith('http') && !href.includes(window.location.hostname)) {
            // External link - let it open normally
            return;
        }
    }
});

// Console welcome message
console.log('%cWelcome to Aditi Gupta\'s Portfolio!', 'color: #8B4513; font-size: 16px; font-weight: bold;');
console.log('%cBuilt with HTML, CSS, and JavaScript', 'color: #2F4F4F; font-size: 12px;');
console.log('%cPress H for help, or visit /404 for a fun error page!', 'color: #CD853F; font-size: 10px;');

