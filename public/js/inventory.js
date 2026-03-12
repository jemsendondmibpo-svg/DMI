// Inventory Data
let inventoryData = [
    {
        id: 1,
        assetName: 'Dell OptiPlex 7090',
        sku: 'SYS-DL-001',
        category: 'System Unit',
        brand: 'Dell',
        model: 'OptiPlex 7090',
        serialNumber: 'SN123456789',
        quantity: 15,
        minQuantity: 5,
        price: 45000,
        stockStatus: 'In Stock',
        assetStatus: 'Available',
        condition: 'New',
        purchaseDate: '2024-01-15',
        location: 'IT Department',
        locationCode: 'JMS'
    },
    {
        id: 2,
        assetName: 'HP EliteDisplay E243',
        sku: 'MON-HP-002',
        category: 'Monitor',
        brand: 'HP',
        model: 'EliteDisplay E243',
        serialNumber: 'SN987654321',
        quantity: 3,
        minQuantity: 5,
        price: 18500,
        stockStatus: 'Low Stock',
        assetStatus: 'Available',
        condition: 'Good',
        purchaseDate: '2024-02-10',
        location: 'IT Department',
        locationCode: 'JMS'
    },
    {
        id: 3,
        assetName: 'Logitech MX Keys',
        sku: 'KBD-LG-003',
        category: 'Keyboard',
        brand: 'Logitech',
        model: 'MX Keys',
        serialNumber: 'SN456789123',
        quantity: 0,
        minQuantity: 3,
        price: 8500,
        stockStatus: 'Out of Stock',
        assetStatus: 'Available',
        condition: 'New',
        purchaseDate: '2024-01-20',
        location: 'IT Department',
        locationCode: 'JMS'
    },
    {
        id: 4,
        assetName: 'Logitech MX Master 3',
        sku: 'MSE-LG-004',
        category: 'Mouse',
        brand: 'Logitech',
        model: 'MX Master 3',
        serialNumber: 'SN789123456',
        quantity: 8,
        minQuantity: 5,
        price: 5500,
        stockStatus: 'In Stock',
        assetStatus: 'Available',
        condition: 'New',
        purchaseDate: '2024-02-05',
        location: 'IT Department',
        locationCode: 'JMS'
    },
    {
        id: 5,
        assetName: 'Jabra Evolve 75',
        sku: 'HDS-JB-005',
        category: 'Headset',
        brand: 'Jabra',
        model: 'Evolve 75',
        serialNumber: 'SN321654987',
        quantity: 2,
        minQuantity: 4,
        price: 15000,
        stockStatus: 'Low Stock',
        assetStatus: 'Assigned',
        condition: 'Good',
        purchaseDate: '2024-01-25',
        location: 'HR Department',
        locationCode: 'MMS'
    },
    {
        id: 6,
        assetName: 'Logitech C920 HD Pro',
        sku: 'WCM-LG-006',
        category: 'Webcam',
        brand: 'Logitech',
        model: 'C920 HD Pro',
        serialNumber: 'SN654987321',
        quantity: 10,
        minQuantity: 3,
        price: 4500,
        stockStatus: 'In Stock',
        assetStatus: 'Available',
        condition: 'New',
        purchaseDate: '2024-02-20',
        location: 'IT Department',
        locationCode: 'JMS'
    },
    {
        id: 7,
        assetName: 'Dell UltraSharp U2720Q',
        sku: 'MON-DL-007',
        category: 'Monitor',
        brand: 'Dell',
        model: 'UltraSharp U2720Q',
        serialNumber: 'SN147258369',
        quantity: 12,
        minQuantity: 5,
        price: 35000,
        stockStatus: 'In Stock',
        assetStatus: 'Available',
        condition: 'New',
        purchaseDate: '2024-03-01',
        location: 'IT Department',
        locationCode: 'JMS'
    },
    {
        id: 8,
        assetName: 'HP EliteDesk 800 G6',
        sku: 'SYS-HP-008',
        category: 'System Unit',
        brand: 'HP',
        model: 'EliteDesk 800 G6',
        serialNumber: 'SN258369147',
        quantity: 6,
        minQuantity: 5,
        price: 52000,
        stockStatus: 'In Stock',
        assetStatus: 'Under Maintenance',
        condition: 'Fair',
        purchaseDate: '2024-01-10',
        location: 'IT Department',
        locationCode: 'JMS'
    },
    {
        id: 9,
        assetName: 'Keychron K8 Pro',
        sku: 'KBD-KC-009',
        category: 'Keyboard',
        brand: 'Keychron',
        model: 'K8 Pro',
        serialNumber: 'SN369147258',
        quantity: 7,
        minQuantity: 3,
        price: 9500,
        stockStatus: 'In Stock',
        assetStatus: 'Available',
        condition: 'New',
        purchaseDate: '2024-02-15',
        location: 'IT Department',
        locationCode: 'JMS'
    },
    {
        id: 10,
        assetName: 'Razer DeathAdder V2',
        sku: 'MSE-RZ-010',
        category: 'Mouse',
        brand: 'Razer',
        model: 'DeathAdder V2',
        serialNumber: 'SN741852963',
        quantity: 5,
        minQuantity: 5,
        price: 4200,
        stockStatus: 'In Stock',
        assetStatus: 'Assigned',
        condition: 'Good',
        purchaseDate: '2024-02-28',
        location: 'HR Department',
        locationCode: 'MMS'
    }
];

