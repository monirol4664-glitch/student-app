let currentOrder = null;

function getOrderIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

document.addEventListener('DOMContentLoaded', () => {
    const orderId = getOrderIdFromUrl();
    
    if (orderId) {
        loadOrderStatus(orderId);
    } else {
        showSearchForm();
    }
    
    const cartBtn = document.getElementById('cartIconBtn');
    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            window.location.href = 'cart.html';
        });
    }
});

function showSearchForm() {
    const container = document.getElementById('orderStatusContent');
    container.innerHTML = `
        <div class="search-form">
            <h2>Track Your Order</h2>
            <p style="color: #666; margin: 16px 0;">Enter your order ID to check status</p>
            <input type="text" id="orderIdInput" class="order-id-input" placeholder="e.g., 12345" maxlength="10">
            <br>
            <button onclick="searchOrder()" class="primary-btn" style="margin-top: 16px;">Track Order</button>
            <div style="margin-top: 24px;">
                <a href="index.html" class="back-link">← Back to Shop</a>
            </div>
        </div>
    `;
}

async function searchOrder() {
    const orderId = document.getElementById('orderIdInput').value.trim();
    if (!orderId) {
        alert('Please enter an order ID');
        return;
    }
    
    if (!/^\d+$/.test(orderId)) {
        alert('Please enter a valid numeric order ID');
        return;
    }
    
    loadOrderStatus(orderId);
}

