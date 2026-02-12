/* =========================================================
   WK7 JavaScript Starter
   LEARN AREA: Fully working validation playground
   APPLY AREA: Prompts only (students build their own)
   ========================================================= */

/* -------------------------
   LEARN AREA: Elements
   ------------------------- */
function initializeLearnElements() {
  try {
    return {
      presenceInput: document.getElementById("learnPresence"),
      presenceError: document.getElementById("learnPresenceError"),
      btnPresence: document.getElementById("btnLearnPresence"),

      digitsInput: document.getElementById("learnDigits"),
      digitsError: document.getElementById("learnDigitsError"),
      btnDigits: document.getElementById("btnLearnDigits"),

      formatInput: document.getElementById("learnFormat"),
      formatError: document.getElementById("learnFormatError"),
      btnFormat: document.getElementById("btnLearnFormat"),

      rangeInput: document.getElementById("learnRange"),
      rangeError: document.getElementById("learnRangeError"),
      btnRange: document.getElementById("btnLearnRange"),

      lengthInput: document.getElementById("learnLength"),
      lengthError: document.getElementById("learnLengthError"),
      btnLength: document.getElementById("btnLearnLength")
    };
  } catch (error) {
    console.error('Error initializing learn elements:', error);
    return {};
  }
}

const learn = initializeLearnElements();

// Check if all required elements exist
function checkLearnElements() {
  const requiredElements = Object.values(learn);
  const missingElements = requiredElements.filter(element => !element);
  
  if (missingElements.length > 0) {
    console.warn('Some Learn Area elements are missing from the DOM');
    return false;
  }
  return true;
}

/* -------------------------
   Shared helper functions
   These are real examples you can reuse later.
   ------------------------- */

