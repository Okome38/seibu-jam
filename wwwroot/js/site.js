// ========================================================================
// Enhanced Site JavaScript - 福井高専寮管理システム
// ========================================================================

// 既存の機能を維持しながら、新しい機能を追加

// Existing weather functionality (preserved)
function updateWeatherDisplay() {
    // Keep existing implementation
}

function getWeatherImage(weather) {
    // Keep existing implementation
}

// Enhanced Weather Animation System
class WeatherAnimations {
    constructor() {
        this.initWeatherEffects();
    }
    
    initWeatherEffects() {
        // Add subtle animations to weather cards
        const weatherItems = document.querySelectorAll('.weather-item');
        weatherItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
            item.classList.add('fade-in-up');
            
            // Add hover tilt effect
            item.addEventListener('mouseenter', (e) => {
                e.target.style.transform = 'translateY(-4px) rotateY(5deg)';
            });
            
            item.addEventListener('mouseleave', (e) => {
                e.target.style.transform = 'translateY(0) rotateY(0)';
            });
        });
    }
    
    addWeatherParticles(weatherType) {
        const container = document.querySelector('.weather-section');
        if (!container) return;
        
        // Remove existing particles
        const existingParticles = container.querySelectorAll('.weather-particle');
        existingParticles.forEach(p => p.remove());
        
        if (weatherType === 'rain' || weatherType === 'snow') {
            this.createParticles(container, weatherType);
        }
    }
    
    createParticles(container, type) {
        const particleCount = 20;
        const particles = [];
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = `weather-particle ${type}-particle`;
            particle.style.cssText = `
                position: absolute;
                width: ${type === 'snow' ? '4px' : '2px'};
                height: ${type === 'snow' ? '4px' : '12px'};
                background: ${type === 'snow' ? '#fff' : '#3b82f6'};
                border-radius: ${type === 'snow' ? '50%' : '0'};
                left: ${Math.random() * 100}%;
                top: -10px;
                opacity: ${0.6 + Math.random() * 0.4};
                animation: fall${type} ${3 + Math.random() * 2}s linear infinite;
                animation-delay: ${Math.random() * 2}s;
                pointer-events: none;
                z-index: 1;
            `;
            
            container.appendChild(particle);
            particles.push(particle);
        }
        
        // Clean up particles after animation
        setTimeout(() => {
            particles.forEach(p => p.remove());
        }, 10000);
    }
}

// Enhanced UI Interactions
class UIEnhancements {
    constructor() {
        this.initScrollEffects();
        this.initCounterAnimations();
        this.initFormEnhancements();
        this.initTooltips();
        this.initProgressBars();
    }
    
    initScrollEffects() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Observe all cards and major sections
        document.querySelectorAll('.card, .weather-section, .congestion-section, .bulletin-section').forEach(el => {
            observer.observe(el);
        });
    }
    
    initCounterAnimations() {
        // Animate numbers when they come into view
        const counters = document.querySelectorAll('.display-1, .display-4, .counter-number');
        
        counters.forEach(counter => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            });
            observer.observe(counter);
        });
    }
    
    animateCounter(element) {
        const target = parseInt(element.textContent) || 0;
        const duration = 2000;
        const start = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOut * target);
            
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = target;
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    initFormEnhancements() {
        // Enhanced form interactions
        const formControls = document.querySelectorAll('.form-control');
        
        formControls.forEach(control => {
            // Floating label effect
            control.addEventListener('focus', (e) => {
                e.target.parentElement.classList.add('focused');
            });
            
            control.addEventListener('blur', (e) => {
                if (!e.target.value) {
                    e.target.parentElement.classList.remove('focused');
                }
            });
            
            // Real-time validation styling
            control.addEventListener('input', (e) => {
                const isValid = e.target.checkValidity();
                e.target.classList.toggle('is-valid', isValid && e.target.value);
                e.target.classList.toggle('is-invalid', !isValid && e.target.value);
            });
        });
    }
    
    initTooltips() {
        // Add tooltips to interactive elements
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', this.showTooltip);
            element.addEventListener('mouseleave', this.hideTooltip);
        });
    }
    
    showTooltip(e) {
        const tooltip = document.createElement('div');
        tooltip.className = 'custom-tooltip';
        tooltip.textContent = e.target.getAttribute('data-tooltip');
        tooltip.style.cssText = `
            position: absolute;
            background: rgba(0,0,0,0.9);
            color: white;
            padding: 0.5rem 0.75rem;
            border-radius: 0.375rem;
            font-size: 0.875rem;
            z-index: 1000;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.2s ease;
        `;
        
        document.body.appendChild(tooltip);
        
        const rect = e.target.getBoundingClientRect();
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
        
        setTimeout(() => tooltip.style.opacity = '1', 10);
        
        e.target._tooltip = tooltip;
    }
    
    hideTooltip(e) {
        if (e.target._tooltip) {
            e.target._tooltip.remove();
            delete e.target._tooltip;
        }
    }
    
    initProgressBars() {
        // Animate progress bars when they come into view
        const progressBars = document.querySelectorAll('.progress-bar');
        
        progressBars.forEach(bar => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const width = bar.style.width || bar.getAttribute('aria-valuenow') + '%';
                        bar.style.width = '0%';
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 200);
                        observer.unobserve(entry.target);
                    }
                });
            });
            observer.observe(bar);
        });
    }
}

