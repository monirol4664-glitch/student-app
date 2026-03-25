async function loadProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    
    grid.innerHTML = '<div class="loading">loading products...</div>';
    
    try {
        console.log('=== LOADING PRODUCTS ===');
        console.log('API URL:', API_BASE_URL);
        console.log('Full URL:', `${API_BASE_URL}/api/products`);
        
        const response = await fetch(`${API_BASE_URL}/api/products`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const products = await response.json();
        
        console.log('Products received:', products);
        console.log('Number of products:', products ? products.length : 0);
        
        if (!products || products.length === 0) {
            grid.innerHTML = `
                <div class="empty-products">
                    <p>📦 no products available</p>
                    <small>admin please add products from admin panel</small>
                    <button onclick="loadProducts()" class="retry-btn">🔄 Refresh</button>
                </div>
            `;
            return;
        }
        
        // Display products
        grid.innerHTML = products.map(product => `
            <div class="product-card" data-id="${product.id}">
                <img src="${product.image_url || '/images/placeholder.png'}" 
                     alt="${escapeHtml(product.name)}" 
                     class="product-image"
                     loading="lazy"
                     onerror="this.src='/images/placeholder.png'">
                <div class="product-info">
                    <div class="product-name">${escapeHtml(product.name)}</div>
                    <div class="product-price">৳${product.price} <small>BDT</small></div>
                    <div class="product-details product-size">size: ${escapeHtml(product.size)}</div>
                    <div class="product-details product-code">code: ${escapeHtml(product.code)}</div>
                    <div class="quantity-wrapper">
                        <label>qty:</label>
                        <input type="number" min="1" value="1" class="quantity-input" id="qty-${product.id}">
                    </div>
                    <button class="add-to-cart" onclick="handleAddToCart(${product.id})">
                        add to cart
                    </button>
                </div>
            </div>
        `).join('');
        
        console.log('Products displayed successfully');
        
    } catch (error) {
        console.error('Error loading products:', error);
        grid.innerHTML = `
            <div class="error-products">
                <p>⚠️ failed to load products</p>
                <small>${error.message}</small>
                <button onclick="loadProducts()" class="retry-btn">🔄 Retry</button>
            </div>
        `;
    }
}

function handleAddToCart(productId) {
    const card = document.querySelector(`.product-card[data-id="${productId}"]`);
    if (!card) {
        console.error('Product card not found for ID:', productId);
        return;
    }
    
    const name = card.querySelector('.product-name').textContent;
    const priceText = card.querySelector('.product-price').textContent;
    const price = parseInt(priceText.replace('৳', '').replace('BDT', '').trim());
    const size = card.querySelector('.product-size').textContent.replace('size: ', '');
    const code = card.querySelector('.product-code').textContent.replace('code: ', '');
    const image = card.querySelector('.product-image').src;
    const quantity = parseInt(document.getElementById(`qty-${productId}`).value);
    
    const product = {
        id: productId,
        name: name,
        price: price,
        size: size,
        code: code,
        image_url: image
    };
    
    console.log('Adding to cart:', product);
    addToCart(product, quantity);
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

// Run test on page load
document.addEventListener('DOMContentLoaded', async () => {
    console.log('=== PAGE LOADED ===');
    console.log('API_BASE_URL:', API_BASE_URL);
    
    // Test API connection first
    if (typeof testAPI === 'function') {
        const testResult = await testAPI();
        console.log('API Test Result:', testResult);
    }
    
    // Load products
    await loadProducts();
    
    const cartBtn = document.getElementById('cartIconBtn');
    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            window.location.href = 'cart.html';
        });
    }
});