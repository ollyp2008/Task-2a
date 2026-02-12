// At the TOP of static/app.js
window.onload = () => {
  const loggedInUser = localStorage.getItem("loggedInUser");

  const loginBtn = document.getElementById("login-btn");
  const signupBtn = document.getElementById("signup-btn");
  const logoutBtn = document.getElementById("logout-btn");
  const userDisplay = document.getElementById("user-display");

  const hasAuthButtons = loginBtn && signupBtn && logoutBtn;

  if (!loggedInUser) {
    // Not logged in: show login/signup, hide logout
    if (hasAuthButtons) {
      loginBtn.classList.remove("hidden");
      signupBtn.classList.remove("hidden");
      logoutBtn.classList.add("hidden");
    }
    if (userDisplay) userDisplay.textContent = "";
  } else {
    // Logged in: show logout, hide login/signup
    if (hasAuthButtons) {
      loginBtn.classList.add("hidden");
      signupBtn.classList.add("hidden");
      logoutBtn.classList.remove("hidden");
    }
    if (userDisplay) userDisplay.textContent = loggedInUser;
  }

  // ...keep your existing window.onload logic below if you have any
};

// Keep logout() somewhere in app.js (bottom is fine)
function logout() {
  localStorage.removeItem("loggedInUser");
  // Optional: update UI immediately
  const loginBtn = document.getElementById("login-btn");
  const signupBtn = document.getElementById("signup-btn");
  const logoutBtn = document.getElementById("logout-btn");
  if (loginBtn && signupBtn && logoutBtn) {
    loginBtn.classList.remove("hidden");
    signupBtn.classList.remove("hidden");
    logoutBtn.classList.add("hidden");
  }
  // Redirect to login page (or home if you prefer)
  window.location.href = "login.html";
}

    const SUPABASE_URL = "https://lgisvbfpvtbzdqofngmm.supabase.co";
    const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxnaXN2YmZwdnRiemRxb2ZuZ21tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1ODkzMzAsImV4cCI6MjA4NDE2NTMzMH0.9hnlU0ELIw5yg0NWQQqMDRa3mJTAQi6IcHft94iKtQ4";


    if (!loggedInUser) {
        window.location.href = "login.html";
        return;
    }

    document.getElementById("user-display").innerText = loggedInUser;



// (Your existing app.js code BELOW this)

// STEP 2: Single-table setup to match your schema

// Your normalized table:
const USER_PROFILE_TABLE = "public_usersustainabilityprofile";

// Optional: if you use email as a unique identifier in your app flow
// set the current user's identity here or set it dynamically at runtime:
let CURRENT_USER_EMAIL = "";     // e.g., set from your auth or a form
let CURRENT_USERNAME = "";       // optional, if you want to store username too


// Utility: clamp value between min and max
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

/* ---------- Eco Impact Calculator ---------- */

const impactForm = document.getElementById('impactForm');
const ecoScoreValue = document.getElementById('ecoScoreValue');
const ecoScoreLabel = document.getElementById('ecoScoreLabel');
const scoreCircle = document.getElementById('scoreCircle');
const scoreTip = document.getElementById('scoreTip');

const barTransport = document.getElementById('barTransport');
const barEnergy = document.getElementById('barEnergy');
const barWater = document.getElementById('barWater');
const barWaste = document.getElementById('barWaste');

impactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const transportMode = document.getElementById('transportMode').value;
    const energyUsage = parseFloat(document.getElementById('energyUsage').value);
    const waterUsage = parseFloat(document.getElementById('waterUsage').value);
    const wasteKg = parseFloat(document.getElementById('wasteKg').value);

    if (!transportMode || isNaN(energyUsage) || isNaN(waterUsage) || isNaN(wasteKg)) {
        return;
    }

    // Simple scoring model (0–100)
    let transportScore;
    switch (transportMode) {
        case 'walking':
            transportScore = 95;
            break;
        case 'public':
            transportScore = 80;
            break;
        case 'electric':
            transportScore = 70;
            break;
        default:
            transportScore = 45;
    }

    const energyScore = clamp(100 - energyUsage * 3, 20, 95);
    const waterScore = clamp(100 - (waterUsage - 50) * 0.7, 20, 95);
    const wasteScore = clamp(100 - wasteKg * 15, 10, 95);

    const ecoScore = Math.round(
        (transportScore * 0.3) +
        (energyScore * 0.3) +
        (waterScore * 0.2) +
        (wasteScore * 0.2)
    );

    ecoScoreValue.textContent = ecoScore;

    // Update circle gradient based on score
    let circleColor;
    if (ecoScore >= 80) {
        circleColor = 'conic-gradient(from 180deg, #c8e6c9, #2e7d32)';
        ecoScoreLabel.textContent = 'Excellent! Your habits are very eco-friendly.';
    } else if (ecoScore >= 60) {
        circleColor = 'conic-gradient(from 180deg, #fff9c4, #ffb300)';
        ecoScoreLabel.textContent = 'Good progress. There is still room for improvement.';
    } else {
        circleColor = 'conic-gradient(from 180deg, #ffccbc, #e64a19)';
        ecoScoreLabel.textContent = 'You have a strong opportunity to reduce your impact.';
    }
    scoreCircle.style.background = circleColor;

    // Update bars
    barTransport.style.width = transportScore + '%';
    barEnergy.style.width = energyScore + '%';
    barWater.style.width = waterScore + '%';
    barWaste.style.width = wasteScore + '%';

    // Suggestion text
    let suggestions = [];
    if (transportMode === 'car') {
        suggestions.push('Consider car sharing, public transport, or cycling for short journeys.');
    }
    if (energyUsage > 10) {
        suggestions.push('Look into LED lighting, efficient appliances, and better insulation to cut energy use.');
    }
    if (waterUsage > 120) {
        suggestions.push('Shorter showers and fixing leaks can significantly reduce water usage.');
    }
    if (wasteKg > 1.5) {
        suggestions.push('Try composting organic waste and reducing single-use packaging.');
    }

    scoreTip.textContent = suggestions.length
        ? suggestions.join(' ')
        : 'Great work—your current habits are already quite sustainable. Keep refining them over time.';
});

