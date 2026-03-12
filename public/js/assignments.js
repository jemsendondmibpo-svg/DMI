// Assignments Data
let assignmentsData = [
    {
        assignmentId: 'ASG-001',
        assetName: 'Dell OptiPlex 7090',
        assetSKU: 'SYS-DL-001',
        assetCategory: 'System Unit',
        assignedTo: 'John Smith',
        department: 'IT Department',
        workstation: 'Workstation A1',
        seatNumber: 1,
        floor: '2nd Floor',
        status: 'Assigned',
        dateAssigned: '2024-01-15'
    },
    {
        assignmentId: 'ASG-002',
        assetName: 'HP EliteDisplay E243',
        assetSKU: 'MON-HP-002',
        assetCategory: 'Monitor',
        assignedTo: 'Sarah Johnson',
        department: 'IT Department',
        workstation: 'Workstation A2',
        seatNumber: 2,
        floor: '2nd Floor',
        status: 'Assigned',
        dateAssigned: '2024-01-16'
    },
    {
        assignmentId: 'ASG-003',
        assetName: 'Logitech MX Keys',
        assetSKU: 'KBD-LG-003',
        assetCategory: 'Keyboard',
        assignedTo: 'Unassigned',
        department: 'IT Department',
        workstation: 'Storage Room',
        seatNumber: null,
        floor: '2nd Floor',
        status: 'Available',
        dateAssigned: '2024-01-20'
    },
    {
        assignmentId: 'ASG-004',
        assetName: 'Logitech MX Master 3',
        assetSKU: 'MSE-LG-004',
        assetCategory: 'Mouse',
        assignedTo: 'Michael Brown',
        department: 'IT Department',
        workstation: 'Workstation B1',
        seatNumber: 3,
        floor: '2nd Floor',
        status: 'Assigned',
        dateAssigned: '2024-01-22'
    },
    {
        assignmentId: 'ASG-005',
        assetName: 'Jabra Evolve 75',
        assetSKU: 'HDS-JB-005',
        assetCategory: 'Headset',
        assignedTo: 'Emily Davis',
        department: 'HR Department',
        workstation: 'HR Desk 1',
        seatNumber: null,
        floor: '3rd Floor',
        status: 'Assigned',
        dateAssigned: '2024-01-25'
    },
    {
        assignmentId: 'ASG-006',
        assetName: 'Dell UltraSharp U2720Q',
        assetSKU: 'MON-DL-007',
        assetCategory: 'Monitor',
        assignedTo: 'Unassigned',
        department: 'IT Department',
        workstation: 'Maintenance',
        seatNumber: null,
        floor: '2nd Floor',
        status: 'Under Maintenance',
        dateAssigned: '2024-02-01'
    },
    {
        assignmentId: 'ASG-007',
        assetName: 'HP EliteDesk 800 G6',
        assetSKU: 'SYS-HP-008',
        assetCategory: 'System Unit',
        assignedTo: 'David Wilson',
        department: 'IT Department',
        workstation: 'Workstation C1',
        seatNumber: 4,
        floor: '2nd Floor',
        status: 'Assigned',
        dateAssigned: '2024-02-05'
    },
    {
        assignmentId: 'ASG-008',
        assetName: 'Keychron K8 Pro',
        assetSKU: 'KBD-KC-009',
        assetCategory: 'Keyboard',
        assignedTo: 'Jessica Martinez',
        department: 'HR Department',
        workstation: 'HR Desk 2',
        seatNumber: null,
        floor: '3rd Floor',
        status: 'Assigned',
        dateAssigned: '2024-02-10'
    },
    {
        assignmentId: 'ASG-009',
        assetName: 'Razer DeathAdder V2',
        assetSKU: 'MSE-RZ-010',
        assetCategory: 'Mouse',
        assignedTo: 'Christopher Lee',
        department: 'IT Department',
        workstation: 'Workstation D1',
        seatNumber: 5,
        floor: '2nd Floor',
        status: 'Assigned',
        dateAssigned: '2024-02-15'
    },
    {
        assignmentId: 'ASG-010',
        assetName: 'Logitech C920 HD Pro',
        assetSKU: 'WCM-LG-006',
        assetCategory: 'Webcam',
        assignedTo: 'Unassigned',
        department: 'IT Department',
        workstation: 'Storage Room',
        seatNumber: null,
        floor: '2nd Floor',
        status: 'Available',
        dateAssigned: '2024-02-20'
    }
];

