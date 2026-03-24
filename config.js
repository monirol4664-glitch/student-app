// API Configuration
const API_BASE_URL = 'https://your-worker.your-subdomain.workers.dev'; // Replace with your Worker URL

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