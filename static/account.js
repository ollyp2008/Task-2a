
// js/account.js

async function loadAccount() {
  const { data } = await supabaseClient.auth.getUser();
  const user = data.user;

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const { data: profile } = await supabaseClient
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  document.getElementById("acc-fullname").value = profile.full_name || "";
  document.getElementById("acc-phone").value = profile.phone || "";
  document.getElementById("acc-address1").value = profile.address_line1 || "";
  document.getElementById("acc-address2").value = profile.address_line2 || "";
  document.getElementById("acc-city").value = profile.city || "";
  document.getElementById("acc-postcode").value = profile.postcode || "";
}

document.getElementById("account-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const { data } = await supabaseClient.auth.getUser();
  const user = data.user;

  const payload = {
    full_name: document.getElementById("acc-fullname").value,
    phone: document.getElementById("acc-phone").value,
    address_line1: document.getElementById("acc-address1").value,
    address_line2: document.getElementById("acc-address2").value,
    city: document.getElementById("acc-city").value,
    postcode: document.getElementById("acc-postcode").value
  };

  const { error } = await supabaseClient
    .from("profiles")
    .update(payload)
    .eq("id", user.id);

  document.getElementById("account-message").textContent =
    error ? "Error saving changes." : "Details updated successfully.";
});

document.addEventListener("DOMContentLoaded", loadAccount);