// Pagination and Filter State
let currentPage = 1;
const itemsPerPage = 8;
let searchQuery = '';
let filterCategory = 'all';
let filterStock = 'all';
let filterAssetStatus = 'all';
let editingAsset = null;

// Category Styles
const categoryStyles = {
    'System Unit': 'category-system-unit',
    'Monitor': 'category-monitor',
    'Keyboard': 'category-keyboard',
    'Mouse': 'category-mouse',
    'Headset': 'category-headset',
    'Webcam': 'category-webcam',
    'Extra': 'category-extra'
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderInventory();
    initializeEventListeners();
});

// Initialize Event Listeners
function initializeEventListeners() {
    // Search
    document.getElementById('searchInput').addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase();
        currentPage = 1;
        renderInventory();
    });

    // Filter button
    document.getElementById('filterBtn').addEventListener('click', () => {
        const filterPanel = document.getElementById('filterPanel');
        filterPanel.classList.toggle('hidden');
    });

    // Filter selects
    document.getElementById('filterCategory').addEventListener('change', (e) => {
        filterCategory = e.target.value;
        currentPage = 1;
        updateFilterIndicator();
        renderInventory();
    });

    document.getElementById('filterStock').addEventListener('change', (e) => {
        filterStock = e.target.value;
        currentPage = 1;
        updateFilterIndicator();
        renderInventory();
    });

    document.getElementById('filterAssetStatus').addEventListener('change', (e) => {
        filterAssetStatus = e.target.value;
        currentPage = 1;
        updateFilterIndicator();
        renderInventory();
    });

    // Clear filters
    document.getElementById('clearFiltersBtn').addEventListener('click', () => {
        filterCategory = 'all';
        filterStock = 'all';
        filterAssetStatus = 'all';
        document.getElementById('filterCategory').value = 'all';
        document.getElementById('filterStock').value = 'all';
        document.getElementById('filterAssetStatus').value = 'all';
        currentPage = 1;
        updateFilterIndicator();
        renderInventory();
    });

    // Add asset button
    document.getElementById('addAssetBtn').addEventListener('click', openAddModal);

    // Modal close buttons
    document.getElementById('closeModal').addEventListener('click', closeAssetModal);
    document.getElementById('cancelBtn').addEventListener('click', closeAssetModal);
    document.getElementById('closeViewModal').addEventListener('click', closeViewModal);
    document.getElementById('closeViewBtn').addEventListener('click', closeViewModal);
    document.getElementById('closeDeleteModal').addEventListener('click', closeDeleteModal);
    document.getElementById('cancelDeleteBtn').addEventListener('click', closeDeleteModal);

    // Form submit
    document.getElementById('assetForm').addEventListener('submit', handleFormSubmit);

    // Edit from view
    document.getElementById('editFromViewBtn').addEventListener('click', () => {
        closeViewModal();
        openEditModal(editingAsset);
    });

    // Pagination
    document.getElementById('prevBtn').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderInventory();
        }
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
        const totalPages = getTotalPages();
        if (currentPage < totalPages) {
            currentPage++;
            renderInventory();
        }
    });

    // Close modals on overlay click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.add('hidden');
            }
        });
    });
}

