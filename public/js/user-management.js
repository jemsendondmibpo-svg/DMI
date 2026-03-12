// Users Data
let usersData = [
    {
        id: '1',
        fullName: 'Jeremy Sendon',
        email: 'jeremy@digitalminds.com',
        role: 'Admin',
        createdAt: '2024-01-10T08:00:00Z'
    },
    {
        id: '2',
        fullName: 'Sarah Johnson',
        email: 'sarah.johnson@digitalminds.com',
        role: 'IT Officers',
        createdAt: '2024-01-15T09:30:00Z'
    },
    {
        id: '3',
        fullName: 'Michael Chen',
        email: 'michael.chen@digitalminds.com',
        role: 'IT Officers',
        createdAt: '2024-01-20T10:15:00Z'
    },
    {
        id: '4',
        fullName: 'Emily Rodriguez',
        email: 'emily.rodriguez@digitalminds.com',
        role: 'HR Officers',
        createdAt: '2024-02-01T11:00:00Z'
    },
    {
        id: '5',
        fullName: 'David Kim',
        email: 'david.kim@digitalminds.com',
        role: 'IT Officers',
        createdAt: '2024-02-10T14:30:00Z'
    },
    {
        id: '6',
        fullName: 'Lisa Martinez',
        email: 'lisa.martinez@digitalminds.com',
        role: 'HR Officers',
        createdAt: '2024-02-15T13:45:00Z'
    },
    {
        id: '7',
        fullName: 'John Smith',
        email: 'john.smith@digitalminds.com',
        role: 'Admin',
        createdAt: '2024-03-01T08:20:00Z'
    }
];

// State
let currentPage = 1;
const itemsPerPage = 10;
let searchQuery = '';
let editingUser = null;
let deletingUser = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateStatistics();
    renderUsers();

    // Search input handler
    document.getElementById('searchInput')?.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase();
        currentPage = 1;
        renderUsers();
    });

    // Pagination handlers
    document.getElementById('prevBtn')?.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderUsers();
        }
    });

    document.getElementById('nextBtn')?.addEventListener('click', () => {
        const totalPages = getTotalPages();
        if (currentPage < totalPages) {
            currentPage++;
            renderUsers();
        }
    });

    // Form submit handler
    document.getElementById('userForm')?.addEventListener('submit', handleFormSubmit);
});

// Update Statistics
function updateStatistics() {
    const stats = {
        total: usersData.length,
        admins: usersData.filter(u => u.role === 'Admin').length,
        it: usersData.filter(u => u.role === 'IT Officers').length,
        hr: usersData.filter(u => u.role === 'HR Officers').length
    };

    document.getElementById('totalUsers').textContent = stats.total;
    document.getElementById('adminCount').textContent = stats.admins;
    document.getElementById('itCount').textContent = stats.it;
    document.getElementById('hrCount').textContent = stats.hr;
}

// Filter Users
function getFilteredUsers() {
    return usersData.filter(user => {
        const matchesSearch = !searchQuery ||
            user.fullName.toLowerCase().includes(searchQuery) ||
            user.email.toLowerCase().includes(searchQuery) ||
            user.role.toLowerCase().includes(searchQuery);

        return matchesSearch;
    });
}

// Get Total Pages
function getTotalPages() {
    const filtered = getFilteredUsers();
    return Math.max(1, Math.ceil(filtered.length / itemsPerPage));
}

// Render Users
function renderUsers() {
    const filtered = getFilteredUsers();
    const totalPages = getTotalPages();

    // Ensure current page is valid
    if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    // Paginate
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginated = filtered.slice(startIndex, endIndex);

    // Render table
    const tbody = document.getElementById('usersTableBody');

    if (paginated.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" style="padding: 3rem 1rem; text-align: center;">
                    <div class="empty-state">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.35-4.35"></path>
                        </svg>
                        <p>No users found.</p>
                    </div>
                </td>
            </tr>
        `;
    } else {
        tbody.innerHTML = paginated.map(user => {
            const initials = user.fullName.split(' ').map(n => n[0]).join('').toUpperCase();
            const roleClass = getRoleClass(user.role);
            const roleIcon = getRoleIcon(user.role);

            return `
                <tr>
                    <td>
                        <div class="user-cell">
                            <div class="user-avatar">${initials}</div>
                            <div class="user-info">
                                <span class="user-name">${user.fullName}</span>
                                <span class="user-id">ID: ${user.id}</span>
                            </div>
                        </div>
                    </td>
                    <td>
                        <span class="email-cell">${user.email}</span>
                    </td>
                    <td>
                        <span class="role-badge ${roleClass}">
                            ${roleIcon}
                            ${user.role}
                        </span>
                    </td>
                    <td>
                        <span class="created-cell">${formatDate(user.createdAt)}</span>
                    </td>
                    <td>
                        <div class="action-buttons">
                            <button class="action-btn action-btn-view" onclick="viewUser('${user.id}')" title="View">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                            </button>
                            <button class="action-btn action-btn-edit" onclick="openEditModal('${user.id}')" title="Edit">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                </svg>
                            </button>
                            <button class="action-btn action-btn-delete" onclick="openDeleteModal('${user.id}')" title="Delete">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                    <line x1="10" y1="11" x2="10" y2="17"></line>
                                    <line x1="14" y1="11" x2="14" y2="17"></line>
                                </svg>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    }

    // Update pagination
    updatePagination(filtered.length, totalPages);
}

// Get Role Class
function getRoleClass(role) {
    switch (role) {
        case 'Admin': return 'role-admin';
        case 'IT Officers': return 'role-it';
        case 'HR Officers': return 'role-hr';
        default: return '';
    }
}

