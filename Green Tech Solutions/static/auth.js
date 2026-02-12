
// PASSWORD STRENGTH METER
const passwordInput = document.getElementById("signupPassword");
const strengthBar = document.getElementById("passwordStrength");

if (passwordInput) {
    passwordInput.addEventListener("input", () => {
        const value = passwordInput.value;
        let strength = 0;

        if (value.length > 6) strength++;
        if (value.match(/[A-Z]/)) strength++;
        if (value.match(/[0-9]/)) strength++;
        if (value.match(/[^A-Za-z0-9]/)) strength++;

        const colors = ["#e64a19", "#ffb300", "#a5d6a7", "#2e7d32"];
        strengthBar.style.background = colors[strength] || "#e0e0e0";
    });
}

// SIGNUP LOGIC
const SUPABASE_URL = "https://lgisvbfpvtbzdqofngmm.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxnaXN2YmZwdnRiemRxb2ZuZ21tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1ODkzMzAsImV4cCI6MjA4NDE2NTMzMH0.9hnlU0ELIw5yg0NWQQqMDRa3mJTAQi6IcHft94iKtQ4";
const USER_PROFILE_TABLE = "public_users";


const signupForm = document.getElementById("signupForm");
const signupFeedback = document.getElementById("signupFeedback");

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}

if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("signupEmail").value.trim();
        const password = document.getElementById("signupPassword").value;

        if (!email || !password) {
            signupFeedback.textContent = "Please fill in all fields.";
            signupFeedback.style.color = "#e64a19";
            return;
        }

        const passwordHash = await hashPassword(password);

        try {
            const res = await fetch(
                `${SUPABASE_URL}/rest/v1/public_users`,
                {
                    method: "POST",
                    headers: {
                        apikey: SUPABASE_ANON_KEY,
                        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
                        "Content-Type": "application/json",
                        Prefer: "return=minimal"
                    },
                    body: JSON.stringify({
                        email: email,
                        password_hash: passwordHash
                    })
                }
            );

            if (!res.ok) {
                const text = await res.text();

                if (text.includes("duplicate key")) {
                    signupFeedback.textContent =
                        "This email is already registered.";
                } else {
                    signupFeedback.textContent =
                        "Signup failed. Please try again.";
                }

                signupFeedback.style.color = "#e64a19";
                return;
            }

            signupFeedback.textContent = "Account created successfully!";
            signupFeedback.style.color = "#2e7d32";

            localStorage.setItem("loggedInUser", email);
            window.location.href = "index.html";

            localStorage.setItem("loggedInUser", email);

            setTimeout(() => {
                window.location.href = "index.html";
            }, 1200);

        } catch (err) {
            console.error("Signup error:", err);
            signupFeedback.textContent =
                "An error occurred. Please try again.";
            signupFeedback.style.color = "#e64a19";
        }
    });
}


// LOGIN LOGIC

const loginForm = document.getElementById("loginForm");
const loginFeedback = document.getElementById("loginFeedback");

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}

if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;

        if (!email || !password) {
            loginFeedback.textContent = "Please fill in all fields.";
            loginFeedback.style.color = "#e64a19";
            return;
        }

        try {
            const res = await fetch(
                `${SUPABASE_URL}/rest/v1/public_users?email=eq.${encodeURIComponent(email)}&select=password_hash`,
                {
                    method: "GET",
                    headers: {
                        apikey: SUPABASE_ANON_KEY,
                        Authorization: `Bearer ${SUPABASE_ANON_KEY}`
                    }
                }
            );

            if (!res.ok) {
                throw new Error(await res.text());
            }

            const data = await res.json();

            if (data.length === 0) {
                loginFeedback.textContent = "Account does not exist.";
                loginFeedback.style.color = "#e64a19";
                return;
            }

            const storedHash = data[0].password_hash;
            const inputHash = await hashPassword(password);

            if (storedHash !== inputHash) {
                loginFeedback.textContent = "Incorrect email or password.";
                loginFeedback.style.color = "#e64a19";
                return;
            }

            // ✅ SUCCESS
            loginFeedback.textContent = "Login successful!";
            loginFeedback.style.color = "#2e7d32";

            localStorage.setItem("loggedInUser", email);

            setTimeout(() => {
                window.location.href = "index.html";
            }, 1000);

        } catch (err) {
            console.error("Login error:", err);
            loginFeedback.textContent =
                "Something went wrong. Please try again.";
            loginFeedback.style.color = "#e64a19";
        }
    });
}
    localStorage.setItem("loggedInUser", email);
    window.location.href = "index.html"; // or app.html if that’s your main

// SIGN UP
function signup() {
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    // Create user object
    const user = {
        email: email,
        password: password
    };

    // Save account to localStorage
    localStorage.setItem(email, JSON.stringify(user));

    // Save active session
    localStorage.setItem("loggedInUser", email);

    // Go to app page
    window.location.href = "app.html";
}


// LOGIN
function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const storedUser = localStorage.getItem(email);

    if (!storedUser) {
        alert("Account does not exist!");
        return;
    }

    const user = JSON.parse(storedUser);

    if (user.password !== password) {
        alert("Incorrect password!");
        return;
    }

    // Save active session
    localStorage.setItem("loggedInUser", email);

    window.location.href = "app.html";
}

