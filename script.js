async function loadProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    
    grid.innerHTML = '<div class="loading">loading products...</div>';
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/products`);
        const products = await response.json();
        
        if (products.length === 0) {
            grid.innerHTML = '<div class="loading">no products available</div>';
            return;
        }
        
        grid.innerHTML = products.map(product => `
            <div class="product-card" data-id="${product.id}">
                <img src="${product.image_url || '/images/placeholder.png'}" 
                     alt="${product.name}" 
                     class="product-image"
                     onerror="this.src='/images/placeholder.png'">
                <div class="product-info">
                    <div class="product-name">${escapeHtml(product.name)}</div>
                    <div class="product-price">৳${product.price} <small>BDT</small></div>
                    <div class="product-details product-size">size: ${product.size}</div>
                    <div class="product-details product-code">code: ${product.code}</div>
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
        
    } catch (error) {
        console.error('Error loading products:', error);
        grid.innerHTML = '<div class="loading">failed to load products. please try again.</div>';
    }
}
// Smooth image loading
function loadImageSmooth(imgElement) {
    if (imgElement.complete) {
        imgElement.classList.add('loaded');
    } else {
        imgElement.addEventListener('load', function() {
            this.classList.add('loaded');
        });
    }
}

// Update loadProducts function to include smooth image loading
async function loadProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    
    grid.innerHTML = '<div class="loading">loading products...</div>';
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/products`);
        const products = await response.json();
        
        if (products.length === 0) {
            grid.innerHTML = '<div class="loading">no products available</div>';
            return;
        }
        
        grid.innerHTML = products.map(product => `
            <div class="product-card" data-id="${product.id}">
                <img src="${product.image_url || '/images/placeholder.png'}" 
                     alt="${product.name}" 
                     class="product-image"
                     loading="lazy"
                     onerror="this.src='/images/placeholder.png'">
                <div class="product-info">
                    <div class="product-name">${escapeHtml(product.name)}</div>
                    <div class="product-price">৳${product.price} <small>BDT</small></div>
                    <div class="product-details product-size">size: ${product.size}</div>
                    <div class="product-details product-code">code: ${product.code}</div>
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
        
        // Apply smooth loading to all images
        document.querySelectorAll('.product-image').forEach(loadImageSmooth);
        
    } catch (error) {
        console.error('Error loading products:', error);
        grid.innerHTML = '<div class="loading">failed to load products. please try again.</div>';
    }
}

function handleAddToCart(productId) {
    const card = document.querySelector(`.product-card[data-id="${productId}"]`);
    if (!card) return;
    
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

document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    
    const cartBtn = document.getElementById('cartIconBtn');
    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            window.location.href = 'cart.html';
        });
    }
});