// Get Role Icon
function getRoleIcon(role) {
    switch (role) {
        case 'Admin':
            return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>`;
        case 'IT Officers':
            return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
            </svg>`;
        case 'HR Officers':
            return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>`;
        default:
            return '';
    }
}

// Update Pagination
function updatePagination(filteredCount, totalPages) {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const paginationInfo = document.getElementById('paginationInfo');
    const paginationPage = document.getElementById('paginationPage');

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;

    const showing = Math.min((currentPage - 1) * itemsPerPage + itemsPerPage, filteredCount);
    paginationInfo.textContent = `Showing ${showing} of ${filteredCount} users`;
    paginationPage.textContent = `${currentPage} / ${totalPages}`;
}

// Open Add Modal
function openAddModal() {
    editingUser = null;
    document.getElementById('modalTitle').textContent = 'Add New User';
    document.getElementById('submitBtnText').textContent = 'Add User';
    document.getElementById('userForm').reset();
    document.getElementById('passwordGroup').style.display = 'block';
    document.getElementById('password').required = true;
    document.getElementById('userModal').classList.remove('hidden');
}

// Open Edit Modal
function openEditModal(userId) {
    const user = usersData.find(u => u.id === userId);
    if (!user) return;

    editingUser = user;
    document.getElementById('modalTitle').textContent = 'Edit User';
    document.getElementById('submitBtnText').textContent = 'Update User';

    // Populate form
    document.getElementById('fullName').value = user.fullName;
    document.getElementById('email').value = user.email;
    document.getElementById('role').value = user.role;

    // Hide password field for editing
    document.getElementById('passwordGroup').style.display = 'none';
    document.getElementById('password').required = false;

    document.getElementById('userModal').classList.remove('hidden');
}

// Close User Modal
function closeUserModal() {
    document.getElementById('userModal').classList.add('hidden');
    editingUser = null;
}

// Handle Form Submit
function handleFormSubmit(e) {
    e.preventDefault();

    const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        role: document.getElementById('role').value
    };

    // Validation
    if (!formData.fullName || !formData.email || !formData.role) {
        showToast('Please fill in all required fields.', 'error');
        return;
    }

    if (!editingUser && formData.password.length < 6) {
        showToast('Password must be at least 6 characters.', 'error');
        return;
    }

    // Check for duplicate email (except when editing same user)
    const emailExists = usersData.some(u => 
        u.email === formData.email && (!editingUser || u.id !== editingUser.id)
    );

    if (emailExists) {
        showToast('A user with this email already exists.', 'error');
        return;
    }

    if (editingUser) {
        // Update existing user
        const index = usersData.findIndex(u => u.id === editingUser.id);
        if (index !== -1) {
            usersData[index] = {
                ...editingUser,
                fullName: formData.fullName,
                role: formData.role
                // Email cannot be changed after creation
            };
            showToast('User updated successfully!', 'success');
        }
    } else {
        // Add new user
        const newUser = {
            id: String(Math.max(...usersData.map(u => parseInt(u.id)), 0) + 1),
            fullName: formData.fullName,
            email: formData.email,
            role: formData.role,
            createdAt: new Date().toISOString()
        };
        usersData.push(newUser);
        showToast('User added successfully!', 'success');
    }

    closeUserModal();
    updateStatistics();
    renderUsers();
}

// View User
function viewUser(userId) {
    const user = usersData.find(u => u.id === userId);
    if (!user) return;

    const viewContent = document.getElementById('viewContent');
    viewContent.innerHTML = `
        <div class="view-grid">
            <div class="view-item">
                <span class="view-label">Full Name</span>
                <span class="view-value">${user.fullName}</span>
            </div>
            <div class="view-item">
                <span class="view-label">Email</span>
                <span class="view-value">${user.email}</span>
            </div>
            <div class="view-item">
                <span class="view-label">Role</span>
                <span class="view-value">${user.role}</span>
            </div>
            <div class="view-item">
                <span class="view-label">User ID</span>
                <span class="view-value">${user.id}</span>
            </div>
            <div class="view-item">
                <span class="view-label">Created At</span>
                <span class="view-value">${formatDate(user.createdAt)}</span>
            </div>
            <div class="view-item">
                <span class="view-label">Status</span>
                <span class="view-value">Active</span>
            </div>
        </div>
    `;

    document.getElementById('viewModal').classList.remove('hidden');
}

// Close View Modal
function closeViewModal() {
    document.getElementById('viewModal').classList.add('hidden');
}

// Open Delete Modal
function openDeleteModal(userId) {
    const user = usersData.find(u => u.id === userId);
    if (!user) return;

    deletingUser = user;
    document.getElementById('deleteUserName').textContent = `${user.fullName} (${user.email})`;
    document.getElementById('deleteModal').classList.remove('hidden');

    document.getElementById('confirmDeleteBtn').onclick = () => {
        deleteUser(userId);
    };
}

// Close Delete Modal
function closeDeleteModal() {
    document.getElementById('deleteModal').classList.add('hidden');
    deletingUser = null;
}

// Delete User
function deleteUser(userId) {
    usersData = usersData.filter(u => u.id !== userId);
    closeDeleteModal();
    updateStatistics();
    renderUsers();
    showToast('User deleted successfully!', 'success');
}

// Format Date
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
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

// Close modals on overlay click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.add('hidden');
        }
    });
});

// Logout
function handleLogout() {
    sessionStorage.clear();
    window.location.href = 'login.html';
}