// Update Filter Indicator
function updateFilterIndicator() {
    const indicator = document.getElementById('filterIndicator');
    const clearBtn = document.getElementById('clearFiltersBtn');
    const hasFilters = filterCategory !== 'all' || filterStock !== 'all' || filterAssetStatus !== 'all';

    if (hasFilters) {
        indicator.classList.remove('hidden');
        clearBtn.classList.remove('hidden');
    } else {
        indicator.classList.add('hidden');
        clearBtn.classList.add('hidden');
    }
}

// Filter Inventory
function getFilteredInventory() {
    return inventoryData.filter(asset => {
        // Search filter
        const matchesSearch = !searchQuery || 
            asset.assetName.toLowerCase().includes(searchQuery) ||
            asset.sku.toLowerCase().includes(searchQuery) ||
            asset.brand.toLowerCase().includes(searchQuery) ||
            asset.model.toLowerCase().includes(searchQuery) ||
            asset.serialNumber.toLowerCase().includes(searchQuery) ||
            asset.category.toLowerCase().includes(searchQuery) ||
            asset.location.toLowerCase().includes(searchQuery) ||
            asset.locationCode.toLowerCase().includes(searchQuery);

        // Category filter
        const matchesCategory = filterCategory === 'all' || asset.category === filterCategory;

        // Stock filter
        const matchesStock = filterStock === 'all' || asset.stockStatus === filterStock;

        // Asset status filter
        const matchesAssetStatus = filterAssetStatus === 'all' || asset.assetStatus === filterAssetStatus;

        return matchesSearch && matchesCategory && matchesStock && matchesAssetStatus;
    });
}

// Get Total Pages
function getTotalPages() {
    const filtered = getFilteredInventory();
    return Math.max(1, Math.ceil(filtered.length / itemsPerPage));
}

