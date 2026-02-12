
// =====================================================
// PART 1: JavaScript Practice Area (BLAND, TEACHING)
// =====================================================
//
// Goal of Part 1:
// Learn the patterns in a safe practice area first.
// You will reuse these exact patterns in Part 2 with GreenTech.
//
// Key patterns you will learn:
// - getElementById (connect JS to HTML)
// - addEventListener (respond to actions)
// - .value and .textContent (input and output)
// - basic validation (if + return)
// - Number() and Number.isNaN()
// - input event + .value.length for character counting

// -------------------------
// Practice example 1: Number checker (click event)
// -------------------------

const demoNumber = document.getElementById("demoNumber");
const demoBtn = document.getElementById("demoBtn");
const demoResult = document.getElementById("demoResult");

// This code runs when the user clicks the button
demoBtn.addEventListener("click", function () {
  const text = demoNumber.value;

  if (text.trim() === "") {
    demoResult.textContent = "Please enter a value.";
    return;
  }

  const number = Number(text);

  if (Number.isNaN(number)) {
    demoResult.textContent = "That is not a number.";
    return;
  }

  demoResult.textContent = "Double is: " + (number * 2);
});

// -------------------------
// Practice example 2: Character counter (input event)
// -------------------------

const demoText = document.getElementById("demoText");
const demoCharCount = document.getElementById("demoCharCount");

// "input" runs every time the user types or deletes text
demoText.addEventListener("input", function () {
  demoCharCount.textContent = demoText.value.length;
});


// =====================================================
// PART 2: Apply the same patterns to GreenTech (TASKS)
// =====================================================
//
// Rule: Do not invent new JavaScript.
// You must reuse the patterns from Part 1.
//
// You will work through these tasks in order.


// -----------------------------------------------------
// TASK 2A: GreenTech character counter (forumPost)
// -----------------------------------------------------
//
// Goal: Make the GreenTech character counter work like the practice one.
//
// Steps:
// 1) Get the GreenTech textarea using its id: forumPost
const forumPost = document.getElementById("forumPost");

// 2) Get the GreenTech counter span using its id: charCount
const charCount = document.getElementById("charCount");

// 3) Add an "input" event listener to forumPost
forumPost.addEventListener("input", function () {
  // 4) Set charCount.textContent to forumPost.value.length
  charCount.textContent = forumPost.value.length;
});


// -----------------------------------------------------
// TASK 2B: Clear form button (clearBtn)
// -----------------------------------------------------
//
// Goal: When user clicks "Clear form", reset the GreenTech form outputs.
//
// Steps:
// 1) Get the Clear button using id: clearBtn
const clearBtn = document.getElementById("clearBtn");

// 2) Get the GreenTech form using id: greenTechForm
const greenTechForm = document.getElementById("greenTechForm");

// 3) Get output elements
const message = document.getElementById("message");
const impactScore = document.getElementById("impactScore");
const ecoTip = document.getElementById("ecoTip");

// 4) Add a click event listener to the clear button
clearBtn.addEventListener("click", function () {
  // Reset all form inputs
  greenTechForm.reset();

  // Reset outputs
  message.textContent = "";
  impactScore.textContent = "No score yet";
  ecoTip.textContent = "No tip yet";
  charCount.textContent = 0;
});


// -----------------------------------------------------
// TASK 2C + 2D + 2E: Form submission, validation, results
// -----------------------------------------------------
//
// Goal:
// - Stop page refresh
// - Validate inputs
// - Show messages
// - Calculate impact score
// - Show eco tip

// Get input elements
const nameInput = document.getElementById("name");
const travelMode = document.getElementById("travelMode");
const carMiles = document.getElementById("carMiles");
const energyUsed = document.getElementById("energyUsed");

// Add submit event listener to the form
greenTechForm.addEventListener("submit", function (event) {
  // Stop the page refreshing
  event.preventDefault();

  // Clear previous message
  message.textContent = "";

  // Get values from inputs
  const name = nameInput.value.trim();
  const travel = travelMode.value;
  const miles = Number(carMiles.value);
  const energy = Number(energyUsed.value);

  // -------------------------
  // Validation
  // -------------------------

  // Name must not be blank
  if (name === "") {
    message.textContent = "Please enter your name.";
    return;
  }

  // Travel mode must be selected
  if (travel === "") {
    message.textContent = "Please select a travel mode.";
    return;
  }

  // Numbers must be 0 or more
  if (miles < 0 || energy < 0 || Number.isNaN(miles) || Number.isNaN(energy)) {
    message.textContent = "Miles and energy used must be 0 or more.";
    return;
  }

  // -------------------------
  // Results output
  // -------------------------

  // Confirmation message
  message.textContent = "Impact calculated successfully.";

  // Simple impact logic
  if (travel === "car") {
    impactScore.textContent = "High impact";
    ecoTip.textContent =
      "Try reducing car use or carpooling to lower emissions.";
  } else {
    impactScore.textContent = "Low impact";
    ecoTip.textContent =
      "Great choice! Your travel option is environmentally friendly.";
  }
});
