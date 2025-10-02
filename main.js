const API_BASE = window.location.origin;

async function fetchMenu() {
  const res = await fetch(`${API_BASE}/api/foods`);
  return res.json();
}

function renderMenu(items) {
  const menu = document.getElementById('menu');
  menu.innerHTML = '';
  items.forEach(item => {
    const el = document.createElement('div');
    el.className = 'menu-item';
    el.innerHTML = `
      <img src="${item.image}" alt="${item.name}" style="width:100%;height:120px;object-fit:cover;border-radius:6px;margin-bottom:8px" />
      <h4>${item.name} - ₹${item.price}</h4>
      <p>${item.description}</p>
      <button data-id="${item._id}" data-price="${item.price}" data-name="${item.name}">Add</button>
    `;
    menu.appendChild(el);
  });
}

function loadCart() {
  return JSON.parse(localStorage.getItem('cart') || '[]');
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

function addToCart(item) {
  const cart = loadCart();
  const existing = cart.find(i => i.foodId === item.foodId);
  if (existing) existing.quantity += 1;
  else cart.push({...item, quantity:1});
  saveCart(cart);
}

function removeFromCart(foodId) {
  let cart = loadCart();
  cart = cart.filter(i => i.foodId !== foodId);
  saveCart(cart);
}

function updateQuantity(foodId, qty) {
  const cart = loadCart();
  const it = cart.find(i => i.foodId === foodId);
  if (!it) return;
  it.quantity = qty;
  if (it.quantity <= 0) removeFromCart(foodId);
  else saveCart(cart);
}

function renderCart() {
  const container = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');
  const cart = loadCart();
  container.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
    const row = document.createElement('div');
    row.className = 'cart-row';
    row.innerHTML = `
      <div>${item.name} x <input type="number" min="1" value="${item.quantity}" data-id="${item.foodId}" class="qty" style="width:50px" /></div>
      <div>₹${item.price * item.quantity}</div>
      <button data-remove="${item.foodId}">Remove</button>
    `;
    container.appendChild(row);
  });
  totalEl.textContent = `Total: ₹${total}`;

  // attach events
  container.querySelectorAll('.qty').forEach(input => {
    input.addEventListener('change', (e) => {
      const id = e.target.dataset.id;
      const val = parseInt(e.target.value, 10) || 1;
      updateQuantity(id, val);
    });
  });
  container.querySelectorAll('[data-remove]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      removeFromCart(e.target.dataset.remove);
    });
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  const menuItems = await fetchMenu();
  renderMenu(menuItems);
  renderCart();

  // show login link
  const header = document.querySelector('header');
  const authLink = document.createElement('a');
  authLink.href = '/auth.html';
  authLink.textContent = 'Sign In / Sign Up';
  header.appendChild(authLink);

  document.getElementById('menu').addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const id = e.target.dataset.id;
      const price = Number(e.target.dataset.price);
      const name = e.target.dataset.name;
      addToCart({ foodId: id, price, name });
    }
  });

  document.getElementById('checkout').addEventListener('click', async () => {
    const cart = loadCart();
    if (cart.length === 0) return alert('Cart is empty');
    const customerName = prompt('Name for pickup?') || 'Guest';
    const phone = prompt('Phone number?') || '';
    const pickupTime = prompt('Pickup time (e.g., 18:30)') || '';
    const token = localStorage.getItem('ibazaar_token');
    let userEmail = '';
    if (token) {
      try { const payload = JSON.parse(atob(token.split('.')[1])); userEmail = payload?.email || '' } catch(e){}
    }
    const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

    // Mock payment
    if (!confirm(`Pay ₹${total} now? (mock)`)) return;

    const res = await fetch(`${API_BASE}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart, customerName, phone, pickupTime, total })
    });
    const data = await res.json();
    if (res.ok) {
      alert('Order placed! Your order id: ' + data.order._id);
      localStorage.removeItem('cart');
      renderCart();
    } else {
      alert('Order failed: ' + (data.error || JSON.stringify(data)));
    }
  });
});