// Render Inventory
function renderInventory() {
    const filtered = getFilteredInventory();
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
    const tbody = document.getElementById('inventoryTableBody');
    
    if (paginated.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8" style="padding: 3rem 1rem; text-align: center;">
                    <div class="empty-state">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.35-4.35"></path>
                        </svg>
                        <p>No assets found.</p>
                    </div>
                </td>
            </tr>
        `;
    } else {
        tbody.innerHTML = paginated.map(asset => `
            <tr>
                <td>
                    <div class="asset-name-cell">
                        <span class="asset-name">${asset.assetName}</span>
                        <div class="asset-location">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            <span>${asset.location} (${asset.locationCode})</span>
                        </div>
                    </div>
                </td>
                <td>
                    <span class="asset-sku">${asset.sku}</span>
                </td>
                <td>
                    <span class="category-badge ${categoryStyles[asset.category] || 'category-extra'}">
                        ${asset.category}
                    </span>
                </td>
                <td>
                    <div class="quantity-cell">
                        <span class="quantity-value">${asset.quantity}</span>
                        <span class="quantity-min">Min: ${asset.minQuantity}</span>
                    </div>
                </td>
                <td>
                    <span class="price-value">₱${asset.price.toLocaleString()}</span>
                </td>
                <td>
                    <span class="stock-status ${getStockStatusClass(asset.stockStatus)}">
                        <span class="stock-status-dot"></span>
                        ${asset.stockStatus}
                    </span>
                </td>
                <td>
                    <span class="asset-status-badge ${getAssetStatusClass(asset.assetStatus)}">
                        ${asset.assetStatus}
                    </span>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn action-btn-view" onclick="viewAsset(${asset.id})" title="View">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        </button>
                        <button class="action-btn action-btn-edit" onclick="openEditModal(${asset.id})" title="Edit">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                        </button>
                        <button class="action-btn action-btn-delete" onclick="openDeleteModal(${asset.id})" title="Delete">
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
    updatePagination(totalPages);
}

// Get Stock Status Class
function getStockStatusClass(status) {
    switch (status) {
        case 'In Stock': return 'in-stock';
        case 'Low Stock': return 'low-stock';
        case 'Out of Stock': return 'out-of-stock';
        default: return '';
    }
}

// Get Asset Status Class
function getAssetStatusClass(status) {
    switch (status) {
        case 'Available': return 'asset-status-available';
        case 'Assigned': return 'asset-status-assigned';
        case 'Under Maintenance': return 'asset-status-maintenance';
        default: return '';
    }
}

// Update Pagination
function updatePagination(totalPages) {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const paginationInfo = document.getElementById('paginationInfo');

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
    paginationInfo.textContent = `Page ${currentPage} of ${totalPages}`;
}

// View Asset
function viewAsset(id) {
    const asset = inventoryData.find(a => a.id === id);
    if (!asset) return;

    editingAsset = asset;

    const viewContent = document.getElementById('viewContent');
    viewContent.innerHTML = `
        <div class="view-grid">
            <div class="view-item">
                <span class="view-label">Asset Name</span>
                <span class="view-value">${asset.assetName}</span>
            </div>
            <div class="view-item">
                <span class="view-label">SKU</span>
                <span class="view-value">${asset.sku}</span>
            </div>
            <div class="view-item">
                <span class="view-label">Category</span>
                <span class="view-value">${asset.category}</span>
            </div>
            <div class="view-item">
                <span class="view-label">Brand</span>
                <span class="view-value">${asset.brand}</span>
            </div>
            <div class="view-item">
                <span class="view-label">Model</span>
                <span class="view-value">${asset.model}</span>
            </div>
            <div class="view-item">
                <span class="view-label">Serial Number</span>
                <span class="view-value">${asset.serialNumber}</span>
            </div>
            <div class="view-item">
                <span class="view-label">Quantity</span>
                <span class="view-value">${asset.quantity}</span>
            </div>
            <div class="view-item">
                <span class="view-label">Min Quantity</span>
                <span class="view-value">${asset.minQuantity}</span>
            </div>
            <div class="view-item">
                <span class="view-label">Price</span>
                <span class="view-value">₱${asset.price.toLocaleString()}</span>
            </div>
            <div class="view-item">
                <span class="view-label">Stock Status</span>
                <span class="view-value">${asset.stockStatus}</span>
            </div>
            <div class="view-item">
                <span class="view-label">Asset Status</span>
                <span class="view-value">${asset.assetStatus}</span>
            </div>
            <div class="view-item">
                <span class="view-label">Condition</span>
                <span class="view-value">${asset.condition}</span>
            </div>
            <div class="view-item">
                <span class="view-label">Purchase Date</span>
                <span class="view-value">${formatDate(asset.purchaseDate)}</span>
            </div>
            <div class="view-item">
                <span class="view-label">Location</span>
                <span class="view-value">${asset.location} (${asset.locationCode})</span>
            </div>
        </div>
    `;

    document.getElementById('viewModal').classList.remove('hidden');
}

// Open Add Modal
function openAddModal() {
    editingAsset = null;
    document.getElementById('modalTitle').textContent = 'Add New Asset';
    document.getElementById('submitBtnText').textContent = 'Add Asset';
    document.getElementById('assetForm').reset();
    document.getElementById('assetModal').classList.remove('hidden');
}

// Open Edit Modal
function openEditModal(id) {
    const asset = inventoryData.find(a => a.id === id);
    if (!asset) return;

    editingAsset = asset;
    document.getElementById('modalTitle').textContent = 'Edit Asset';
    document.getElementById('submitBtnText').textContent = 'Update Asset';

    // Populate form
    document.getElementById('assetType').value = asset.category;
    document.getElementById('brand').value = asset.brand;
    document.getElementById('model').value = asset.model;
    document.getElementById('serialNumber').value = asset.serialNumber;
    document.getElementById('quantity').value = asset.quantity;
    document.getElementById('minQuantity').value = asset.minQuantity;
    document.getElementById('price').value = asset.price;
    document.getElementById('assetStatus').value = asset.assetStatus;
    document.getElementById('condition').value = asset.condition;
    document.getElementById('purchaseDate').value = asset.purchaseDate;
    document.getElementById('location').value = `${asset.location} (${asset.locationCode})`;

    document.getElementById('assetModal').classList.remove('hidden');
}

// Open Delete Modal
function openDeleteModal(id) {
    const asset = inventoryData.find(a => a.id === id);
    if (!asset) return;

    editingAsset = asset;
    document.getElementById('deleteAssetName').textContent = asset.assetName;
    document.getElementById('deleteModal').classList.remove('hidden');

    document.getElementById('confirmDeleteBtn').onclick = () => {
        deleteAsset(id);
    };
}

// Handle Form Submit
function handleFormSubmit(e) {
    e.preventDefault();

    const formData = {
        assetType: document.getElementById('assetType').value,
        brand: document.getElementById('brand').value,
        model: document.getElementById('model').value,
        serialNumber: document.getElementById('serialNumber').value,
        quantity: parseInt(document.getElementById('quantity').value) || 0,
        minQuantity: parseInt(document.getElementById('minQuantity').value) || 0,
        price: parseFloat(document.getElementById('price').value) || 0,
        assetStatus: document.getElementById('assetStatus').value,
        condition: document.getElementById('condition').value,
        purchaseDate: document.getElementById('purchaseDate').value,
        location: document.getElementById('location').value
    };

    // Parse location
    const locationMatch = formData.location.match(/^(.+?)\s*\(([^)]+)\)$/);
    const location = locationMatch ? locationMatch[1] : formData.location;
    const locationCode = locationMatch ? locationMatch[2] : '';

    // Calculate stock status
    let stockStatus = 'In Stock';
    if (formData.quantity === 0) {
        stockStatus = 'Out of Stock';
    } else if (formData.quantity <= formData.minQuantity) {
        stockStatus = 'Low Stock';
    }

    if (editingAsset) {
        // Update existing asset
        const index = inventoryData.findIndex(a => a.id === editingAsset.id);
        if (index !== -1) {
            inventoryData[index] = {
                ...editingAsset,
                assetName: `${formData.brand} ${formData.model}`,
                category: formData.assetType,
                brand: formData.brand,
                model: formData.model,
                serialNumber: formData.serialNumber,
                quantity: formData.quantity,
                minQuantity: formData.minQuantity,
                price: formData.price,
                stockStatus: stockStatus,
                assetStatus: formData.assetStatus,
                condition: formData.condition,
                purchaseDate: formData.purchaseDate,
                location: location,
                locationCode: locationCode
            };
            showToast('Asset updated successfully!', 'success');
        }
    } else {
        // Add new asset
        const newId = Math.max(...inventoryData.map(a => a.id), 0) + 1;
        const sku = generateSKU(formData.assetType, formData.brand, newId);

        inventoryData.push({
            id: newId,
            assetName: `${formData.brand} ${formData.model}`,
            sku: sku,
            category: formData.assetType,
            brand: formData.brand,
            model: formData.model,
            serialNumber: formData.serialNumber,
            quantity: formData.quantity,
            minQuantity: formData.minQuantity,
            price: formData.price,
            stockStatus: stockStatus,
            assetStatus: formData.assetStatus,
            condition: formData.condition,
            purchaseDate: formData.purchaseDate,
            location: location,
            locationCode: locationCode
        });
        showToast('Asset added successfully!', 'success');
    }

    closeAssetModal();
    renderInventory();
}

