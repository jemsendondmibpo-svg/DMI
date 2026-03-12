// Settings Data
let settingsData = {
    personal: {
        fullName: 'Jeremy Sendon',
        email: 'jeremy.sendon@digitalmindsbpo.com',
        phone: '+63 917 123 4567',
        department: 'IT Operations',
        role: 'Admin'
    },
    company: {
                companyName: 'Digital Minds BPO Services Inc.',
                email: 'info@digitalmindsbpo.com',
                phone: '+63 2 8123 4567',
                website: 'https://www.digitalmindsbpo.com',
                address: '3rd Floor Greenwood Building, Magsaysay Avenue Naga City',
                city: 'Naga City',
                province: 'Camarines Sur',
                postalCode: '4400',
                country: 'Philippines',
                businessType: 'Business Process Outsourcing',
                industry: 'Information Technology & Services',
                registrationNumber: 'CS201234567',
                taxId: '123-456-789-000'
            },
    notifications: {
        lowStock: true,
        outOfStock: true,
        newItem: false,
        weeklyReport: true,
        emailAlerts: true
    }
};

// Current active section
let activeSection = 'personal';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeSettings();
    setupNavigation();
    updateLastUpdated();

    // Set up notification toggles
    const toggles = document.querySelectorAll('.toggle-switch input[type="checkbox"]');
    toggles.forEach(toggle => {
        toggle.addEventListener('change', () => {
            const key = toggle.id;
            settingsData.notifications[key] = toggle.checked;
        });
    });
});

// Initialize Settings
function initializeSettings() {
    // Load personal settings
    document.getElementById('fullName').value = settingsData.personal.fullName;
    document.getElementById('emailAddress').value = settingsData.personal.email;
    document.getElementById('phoneNumber').value = settingsData.personal.phone;
    document.getElementById('department').value = settingsData.personal.department;
    document.getElementById('role').value = settingsData.personal.role;

    // Load company settings
    document.getElementById('companyName').value = settingsData.company.companyName;
    document.getElementById('companyEmail').value = settingsData.company.email;
    document.getElementById('companyPhone').value = settingsData.company.phone;
    document.getElementById('companyWebsite').value = settingsData.company.website;
    document.getElementById('streetAddress').value = settingsData.company.address;
    document.getElementById('city').value = settingsData.company.city;
    document.getElementById('province').value = settingsData.company.province;
    document.getElementById('postalCode').value = settingsData.company.postalCode;
    document.getElementById('country').value = settingsData.company.country;
    document.getElementById('businessType').value = settingsData.company.businessType;
    document.getElementById('industry').value = settingsData.company.industry;
    document.getElementById('registrationNumber').value = settingsData.company.registrationNumber;
    document.getElementById('taxId').value = settingsData.company.taxId;

    // Load notification settings
    document.getElementById('lowStock').checked = settingsData.notifications.lowStock;
    document.getElementById('outOfStock').checked = settingsData.notifications.outOfStock;
    document.getElementById('newItem').checked = settingsData.notifications.newItem;
    document.getElementById('weeklyReport').checked = settingsData.notifications.weeklyReport;
    document.getElementById('emailAlerts').checked = settingsData.notifications.emailAlerts;
}

// Setup Navigation
function setupNavigation() {
    const navItems = document.querySelectorAll('.settings-nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const section = item.getAttribute('data-section');
            switchSection(section);
        });
    });
}

// Switch Section
function switchSection(section) {
    activeSection = section;

    // Update navigation active state
    const navItems = document.querySelectorAll('.settings-nav-item');
    navItems.forEach(item => {
        if (item.getAttribute('data-section') === section) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Update section visibility
    const sections = document.querySelectorAll('.settings-section');
    sections.forEach(sec => {
        sec.classList.remove('active');
    });

    const activeSecElement = document.getElementById(`${section}Section`);
    if (activeSecElement) {
        activeSecElement.classList.add('active');
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Update Last Updated Dates
function updateLastUpdated() {
    const today = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });

    const elements = [
        'personalLastUpdated',
        'companyLastUpdated',
        'notificationsLastUpdated'
    ];

    elements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = today;
        }
    });
}