// State
let currentTab = 'list';
let currentPage = 1;
const itemsPerPage = 6;
let searchQuery = '';
let filterStatus = 'all';
let selectedDepartment = 'IT Department';
let viewingAssignment = null;
let deletingAssignment = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateSummaryCards();
    renderAssignments();
});

// Update Summary Cards
function updateSummaryCards() {
    const totalAssignments = assignmentsData.length;
    const assignedCount = assignmentsData.filter(a => a.status === 'Assigned').length;
    const availableCount = assignmentsData.filter(a => a.status === 'Available').length;
    const maintenanceCount = assignmentsData.filter(a => a.status === 'Under Maintenance').length;

    document.getElementById('totalAssignments').textContent = totalAssignments;
    document.getElementById('assignedCount').textContent = assignedCount;
    document.getElementById('availableCount').textContent = availableCount;
    document.getElementById('maintenanceCount').textContent = maintenanceCount;
}

// Switch Tab
function switchTab(tab) {
    currentTab = tab;

    // Update tab buttons
    const listBtn = document.getElementById('listTabBtn');
    const mapBtn = document.getElementById('mapTabBtn');

    if (tab === 'list') {
        listBtn.classList.add('active');
        mapBtn.classList.remove('active');
        document.getElementById('listTab').classList.add('active');
        document.getElementById('mapTab').classList.remove('active');
    } else {
        listBtn.classList.remove('active');
        mapBtn.classList.add('active');
        document.getElementById('listTab').classList.remove('active');
        document.getElementById('mapTab').classList.add('active');
    }
}

// Switch Department
function switchDepartment(department) {
    selectedDepartment = department;
    
    const mapTitle = document.getElementById('mapTitle');
    const mapDescription = document.getElementById('mapDescription');

    if (department === 'IT Department') {
        mapTitle.textContent = 'IT Department Floor Map — 2nd Floor';
        mapDescription.textContent = 'Assignments are numbered sequentially by date (oldest = #1). Click any seat to view details.';
    } else {
        mapTitle.textContent = 'HR Department Floor Map — 3rd Floor';
        mapDescription.textContent = 'View all HR Department asset assignments by workstation area.';
    }
}

// Filter Assignments
function getFilteredAssignments() {
    return assignmentsData.filter(assignment => {
        // Search filter
        const q = searchQuery.toLowerCase();
        const matchesSearch = !searchQuery ||
            assignment.assignmentId.toLowerCase().includes(q) ||
            assignment.assetName.toLowerCase().includes(q) ||
            assignment.assetSKU.toLowerCase().includes(q) ||
            assignment.assignedTo.toLowerCase().includes(q) ||
            assignment.department.toLowerCase().includes(q) ||
            assignment.workstation.toLowerCase().includes(q);

        // Status filter
        const matchesStatus = filterStatus === 'all' || assignment.status === filterStatus;

        return matchesSearch && matchesStatus;
    });
}

// Get Total Pages
function getTotalPages() {
    const filtered = getFilteredAssignments();
    return Math.max(1, Math.ceil(filtered.length / itemsPerPage));
}

