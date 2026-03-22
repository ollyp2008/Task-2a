
// js/cart.js

async function getUser() {
  const { data } = await supabaseClient.auth.getUser();
  return data.user;
}

async function loadCart() {
  const user = await getUser();
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const { data: items, error } = await supabaseClient
    .from("cart_items")
    .select("id, quantity, products(*)")
    .eq("user_id", user.id);

  const tbody = document.querySelector("#cart-table tbody");
  const totalEl = document.getElementById("cart-total");

  if (error) {
    tbody.innerHTML = "<tr><td colspan='5'>Error loading cart.</td></tr>";
    return;
  }

  if (!items.length) {
    tbody.innerHTML = "<tr><td colspan='5'>Your cart is empty.</td></tr>";
    totalEl.textContent = "0.00";
    return;
  }

  tbody.innerHTML = "";
  let total = 0;

  items.forEach((item) => {
    const p = item.products;
    const subtotal = p.price * item.quantity;
    total += subtotal;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${p.name}</td>
      <td>£${p.price.toFixed(2)}</td>
      <td><input type="number" min="1" value="${item.quantity}" data-id="${item.id}" class="cart-qty"></td>
      <td>£${subtotal.toFixed(2)}</td>
      <td><button class="remove-item" data-id="${item.id}">Remove</button></td>
    `;
    tbody.appendChild(tr);
  });

  totalEl.textContent = total.toFixed(2);

  tbody.addEventListener("change", async (e) => {
    if (e.target.classList.contains("cart-qty")) {
      const id = Number(e.target.dataset.id);
      const qty = Number(e.target.value);

      await supabaseClient.from("cart_items").update({ quantity: qty }).eq("id", id);
      loadCart();
    }
  });

  tbody.addEventListener("click", async (e) => {
    if (e.target.classList.contains("remove-item")) {
      const id = Number(e.target.dataset.id);
      await supabaseClient.from("cart_items").delete().eq("id", id);
      loadCart();
    }
  });

  document.getElementById("checkout-btn").onclick = () => checkout(user, items);
}

async function checkout(user, items) {
  let total = 0;
  items.forEach((i) => (total += i.products.price * i.quantity));

  const { data: order } = await supabaseClient
    .from("orders")
    .insert({ user_id: user.id, total })
    .select()
    .single();

  const orderItems = items.map((i) => ({
    order_id: order.id,
    product_id: i.products.id,
    quantity: i.quantity,
    unit_price: i.products.price
  }));

  await supabaseClient.from("order_items").insert(orderItems);

  await supabaseClient.from("tracking").insert({
    order_id: order.id,
    status: "Processing"
  });

  await supabaseClient.from("cart_items").delete().eq("user_id", user.id);

  alert("Order placed! You can track it on the tracking page.");
  window.location.href = "tracking.html";
}

document.addEventListener("DOMContentLoaded", loadCart);