// Save Personal Settings
function savePersonalSettings() {
    const form = document.getElementById('personalForm');
    
    // Validate form
    if (!form.checkValidity()) {
        showToast('Please fill in all required fields.', 'error');
        return;
    }

    // Update settings data
    settingsData.personal.fullName = document.getElementById('fullName').value;
    settingsData.personal.email = document.getElementById('emailAddress').value;
    settingsData.personal.phone = document.getElementById('phoneNumber').value;
    settingsData.personal.department = document.getElementById('department').value;

    // Update last updated date
    const today = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    document.getElementById('personalLastUpdated').textContent = today;

    // Show success animation
    const btn = event.target;
    const originalHTML = btn.innerHTML;
    btn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <span>Saved Successfully!</span>
    `;
    btn.classList.add('saved');

    setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.classList.remove('saved');
    }, 2000);

    showToast('Personal settings saved successfully!', 'success');
}

// Save Company Settings
function saveCompanySettings() {
    const form = document.getElementById('companyForm');
    
    // Validate form
    if (!form.checkValidity()) {
        showToast('Please fill in all required fields.', 'error');
        return;
    }

    // Update settings data
    settingsData.company.companyName = document.getElementById('companyName').value;
    settingsData.company.email = document.getElementById('companyEmail').value;
    settingsData.company.phone = document.getElementById('companyPhone').value;
    settingsData.company.website = document.getElementById('companyWebsite').value;
    settingsData.company.address = document.getElementById('streetAddress').value;
    settingsData.company.city = document.getElementById('city').value;
    settingsData.company.province = document.getElementById('province').value;
    settingsData.company.postalCode = document.getElementById('postalCode').value;
    settingsData.company.country = document.getElementById('country').value;
    settingsData.company.businessType = document.getElementById('businessType').value;
    settingsData.company.industry = document.getElementById('industry').value;
    settingsData.company.registrationNumber = document.getElementById('registrationNumber').value;
    settingsData.company.taxId = document.getElementById('taxId').value;

    // Update last updated date
    const today = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    document.getElementById('companyLastUpdated').textContent = today;

    // Show success animation
    const btn = event.target;
    const originalHTML = btn.innerHTML;
    btn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <span>Saved Successfully!</span>
    `;
    btn.classList.add('saved');

    setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.classList.remove('saved');
    }, 2000);

    showToast('Company settings saved successfully!', 'success');
}

// Save Notification Settings
function saveNotificationSettings() {
    // Settings are already updated via toggle listeners
    
    // Update last updated date
    const today = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    document.getElementById('notificationsLastUpdated').textContent = today;

    // Show success animation
    const btn = event.target;
    const originalHTML = btn.innerHTML;
    btn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <span>Saved Successfully!</span>
    `;
    btn.classList.add('saved');

    setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.classList.remove('saved');
    }, 2000);

    // Show summary of enabled notifications
    const enabledCount = Object.values(settingsData.notifications).filter(v => v).length;
    showToast(`Notification preferences saved! ${enabledCount} alerts enabled.`, 'success');
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

// Export settings as JSON (for future use)
function exportSettings() {
    const dataStr = JSON.stringify(settingsData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'settings.json');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Import settings from JSON (for future use)
function importSettings(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const imported = JSON.parse(e.target.result);
            settingsData = { ...settingsData, ...imported };
            initializeSettings();
            showToast('Settings imported successfully!', 'success');
        } catch (error) {
            showToast('Invalid settings file.', 'error');
        }
    };
    reader.readAsText(file);
}

// Reset settings to default
function resetSettings() {
    if (confirm('Are you sure you want to reset all settings to default? This action cannot be undone.')) {
        // Reset to default values
        settingsData = {
            personal: {
                fullName: 'Jeremy Sendon',
                email: 'jeremy.sendon@digitalmindsbpo.com',
                phone: '+63 917 123 4567',
                department: 'IT Operations',
                role: 'Admin'
            },
            company: {
                companyName: 'Digital Minds BPO Services Inc.',
                email: 'info@digitalmindsbpo.com',
                phone: '+63 2 8123 4567',
                website: 'https://www.digitalmindsbpo.com',
                address: '3rd Floor Greenwood Building, Magsaysay Avenue Naga City',
                city: 'Naga City',
                province: 'Camarines Sur',
                postalCode: '4400',
                country: 'Philippines',
                businessType: 'Business Process Outsourcing',
                industry: 'Information Technology & Services',
                registrationNumber: 'CS201234567',
                taxId: '123-456-789-000'
            },
            notifications: {
                lowStock: true,
                outOfStock: true,
                newItem: false,
                weeklyReport: true,
                emailAlerts: true
            }
        };

        initializeSettings();
        updateLastUpdated();
        showToast('All settings have been reset to default values.', 'success');
    }
}

// Logout
function handleLogout() {
    sessionStorage.clear();
    window.location.href = 'login.html';
}