// Generate SKU
function generateSKU(assetType, brand, id) {
    const typePrefixes = {
        'System Unit': 'SYS',
        'Monitor': 'MON',
        'Keyboard': 'KBD',
        'Mouse': 'MSE',
        'Headset': 'HDS',
        'Webcam': 'WCM',
        'Extra': 'EXT'
    };

    const brandCodes = {
        'Dell': 'DL',
        'HP': 'HP',
        'Logitech': 'LG',
        'Samsung': 'SM',
        'LG': 'LG',
        'Razer': 'RZ',
        'Jabra': 'JB',
        'Microsoft': 'MS',
        'Keychron': 'KC',
        'Apple': 'AP',
        'Acer': 'AC',
        'Asus': 'AS'
    };

    const typeCode = typePrefixes[assetType] || 'AST';
    const brandCode = brandCodes[brand] || brand.slice(0, 2).toUpperCase();
    const num = String(id).padStart(3, '0');

    return `${typeCode}-${brandCode}-${num}`;
}

// Delete Asset
function deleteAsset(id) {
    inventoryData = inventoryData.filter(a => a.id !== id);
    closeDeleteModal();
    renderInventory();
    showToast('Asset deleted successfully!', 'success');
}

// Close Modals
function closeAssetModal() {
    document.getElementById('assetModal').classList.add('hidden');
    editingAsset = null;
}

function closeViewModal() {
    document.getElementById('viewModal').classList.add('hidden');
    editingAsset = null;
}

function closeDeleteModal() {
    document.getElementById('deleteModal').classList.add('hidden');
    editingAsset = null;
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

// Format Date
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

// Logout
function handleLogout() {
    sessionStorage.clear();
    window.location.href = 'login.html';
}
