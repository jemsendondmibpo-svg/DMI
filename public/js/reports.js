// Sample Inventory Data (should match inventory.js data)
const inventoryData = [
    {
        id: 1,
        assetName: 'Dell OptiPlex 7090',
        sku: 'SYS-DL-001',
        category: 'System Unit',
        brand: 'Dell',
        model: 'OptiPlex 7090',
        quantity: 15,
        minQuantity: 5,
        price: 45000,
        stockStatus: 'In Stock',
        assetStatus: 'Available',
        condition: 'New',
        purchaseDate: '2024-01-15'
    },
    {
        id: 2,
        assetName: 'HP EliteDisplay E243',
        sku: 'MON-HP-002',
        category: 'Monitor',
        brand: 'HP',
        model: 'EliteDisplay E243',
        quantity: 3,
        minQuantity: 5,
        price: 18500,
        stockStatus: 'Low Stock',
        assetStatus: 'Available',
        condition: 'Good',
        purchaseDate: '2024-02-10'
    },
    {
        id: 3,
        assetName: 'Logitech MX Keys',
        sku: 'KBD-LG-003',
        category: 'Keyboard',
        brand: 'Logitech',
        model: 'MX Keys',
        quantity: 0,
        minQuantity: 3,
        price: 8500,
        stockStatus: 'Out of Stock',
        assetStatus: 'Available',
        condition: 'New',
        purchaseDate: '2024-01-20'
    },
    {
        id: 7,
        assetName: 'Dell UltraSharp U2720Q',
        sku: 'MON-DL-007',
        category: 'Monitor',
        brand: 'Dell',
        model: 'UltraSharp U2720Q',
        quantity: 12,
        minQuantity: 5,
        price: 35000,
        stockStatus: 'In Stock',
        assetStatus: 'Available',
        condition: 'New',
        purchaseDate: '2024-03-01'
    },
    {
        id: 8,
        assetName: 'HP EliteDesk 800 G6',
        sku: 'SYS-HP-008',
        category: 'System Unit',
        brand: 'HP',
        model: 'EliteDesk 800 G6',
        quantity: 6,
        minQuantity: 5,
        price: 52000,
        stockStatus: 'In Stock',
        assetStatus: 'Under Maintenance',
        condition: 'Fair',
        purchaseDate: '2024-01-10'
    },
    {
        id: 4,
        assetName: 'Logitech MX Master 3',
        sku: 'MSE-LG-004',
        category: 'Mouse',
        brand: 'Logitech',
        model: 'MX Master 3',
        quantity: 8,
        minQuantity: 5,
        price: 5500,
        stockStatus: 'In Stock',
        assetStatus: 'Available',
        condition: 'New',
        purchaseDate: '2024-02-05'
    },
    {
        id: 5,
        assetName: 'Jabra Evolve 75',
        sku: 'HDS-JB-005',
        category: 'Headset',
        brand: 'Jabra',
        model: 'Evolve 75',
        quantity: 2,
        minQuantity: 4,
        price: 15000,
        stockStatus: 'Low Stock',
        assetStatus: 'Assigned',
        condition: 'Good',
        purchaseDate: '2024-01-25'
    },
    {
        id: 6,
        assetName: 'Logitech C920 HD Pro',
        sku: 'WCM-LG-006',
        category: 'Webcam',
        brand: 'Logitech',
        model: 'C920 HD Pro',
        quantity: 10,
        minQuantity: 3,
        price: 4500,
        stockStatus: 'In Stock',
        assetStatus: 'Available',
        condition: 'New',
        purchaseDate: '2024-02-20'
    }
];

// Calculate Statistics
function calculateStats() {
    const totalAssets = inventoryData.reduce((sum, item) => sum + item.quantity, 0);
    const totalInStock = inventoryData.filter(i => i.stockStatus === 'In Stock').reduce((sum, item) => sum + item.quantity, 0);
    const totalLowStock = inventoryData.filter(i => i.stockStatus === 'Low Stock').reduce((sum, item) => sum + item.quantity, 0);
    const totalOutOfStock = inventoryData.filter(i => i.stockStatus === 'Out of Stock').reduce((sum, item) => sum + item.quantity, 0);
    const totalUnderMaintenance = inventoryData.filter(i => i.assetStatus === 'Under Maintenance').length;
    const inStockPercentage = totalAssets > 0 ? Math.round((totalInStock / totalAssets) * 100) : 0;

    // Update summary cards
    document.getElementById('totalAssets').textContent = totalAssets;
    document.getElementById('totalAssetsTrend').textContent = `${inventoryData.length} unique items`;
    
    document.getElementById('inStock').textContent = totalInStock;
    document.getElementById('inStockTrend').textContent = `${inStockPercentage}% of total`;
    
    document.getElementById('lowStock').textContent = totalLowStock + totalOutOfStock;
    document.getElementById('lowStockTrend').textContent = `${totalOutOfStock} out of stock`;
    
    document.getElementById('underMaintenance').textContent = totalUnderMaintenance;
    document.getElementById('maintenanceTrend').textContent = 'Active maintenance';
}

