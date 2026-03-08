// Skip auth check on login/signup pages
if (window.location.pathname.includes('login') || window.location.pathname.includes('signup')) {
  return;
}

window.addEventListener('load', checkAuth);

async function checkAuth() {
  try {
    const res = await fetch('/api/check-session', { credentials: 'include' });
    if (res.ok) {
      showUserUI();
    } else {
      showLoginPrompt();
    }
  } catch {
    showLoginPrompt();
  }
}

function showLoginPrompt() {
  document.body.innerHTML += `
    <div id="loginPrompt" style="
      position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);
      display:flex;align-items:center;justify-content:center;z-index:9999;color:white;">
      <div style="background:white;color:black;padding:3rem;border-radius:15px;text-align:center;max-width:400px;">
        <h2>🔒 Login Required</h2>
        <a href="login.html" style="background:#3498db;color:white;padding:12px 30px;text-decoration:none;border-radius:8px;">Login</a>
      </div>
    </div>
  `;
}

function showUserUI() {
  const prompt = document.getElementById('loginPrompt');
  if (prompt) prompt.remove();
  const authNav = document.getElementById('authNav');
  if (authNav) authNav.style.display = 'block';
}

function logout() {
  document.cookie = 'session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  window.location.href = 'login.html';
}