/* ---------- Forums ---------- */

const forumCategories = document.getElementById('forumCategories');
const forumTitle = document.getElementById('forumTitle');
const threadList = document.getElementById('threadList');
const newThreadToggle = document.getElementById('newThreadToggle');
const newThreadForm = document.getElementById('newThreadForm');
const threadTitleInput = document.getElementById('threadTitle');
const threadBodyInput = document.getElementById('threadBody');

const forumData = {
    home: [
        {
            title: 'Best ways to reduce heating costs?',
            author: 'EcoEmma',
            replies: 14,
            time: '2h ago'
        },
        {
            title: 'Anyone tried smart plugs for energy tracking?',
            author: 'PlanetPaul',
            replies: 8,
            time: '5h ago'
        }
    ],
    transport: [
        {
            title: 'Cycling to work in the rain—tips?',
            author: 'SustainSam',
            replies: 11,
            time: '1d ago'
        },
        {
            title: 'Is an electric scooter worth it?',
            author: 'GreenGreg',
            replies: 6,
            time: '3d ago'
        }
    ],
    food: [
        {
            title: 'Low-waste meal prep ideas',
            author: 'NatureNina',
            replies: 9,
            time: '6h ago'
        },
        {
            title: 'Plant-based recipes that kids actually like',
            author: 'EcoEmma',
            replies: 5,
            time: '1d ago'
        }
    ],
    products: [
        {
            title: 'Most durable reusable water bottle?',
            author: 'PlanetPaul',
            replies: 7,
            time: '4h ago'
        },
        {
            title: 'Experiences with eco-friendly laundry detergents',
            author: 'GreenGreg',
            replies: 4,
            time: '2d ago'
        }
    ]
};

let currentCategory = 'home';

function renderThreads(category) {
    threadList.innerHTML = '';
    const threads = forumData[category] || [];
    threads.forEach(thread => {
        const li = document.createElement('li');
        li.className = 'thread-item';
        li.innerHTML = `
            <div class="thread-title">${thread.title}</div>
            <div class="thread-meta">Started by ${thread.author} · ${thread.replies} replies · ${thread.time}</div>
        `;
        threadList.appendChild(li);
    });
}

forumCategories.addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (!li) return;

    const category = li.dataset.category;
    if (!category || category === currentCategory) return;

    currentCategory = category;

    // Update active state
    [...forumCategories.querySelectorAll('li')].forEach(item => {
        item.classList.toggle('active', item.dataset.category === category);
    });

    // Update title and threads
    const titles = {
        home: 'Home & Energy',
        transport: 'Transport & Travel',
        food: 'Food & Lifestyle',
        products: 'Eco Products & Reviews'
    };
    forumTitle.textContent = titles[category] || 'Community Threads';
    renderThreads(category);
});

newThreadToggle.addEventListener('click', () => {
    newThreadForm.classList.toggle('hidden');
    if (!newThreadForm.classList.contains('hidden')) {
        threadTitleInput.focus();
    }
});

newThreadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = threadTitleInput.value.trim();
    const body = threadBodyInput.value.trim();
    if (!title || !body) return;

    const newThread = {
        title,
        author: 'You',
        replies: 0,
        time: 'Just now'
    };

    forumData[currentCategory].unshift(newThread);
    renderThreads(currentCategory);

    threadTitleInput.value = '';
    threadBodyInput.value = '';
    newThreadForm.classList.add('hidden');
});

