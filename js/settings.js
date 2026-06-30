// Settings Management JavaScript

document.addEventListener('DOMContentLoaded', function() {
    setupTabNavigation();
    
    const profileForm = document.getElementById('profileForm');
    const securityForm = document.getElementById('securityForm');
    const notificationsForm = document.getElementById('notificationsForm');
    
    if (profileForm) profileForm.addEventListener('submit', handleProfileSubmit);
    if (securityForm) securityForm.addEventListener('submit', handleSecuritySubmit);
    if (notificationsForm) notificationsForm.addEventListener('submit', handleNotificationsSubmit);
});

function setupTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            switchTab(tabName);
        });
    });
}

function switchTab(tabName) {
    // Hide all tabs
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tab => tab.style.display = 'none');
    
    // Remove active class from all buttons
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(btn => btn.classList.remove('active'));
    
    // Show selected tab
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) selectedTab.style.display = 'block';
    
    // Add active class to clicked button
    event.target.classList.add('active');
}

function handleProfileSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log('Profile update:', Object.fromEntries(formData));
    alert('Profile updated successfully');
}

function handleSecuritySubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log('Security update:', Object.fromEntries(formData));
    alert('Password updated successfully');
}

function handleNotificationsSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log('Notifications update:', Object.fromEntries(formData));
    alert('Notification preferences saved');
}