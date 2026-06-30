// Authentication JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});

function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    // Basic validation
    if (!email || !password) {
        alert('Please enter both email and password');
        return;
    }
    
    // In a real application, this would call an API
    console.log('Login attempt:', { email, remember });
    
    // Redirect to dashboard on success
    setTimeout(() => {
        window.location.href = '../index.html';
    }, 1000);
}

function handleLogout() {
    // Clear session data
    sessionStorage.clear();
    localStorage.removeItem('userToken');
    
    // Redirect to login
    window.location.href = 'login.html';
}