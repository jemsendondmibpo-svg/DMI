// Dashboard Data
const dashboardData = {
    stats: {
        totalItems: 42,
        lowStock: 8,
        outOfStock: 3,
        inventoryValue: 1245000
    },
    categoryData: [
        { name: 'System Unit', value: 120, color: '#3b82f6' },
        { name: 'Monitor', value: 85, color: '#14b8a6' },
        { name: 'Keyboard', value: 95, color: '#a855f7' },
        { name: 'Mouse', value: 102, color: '#22c55e' },
        { name: 'Headset', value: 45, color: '#f97316' },
        { name: 'Webcam', value: 38, color: '#6366f1' }
    ],
    trendData: [
        { month: 'Oct', items: 45 },
        { month: 'Nov', items: 52 },
        { month: 'Dec', items: 48 },
        { month: 'Jan', items: 65 },
        { month: 'Feb', items: 58 },
        { month: 'Mar', items: 72 }
    ],
    stockAlerts: [
        { name: 'Dell OptiPlex 7090', sku: 'SKU-001234', quantity: 2, status: 'low-stock' },
        { name: 'HP EliteDisplay E243', sku: 'SKU-002456', quantity: 1, status: 'low-stock' },
        { name: 'Logitech MX Keys', sku: 'SKU-003789', quantity: 0, status: 'out-of-stock' },
        { name: 'Logitech MX Master 3', sku: 'SKU-004012', quantity: 3, status: 'low-stock' },
        { name: 'Jabra Evolve 75', sku: 'SKU-005345', quantity: 0, status: 'out-of-stock' }
    ],
    recentActivity: [
        {
            action: 'New Assignment',
            description: 'Dell OptiPlex 7090',
            meta: 'Assigned to John Doe',
            timestamp: '15 mins ago',
            iconClass: 'activity-icon-green',
            icon: 'user-plus'
        },
        {
            action: 'Maintenance Scheduled',
            description: 'HP EliteDesk 800 G6',
            meta: 'Assigned to IT Department',
            timestamp: '1 hour ago',
            iconClass: 'activity-icon-blue',
            icon: 'wrench'
        },
        {
            action: 'Stock Alert',
            description: 'Logitech MX Keys',
            meta: 'Out of stock',
            timestamp: '2 hours ago',
            iconClass: 'activity-icon-red',
            icon: 'alert'
        },
        {
            action: 'Stock Updated',
            description: 'Dell UltraSharp U2720Q',
            meta: 'Low stock alert',
            timestamp: '3 hours ago',
            iconClass: 'activity-icon-amber',
            icon: 'warning'
        },
        {
            action: 'New Assignment',
            description: 'Logitech MX Master 3',
            meta: 'Assigned to Jane Smith',
            timestamp: '5 hours ago',
            iconClass: 'activity-icon-green',
            icon: 'user-plus'
        },
        {
            action: 'Stock Updated',
            description: 'Jabra Evolve 75',
            meta: 'Low stock alert',
            timestamp: '6 hours ago',
            iconClass: 'activity-icon-amber',
            icon: 'warning'
        }
    ]
};

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', () => {
    initializeSidebar();
    initializeUserProfile();
    loadDashboardData();
    initializeCharts();
    checkUserRole();
});

// Sidebar functionality
function initializeSidebar() {
    const mobileHamburger = document.getElementById('mobileHamburger');
    const closeSidebar = document.getElementById('closeSidebar');
    const mobileSidebar = document.getElementById('mobileSidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    if (mobileHamburger) {
        mobileHamburger.addEventListener('click', () => {
            mobileSidebar.classList.add('active');
            sidebarOverlay.classList.add('active');
        });
    }

    if (closeSidebar) {
        closeSidebar.addEventListener('click', () => {
            mobileSidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
        });
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', () => {
            mobileSidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
        });
    }

    // Close sidebar when clicking on nav items on mobile
    const navItems = mobileSidebar.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            mobileSidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
        });
    });
}

