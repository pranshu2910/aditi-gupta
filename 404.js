// 404 Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize 404 page functionality
    init404Page();
    initSearch();
    initThemeToggle();
    initAnimations();
});

// Initialize 404 page
function init404Page() {
    // Add theme toggle button
    addThemeToggle();
    
    // Add navigation back to home
    addNavigation();
    
    // Initialize floating elements animation
    initFloatingElements();
}

// Add theme toggle functionality
function addThemeToggle() {
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Create theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.setAttribute('aria-label', 'Toggle dark mode');
    
    // Position the toggle button
    themeToggle.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        background: rgba(255, 255, 255, 0.9);
        border: 2px solid var(--primary-color);
        border-radius: 50%;
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: var(--shadow);
    `;
    
    document.body.appendChild(themeToggle);
    
    // Theme toggle functionality
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update icon
        const icon = this.querySelector('i');
        icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        
        // Update button style
        this.style.background = newTheme === 'dark' ? 'rgba(26, 26, 26, 0.9)' : 'rgba(255, 255, 255, 0.9)';
        this.style.color = newTheme === 'dark' ? 'white' : 'var(--primary-color)';
    });
    
    // Set initial icon
    const icon = themeToggle.querySelector('i');
    icon.className = currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    themeToggle.style.background = currentTheme === 'dark' ? 'rgba(26, 26, 26, 0.9)' : 'rgba(255, 255, 255, 0.9)';
    themeToggle.style.color = currentTheme === 'dark' ? 'white' : 'var(--primary-color)';
}

// Add navigation functionality
function addNavigation() {
    // Add smooth scrolling to all internal links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize floating elements animation
function initFloatingElements() {
    const floatingBooks = document.querySelectorAll('.floating-book');
    const floatingQuotes = document.querySelectorAll('.floating-quote');
    
    // Add random movement to floating elements
    floatingBooks.forEach((book, index) => {
        setInterval(() => {
            const randomX = (Math.random() - 0.5) * 20;
            const randomY = (Math.random() - 0.5) * 20;
            const randomRotate = (Math.random() - 0.5) * 10;
            
            book.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;
        }, 3000 + index * 1000);
    });
    
    floatingQuotes.forEach((quote, index) => {
        setInterval(() => {
            const randomX = (Math.random() - 0.5) * 30;
            const randomY = (Math.random() - 0.5) * 30;
            
            quote.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }, 4000 + index * 1500);
    });
}

// Initialize search functionality
function initSearch() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    
    if (searchInput && searchBtn) {
        // Search functionality
        function performSearch() {
            const query = searchInput.value.trim().toLowerCase();
            
            if (query) {
                // Redirect to home page with search query
                const homeUrl = new URL('/', window.location.origin);
                homeUrl.searchParams.set('search', query);
                window.location.href = homeUrl.toString();
            }
        }
        
        // Event listeners
        searchBtn.addEventListener('click', performSearch);
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        // Focus search input on page load
        setTimeout(() => {
            searchInput.focus();
        }, 1000);
    }
}

// Initialize animations
function initAnimations() {
    // Staggered animation for error content
    const errorElements = document.querySelectorAll('.error-code, .error-title, .error-description, .error-suggestion, .error-actions, .error-links, .error-footer');
    
    errorElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 200 + index * 100);
    });
    
    // Add hover effects to books
    const books = document.querySelectorAll('.book');
    books.forEach(book => {
        book.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotate(5deg) scale(1.05)';
            this.style.transition = 'all 0.3s ease';
        });
        
        book.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg) scale(1)';
        });
    });
}

// Add some interactive fun
function addInteractiveElements() {
    // Add click effect to question mark
    const questionMark = document.querySelector('.question-mark');
    if (questionMark) {
        questionMark.addEventListener('click', function() {
            this.style.animation = 'none';
            this.offsetHeight; // Trigger reflow
            this.style.animation = 'bounce 0.5s ease-in-out';
        });
    }
    
    // Add click effect to books
    const books = document.querySelectorAll('.book');
    books.forEach(book => {
        book.addEventListener('click', function() {
            this.style.animation = 'none';
            this.offsetHeight; // Trigger reflow
            this.style.animation = 'bookStack 0.5s ease-in-out';
        });
    });
}

// Initialize interactive elements
document.addEventListener('DOMContentLoaded', addInteractiveElements);

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    // Press 'H' to go home
    if (e.key.toLowerCase() === 'h') {
        window.location.href = '/';
    }
    
    // Press 'S' to focus search
    if (e.key.toLowerCase() === 's') {
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.focus();
        }
    }
    
    // Press 'Escape' to go back
    if (e.key === 'Escape') {
        if (document.referrer) {
            window.history.back();
        } else {
            window.location.href = '/';
        }
    }
});

// Add some console fun
console.log('%c📚 404 - Chapter Not Found 📚', 'color: #8B4513; font-size: 16px; font-weight: bold;');
console.log('%cLooks like this page got lost in the editing process!', 'color: #A0522D; font-size: 12px;');
console.log('%cPress H to go home, S to search, or Escape to go back', 'color: #CD853F; font-size: 10px;');