// Stock Distribution by Category
function getStockDistributionData() {
    const categories = ['System Unit', 'Monitor', 'Keyboard', 'Mouse', 'Headset', 'Webcam'];
    const data = categories.map(cat => {
        const items = inventoryData.filter(i => i.category === cat);
        return {
            category: cat,
            inStock: items.filter(i => i.stockStatus === 'In Stock').reduce((s, i) => s + i.quantity, 0),
            lowStock: items.filter(i => i.stockStatus === 'Low Stock').reduce((s, i) => s + i.quantity, 0),
            outOfStock: items.filter(i => i.stockStatus === 'Out of Stock').reduce((s, i) => s + i.quantity, 0)
        };
    }).filter(cat => cat.inStock + cat.lowStock + cat.outOfStock > 0);

    return data;
}

// Monthly Acquisition Trend
function getMonthlyTrendData() {
    return [
        { month: 'Oct', acquired: 8, retired: 2 },
        { month: 'Nov', acquired: 5, retired: 1 },
        { month: 'Dec', acquired: 12, retired: 0 },
        { month: 'Jan', acquired: 18, retired: 3 },
        { month: 'Feb', acquired: 10, retired: 1 },
        { month: 'Mar', acquired: 7, retired: 0 }
    ];
}

// Condition Distribution
function getConditionData() {
    const conditions = {};
    inventoryData.forEach(item => {
        const cond = item.condition || 'Good';
        conditions[cond] = (conditions[cond] || 0) + item.quantity;
    });

    const colorMap = {
        'Excellent': '#B0BF00',
        'New': '#B0BF00',
        'Good': '#1a1d27',
        'Fair': '#94a3b8',
        'Poor': '#ef4444'
    };

    return Object.entries(conditions).map(([name, value]) => ({
        name,
        value,
        color: colorMap[name] || '#94a3b8'
    }));
}

// Inventory Value by Category
function getValueByCategory() {
    const categories = ['System Unit', 'Monitor', 'Keyboard', 'Mouse', 'Headset', 'Webcam'];
    const data = categories.map(cat => {
        const items = inventoryData.filter(i => i.category === cat);
        const value = items.reduce((s, i) => s + (i.price * i.quantity), 0);
        return { category: cat, value };
    }).filter(cat => cat.value > 0);

    const total = data.reduce((s, c) => s + c.value, 0);
    document.getElementById('totalValue').textContent = `₱${total.toLocaleString()}`;

    return data;
}

// Top Assets by Value
function getTopAssets() {
    return inventoryData
        .map(item => ({
            name: item.assetName,
            sku: item.sku,
            category: item.category,
            qty: item.quantity,
            price: item.price,
            totalValue: item.price * item.quantity,
            stockStatus: item.stockStatus
        }))
        .sort((a, b) => b.totalValue - a.totalValue)
        .slice(0, 10);
}

// Render Top Assets Table
function renderTopAssetsTable() {
    const topAssets = getTopAssets();
    const tbody = document.getElementById('topAssetsTableBody');

    tbody.innerHTML = topAssets.map((asset, index) => {
        const rankClass = index === 0 ? 'top-1' : index === 1 ? 'top-2' : index === 2 ? 'top-3' : '';
        const categoryClass = `category-${asset.category.toLowerCase().replace(' ', '-')}`;
        const statusClass = asset.stockStatus === 'In Stock' ? 'status-in-stock' :
                           asset.stockStatus === 'Low Stock' ? 'status-low-stock' : 'status-out-of-stock';

        return `
            <tr>
                <td><span class="rank-badge ${rankClass}">${index + 1}</span></td>
                <td><span class="asset-name-cell">${asset.name}</span></td>
                <td><span class="sku-cell">${asset.sku}</span></td>
                <td><span class="category-cell ${categoryClass}">${asset.category}</span></td>
                <td>${asset.qty}</td>
                <td><span class="price-cell">₱${asset.price.toLocaleString()}</span></td>
                <td><span class="value-cell">₱${asset.totalValue.toLocaleString()}</span></td>
                <td><span class="status-badge ${statusClass}">${asset.stockStatus}</span></td>
            </tr>
        `;
    }).join('');
}

// Chart.js Configuration
const chartColors = {
    primary: '#B0BF00',
    secondary: '#1a1d27',
    tertiary: '#94a3b8',
    success: '#22c55e',
    danger: '#ef4444',
    warning: '#f59e0b'
};

