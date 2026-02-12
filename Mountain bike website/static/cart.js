/* ============================================================
   Dirt Cycles — Shopping Cart Page Logic
   Uses the same cart storage as shop page (localStorage)
   ============================================================ */

(function() {

  const cartContainer = document.getElementById("cartContainer");
  const cartTotalEl = document.getElementById("cartTotal");
  const btnClear = document.getElementById("clearCart");
  const btnCheckout = document.getElementById("checkoutBtn");

  const getCart = () => JSON.parse(localStorage.getItem('dc_cart') || '[]');
  const setCart = (arr) => localStorage.setItem('dc_cart', JSON.stringify(arr));

  const updateCartIcon = () => {
    const cartCount = document.getElementById('cartCount');
    if (!cartCount) return;
    const count = getCart().reduce((s, i) => s + i.qty, 0);
    cartCount.textContent = count;
  };

  updateCartIcon();

  /* ------------------------------------------
     Render the cart items on the cart page
     ------------------------------------------ */
  function renderCart() {
    const cart = getCart();

    if (cart.length === 0) {
      cartContainer.innerHTML = `<p class="hint">Your cart is empty. Head to the shop to pick your bike.</p>`;
      cartTotalEl.textContent = "£0";
      return;
    }

    cartContainer.innerHTML = "";

    let total = 0;

    for (const item of cart) {
      total += item.price * item.qty;

      const row = document.createElement("div");
      row.className = "cart-item";

      row.innerHTML = `
        <div class="cart-item-info">
          <h3>${item.name}</h3>
          <p class="specs">£${item.price.toLocaleString()} each</p>
        </div>

        <div class="cart-item-controls">
          <label>
            Qty:
            <input type="number" min="1" value="${item.qty}" data-id="${item.id}" class="qtyInput">
          </label>
          <button class="removeBtn" data-id="${item.id}">Remove</button>
        </div>
      `;

      cartContainer.appendChild(row);
    }

    cartTotalEl.textContent = "£" + total.toLocaleString();

    attachEvents();
  }

  /* ------------------------------------------
     Attach listeners to dynamic buttons
     ------------------------------------------ */
  function attachEvents() {

    // Remove items
    document.querySelectorAll(".removeBtn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        let cart = getCart();
        cart = cart.filter(item => item.id !== id);
        setCart(cart);
        renderCart();
        updateCartIcon();
      });
    });

    // Update quantities
    document.querySelectorAll(".qtyInput").forEach(input => {
      input.addEventListener("change", () => {
        const id = input.dataset.id;
        const qty = Math.max(1, Number(input.value));
        let cart = getCart();
        const item = cart.find(i => i.id === id);
        if (item) item.qty = qty;
        setCart(cart);
        renderCart();
        updateCartIcon();
      });
    });
  }

  /* ------------------------------------------
     Clear cart
     ------------------------------------------ */
  if (btnClear) {
    btnClear.addEventListener('click', () => {
      localStorage.removeItem('dc_cart');
      renderCart();
      updateCartIcon();
    });
  }

  /* ------------------------------------------
     Fake checkout (placeholder)
     ------------------------------------------ */
  if (btnCheckout) {
    btnCheckout.addEventListener('click', () => {
      alert("Checkout is not implemented, but your cart is ready!");
    });
  }

  renderCart();

})();