async function loadOrderStatus(orderId) {
    const container = document.getElementById('orderStatusContent');
    container.innerHTML = '<div class="loading">Loading order details...</div>';
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}`);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Order not found');
            }
            throw new Error('Failed to load order');
        }
        
        const order = await response.json();
        
        if (isOrderExpired(order)) {
            container.innerHTML = `
                <div class="search-form" style="text-align: center;">
                    <div style="font-size: 48px; margin-bottom: 20px;">⏰</div>
                    <h2>Order Expired</h2>
                    <p style="margin: 20px 0; color: #e74c3c;">
                        This order is no longer available for customer viewing.
                    </p>
                    <p style="margin: 20px 0; color: #666;">
                        Orders are automatically removed from customer view after 12 hours.
                        Please contact support if you need assistance.
                    </p>
                    <div style="margin-top: 24px;">
                        <a href="index.html" class="primary-btn" style="display: inline-block; text-decoration: none; margin: 0 8px; background: #1a1a1a; color: white; padding: 10px 20px; border-radius: 6px;">Continue Shopping</a>
                        <a href="order-status.html" class="back-link" style="display: inline-block; margin: 0 8px;">Track Another</a>
                    </div>
                </div>
            `;
            return;
        }
        
        currentOrder = order;
        displayOrderStatus(order);
        
    } catch (error) {
        console.error('Error loading order:', error);
        container.innerHTML = `
            <div class="search-form">
                <h2>Order Not Found</h2>
                <p style="color: #e74c3c; margin: 16px 0;">${error.message}</p>
                <p style="color: #888; margin: 8px 0;">Orders are only available for 12 hours after creation.</p>
                <a href="order-status.html" class="back-link">← Try Again</a>
                <br><br>
                <a href="index.html" class="back-link">← Back to Shop</a>
            </div>
        `;
    }
}

function isOrderExpired(order) {
    const createdAt = new Date(order.created_at);
    const now = new Date();
    const hoursDiff = (now - createdAt) / (1000 * 60 * 60);
    return hoursDiff >= 12;
}

function getTimeRemaining(order) {
    const createdAt = new Date(order.created_at);
    const now = new Date();
    const hoursRemaining = 12 - ((now - createdAt) / (1000 * 60 * 60));
    return Math.max(0, hoursRemaining);
}

function formatTimeRemaining(hours) {
    if (hours <= 0) return 'Expired';
    const hrs = Math.floor(hours);
    const mins = Math.floor((hours - hrs) * 60);
    if (hrs > 0) {
        return `${hrs} hour${hrs !== 1 ? 's' : ''} ${mins > 0 ? `${mins} min` : ''}`;
    }
    return `${mins} minute${mins !== 1 ? 's' : ''}`;
}

function displayOrderStatus(order) {
    const container = document.getElementById('orderStatusContent');
    const createdAt = new Date(order.created_at).toLocaleString();
    const confirmedAt = order.confirmed_at ? new Date(order.confirmed_at).toLocaleString() : null;
    const hoursRemaining = getTimeRemaining(order);
    const expiryTime = new Date(new Date(order.created_at).getTime() + 12 * 60 * 60 * 1000).toLocaleString();
    
    const steps = [
        { name: 'Order Placed', status: 'completed', date: createdAt },
        { name: order.payment_method === 'cod' ? 'Order Received' : 'Payment Verified', status: order.status === 'pending' ? 'pending' : (order.status !== 'pending' ? 'completed' : 'pending'), date: order.status !== 'pending' ? confirmedAt : null },
        { name: 'Order Confirmed', status: order.status === 'confirmed' ? 'completed' : (order.status === 'cancelled' ? 'cancelled' : 'pending'), date: order.status === 'confirmed' ? confirmedAt : null },
        { name: 'Order Delivered', status: 'pending', date: null }
    ];
    
    if (order.status === 'cancelled') {
        steps[1].status = 'cancelled';
        steps[2].status = 'cancelled';
    }
    
    container.innerHTML = `
        <div id="orderMemoContent">
            <div style="text-align: center; margin-bottom: 30px;">
                <h1>Order Status</h1>
                <div style="margin-top: 12px;">
                    <span class="status-badge status-${order.status}">${order.status.toUpperCase()}</span>
                </div>
            </div>
            
            <div style="background: #fff3e0; padding: 12px; border-radius: 8px; margin-bottom: 20px; text-align: center;">
                <p style="color: #e67e22; font-size: 0.85rem;">
                    ⏰ This order will expire from customer view in <strong>${formatTimeRemaining(hoursRemaining)}</strong>
                </p>
                <p style="color: #888; font-size: 0.7rem; margin-top: 4px;">
                    Expires at: ${expiryTime}
                </p>
            </div>
            
            <div style="background: #f8f9fa; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
                <p><strong>Order ID:</strong> #${order.id} 
                    <button class="copy-btn" onclick="copyOrderId(${order.id})">Copy</button>
                </p>
                <p><strong>Customer Name:</strong> ${escapeHtml(order.customer_name || 'N/A')}</p>
                <p><strong>Order Date:</strong> ${createdAt}</p>
                <p><strong>Payment Method:</strong> ${order.payment_method === 'bkash' ? 'bKash' : 'Cash on Delivery'}</p>
                ${order.payment_method === 'bkash' && order.payment_details ? `
                    <p><strong>Transaction ID:</strong> ${order.payment_details.transaction_id || 'N/A'}</p>
                    <p><strong>Payer Number:</strong> ${order.payment_details.payer_number || 'N/A'}</p>
                ` : ''}
                <p><strong>Total Amount:</strong> ৳${order.total_amount} BDT</p>
            </div>
            
            <div class="status-tracking">
                ${steps.map((step, index) => `
                    <div class="status-step ${step.status === 'completed' ? 'completed' : (step.status === 'pending' ? 'active' : '')}">
                        <div class="status-icon">
                            ${step.status === 'completed' ? '✓' : (step.status === 'pending' ? '⏳' : '✗')}
                        </div>
                        <div class="status-content">
                            <div class="status-title">${step.name}</div>
                            <div class="status-date">${step.date || 'Pending'}</div>
                        </div>
                        ${index < steps.length - 1 ? '<div class="status-line"></div>' : ''}
                    </div>
                `).join('')}
            </div>
            
            <div class="order-memo" id="orderMemoPrint">
                <h3>Order Summary</h3>
                <p><strong>Customer:</strong> ${escapeHtml(order.customer_name || 'N/A')}</p>
                <p><strong>Order ID:</strong> #${order.id}</p>
                <p><strong>Date:</strong> ${createdAt}</p>
                <hr style="margin: 16px 0;">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="border-bottom: 2px solid #eee;">
                            <th style="padding: 10px 0; text-align: left;">Item</th>
                            <th style="padding: 10px 0; text-align: left;">Size</th>
                            <th style="padding: 10px 0; text-align: center;">Qty</th>
                            <th style="padding: 10px 0; text-align: right;">Price</th>
                            <th style="padding: 10px 0; text-align: right;">Subtotal</th>
                         </tr>
                    </thead>
                    <tbody>
                        ${order.items.map(item => `
                            <tr style="border-bottom: 1px solid #f0f0f0;">
                                <td style="padding: 10px 0;">${escapeHtml(item.name)}</td>
                                <td style="padding: 10px 0;">${item.size}</td>
                                <td style="padding: 10px 0; text-align: center;">${item.quantity}</td>
                                <td style="padding: 10px 0; text-align: right;">৳${item.price}</td>
                                <td style="padding: 10px 0; text-align: right;">৳${item.price * item.quantity}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                    <tfoot>
                        <tr style="font-weight: 600; border-top: 2px solid #eee;">
                            <td colspan="4" style="padding: 12px 0; text-align: right;">Total: </td>
                            <td style="padding: 12px 0; text-align: right;">৳${order.total_amount} BDT</td>
                        </tr>
                    </tfoot>
                </table>
                <hr style="margin: 16px 0;">
                <p style="font-size: 0.8rem; color: #666; text-align: center;">
                    Thank you for shopping with ShopHub!
                </p>
            </div>
            
            ${order.status === 'confirmed' ? `
                <div style="text-align: center; margin-top: 20px;">
                    <button onclick="downloadOrderPDF()" class="download-btn">
                        📄 Download Order Memo (PDF)
                    </button>
                </div>
            ` : `
                <div style="text-align: center; margin-top: 20px; padding: 16px; background: #fff3e0; border-radius: 8px;">
                    <p style="color: #e67e22;">⏳ Your order is pending approval. You will receive a confirmation once approved.</p>
                    <p style="font-size: 0.8rem; margin-top: 8px;">Order memo will be available for download after approval.</p>
                </div>
            `}
            
            <div style="text-align: center; margin-top: 30px;">
                <a href="index.html" class="back-link">← Continue Shopping</a>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <a href="order-status.html" class="back-link">Track Another Order</a>
            </div>
        </div>
    `;
}

function copyOrderId(orderId) {
    navigator.clipboard.writeText(orderId.toString());
    showNotification('Order ID copied to clipboard!');
}

async function downloadOrderPDF() {
    if (!currentOrder) return;
    
    const element = document.getElementById('orderMemoPrint');
    if (!element) return;
    
    showLoading();
    
    try {
        const clone = element.cloneNode(true);
        clone.style.padding = '30px';
        clone.style.backgroundColor = 'white';
        clone.style.width = '800px';
        clone.style.margin = '0 auto';
        clone.style.fontFamily = 'sans-serif';
        
        const header = document.createElement('div');
        header.style.textAlign = 'center';
        header.style.marginBottom = '30px';
        header.style.padding = '20px';
        header.style.borderBottom = '2px solid #e67e22';
        header.innerHTML = `
            <h1 style="color: #1a1a1a; margin-bottom: 8px; font-size: 28px;">shop<span style="color: #666;">hub</span></h1>
            <p style="color: #666; margin-bottom: 16px;">Official Order Memo</p>
            <hr style="margin: 16px 0;">
            <div style="display: flex; justify-content: space-between; margin-top: 16px;">
                <div style="text-align: left;">
                    <p><strong>Order ID:</strong> #${currentOrder.id}</p>
                    <p><strong>Customer Name:</strong> ${escapeHtml(currentOrder.customer_name || 'N/A')}</p>
                </div>
                <div style="text-align: right;">
                    <p><strong>Date:</strong> ${new Date(currentOrder.created_at).toLocaleString()}</p>
                    <p><strong>Status:</strong> ${currentOrder.status.toUpperCase()}</p>
                </div>
            </div>
        `;
        
        const footer = document.createElement('div');
        footer.style.textAlign = 'center';
        footer.style.marginTop = '30px';
        footer.style.padding = '20px';
        footer.style.borderTop = '1px solid #eee';
        footer.style.fontSize = '0.8rem';
        footer.style.color = '#888';
        footer.innerHTML = `
            <p>Thank you for shopping with ShopHub, ${escapeHtml(currentOrder.customer_name || 'Valued Customer')}!</p>
            <p>For any queries, contact: support@shophub.com</p>
            <p>This is a computer generated document. No signature required.</p>
        `;
        
        clone.insertBefore(header, clone.firstChild);
        clone.appendChild(footer);
        
        clone.style.position = 'absolute';
        clone.style.left = '-9999px';
        clone.style.top = '0';
        document.body.appendChild(clone);
        
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');
        
        const canvas = await html2canvas(clone, {
            scale: 2,
            backgroundColor: '#ffffff',
            logging: false
        });
        
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 190;
        const pageHeight = 277;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;
        
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        
        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }
        
        pdf.save(`ShopHub_Order_${currentOrder.id}_${currentOrder.customer_name || 'Customer'}.pdf`);
        
        document.body.removeChild(clone);
        
        showNotification('Order memo downloaded successfully!');
        
    } catch (error) {
        console.error('PDF generation error:', error);
        alert('Failed to generate PDF. Please try again.');
    } finally {
        hideLoading();
    }
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
            <p style="color: #666;">generating PDF...</p>
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