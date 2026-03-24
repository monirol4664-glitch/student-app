let currentProductId = null;
let currentOrderId = null;
let productsData = [];
let ordersData = [];

document.addEventListener('DOMContentLoaded', () => {
    if (!requireAdminLogin()) return;
    
    loadProducts();
    loadOrders();
    loadSettings();
    
    setupEventListeners();
    
    document.getElementById('productImage')?.addEventListener('change', previewImage);
});

function previewImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('imagePreview');
            preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
        };
        reader.readAsDataURL(file);
    }
}

function setupEventListeners() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;
            switchTab(tab);
        });
    });
    
    document.getElementById('addProductBtn')?.addEventListener('click', () => openProductModal());
    document.getElementById('productForm')?.addEventListener('submit', saveProduct);
    document.querySelectorAll('.close-btn').forEach(btn => btn.addEventListener('click', closeModals));
    document.getElementById('cancelModalBtn')?.addEventListener('click', closeModals);
    document.getElementById('saveCleanupBtn')?.addEventListener('click', saveCleanupSettings);
    document.getElementById('logoutBtn')?.addEventListener('click', logout);
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => filterOrders(btn.dataset.status));
    });
    document.getElementById('searchProducts')?.addEventListener('input', searchProducts);
    document.getElementById('confirmOrderBtn')?.addEventListener('click', confirmOrder);
    document.getElementById('cancelOrderBtn')?.addEventListener('click', cancelOrder);
    document.getElementById('deleteOrderBtn')?.addEventListener('click', () => {
        if (currentOrderId) {
            deleteOrder(currentOrderId);
            closeModals();
        }
    });
}

function switchTab(tab) {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.tab === tab) btn.classList.add('active');
    });
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    document.getElementById(`${tab}Tab`).classList.add('active');
}

async function loadProducts() {
    const container = document.getElementById('productsList');
    if (!container) return;
    container.innerHTML = '<div class="loading">Loading products...</div>';
    
    try {
        const response = await adminApiCall('/api/products');
        productsData = await response.json();
        displayProducts(productsData);
    } catch (error) {
        container.innerHTML = '<div class="loading">Failed to load products</div>';
    }
}

