const API_BASE = window.location.origin;

function getToken() {
  return localStorage.getItem('ibazaar_token');
}

async function fetchOrders() {
  const token = getToken();
  if (!token) { window.location.href = '/auth.html'; return []; }
  const res = await fetch(`${API_BASE}/api/orders`, { headers: { Authorization: `Bearer ${token}` } });
  if (res.status === 401 || res.status === 403) { window.location.href = '/auth.html'; return []; }
  return res.json();
}

function renderOrders(orders) {
  const root = document.getElementById('orders');
  root.innerHTML = '';
  orders.forEach(o => {
    const card = document.createElement('div');
    card.className = 'order-card';
    card.innerHTML = `
      <h4>Order ${o._id}</h4>
      <div>Customer: ${o.customerName || 'N/A'} - ${o.phone || ''}</div>
      <div>Pickup: ${o.pickupTime || 'ASAP'}</div>
      <div>Status: <span class="status">${o.status}</span></div>
      <div>Can Deliver: <input type="checkbox" data-id="${o._id}" class="deliver" ${o.canDeliver ? 'checked' : ''} /></div>
      <div>Items: ${o.items.map(i=> `${i.name} x${i.quantity}`).join(', ')}</div>
      <div>Total: ₹${o.total}</div>
      <button data-id="${o._id}" class="mark-ready">Mark Ready</button>
    `;
    root.appendChild(card);
  });

  const token = getToken();
  document.querySelectorAll('.deliver').forEach(cb => {
    cb.addEventListener('change', async (e) => {
      const id = e.target.dataset.id;
      const canDeliver = e.target.checked;
      await fetch(`${API_BASE}/api/orders/${id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ canDeliver })
      });
      load();
    });
  });

  document.querySelectorAll('.mark-ready').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const id = e.target.dataset.id;
      await fetch(`${API_BASE}/api/orders/${id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: 'ready' })
      });
      load();
    });
  });
}

async function load() {
  const orders = await fetchOrders();
  renderOrders(orders);
}

document.addEventListener('DOMContentLoaded', () => {
  load();
  setInterval(load, 10000); // refresh every 10s
});