// Render Assignments
function renderAssignments() {
    const filtered = getFilteredAssignments();
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
    const tbody = document.getElementById('assignmentsTableBody');

    if (paginated.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8" style="padding: 3rem 1rem; text-align: center;">
                    <div class="empty-state">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.35-4.35"></path>
                        </svg>
                        <p>No assignments found.</p>
                    </div>
                </td>
            </tr>
        `;
    } else {
        tbody.innerHTML = paginated.map(assignment => `
            <tr>
                <td>
                    <span class="assignment-id">${assignment.assignmentId}</span>
                </td>
                <td>
                    <div class="asset-cell">
                        <div class="asset-icon-wrapper">
                            <svg class="asset-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="8.5" cy="7" r="4"></circle>
                                <polyline points="17 11 19 13 23 9"></polyline>
                            </svg>
                        </div>
                        <div class="asset-info">
                            <span class="asset-name">${assignment.assetName}</span>
                            <span class="asset-sku">${assignment.assetSKU}</span>
                        </div>
                    </div>
                </td>
                <td>
                    <span class="assigned-to ${assignment.assignedTo === 'Unassigned' ? 'unassigned' : ''}">
                        ${assignment.assignedTo}
                    </span>
                </td>
                <td>
                    <span class="department-text">${assignment.department}</span>
                </td>
                <td>
                    <div class="workstation-cell">
                        <span class="workstation-text">${assignment.workstation}</span>
                        ${assignment.seatNumber ? `<span class="seat-badge">#${assignment.seatNumber}</span>` : ''}
                    </div>
                </td>
                <td>
                    <span class="floor-text">${assignment.floor}</span>
                </td>
                <td>
                    <span class="status-badge ${getStatusClass(assignment.status)}">
                        ${assignment.status}
                    </span>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn action-btn-view" onclick="viewAssignment('${assignment.assignmentId}')" title="View">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        </button>
                        <button class="action-btn action-btn-edit" onclick="editAssignment('${assignment.assignmentId}')" title="Edit">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                        </button>
                        <button class="action-btn action-btn-delete" onclick="openDeleteModal('${assignment.assignmentId}')" title="Delete">
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
        `).join('');
    }

    // Update pagination
    updatePagination(filtered.length, totalPages);
}

// Get Status Class
function getStatusClass(status) {
    switch (status) {
        case 'Assigned': return 'status-assigned';
        case 'Available': return 'status-available';
        case 'Under Maintenance': return 'status-maintenance';
        default: return '';
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
    paginationInfo.textContent = `Showing ${showing} of ${filteredCount} assignments`;
    paginationPage.textContent = `${currentPage} / ${totalPages}`;
}

// Search Input Handler
document.getElementById('searchInput')?.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase();
    currentPage = 1;
    renderAssignments();
});

// Status Filter Handler
document.getElementById('statusFilter')?.addEventListener('change', (e) => {
    filterStatus = e.target.value;
    currentPage = 1;
    renderAssignments();
});

// Pagination Handlers
document.getElementById('prevBtn')?.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderAssignments();
    }
});

document.getElementById('nextBtn')?.addEventListener('click', () => {
    const totalPages = getTotalPages();
    if (currentPage < totalPages) {
        currentPage++;
        renderAssignments();
    }
});

// View Assignment
function viewAssignment(assignmentId) {
    const assignment = assignmentsData.find(a => a.assignmentId === assignmentId);
    if (!assignment) return;

    viewingAssignment = assignment;

    // Update modal subtitle
    document.getElementById('viewModalSubtitle').textContent = `${assignment.assignmentId} · ${assignment.assetSKU}`;

    // Populate modal content
    const content = document.getElementById('viewModalContent');
    content.innerHTML = `
        <div class="detail-grid">
            <div class="detail-item">
                <span class="detail-label">Asset</span>
                <span class="detail-value">${assignment.assetName}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Category</span>
                <span class="detail-value">${assignment.assetCategory}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Assigned To</span>
                <span class="detail-value">${assignment.assignedTo}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Department</span>
                <span class="detail-value">${assignment.department}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Workstation</span>
                <span class="detail-value">${assignment.workstation}${assignment.seatNumber ? ` (Seat ${assignment.seatNumber})` : ''}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Floor</span>
                <span class="detail-value">${assignment.floor}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Date Assigned</span>
                <span class="detail-value">${formatDate(assignment.dateAssigned)}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Status</span>
                <span class="detail-value">${assignment.status}</span>
            </div>
        </div>
    `;

    document.getElementById('viewModal').classList.remove('hidden');
}

// Close View Modal
function closeViewModal() {
    document.getElementById('viewModal').classList.add('hidden');
    viewingAssignment = null;
}

// Edit Assignment
function editAssignment(assignmentId) {
    showToast('Edit assignment feature coming soon!', 'success');
    // In a real app, this would navigate to edit page
}

// Open Add Modal
function openAddModal() {
    showToast('Add assignment feature coming soon!', 'success');
    // In a real app, this would navigate to add page
}

// Open Delete Modal
function openDeleteModal(assignmentId) {
    const assignment = assignmentsData.find(a => a.assignmentId === assignmentId);
    if (!assignment) return;

    deletingAssignment = assignment;
    document.getElementById('deleteAssignmentName').textContent = `${assignment.assetName} (${assignment.assignmentId})`;
    document.getElementById('deleteModal').classList.remove('hidden');

    document.getElementById('confirmDeleteBtn').onclick = () => {
        deleteAssignment(assignmentId);
    };
}

// Close Delete Modal
function closeDeleteModal() {
    document.getElementById('deleteModal').classList.add('hidden');
    deletingAssignment = null;
}

// Delete Assignment
function deleteAssignment(assignmentId) {
    assignmentsData = assignmentsData.filter(a => a.assignmentId !== assignmentId);
    closeDeleteModal();
    updateSummaryCards();
    renderAssignments();
    showToast('Assignment deleted successfully!', 'success');
}

// Format Date
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
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
