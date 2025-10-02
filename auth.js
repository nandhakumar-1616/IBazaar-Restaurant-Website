const API_BASE = window.location.origin;

async function signup(name, email, password, isAdmin) {
  const res = await fetch(`${API_BASE}/api/auth/signup`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, isAdmin })
  });
  return res.json();
}

async function login(email, password) {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return res.json();
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btn-signup').addEventListener('click', async () => {
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const isAdmin = document.getElementById('signup-admin').checked;
    const data = await signup(name, email, password, isAdmin);
    if (data.token) {
      localStorage.setItem('ibazaar_token', data.token);
      alert('Signed up successfully');
      if (data.user?.isAdmin) window.location.href = '/admin.html';
    } else alert('Signup failed: ' + (data.error || JSON.stringify(data)));
  });

  document.getElementById('btn-login').addEventListener('click', async () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const data = await login(email, password);
    if (data.token) {
      localStorage.setItem('ibazaar_token', data.token);
      alert('Logged in');
      if (data.user?.isAdmin) window.location.href = '/admin.html';
    } else alert('Login failed: ' + (data.error || JSON.stringify(data)));
  });
});