// User Profile Dropdown
function initializeUserProfile() {
    const profileTrigger = document.getElementById('profileTrigger');
    const profileDropdown = document.getElementById('profileDropdown');

    // Load user data from session
    const userName = sessionStorage.getItem('userEmail') || 'Admin User';
    const userRole = sessionStorage.getItem('userRole') || 'Admin';

    // Update UI
    const userNameElements = document.querySelectorAll('#userName, .profile-dropdown-name, .profile-detail-value');
    userNameElements.forEach(el => {
        if (el.classList.contains('profile-detail-value') && el.previousElementSibling?.textContent === 'Full Name') {
            el.textContent = userName;
        } else if (!el.classList.contains('profile-detail-value')) {
            el.textContent = userName;
        }
    });

    const userRoleElements = document.querySelectorAll('#userRole');
    userRoleElements.forEach(el => el.textContent = userRole);

    // Update avatar initials
    const initials = getInitials(userName);
    const avatarElements = document.querySelectorAll('#userAvatar, .profile-dropdown-avatar');
    avatarElements.forEach(el => el.textContent = initials);

    // Toggle dropdown
    if (profileTrigger) {
        profileTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            profileDropdown.classList.toggle('hidden');
        });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!profileDropdown.contains(e.target) && e.target !== profileTrigger) {
            profileDropdown.classList.add('hidden');
        }
    });
}

