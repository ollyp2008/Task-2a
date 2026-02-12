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
  // .value gets whatever the user typed in the input box
  const text = demoNumber.value;

  // Validation 1: blank input
  // .trim() removes spaces, so "   " becomes ""
  if (text.trim() === "") {
    demoResult.textContent = "Please enter a value.";
    return; // stop here if invalid
  }

  // Convert text to a number
  const number = Number(text);

  // Validation 2: not a number
  if (Number.isNaN(number)) {
    demoResult.textContent = "That is not a number.";
    return;
  }

  // Output result onto the page
  demoResult.textContent = "Double is: " + (number * 2);
});

// -------------------------
// Practice example 2: Character counter (input event)
// -------------------------

const demoText = document.getElementById("demoText");
const demoCharCount = document.getElementById("demoCharCount");

// "input" runs every time the user types or deletes text
demoText.addEventListener("input", function () {
  // .length counts characters in a string
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
// 2) Get the GreenTech counter span using its id: charCount
// 3) Add an "input" event listener to forumPost
// 4) Inside the event, set charCount.textContent to forumPost.value.length

// TODO: write your code for TASK 2A here



// -----------------------------------------------------
// TASK 2B: Clear form button (clearBtn)
// -----------------------------------------------------
//
// Goal: When user clicks "Clear form", reset the GreenTech form outputs.
//
// Steps:
// 1) Get the Clear button using id: clearBtn