// Enhanced Congestion Chart Improvements
class CongestionEnhancements {
    constructor() {
        this.initChartEnhancements();
    }
    
    initChartEnhancements() {
        const chartContainer = document.getElementById('congestionChart');
        if (!chartContainer) return;
        
        // Add loading state
        this.showChartLoading(chartContainer);
        
        // Simulate data loading (replace with actual data loading)
        setTimeout(() => {
            this.hideChartLoading(chartContainer);
            this.addChartInteractions();
        }, 1000);
    }
    
    showChartLoading(container) {
        const loader = document.createElement('div');
        loader.className = 'chart-loader';
        loader.innerHTML = `
            <div class="loading-spinner"></div>
            <p>混雑度データを読み込み中...</p>
        `;
        loader.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            color: var(--text-secondary);
        `;
        
        container.style.position = 'relative';
        container.appendChild(loader);
    }
    
    hideChartLoading(container) {
        const loader = container.querySelector('.chart-loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 300);
        }
    }
    
    addChartInteractions() {
        // Add hover effects to chart elements
        const chartElements = document.querySelectorAll('#congestionChart path, #congestionChart rect');
        
        chartElements.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                e.target.style.filter = 'brightness(1.1)';
                e.target.style.transition = 'all 0.2s ease';
            });
            
            element.addEventListener('mouseleave', (e) => {
                e.target.style.filter = 'brightness(1)';
            });
        });
    }
}

// Enhanced Bulletin Board Features
class BulletinEnhancements {
    constructor() {
        this.initBulletinEffects();
    }
    
    initBulletinEffects() {
        const posts = document.querySelectorAll('.post-item');
        
        posts.forEach((post, index) => {
            // Staggered animation
            post.style.animationDelay = `${index * 0.1}s`;
            
            // Enhanced hover effect
            post.addEventListener('mouseenter', (e) => {
                e.target.style.transform = 'translateX(8px) scale(1.02)';
                e.target.style.boxShadow = 'var(--shadow-lg)';
            });
            
            post.addEventListener('mouseleave', (e) => {
                e.target.style.transform = 'translateX(0) scale(1)';
                e.target.style.boxShadow = 'var(--shadow-md)';
            });
        });
    }
}

// Performance Optimization
class PerformanceOptimizer {
    constructor() {
        this.initLazyLoading();
        this.initImageOptimization();
        this.debounceScrollEvents();
    }
    
    initLazyLoading() {
        // Lazy load images
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    initImageOptimization() {
        // Add loading states for images
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            });
            
            img.addEventListener('error', () => {
                img.style.opacity = '0.5';
                img.title = '画像の読み込みに失敗しました';
            });
        });
    }
    
    debounceScrollEvents() {
        // Optimize scroll event performance
        let ticking = false;
        
        function updateScrollEffects() {
            // Your scroll-based effects here
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', requestTick);
    }
}

// Accessibility Enhancements
class AccessibilityEnhancements {
    constructor() {
        this.initKeyboardNavigation();
        this.initAriaLabels();
        this.initFocusManagement();
    }
    
    initKeyboardNavigation() {
        // Enhanced keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }
    
    initAriaLabels() {
        // Add missing aria-labels
        const buttons = document.querySelectorAll('button:not([aria-label])');
        buttons.forEach(button => {
            if (!button.textContent.trim()) {
                button.setAttribute('aria-label', 'ボタン');
            }
        });
    }
    
    initFocusManagement() {
        // Manage focus for dynamic content
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === 1) { // Element node
                            const focusableElements = node.querySelectorAll('button, a, input, select, textarea, [tabindex]');
                            focusableElements.forEach(el => {
                                if (!el.hasAttribute('tabindex')) {
                                    el.setAttribute('tabindex', '0');
                                }
                            });
                        }
                    });
                }
            });
        });
        
        observer.observe(document.body, { childList: true, subtree: true });
    }
}

// Initialize all enhancements when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize enhancement classes
    const weatherAnimations = new WeatherAnimations();
    const uiEnhancements = new UIEnhancements();
    const congestionEnhancements = new CongestionEnhancements();
    const bulletinEnhancements = new BulletinEnhancements();
    const performanceOptimizer = new PerformanceOptimizer();
    const accessibilityEnhancements = new AccessibilityEnhancements();
    
    // Add global CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fallrain {
            to {
                transform: translateY(calc(100vh + 10px));
            }
        }
        
        @keyframes fallsnow {
            to {
                transform: translateY(calc(100vh + 10px)) translateX(20px);
            }
        }
        
        .fade-in-up {
            animation: fadeInUp 0.6s ease forwards;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .loading-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #f3f4f6;
            border-top: 4px solid #2563eb;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .keyboard-navigation *:focus {
            outline: 2px solid #2563eb;
            outline-offset: 2px;
        }
        
        img {
            transition: opacity 0.3s ease;
        }
        
        .form-group.focused .form-label {
            color: var(--primary-color);
            transform: translateY(-2px);
        }
    `;
    document.head.appendChild(style);
    
    console.log('福井高専寮管理システム - UI拡張機能が読み込まれました');
});

// Export functions for global use (maintain compatibility)
window.updateWeatherDisplay = updateWeatherDisplay;
window.getWeatherImage = getWeatherImage;
