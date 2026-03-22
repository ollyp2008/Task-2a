
// js/tracking.js

async function loadTracking() {
  const { data } = await supabaseClient.auth.getUser();
  const user = data.user;

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const { data: orders } = await supabaseClient
    .from("orders")
    .select("id, total, created_at, status, tracking(status, updated_at)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const container = document.getElementById("tracking-list");

  if (!orders.length) {
    container.innerHTML = "<p>No orders found.</p>";
    return;
  }

  container.innerHTML = "";

  orders.forEach((o) => {
    const latest = o.tracking?.[o.tracking.length - 1];

    const div = document.createElement("div");
    div.className = "tracking-card";

    div.innerHTML = `
      <h2>Order #${o.id}</h2>
      <p>Total: £${o.total.toFixed(2)}</p>
      <p>Placed: ${new Date(o.created_at).toLocaleString()}</p>
      <p>Order Status: ${o.status}</p>
      <p>Tracking: ${latest ? latest.status : "Processing"}</p>
    `;

    container.appendChild(div);
  });
}

document.addEventListener("DOMContentLoaded", loadTracking);