// Get initials from name
function getInitials(name) {
    return name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

// Load Dashboard Data
function loadDashboardData() {
    // Update stat cards
    document.querySelector('.stat-card:nth-child(1) .stat-value').textContent = dashboardData.stats.totalItems;
    document.querySelector('.stat-card:nth-child(2) .stat-value').textContent = dashboardData.stats.lowStock;
    document.querySelector('.stat-card:nth-child(3) .stat-value').textContent = dashboardData.stats.outOfStock;
    document.querySelector('.stat-card:nth-child(4) .stat-value').textContent = 
        `₱${dashboardData.stats.inventoryValue.toLocaleString()}`;

    // Load stock alerts
    loadStockAlerts();

    // Load type overview
    loadTypeOverview();

    // Load recent activity
    loadRecentActivity();
}

// Load Stock Alerts
function loadStockAlerts() {
    const container = document.getElementById('stockAlerts');
    
    if (dashboardData.stockAlerts.length === 0) {
        container.innerHTML = `
            <div class="no-alerts">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <p>All items are well stocked.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = dashboardData.stockAlerts.map(alert => `
        <div class="alert-item">
            <div class="alert-info">
                <p class="alert-name">${alert.name}</p>
                <p class="alert-sku">${alert.sku}</p>
            </div>
            <div class="alert-meta">
                <span class="alert-quantity">Qty: ${alert.quantity}</span>
                <span class="alert-status ${alert.status}">
                    <span class="alert-status-dot"></span>
                    <span class="alert-status-text">${alert.status === 'low-stock' ? 'Low Stock' : 'Out of Stock'}</span>
                </span>
            </div>
        </div>
    `).join('');
}

// Load Type Overview
function loadTypeOverview() {
    const container = document.getElementById('typeOverview');
    const totalItems = dashboardData.categoryData.reduce((sum, cat) => sum + cat.value, 0);

    const icons = {
        'System Unit': '<path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>',
        'Monitor': '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line>',
        'Keyboard': '<rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h.01M12 12h.01M16 12h.01M7 16h10"></path>',
        'Mouse': '<path d="M12 2a7 7 0 00-7 7v4a7 7 0 0014 0V9a7 7 0 00-7-7z"></path><path d="M12 2v6"></path>',
        'Headset': '<path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>',
        'Webcam': '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle>'
    };

    container.innerHTML = dashboardData.categoryData.map(cat => {
        const percentage = Math.round((cat.value / totalItems) * 100);
        return `
            <div class="type-item">
                <div class="type-icon" style="background-color: ${cat.color}15;">
                    <svg viewBox="0 0 24 24" fill="none" stroke="${cat.color}" stroke-width="2">
                        ${icons[cat.name] || '<rect x="3" y="3" width="18" height="18" rx="2"></rect>'}
                    </svg>
                </div>
                <div class="type-details">
                    <div class="type-header">
                        <span class="type-name">${cat.name}</span>
                        <span class="type-count">${cat.value} units</span>
                    </div>
                    <div class="type-progress">
                        <div class="type-progress-bar" style="width: ${percentage}%; background-color: ${cat.color};"></div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Load Recent Activity
function loadRecentActivity() {
    const container = document.getElementById('activityList');

    const activityIcons = {
        'user-plus': '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line>',
        'wrench': '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>',
        'alert': '<circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>',
        'warning': '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>'
    };

    container.innerHTML = dashboardData.recentActivity.map(activity => `
        <div class="activity-item">
            <div class="activity-icon ${activity.iconClass}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    ${activityIcons[activity.icon]}
                </svg>
            </div>
            <div class="activity-content">
                <div class="activity-header-row">
                    <p class="activity-action">${activity.action}</p>
                    <span class="activity-timestamp">${activity.timestamp}</span>
                </div>
                <p class="activity-description">${activity.description}</p>
                <p class="activity-meta">${activity.meta}</p>
            </div>
        </div>
    `).join('');
}

// Initialize Charts
function initializeCharts() {
    initializeCategoryChart();
    initializeTrendChart();
}

// Category Donut Chart
function initializeCategoryChart() {
    const ctx = document.getElementById('categoryChart');
    if (!ctx) return;

    const total = dashboardData.categoryData.reduce((sum, cat) => sum + cat.value, 0);

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: dashboardData.categoryData.map(cat => cat.name),
            datasets: [{
                data: dashboardData.categoryData.map(cat => cat.value),
                backgroundColor: dashboardData.categoryData.map(cat => cat.color),
                borderWidth: 0,
                spacing: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '65%',
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: '#fff',
                    titleColor: '#1f2937',
                    bodyColor: '#6b7280',
                    borderColor: '#e5e7eb',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            const percentage = Math.round((context.parsed / total) * 100);
                            return `${context.label}: ${context.parsed} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });

    // Create legend
    const legendContainer = document.getElementById('categoryLegend');
    legendContainer.innerHTML = dashboardData.categoryData.map(cat => `
        <div class="legend-item">
            <span class="legend-dot" style="background-color: ${cat.color};"></span>
            <span class="legend-text">${cat.name} (${cat.value})</span>
        </div>
    `).join('');
}

// Trend Bar Chart
function initializeTrendChart() {
    const ctx = document.getElementById('trendChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dashboardData.trendData.map(d => d.month),
            datasets: [{
                label: 'Items',
                data: dashboardData.trendData.map(d => d.items),
                backgroundColor: '#B0BF00',
                borderRadius: 4,
                barPercentage: 0.6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 80,
                    border: {
                        display: false
                    },
                    grid: {
                        color: '#f3f4f6'
                    },
                    ticks: {
                        color: '#94a3b8',
                        font: {
                            size: 11
                        }
                    }
                },
                x: {
                    border: {
                        display: false
                    },
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#94a3b8',
                        font: {
                            size: 11
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: '#fff',
                    titleColor: '#1f2937',
                    bodyColor: '#6b7280',
                    borderColor: '#e5e7eb',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: false
                }
            }
        }
    });
}

// Check user role and hide/show User Management
function checkUserRole() {
    const userRole = sessionStorage.getItem('userRole');
    const userManagementNav = document.getElementById('userManagementNav');
    const mobileUserManagement = document.querySelector('.mobile-user-management');

    if (userRole !== 'Admin') {
        if (userManagementNav) userManagementNav.style.display = 'none';
        if (mobileUserManagement) mobileUserManagement.style.display = 'none';
    }
}

// Logout functionality
function handleLogout() {
    sessionStorage.clear();
    window.location.href = 'login.html';
}

// Quick logout button
document.getElementById('quickLogout')?.addEventListener('click', handleLogout);

// Notification button (placeholder)
document.getElementById('notificationBtn')?.addEventListener('click', () => {
    alert('Notifications feature coming soon!');
});