function displayProducts(products) {
    const container = document.getElementById('productsList');
    if (products.length === 0) {
        container.innerHTML = '<div class="loading">No products found</div>';
        return;
    }
    
    container.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image_url || '/images/placeholder.png'}" class="product-card-image" onerror="this.src='/images/placeholder.png'">
            <div class="product-card-info">
                <div class="product-card-name">${escapeHtml(product.name)}</div>
                <div class="product-card-price">৳${product.price}</div>
                <div class="product-card-details">Size: ${product.size} | Code: ${product.code}</div>
                <div class="product-card-actions">
                    <button class="edit-btn" onclick="editProduct(${product.id})">Edit</button>
                    <button class="delete-btn" onclick="deleteProduct(${product.id})">Delete</button>
                </div>
            </div>
        </div>
    `).join('');
}

function openProductModal(product = null) {
    const modal = document.getElementById('productModal');
    const title = document.getElementById('modalTitle');
    const form = document.getElementById('productForm');
    const preview = document.getElementById('imagePreview');
    
    if (product) {
        currentProductId = product.id;
        title.textContent = 'Edit Product';
        document.getElementById('productName').value = product.name;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productSize').value = product.size;
        document.getElementById('productCode').value = product.code;
        document.getElementById('productDescription').value = product.description || '';
        if (product.image_url) preview.innerHTML = `<img src="${product.image_url}" alt="Current image">`;
    } else {
        currentProductId = null;
        title.textContent = 'Add New Product';
        form.reset();
        preview.innerHTML = '';
    }
    modal.classList.add('active');
}

async function saveProduct(event) {
    event.preventDefault();
    
    const name = document.getElementById('productName').value;
    const price = parseInt(document.getElementById('productPrice').value);
    const size = document.getElementById('productSize').value;
    const code = document.getElementById('productCode').value;
    const description = document.getElementById('productDescription').value;
    let image_url = '';
    
    const imageFile = document.getElementById('productImage').files[0];
    if (imageFile) {
        try {
            image_url = await uploadProductImage(imageFile);
        } catch (error) {
            alert('Image upload failed: ' + error.message);
            return;
        }
    }
    
    const productData = { name, price, size, code, description, image_url };
    
    try {
        let response;
        if (currentProductId) {
            response = await adminApiCall(`/api/products/${currentProductId}`, 'PUT', productData);
        } else {
            response = await adminApiCall('/api/products', 'POST', productData);
        }
        
        if (response.ok) {
            closeModals();
            loadProducts();
            alert(currentProductId ? 'Product updated!' : 'Product added!');
        } else {
            const error = await response.json();
            alert('Error: ' + error.error);
        }
    } catch (error) {
        alert('Failed to save product');
    }
}

async function editProduct(id) {
    const product = productsData.find(p => p.id === id);
    if (product) openProductModal(product);
}

async function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        try {
            const response = await adminApiCall(`/api/products/${id}`, 'DELETE');
            if (response.ok) {
                loadProducts();
                alert('Product deleted');
            } else {
                alert('Failed to delete product');
            }
        } catch (error) {
            alert('Failed to delete product');
        }
    }
}

function searchProducts() {
    const searchTerm = document.getElementById('searchProducts').value.toLowerCase();
    const filtered = productsData.filter(p => p.name.toLowerCase().includes(searchTerm) || p.code.toLowerCase().includes(searchTerm));
    displayProducts(filtered);
}

async function loadOrders() {
    const container = document.getElementById('ordersList');
    if (!container) return;
    container.innerHTML = '<div class="loading">Loading orders...</div>';
    
    try {
        const response = await adminApiCall('/api/orders');
        ordersData = await response.json();
        displayOrders(ordersData);
    } catch (error) {
        container.innerHTML = '<div class="loading">Failed to load orders</div>';
    }
}

function getExpiryStatus(order) {
    const createdAt = new Date(order.created_at);
    const now = new Date();
    const hoursDiff = (now - createdAt) / (1000 * 60 * 60);
    const isExpired = hoursDiff >= 12;
    
    if (isExpired) {
        return `<span style="color: #e67e22; font-size: 0.7rem; margin-left: 8px;">(Expired from customer view)</span>`;
    }
    const remaining = 12 - hoursDiff;
    const hrs = Math.floor(remaining);
    const mins = Math.floor((remaining - hrs) * 60);
    return `<span style="color: #888; font-size: 0.7rem; margin-left: 8px;">(Expires in ${hrs}h ${mins}m)</span>`;
}

function displayOrders(orders) {
    const container = document.getElementById('ordersList');
    if (orders.length === 0) {
        container.innerHTML = '<div class="loading">No orders found</div>';
        return;
    }
    
    container.innerHTML = orders.map(order => `
        <div class="order-card" data-id="${order.id}">
            <div class="order-header">
                <span class="order-id">#${order.id}</span>
                <span class="order-status status-${order.status}">${order.status}</span>
                <button class="delete-order-btn" onclick="event.stopPropagation(); deleteOrder(${order.id})">🗑️</button>
            </div>
            <div class="order-details" onclick="viewOrder(${order.id})">
                <span>👤 ${escapeHtml(order.customer_name || 'N/A')}</span>
                <span>💰 ৳${order.total_amount}</span>
                <span>💳 ${order.payment_method === 'bkash' ? 'bKash' : 'COD'}</span>
                <span>📅 ${new Date(order.created_at).toLocaleString()}</span>
                <span>📦 ${order.items.length} item(s)</span>
                ${getExpiryStatus(order)}
            </div>
        </div>
    `).join('');
}

function filterOrders(status) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.status === status) btn.classList.add('active');
    });
    
    if (status === 'all') {
        displayOrders(ordersData);
    } else {
        const filtered = ordersData.filter(o => o.status === status);
        displayOrders(filtered);
    }
}

async function viewOrder(id) {
    currentOrderId = id;
    const order = ordersData.find(o => o.id === id);
    if (!order) return;
    
    const createdAt = new Date(order.created_at);
    const now = new Date();
    const hoursDiff = (now - createdAt) / (1000 * 60 * 60);
    const isExpired = hoursDiff >= 12;
    const expiryTime = new Date(createdAt.getTime() + 12 * 60 * 60 * 1000).toLocaleString();
    
    const modal = document.getElementById('orderModal');
    const detailsContainer = document.getElementById('orderDetails');
    
    detailsContainer.innerHTML = `
        <div style="padding: 20px 24px;">
            ${isExpired ? `
                <div style="background: #fff3e0; padding: 12px; border-radius: 8px; margin-bottom: 20px;">
                    <p style="color: #e67e22; margin: 0;">⚠️ This order has expired from customer view (created > 12 hours ago)</p>
                    <p style="color: #888; font-size: 0.8rem; margin-top: 4px;">Expired at: ${expiryTime}</p>
                </div>
            ` : `
                <div style="background: #e8f5e9; padding: 12px; border-radius: 8px; margin-bottom: 20px;">
                    <p style="color: #2ecc71; margin: 0;">✓ This order is still visible to customer</p>
                    <p style="color: #888; font-size: 0.8rem; margin-top: 4px;">Expires at: ${expiryTime}</p>
                </div>
            `}
            <p><strong>Order ID:</strong> #${order.id}</p>
            <p><strong>Customer Name:</strong> ${escapeHtml(order.customer_name || 'N/A')}</p>
            <p><strong>Status:</strong> <span class="order-status status-${order.status}">${order.status}</span></p>
            <p><strong>Payment Method:</strong> ${order.payment_method === 'bkash' ? 'bKash' : 'Cash on Delivery'}</p>
            <p><strong>Date:</strong> ${new Date(order.created_at).toLocaleString()}</p>
            ${order.payment_method === 'bkash' && order.payment_details ? `
                <p><strong>Transaction ID:</strong> ${order.payment_details.transaction_id || 'N/A'}</p>
                <p><strong>Payer Number:</strong> ${order.payment_details.payer_number || 'N/A'}</p>
            ` : ''}
            <hr style="margin: 20px 0;">
            <h4>Items:</h4>
            <div class="order-items-list">
                ${order.items.map(item => `
                    <div class="order-item">
                        <span>${escapeHtml(item.name)} (${item.size}) x${item.quantity}</span>
                        <span>৳${item.price * item.quantity}</span>
                    </div>
                `).join('')}
            </div>
            <div class="order-total">
                Total: ৳${order.total_amount} BDT
            </div>
        </div>
    `;
    
    modal.classList.add('active');
}

async function confirmOrder() {
    if (!confirm('Confirm this order?')) return;
    try {
        const response = await adminApiCall(`/api/orders/${currentOrderId}/confirm`, 'PUT');
        if (response.ok) {
            alert('Order confirmed!');
            closeModals();
            loadOrders();
        } else {
            alert('Failed to confirm order');
        }
    } catch (error) {
        alert('Failed to confirm order');
    }
}

async function cancelOrder() {
    if (!confirm('Cancel this order?')) return;
    try {
        const response = await adminApiCall(`/api/orders/${currentOrderId}/cancel`, 'PUT');
        if (response.ok) {
            alert('Order cancelled');
            closeModals();
            loadOrders();
        } else {
            alert('Failed to cancel order');
        }
    } catch (error) {
        alert('Failed to cancel order');
    }
}

async function deleteOrder(orderId) {
    if (!confirm('Are you sure you want to permanently delete this order? This action cannot be undone.')) {
        return;
    }
    
    try {
        const response = await adminApiCall(`/api/orders/${orderId}`, 'DELETE');
        
        if (response.ok) {
            alert('Order deleted successfully');
            loadOrders();
        } else {
            const error = await response.json();
            alert('Failed to delete order: ' + (error.error || 'Unknown error'));
        }
    } catch (error) {
        console.error('Error deleting order:', error);
        alert('Failed to delete order');
    }
}

function loadSettings() {
    const autoDelete = localStorage.getItem('auto_delete_hours') || '24';
    const hoursInput = document.getElementById('autoDeleteHours');
    if (hoursInput) hoursInput.value = autoDelete;
}

function saveCleanupSettings() {
    const hours = document.getElementById('autoDeleteHours').value;
    localStorage.setItem('auto_delete_hours', hours);
    adminApiCall('/api/settings/cleanup', 'POST', { auto_delete_hours: parseInt(hours) }).catch(console.error);
    alert('Cleanup settings saved!');
}

function closeModals() {
    document.querySelectorAll('.modal').forEach(modal => modal.classList.remove('active'));
    currentProductId = null;
    currentOrderId = null;
    const preview = document.getElementById('imagePreview');
    if (preview) preview.innerHTML = '';
}

function logout() {
    if (confirm('Logout from admin panel?')) {
        localStorage.removeItem('admin_logged_in');
        localStorage.removeItem('admin_token');
        window.location.href = 'admin-login.html';
    }
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}