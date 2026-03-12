// State management
let selectedRole = null;
let userCredentials = {
    email: '',
    password: ''
};

// Toast notification function
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    toastMessage.textContent = message;
    toast.className = `toast ${type}`;
    
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 5000);
}

// Handle login form submission
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const submitBtn = document.getElementById('submitBtn');
    
    // Store credentials
    userCredentials.email = email;
    userCredentials.password = password;
    
    // Disable button and show loading state
    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-text').innerHTML = 'Signing in...';
    
    // Simulate authentication (replace with actual API call)
    setTimeout(() => {
        // For demo purposes, accept any non-empty credentials
        if (email && password) {
            // Hide login form, show role selection
            document.getElementById('loginForm').classList.add('hidden');
            document.getElementById('roleSelection').classList.remove('hidden');
            showToast('Credentials verified! Please select your role.', 'success');
        } else {
            showToast('Invalid email or password. Please check your credentials.', 'error');
        }
        
        // Reset button
        submitBtn.disabled = false;
        submitBtn.querySelector('.btn-text').innerHTML = `
            Sign In
            <svg class="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
        `;
    }, 1500);
}

// Handle role selection
function selectRole(role) {
    selectedRole = role;
    
    // Remove selected class from all options
    const roleOptions = document.querySelectorAll('.role-option');
    roleOptions.forEach(option => {
        option.classList.remove('selected');
        option.querySelector('.role-check').classList.add('hidden');
    });
    
    // Add selected class to clicked option
    const selectedOption = document.querySelector(`[data-role="${role}"]`);
    if (selectedOption) {
        selectedOption.classList.add('selected');
        selectedOption.querySelector('.role-check').classList.remove('hidden');
    }
    
    // Enable continue button
    document.getElementById('continueBtn').disabled = false;
}

// Back to login form
function backToLogin() {
    document.getElementById('roleSelection').classList.add('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
    
    // Reset role selection
    selectedRole = null;
    const roleOptions = document.querySelectorAll('.role-option');
    roleOptions.forEach(option => {
        option.classList.remove('selected');
        option.querySelector('.role-check').classList.add('hidden');
    });
    
    document.getElementById('continueBtn').disabled = true;
}

// Continue to system
function continueToSystem() {
    if (!selectedRole) {
        showToast('Please select a role to continue.', 'error');
        return;
    }
    
    // Show success message
    showToast(`Logged in as ${selectedRole}`, 'success');
    
    // Simulate redirect (replace with actual navigation)
    setTimeout(() => {
        // Store role in session/localStorage
        sessionStorage.setItem('userRole', selectedRole);
        sessionStorage.setItem('userEmail', userCredentials.email);
        
        // Redirect to dashboard based on role
        if (selectedRole === 'Admin') {
            window.location.href = 'dashboard.html';
        } else if (selectedRole === 'IT Officers') {
            window.location.href = 'dashboard-it.html';
        } else if (selectedRole === 'HR Officers') {
            window.location.href = 'dashboard-hr.html';
        }
    }, 1000);
}

// Demo credentials for testing
function fillDemoCredentials() {
    document.getElementById('email').value = 'admin@digitalminds.com';
    document.getElementById('password').value = 'demo123';
}

// Add keyboard navigation
document.addEventListener('DOMContentLoaded', () => {
    // Allow Enter key to submit on role selection
    const roleOptions = document.querySelectorAll('.role-option');
    roleOptions.forEach(option => {
        option.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                option.click();
            }
        });
    });
    
    // Allow Enter key on continue button
    const continueBtn = document.getElementById('continueBtn');
    if (continueBtn) {
        continueBtn.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !continueBtn.disabled) {
                continueToSystem();
            }
        });
    }
});

// Password visibility toggle (optional enhancement)
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
}

// Form validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateForm() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (!email || !validateEmail(email)) {
        showToast('Please enter a valid email address.', 'error');
        return false;
    }
    
    if (!password || password.length < 6) {
        showToast('Password must be at least 6 characters long.', 'error');
        return false;
    }
    
    return true;
}

// Auto-hide toast on click
document.addEventListener('DOMContentLoaded', () => {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.addEventListener('click', () => {
            toast.classList.add('hidden');
        });
    }
});

// Prevent form submission on Enter in input fields (handled by form submit)
document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                document.querySelector('.login-form').dispatchEvent(new Event('submit'));
            }
        });
    });
});

// Check if user is already logged in
document.addEventListener('DOMContentLoaded', () => {
    const userRole = sessionStorage.getItem('userRole');
    const userEmail = sessionStorage.getItem('userEmail');
    
    if (userRole && userEmail) {
        // User is already logged in, redirect to appropriate dashboard
        console.log('User already logged in:', userRole);
        // Optionally auto-redirect
        // continueToSystem();
    }
});