/* ---------- Tips ---------- */

const tipsGrid = document.getElementById('tipsGrid');
const tipFilter = document.getElementById('tipFilter');
const randomTipBtn = document.getElementById('randomTipBtn');
const highlightTip = document.getElementById('highlightTip');
const highlightTipText = document.getElementById('highlightTipText');

const tips = [
    {
        id: 1,
        area: 'home',
        title: 'Switch to LED bulbs',
        text: 'LED bulbs use up to 80% less energy and last significantly longer than traditional bulbs.'
    },
    {
        id: 2,
        area: 'home',
        title: 'Unplug standby devices',
        text: 'Devices on standby still draw power—use a power strip to switch them off easily.'
    },
    {
        id: 3,
        area: 'transport',
        title: 'Combine errands into one trip',
        text: 'Planning your journeys reduces total mileage and emissions from your transport.'
    },
    {
        id: 4,
        area: 'transport',
        title: 'Try one car-free day per week',
        text: 'Use public transport, cycling, or walking for at least one day to cut emissions.'
    },
    {
        id: 5,
        area: 'water',
        title: 'Install a low-flow showerhead',
        text: 'You can reduce water use by up to 50% without sacrificing comfort.'
    },
    {
        id: 6,
        area: 'water',
        title: 'Collect rainwater for plants',
        text: 'Use a water butt or container to collect rainwater for garden use.'
    },
    {
        id: 7,
        area: 'waste',
        title: 'Start a compost bin',
        text: 'Composting food scraps reduces landfill waste and creates nutrient-rich soil.'
    },
    {
        id: 8,
        area: 'waste',
        title: 'Choose reusable containers',
        text: 'Replace single-use plastic bags and wraps with reusable containers and wraps.'
    }
];

function renderTips(filterArea = 'all') {
    tipsGrid.innerHTML = '';
    tips
        .filter(tip => filterArea === 'all' || tip.area === filterArea)
        .forEach(tip => {
            const card = document.createElement('div');
            card.className = 'tip-card';
            card.innerHTML = `
                <span class="tip-tag">${tip.area.toUpperCase()}</span>
                <h4>${tip.title}</h4>
                <p>${tip.text}</p>
                <div class="tip-highlight-bar"></div>
            `;
            tipsGrid.appendChild(card);
        });
}

tipFilter.addEventListener('change', () => {
    renderTips(tipFilter.value);
});

randomTipBtn.addEventListener('click', () => {
    const filterArea = tipFilter.value;
    const filtered = tips.filter(tip => filterArea === 'all' || tip.area === filterArea);
    if (!filtered.length) return;

    const random = filtered[Math.floor(Math.random() * filtered.length)];
    highlightTipText.textContent = random.text + ' (' + random.title + ')';
    highlightTip.classList.remove('hidden');
});

/* ---------- Consultations ---------- */


/* ---------- Consultations (save to Supabase) ---------- */


/* ---------- Consultations (Supabase - FINAL FIX) ---------- */

const consultForm = document.getElementById("consultForm");
const consultFeedback = document.getElementById("consultFeedback");

if (consultForm) {
    console.log("✅ Consultation form ready");
}

consultForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const Email = document.getElementById("consultEmail").value.trim();
    const Username = document.getElementById("consultName").value.trim();
    const ConsultationFocus = document.getElementById("consultFocus").value;
    const ConsultationMessage = document.getElementById("consultMessage").value.trim();

    if (!Email || !Username || !ConsultationFocus || !ConsultationMessage) {
        consultFeedback.textContent = "Please complete all fields.";
        consultFeedback.style.color = "#e64a19";
        return;
    }

    try {
        const res = await fetch(
            `${SUPABASE_URL}/rest/v1/${USER_PROFILE_TABLE}?on_conflict=Email`,
            {
                method: "POST",
                headers: {
                    apikey: SUPABASE_ANON_KEY,
                    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
                    "Content-Type": "application/json",
                    Prefer: "resolution=merge-duplicates,return=representation"
                },
                body: JSON.stringify({
                    Email: Email,
                    Username: Username,
                    ConsultationFocus: ConsultationFocus,
                    ConsultationMessage: ConsultationMessage
                })
            }
        );

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(errorText);
        }

        consultFeedback.textContent =
            "Thank you! Your consultation request has been submitted.";
        consultFeedback.style.color = "#2e7d32";
        consultForm.reset();

    } catch (err) {
        console.error("❌ Consultation error:", err);
        consultFeedback.textContent =
            "Something went wrong. Please try again.";
        consultFeedback.style.color = "#e64a19";
    }
});




/* ---------- Footer year ---------- */

document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- Initial renders ---------- */

renderThreads(currentCategory);
renderTips('all');
