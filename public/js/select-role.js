// Selected role state
let selectedRole = null;

// User credentials (from previous login)
const userCredentials = {
    email: sessionStorage.getItem('userEmail') || 'admin@digitalminds.com',
    password: sessionStorage.getItem('userPassword') || ''
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Check if user came from login
    if (!sessionStorage.getItem('loginVerified')) {
        // Redirect to login if not verified
        window.location.href = 'login.html';
    }

    // Add keyboard navigation
    initializeKeyboardNavigation();
});

// Select Role
function selectRole(role) {
    selectedRole = role;
    
    // Remove selected class from all options
    const roleOptions = document.querySelectorAll('.role-option');
    roleOptions.forEach(option => {
        option.classList.remove('selected');
        const check = option.querySelector('.role-check');
        if (check) {
            check.classList.add('hidden');
        }
    });
    
    // Add selected class to clicked option
    const selectedOption = document.querySelector(`[data-role="${role}"]`);
    if (selectedOption) {
        selectedOption.classList.add('selected');
        const check = selectedOption.querySelector('.role-check');
        if (check) {
            check.classList.remove('hidden');
        }
    }
    
    // Enable continue button
    const continueBtn = document.getElementById('continueBtn');
    continueBtn.disabled = false;

    // Show success toast
    showToast(`${role} selected`, 'success');
}

// Back to Login
function backToLogin() {
    // Clear session
    sessionStorage.removeItem('loginVerified');
    
    // Show loading state
    showToast('Returning to login...', 'success');
    
    // Redirect after short delay
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 500);
}

// Continue to System
function continueToSystem() {
    if (!selectedRole) {
        showToast('Please select a role to continue.', 'error');
        return;
    }
    
    // Show loading state
    const continueBtn = document.getElementById('continueBtn');
    continueBtn.classList.add('loading');
    continueBtn.disabled = true;
    
    // Store role in session
    sessionStorage.setItem('userRole', selectedRole);
    sessionStorage.setItem('userEmail', userCredentials.email);
    
    // Show success message
    showToast(`Logged in as ${selectedRole}`, 'success');
    
    // Redirect to appropriate dashboard based on role
    setTimeout(() => {
        // All roles go to the same dashboard for now
        // In a real app, you might redirect to different dashboards
        window.location.href = 'dashboard.html';
    }, 1000);
}

// Show Toast
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    toastMessage.textContent = message;
    toast.className = `toast ${type}`;
    
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

// Keyboard Navigation
function initializeKeyboardNavigation() {
    const roleOptions = document.querySelectorAll('.role-option');
    
    roleOptions.forEach((option, index) => {
        // Allow Enter or Space to select
        option.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const role = option.getAttribute('data-role');
                selectRole(role);
            }
        });

        // Arrow key navigation
        option.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                const nextIndex = (index + 1) % roleOptions.length;
                roleOptions[nextIndex].focus();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                const prevIndex = (index - 1 + roleOptions.length) % roleOptions.length;
                roleOptions[prevIndex].focus();
            }
        });
    });

    // Continue button keyboard support
    const continueBtn = document.getElementById('continueBtn');
    continueBtn.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !continueBtn.disabled) {
            continueToSystem();
        }
    });
}

// Demo function to simulate coming from login
function simulateLogin(email = 'admin@digitalminds.com') {
    sessionStorage.setItem('loginVerified', 'true');
    sessionStorage.setItem('userEmail', email);
    sessionStorage.setItem('userPassword', 'demo123');
}

// Auto-simulate login if not verified (for demo purposes)
if (!sessionStorage.getItem('loginVerified')) {
    simulateLogin();
    console.log('Demo mode: Simulated login verification');
}

// Add click animation to role cards
document.addEventListener('DOMContentLoaded', () => {
    const roleOptions = document.querySelectorAll('.role-option');
    
    roleOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Add ripple effect
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
        });
    });
});

// Prevent double-click on continue button
let isSubmitting = false;

const originalContinue = continueToSystem;
continueToSystem = function() {
    if (isSubmitting) return;
    isSubmitting = true;
    originalContinue();
    setTimeout(() => {
        isSubmitting = false;
    }, 2000);
};

// Auto-hide toast on click
document.addEventListener('DOMContentLoaded', () => {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.addEventListener('click', () => {
            toast.classList.add('hidden');
        });
    }
});

// Handle browser back button
window.addEventListener('popstate', () => {
    sessionStorage.removeItem('loginVerified');
    window.location.href = 'login.html';
});

// Add role descriptions for accessibility
const roleDescriptions = {
    'Admin': 'Select this role for full administrative access including user management, system settings, and complete inventory control.',
    'IT Officers': 'Select this role for IT department access to manage technology assets, equipment tracking, and IT-specific inventory.',
    'HR Officers': 'Select this role for HR department access to manage employee-related assets, office equipment, and HR-specific inventory.'
};

// Set aria-labels for better accessibility
document.addEventListener('DOMContentLoaded', () => {
    const roleOptions = document.querySelectorAll('.role-option');
    roleOptions.forEach(option => {
        const role = option.getAttribute('data-role');
        if (roleDescriptions[role]) {
            option.setAttribute('aria-label', roleDescriptions[role]);
        }
    });
});
