// Accessibility Enhancement Features

class AccessibilityManager {
    constructor() {
        this.setupKeyboardNavigation();
        this.setupAriaLive();
        this.setupFocusManagement();
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Skip to main content (Skip Link)
            if (e.ctrlKey && e.key === 'm') {
                const main = document.querySelector('main');
                if (main) {
                    main.focus();
                    main.scrollIntoView();
                }
            }

            // Close menus on Escape
            if (e.key === 'Escape') {
                const openMenus = document.querySelectorAll('[aria-expanded="true"]');
                openMenus.forEach(menu => {
                    menu.setAttribute('aria-expanded', 'false');
                    menu.style.display = 'none';
                });
            }
        });
    }

    setupAriaLive() {
        // Create aria-live region for notifications
        const liveRegion = document.createElement('div');
        liveRegion.id = 'live-region';
        liveRegion.className = 'sr-only';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        document.body.appendChild(liveRegion);
    }

    announceToScreenReader(message) {
        const liveRegion = document.getElementById('live-region');
        if (liveRegion) {
            liveRegion.textContent = message;
        }
    }

    setupFocusManagement() {
        // Track focus for debugging
        document.addEventListener('focusin', (e) => {
            if (e.target.tagName !== 'BODY') {
                console.log('Focused element:', e.target);
            }
        });
    }

    // Test color contrast
    testColorContrast(foreground, background) {
        const fg = this.hexToRgb(foreground);
        const bg = this.hexToRgb(background);

        const fgLum = this.getLuminance(fg);
        const bgLum = this.getLuminance(bg);

        const contrast = (Math.max(fgLum, bgLum) + 0.05) / (Math.min(fgLum, bgLum) + 0.05);
        
        return {
            ratio: contrast.toFixed(2),
            wcagAA: contrast >= 4.5,
            wcagAAA: contrast >= 7
        };
    }

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    getLuminance(rgb) {
        const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(x => {
            x = x / 255;
            return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    }

    // Check for accessibility issues
    auditPage() {
        const issues = [];

        // Check for images without alt text
        document.querySelectorAll('img').forEach(img => {
            if (!img.alt) {
                issues.push(`Image missing alt text: ${img.src}`);
            }
        });

        // Check for form inputs without labels
        document.querySelectorAll('input, textarea, select').forEach(input => {
            if (!input.id || !document.querySelector(`label[for="${input.id}"]`)) {
                issues.push(`Form input missing associated label: ${input.name || input.id}`);
            }
        });

        // Check for proper heading structure
        let lastHeadingLevel = 0;
        document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
            const level = parseInt(heading.tagName[1]);
            if (level - lastHeadingLevel > 1) {
                issues.push(`Heading level jump: ${heading.tagName}`);
            }
            lastHeadingLevel = level;
        });

        return issues;
    }
}

// Initialize accessibility manager
const accessibilityManager = new AccessibilityManager();

// Run audit on page load (development only)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.addEventListener('load', () => {
        const issues = accessibilityManager.auditPage();
        if (issues.length > 0) {
            console.warn('Accessibility Issues Found:', issues);
        }
    });
}