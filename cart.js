function loadCartPage() {
    const container = document.getElementById('cartContent');
    if (!container) return;
    
    const cart = cartItems;
    const total = getCartTotal();
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="cart-empty">
                <h1>your cart</h1>
                <p>your cart is empty</p>
                <a href="index.html" class="back-link">continue shopping</a>
            </div>
        `;
        return;
    }
    
    container.innerHTML = `
        <div class="cart-header">
            <h1>your cart</h1>
            <p>${cart.length} item${cart.length !== 1 ? 's' : ''}</p>
        </div>
        
        <div class="cart-items">
            ${cart.map(item => `
                <div class="cart-item" data-id="${item.id}">
                    <img src="${item.image_url || '/images/placeholder.png'}" 
                         alt="${item.name}" 
                         class="cart-item-image"
                         onerror="this.src='/images/placeholder.png'">
                    <div class="cart-item-details">
                        <div class="cart-item-name">${escapeHtml(item.name)}</div>
                        <div class="cart-item-meta">size: ${item.size} | code: ${item.code}</div>
                    </div>
                    <div class="cart-item-price">৳${item.price}</div>
                    <div class="cart-item-quantity">x${item.quantity}</div>
                    <div class="cart-item-subtotal">৳${item.price * item.quantity}</div>
                    <button class="remove-item" onclick="handleRemoveFromCart(${item.id})">✕</button>
                </div>
            `).join('')}
        </div>
        
        <div class="cart-total">
            <span>total: <span class="total-amount">৳${total} BDT</span></span>
        </div>
        
        <div class="payment-section">
            <h3>customer information</h3>
            <div class="form-group" style="margin-bottom: 24px;">
                <label>Full Name *</label>
                <input type="text" id="customerName" placeholder="Enter your full name" required>
                <small>Name will appear on your order memo</small>
            </div>
            
            <h3>payment method</h3>
            
            <div class="payment-option">
                <h4>option 1: bKash</h4>
                <div class="bkash-details">
                    <p>please pay <strong class="bkash-number">৳${total} BDT</strong> to this number:</p>
                    <p class="bkash-number">017XXXXXXXX (bKash)</p>
                    <small>* send exact amount and provide transaction details below</small>
                </div>
                <div class="form-group">
                    <label>transaction ID</label>
                    <input type="text" id="transactionId" placeholder="e.g., 8X7K9L2M4N">
                </div>
                <div class="form-group">
                    <label>payer bKash number</label>
                    <input type="tel" id="payerNumber" placeholder="01XXXXXXXXX">
                </div>
                <button class="confirm-btn" onclick="submitOrder('bkash')">confirm order (bKash)</button>
            </div>
            
            <div class="payment-option">
                <h4>option 2: Cash on Delivery</h4>
                <p>pay when you receive your order</p>
                <button class="confirm-btn cod-btn" onclick="submitOrder('cod')">confirm order (COD)</button>
            </div>
        </div>
        
        <div style="text-align: center; margin-top: 32px;">
            <a href="index.html" class="back-link">← continue shopping</a>
        </div>
    `;
}

function handleRemoveFromCart(productId) {
    removeFromCart(productId);
    loadCartPage();
    updateCartCount();
}

async function submitOrder(paymentMethod) {
    const cart = cartItems;
    const total = getCartTotal();
    
    if (cart.length === 0) {
        alert('Your cart is empty');
        return;
    }
    
    const customerName = document.getElementById('customerName')?.value.trim();
    if (!customerName) {
        alert('Please enter your full name');
        document.getElementById('customerName')?.focus();
        return;
    }
    
    if (customerName.length < 3) {
        alert('Please enter a valid name (at least 3 characters)');
        return;
    }
    
    let paymentDetails = {};
    
    if (paymentMethod === 'bkash') {
        const transactionId = document.getElementById('transactionId')?.value.trim();
        const payerNumber = document.getElementById('payerNumber')?.value.trim();
        
        if (!transactionId || !payerNumber) {
            alert('Please provide both Transaction ID and Payer bKash Number');
            return;
        }
        
        if (!/^\d{10,11}$/.test(payerNumber)) {
            alert('Please enter a valid bKash number (10-11 digits)');
            return;
        }
        
        paymentDetails = {
            transaction_id: transactionId,
            payer_number: payerNumber
        };
    }
    
    const orderData = {
        customer_name: customerName,
        items: cart,
        total_amount: total,
        payment_method: paymentMethod,
        payment_details: paymentDetails,
        status: 'pending',
        created_at: new Date().toISOString()
    };
    
    showLoading();
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            clearCart();
            showOrderPendingMessage(paymentMethod, total, result.order_id, customerName);
        } else {
            throw new Error(result.error || 'Order submission failed');
        }
        
    } catch (error) {
        console.error('Order submission error:', error);
        alert(`Failed to submit order: ${error.message}\n\nPlease try again.`);
        hideLoading();
    }
}

function showOrderPendingMessage(paymentMethod, total, orderId, customerName) {
    const container = document.getElementById('cartContent');
    if (!container) return;
    
    const message = `
        <div class="cart-empty" style="text-align: center; padding: 60px 20px;">
            <div style="font-size: 48px; margin-bottom: 20px;">⏳</div>
            <h2>thank you, ${escapeHtml(customerName)}!</h2>
            <p style="margin: 20px 0; color: #666;">
                ${paymentMethod === 'bkash' ? 
                    `Your bKash payment of ৳${total} is pending verification.` : 
                    `Your COD order of ৳${total} is pending.`}
            </p>
            <p style="margin: 20px 0; color: #e67e22; font-weight: 500;">
                ⚠️ please wait until admin approves your order
            </p>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 12px; margin: 20px 0;">
                <p><strong>Order ID: #${orderId}</strong></p>
                <p><strong>Name: ${escapeHtml(customerName)}</strong></p>
                <button onclick="copyOrderId(${orderId})" style="background: none; border: 1px solid #ddd; padding: 4px 12px; border-radius: 4px; cursor: pointer; margin-top: 8px;">Copy Order ID</button>
            </div>
            <p style="margin: 20px 0;">
                <a href="order-status.html?id=${orderId}" class="primary-btn" style="display: inline-block; text-decoration: none; margin: 0 8px; background: #1a1a1a; color: white; padding: 10px 20px; border-radius: 6px;">Track Your Order</a>
                <a href="index.html" class="back-link" style="display: inline-block; margin: 0 8px;">Continue Shopping</a>
            </p>
            <p style="margin: 20px 0; color: #888; font-size: 0.9rem;">
                ${paymentMethod === 'bkash' ? 
                    'admin will verify your payment. if payment is not confirmed, your order will be automatically cancelled.' : 
                    'admin will confirm your COD order. pending orders expire automatically.'}
            </p>
        </div>
    `;
    
    container.innerHTML = message;
}

function copyOrderId(orderId) {
    navigator.clipboard.writeText(orderId.toString());
    showNotification('Order ID copied to clipboard!');
}

function showLoading() {
    let overlay = document.getElementById('loadingOverlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'loadingOverlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255,255,255,0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
            flex-direction: column;
            gap: 16px;
        `;
        overlay.innerHTML = `
            <div style="width: 40px; height: 40px; border: 3px solid #f0f0f0; border-top-color: #1a1a1a; border-radius: 50%; animation: spin 0.8s linear infinite;"></div>
            <p style="color: #666;">processing order...</p>
        `;
        document.body.appendChild(overlay);
    }
    overlay.style.display = 'flex';
}

function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
}

function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

document.addEventListener('DOMContentLoaded', () => {
    loadCartPage();
    
    const cartBtn = document.getElementById('cartIconBtn');
    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            window.location.href = 'cart.html';
        });
    }
});