// Presence check
function hasValue(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

// Digit check (digits only)
function isDigitsOnly(value) {
  return typeof value === 'string' && /^[0-9]+$/.test(value);
}

// Format check (simple email check)
function isValidEmail(value) {
  // sensible beginner pattern: something@something.something
  return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

// Range check
function isInRange(num, min, max) {
  return Number.isFinite(num) && num >= min && num <= max;
}

// Length check
function isLengthOk(value, maxLength) {
  return value != null && value.length <= maxLength;
}

function setLearnMessage(target, message) {
  if (target) {
    target.textContent = message;
  }
}

function clearLearnMessage(target) {
  if (target) {
    target.textContent = "";
  }
}

/* -------------------------
   LEARN AREA: Handlers
   Each handler:
   - Reads input
   - Runs one check
   - Writes an accessible message near the input
   ------------------------- */

// A) Presence check example
if (learn.btnPresence && learn.presenceInput && learn.presenceError) {
  learn.btnPresence.addEventListener("click", () => {
    const value = learn.presenceInput.value;

    if (!hasValue(value)) {
      setLearnMessage(learn.presenceError, "Please enter a value. This field cannot be blank.");
      return;
    }

    setLearnMessage(learn.presenceError, "PASS: A value has been entered.");
  });
}

// B) Digit check example
if (learn.btnDigits && learn.digitsInput && learn.digitsError) {
  learn.btnDigits.addEventListener("click", () => {
    const value = learn.digitsInput.value;

    if (!hasValue(value)) {
      setLearnMessage(learn.digitsError, "Please enter a phone number first.");
      return;
    }

    if (!isDigitsOnly(value)) {
      setLearnMessage(learn.digitsError, "FAIL: Digits only. Remove spaces, letters, or symbols.");
      return;
    }

    setLearnMessage(learn.digitsError, "PASS: Digits only.");
  });
}

// C) Format check example (email)
if (learn.btnFormat && learn.formatInput && learn.formatError) {
  learn.btnFormat.addEventListener("click", () => {
    const value = learn.formatInput.value;

    if (!hasValue(value)) {
      setLearnMessage(learn.formatError, "Please enter an email address first.");
      return;
    }

    if (!isValidEmail(value)) {
      setLearnMessage(learn.formatError, "FAIL: Enter an email in the format name@example.com.");
      return;
    }

    setLearnMessage(learn.formatError, "PASS: Email format looks valid.");
  });
}

// D) Range check example (1 to 5)
if (learn.btnRange && learn.rangeInput && learn.rangeError) {
  learn.btnRange.addEventListener("click", () => {
    const value = learn.rangeInput.value;

    if (!hasValue(value)) {
      setLearnMessage(learn.rangeError, "Please enter a number first.");
      return;
    }

    const num = Number(value);

    if (!Number.isFinite(num)) {
      setLearnMessage(learn.rangeError, "FAIL: Please enter a valid number.");
      return;
    }

    if (!isInRange(num, 1, 5)) {
      setLearnMessage(learn.rangeError, "FAIL: Number must be between 1 and 5.");
      return;
    }

    setLearnMessage(learn.rangeError, "PASS: Number is within the range 1 to 5.");
  });
}

// E) Length check example (max 20)
if (learn.btnLength && learn.lengthInput && learn.lengthError) {
  learn.btnLength.addEventListener("click", () => {
    const value = learn.lengthInput.value;

    if (!hasValue(value)) {
      setLearnMessage(learn.lengthError, "Please enter a message first.");
      return;
    }

    if (!isLengthOk(value, 20)) {
      setLearnMessage(learn.lengthError, "FAIL: Keep your message to 20 characters or fewer.");
      return;
    }

    setLearnMessage(learn.lengthError, "PASS: Message length is within the limit.");
  });
}

/* Optional: Clear learn messages when user types (helps usability) */
if (learn.presenceInput && learn.presenceError) {
  learn.presenceInput.addEventListener("input", () => clearLearnMessage(learn.presenceError));
}
if (learn.digitsInput && learn.digitsError) {
  learn.digitsInput.addEventListener("input", () => clearLearnMessage(learn.digitsError));
}
if (learn.formatInput && learn.formatError) {
  learn.formatInput.addEventListener("input", () => clearLearnMessage(learn.formatError));
}
if (learn.rangeInput && learn.rangeError) {
  learn.rangeInput.addEventListener("input", () => clearLearnMessage(learn.rangeError));
}
if (learn.lengthInput && learn.lengthError) {
  learn.lengthInput.addEventListener("input", () => clearLearnMessage(learn.lengthError));
}

/* =========================================================
   APPLY AREA: Students build from scratch
   ========================================================= */

/* ============================================================
   APPLY AREA — DREAMTRIPS HONEYMOON ENQUIRY VALIDATION
   Complete student-built validation system
   ============================================================ */

/* ------------------------------
   1. Get all form elements
   ------------------------------ */
const fields = {
  firstName: document.getElementById("custFirstName"),
  lastName: document.getElementById("custLastName"),
  dob: document.getElementById("custDOB"),
  email: document.getElementById("custEmail"),
  phone: document.getElementById("custPhone"),

  from: document.getElementById("fromLocation"),
  to: document.getElementById("toLocation"),
  flightDate: document.getElementById("flightDate"),
  flightTime: document.getElementById("flightTime"),
  flightType: document.getElementById("flightType")
};

const errors = {
  firstName: document.getElementById("custFirstNameError"),
  lastName: document.getElementById("custLastNameError"),
  dob: document.getElementById("custDOBError"),
  email: document.getElementById("custEmailError"),
  phone: document.getElementById("custPhoneError"),

  from: document.getElementById("fromLocationError"),
  to: document.getElementById("toLocationError"),
  flightDate: document.getElementById("flightDateError"),
  flightTime: document.getElementById("flightTimeError"),
  flightType: document.getElementById("flightTypeError")
};

/* ------------------------------
   2. Reusable helper functions
   ------------------------------ */

function setError(key, message) {
  errors[key].textContent = message;
}

function clearError(key) {
  errors[key].textContent = "";
}

function clearAllErrors() {
  Object.keys(errors).forEach(key => errors[key].textContent = "");
}

function hasValue(value) {
  return value && value.trim().length > 0;
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function isDigitsOnly(value) {
  return /^[0-9]+$/.test(value);
}

/* ------------------------------
   3. Validate ALL fields
   ------------------------------ */
function validateAll() {
  let valid = true;
  clearAllErrors();

  /* ---- CUSTOMER DETAILS ---- */

  if (!hasValue(fields.firstName.value)) {
    setError("firstName", "Please enter your first name.");
    valid = false;
  }

  if (!hasValue(fields.lastName.value)) {
    setError("lastName", "Please enter your surname.");
    valid = false;
  }

  if (!hasValue(fields.dob.value)) {
    setError("dob", "Please enter your date of birth.");
    valid = false;
  }

  if (!hasValue(fields.email.value)) {
    setError("email", "Please enter your email address.");
    valid = false;
  } else if (!isValidEmail(fields.email.value)) {
    setError("email", "Please enter a valid email address.");
    valid = false;
  }

  if (!hasValue(fields.phone.value)) {
    setError("phone", "Please enter your phone number.");
    valid = false;
  } else if (!isDigitsOnly(fields.phone.value)) {
    setError("phone", "Phone number must contain digits only.");
    valid = false;
  }

  /* ---- FLIGHT DETAILS ---- */

  if (!hasValue(fields.from.value)) {
    setError("from", "Please enter your departure location.");
    valid = false;
  }

  if (!hasValue(fields.to.value)) {
    setError("to", "Please enter your destination.");
    valid = false;
  }

  if (!hasValue(fields.flightDate.value)) {
    setError("flightDate", "Please enter a flight date.");
    valid = false;
  }

  if (!hasValue(fields.flightTime.value)) {
    setError("flightTime", "Please enter a flight time.");
    valid = false;
  }

  if (!hasValue(fields.flightType.value)) {
    setError("flightType", "Please select a flight type.");
    valid = false;
  }

  return valid;
}

/* ------------------------------
   4. Submit handler
   ------------------------------ */
if (enquiryForm) {
  enquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const status = document.getElementById("formStatus");

    if (!validateAll()) {
      status.textContent = "There were errors with your enquiry. Please fix them above.";
      return;
    }

    status.textContent = "Thank you! Your DreamTrips honeymoon enquiry has been submitted.";
  });
}

/* ------------------------------
   5. Live validation (minimum 2 fields)
   ------------------------------ */

// Live email validation
fields.email.addEventListener("input", () => {
  if (!hasValue(fields.email.value)) {
    clearError("email");
    return;
  }
  if (!isValidEmail(fields.email.value)) {
    setError("email", "Invalid email format.");
  } else {
    clearError("email");
  }
});

// Live phone validation
fields.phone.addEventListener("input", () => {
  if (!hasValue(fields.phone.value)) {
    clearError("phone");
    return;
  }
  if (!isDigitsOnly(fields.phone.value)) {
    setError("phone", "Digits only.");
  } else {
    clearError("phone");
  }
});

// Live dropdown check
fields.flightType.addEventListener("change", () => {
  if (!hasValue(fields.flightType.value)) {
    setError("flightType", "Please select a type.");
  } else {
    clearError("flightType");
  }
});


/* ------------------------------
   6. Optional: auto-update summary
   ------------------------------ */

const summary = document.getElementById("dynamicSummary");

function updateSummary() {
  summary.textContent =
    `${fields.firstName.value} ${fields.lastName.value} is travelling from ${fields.from.value}` +
    ` to ${fields.to.value} on ${fields.flightDate.value} at ${fields.flightTime.value},` +
    ` flying in ${fields.flightType.value || "—"}.`;
}

[
  fields.firstName,
  fields.lastName,
  fields.from,
  fields.to,
  fields.flightDate,
  fields.flightTime,
  fields.flightType
].forEach(input => {
  input.addEventListener("input", updateSummary);
  input.addEventListener("change", updateSummary);
});

