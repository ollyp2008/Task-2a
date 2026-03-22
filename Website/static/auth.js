

// js/auth.js

// SIGNUP
const signupForm = document.getElementById("signup-form");

if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullName = document.getElementById("signup-fullname").value.trim();
    const phone = document.getElementById("signup-phone").value.trim();
    const address1 = document.getElementById("signup-address1").value.trim();
    const address2 = document.getElementById("signup-address2").value.trim();
    const city = document.getElementById("signup-city").value.trim();
    const postcode = document.getElementById("signup-postcode").value.trim();

    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value.trim();

    const msg = document.getElementById("signup-message");
    msg.textContent = "Creating account...";

    // 1. Create auth user
    const { data: signupData, error: signupError } = await supabaseClient.auth.signUp({
      email,
      password
    });

    if (signupError) {
      msg.textContent = "Signup error: " + signupError.message;
      return;
    }

    const user = signupData.user;

    if (!user) {
      msg.textContent = "Signup failed: No user returned.";
      return;
    }

    // 2. Insert profile row
    const { error: profileError } = await supabaseClient
      .from("profiles")
      .insert({
        id: user.id,
        full_name: fullName,
        phone: phone,
        address_line1: address1,
        address_line2: address2,
        city: city,
        postcode: postcode
      });

    if (profileError) {
      msg.textContent = "Profile insert error: " + profileError.message;
      return;
    }

    msg.textContent = "Account created! Redirecting...";
    setTimeout(() => {
      window.location.href = "shop.html";
    }, 1000);
  });
}

// Handle login
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();
    const msg = document.getElementById('login-message');

    msg.textContent = 'Signing in...';

    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      msg.textContent = error.message;
      return;
    }

    msg.textContent = 'Logged in. Redirecting to shop...';
    setTimeout(() => {
      window.location.href = 'shop.html';
    }, 1000);
  });
}