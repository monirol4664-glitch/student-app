const ADMIN_API_BASE = 'https://quiet-rice-d552.monirol4664.workers.dev'; // Replace with your Worker URL

function isAdminLoggedIn() {
    return localStorage.getItem('admin_logged_in') === 'true';
}

// TEST FUNCTION - Add this to debug
async function testAPI() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/products`);
        const data = await response.json();
        console.log('API Test - Products:', data);
        return data;
    } catch (error) {
        console.error('API Test - Error:', error);
        return null;
    }
}

// Cart Storage (Session-only - clears on page refresh)
let cartItems = [];

function saveCart() {
    sessionStorage.setItem('cart', JSON.stringify(cartItems));
    updateCartCount();
}

function loadCartFromStorage() {
    const stored = sessionStorage.getItem('cart');
    if (stored) {
        cartItems = JSON.parse(stored);
    } else {
        cartItems = [];
    }
    updateCartCount();
}

function updateCartCount() {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const countElements = document.querySelectorAll('#cartCount');
    countElements.forEach(el => {
        if (el) el.textContent = totalItems;
    });
}

function addToCart(product, quantity) {
    const existingIndex = cartItems.findIndex(item => item.id === product.id);
    
    if (existingIndex !== -1) {
        cartItems[existingIndex].quantity += quantity;
    } else {
        cartItems.push({
            id: product.id,
            name: product.name,
            price: product.price,
            size: product.size,
            code: product.code,
            image_url: product.image_url,
            quantity: quantity
        });
    }
    
    saveCart();
    showNotification(`${product.name} added to cart`);
}

function removeFromCart(productId) {
    cartItems = cartItems.filter(item => item.id !== productId);
    saveCart();
}

function clearCart() {
    cartItems = [];
    saveCart();
}

function getCartTotal() {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #1a1a1a;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 0.9rem;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

loadCartFromStorage();

function requireAdminLogin() {
    if (!isAdminLoggedIn()) {
        window.location.href = 'admin-login.html';
        return false;
    }
    return true;
}

function getAuthHeaders() {
    const token = localStorage.getItem('admin_token');
    return {
        'Authorization': `Bearer ${token}`
    };
}

async function adminApiCall(endpoint, method = 'GET', body = null, isFormData = false) {
    const headers = getAuthHeaders();
    
    if (!isFormData) {
        headers['Content-Type'] = 'application/json';
    }
    
    const options = {
        method,
        headers
    };
    
    if (body) {
        options.body = isFormData ? body : JSON.stringify(body);
    }
    
    const response = await fetch(`${ADMIN_API_BASE}${endpoint}`, options);
    
    if (response.status === 401) {
        localStorage.removeItem('admin_logged_in');
        localStorage.removeItem('admin_token');
        window.location.href = 'admin-login.html';
        throw new Error('Session expired');
    }
    
    return response;
}

async function uploadProductImage(file) {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await adminApiCall('/api/upload', 'POST', formData, true);
    
    if (response.ok) {
        const data = await response.json();
        return data.image_url;
    } else {
        const error = await response.json();
        throw new Error(error.error || 'Image upload failed');
    }
}