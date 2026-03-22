
// js/shop.js

async function getUser() {
  const { data } = await supabaseClient.auth.getUser();
  return data.user;
}

async function loadProducts() {
  const grid = document.getElementById("product-grid");

  const { data: products, error } = await supabaseClient
    .from("products")
    .select("*");

  if (error) {
    grid.innerHTML = "<p>Error loading products.</p>";
    return;
  }

  grid.innerHTML = "";

  products.forEach((p) => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${p.image_url}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <p class="price">£${Number(p.price).toFixed(2)}</p>

      <div class="product-actions">
        <input type="number" min="1" value="1" class="qty-input" data-id="${p.id}">
        <button class="add-to-cart" data-id="${p.id}">Add to Cart</button>
      </div>
    `;

    grid.appendChild(card);
  });

  grid.addEventListener("click", async (e) => {
    if (e.target.classList.contains("add-to-cart")) {
      const productId = Number(e.target.dataset.id);
      const qtyInput = e.target.parentElement.querySelector(".qty-input");
      const quantity = Number(qtyInput.value);

      await addToCart(productId, quantity);
    }
  });
}

async function addToCart(productId, quantity) {
  const user = await getUser();
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  await supabaseClient
    .from("cart_items")
    .upsert(
      { user_id: user.id, product_id: productId, quantity },
      { onConflict: "user_id,product_id" }
    );

  if (confirm("Added to cart. Go to cart?")) {
    window.location.href = "cart.html";
  }
}

document.addEventListener("DOMContentLoaded", loadProducts);