// Create Stock Distribution Chart
function createStockDistributionChart() {
    const data = getStockDistributionData();
    const ctx = document.getElementById('stockDistributionChart').getContext('2d');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.map(d => d.category),
            datasets: [
                {
                    label: 'In Stock',
                    data: data.map(d => d.inStock),
                    backgroundColor: chartColors.success,
                    borderRadius: 4
                },
                {
                    label: 'Low Stock',
                    data: data.map(d => d.lowStock),
                    backgroundColor: chartColors.warning,
                    borderRadius: 4
                },
                {
                    label: 'Out of Stock',
                    data: data.map(d => d.outOfStock),
                    backgroundColor: chartColors.danger,
                    borderRadius: 4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: { size: 11 }
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    grid: { display: false },
                    ticks: { font: { size: 10 } }
                },
                y: {
                    stacked: true,
                    beginAtZero: true,
                    grid: { color: 'rgba(0,0,0,0.05)' },
                    ticks: { font: { size: 10 } }
                }
            }
        }
    });
}

// Create Monthly Trend Chart
function createMonthlyTrendChart() {
    const data = getMonthlyTrendData();
    const ctx = document.getElementById('monthlyTrendChart').getContext('2d');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(d => d.month),
            datasets: [
                {
                    label: 'Acquired',
                    data: data.map(d => d.acquired),
                    borderColor: chartColors.primary,
                    backgroundColor: chartColors.primary + '20',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointHoverRadius: 6
                },
                {
                    label: 'Retired',
                    data: data.map(d => d.retired),
                    borderColor: chartColors.danger,
                    backgroundColor: chartColors.danger + '20',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: { size: 11 }
                    }
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { font: { size: 10 } }
                },
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(0,0,0,0.05)' },
                    ticks: { font: { size: 10 } }
                }
            }
        }
    });
}

// Create Condition Chart
function createConditionChart() {
    const data = getConditionData();
    const ctx = document.getElementById('conditionChart').getContext('2d');

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: data.map(d => d.name),
            datasets: [{
                data: data.map(d => d.value),
                backgroundColor: data.map(d => d.color),
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: { size: 11 }
                    }
                }
            }
        }
    });
}

// Create Value Chart
function createValueChart() {
    const data = getValueByCategory();
    const ctx = document.getElementById('valueChart').getContext('2d');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.map(d => d.category),
            datasets: [{
                label: 'Total Value (₱)',
                data: data.map(d => d.value),
                backgroundColor: chartColors.primary,
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { font: { size: 10 } }
                },
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(0,0,0,0.05)' },
                    ticks: {
                        font: { size: 10 },
                        callback: function(value) {
                            return '₱' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

// Export PDF
function exportPDF() {
    // Add timestamp to stats-grid for print
    const statsGrid = document.querySelector('.stats-grid');
    if (statsGrid) {
        const currentDate = new Date().toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        statsGrid.setAttribute('data-generated-date', currentDate);
    }
    
    showToast('Preparing PDF report...', 'success');
    setTimeout(() => {
        window.print();
    }, 500);
}

// Export CSV
function exportCSV() {
    const csvRows = [];
    
    // Header
    csvRows.push('DIGITAL MINDS BPO SERVICES INC.');
    csvRows.push('INVENTORY MANAGEMENT SYSTEM - COMPREHENSIVE REPORT');
    csvRows.push(`Report Generated: ${new Date().toLocaleString()}`);
    csvRows.push('');
    
    // Summary
    csvRows.push('EXECUTIVE SUMMARY');
    csvRows.push('Metric,Value');
    csvRows.push(`Total Assets,${inventoryData.reduce((s, i) => s + i.quantity, 0)}`);
    csvRows.push(`In Stock,${inventoryData.filter(i => i.stockStatus === 'In Stock').reduce((s, i) => s + i.quantity, 0)}`);
    csvRows.push(`Low Stock,${inventoryData.filter(i => i.stockStatus === 'Low Stock').reduce((s, i) => s + i.quantity, 0)}`);
    csvRows.push(`Out of Stock,${inventoryData.filter(i => i.stockStatus === 'Out of Stock').reduce((s, i) => s + i.quantity, 0)}`);
    csvRows.push('');
    
    // Detailed Inventory
    csvRows.push('DETAILED INVENTORY');
    csvRows.push('Asset Name,SKU,Category,Brand,Model,Quantity,Unit Price,Total Value,Status,Condition');
    
    inventoryData.forEach(item => {
        csvRows.push(
            `"${item.assetName}","${item.sku}","${item.category}","${item.brand}","${item.model}",${item.quantity},"₱${item.price.toLocaleString()}","₱${(item.price * item.quantity).toLocaleString()}","${item.stockStatus}","${item.condition}"`
        );
    });
    
    csvRows.push('');
    csvRows.push(`Digital Minds BPO Services Inc. © ${new Date().getFullYear()}`);
    
    // Download
    const csvContent = csvRows.join('\n');
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `DigitalMinds_Inventory_Report_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showToast('CSV report downloaded successfully!', 'success');
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

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    calculateStats();
    renderTopAssetsTable();
    createStockDistributionChart();
    createMonthlyTrendChart();
    createConditionChart();
    createValueChart();
});

// Logout
function handleLogout() {
    sessionStorage.clear();
    window.location.href = 'login.html';
}