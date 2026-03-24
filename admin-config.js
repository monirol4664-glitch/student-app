const ADMIN_API_BASE = 'https://your-worker.your-subdomain.workers.dev';
const ADMIN_SECRET = localStorage.getItem('admin_token') || '';

function isAdminLoggedIn() {
    return localStorage.getItem('admin_logged_in') === 'true';
}

function requireAdminLogin() {
    if (!isAdminLoggedIn()) {
        window.location.href = 'admin-login.html';
        return false;
    }
    return true;
}

function getAuthHeaders() {
    return {
        'Authorization': `Bearer ${ADMIN_SECRET}`
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
        throw new Error('Image upload failed');
    }
}