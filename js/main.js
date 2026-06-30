// Main JavaScript file for Axos Bank Finance Portal

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Axos Bank Finance Portal initialized');
    initializeEventListeners();
    setupAccessibility();
});

// Initialize event listeners
function initializeEventListeners() {
    // Add navigation menu click handlers
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });

    // Add table row click handlers
    const tableRows = document.querySelectorAll('.deals-table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('click', handleRowClick);
    });
}

// Handle navigation clicks
function handleNavClick(e) {
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => link.classList.remove('active'));
    e.target.classList.add('active');
}

// Handle table row clicks
function handleRowClick(e) {
    if (e.target.tagName === 'A') {
        e.preventDefault();
        const dealId = e.currentTarget.querySelector('td').textContent;
        console.log('Viewing details for:', dealId);
        // Navigate to deal details page
    }
}

// Setup accessibility features
function setupAccessibility() {
    // Add skip to main link
    addSkipLink();
    
    // Setup keyboard navigation
    setupKeyboardNavigation();
}

// Add skip to main link
function addSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Setup keyboard navigation
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Close menu on ESC key
        if (e.key === 'Escape') {
            // Add escape key handling
        }
    });
}

// Utility function for form validation
function validateForm(formData) {
    const errors = [];
    
    for (const [key, value] of Object.entries(formData)) {
        if (!value || value.trim() === '') {
            errors.push(`${key} is required`);
        }
    }
    
    return errors;
}

// Utility function for API calls
async function apiCall(endpoint, options = {}) {
    try {
        const response = await fetch(endpoint, options);
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { validateForm, apiCall };
}