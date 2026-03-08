// Enhanced auth.js with faculty page support
let isAuthenticated = false;

window.addEventListener('load', checkAuth);

async function checkAuth() {
    try {
        const res = await fetch('/api/check-session', { 
            credentials: 'include',
            method: 'GET'
        });
        
        if (res.ok) {
            isAuthenticated = true;
            showUserUI();
            if (typeof window.authSuccessCallback === 'function') {
                window.authSuccessCallback(); // Faculty page specific
            }
            return true;
        } else {
            showLoginPrompt();
            return false;
        }
    } catch (e) {
        console.log('Auth check failed:', e);
        showLoginPrompt();
        return false;
    }
}

function showLoginPrompt() {
    // Don't show overlay on login/signup pages
    if (window.location.pathname.includes('login') || window.location.pathname.includes('signup')) {
        return;
    }
    
    document.body.innerHTML += `
        <div id="loginPrompt" style="
            position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);
            display:flex;align-items:center;justify-content:center;z-index:9999;color:white;font-family:Segoe UI;">
            <div style="background:white;color:black;padding:3rem;border-radius:15px;text-align:center;max-width:400px;">
                <h2>🔒 Login Required</h2>
                <p>Faculty profiles are protected for students only.</p>
                <a href="login.html" style="
                    background:#3498db;color:white;padding:12px 30px;text-decoration:none;
                    border-radius:8px;font-size:1.1rem;display:inline-block;margin:1rem 0;">
                    Login Now
                </a>
                <p style="margin-top:1rem;font-size:0.9rem;color:#666;">
                    Don't have account? <a href="signup.html" style="color:#3498db;">Sign Up</a>
                </p>
            </div>
        </div>
    `;
}

function showUserUI() {
    const prompt = document.getElementById('loginPrompt');
    if (prompt) prompt.remove();
    
    // Show logout in navbar
    const authNav = document.getElementById('authNav');
    if (authNav) authNav.style.display = 'block';
}

function logout() {
    document.cookie = 'session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.href = 'login.html';
}