
// supabase project settings
const API_URL = "https://aynyzftdiqhgsoccxogv.supabase.co";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5bnl6ZnRkaXFoZ3NvY2N4b2d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4NTQ4NDUsImV4cCI6MjA4MDQzMDg0NX0.BlbZtl-y1jIJXAqCTjeIcIfUHDoVfn5bt5JQcIRPduc";

// Table name for this project
const APPOINTMENTS_TABLE = "customer_appointments";

console.log("Javascript loaded");
console.log("Using Supabase:", API_URL);

// Run this code when the page has loaded
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("appointment-form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();   // stop the page from refreshing
    await addAppointment();   // call our function to save data
  });
});

async function addAppointment() {
  // 1. Read values from the form inputs
  const patient_name = document.getElementById("patient_name").value.trim();
  const patient_email = document.getElementById("patient_email").value.trim();
  const appointment_at = document.getElementById("appointment_at").value;
  const reason_for_visit = document.getElementById("reason_for_visit").value.trim();

  // 2. Basic validation
  if (patient_name === "" || patient_email === "" || appointment_at === "" || reason_for_visit === "") {
    alert("Please fill in patient name and appointment date.");
    return;
  }

  // 3. Build the object using column names from Supabase
  const body = {
    patient_name: patient_name,      // matches column "patient_name"
    patient_email: patient_email,    // matches column "patient_email"
    appointment_at: appointment_at,  // matches column "appointment_date"
    reason_for_visit: reason_for_visit   // matches column "reason_for_visit"
  };

  // 4. Send data to Supabase
  try {
    const response = await fetch(`${API_URL}/rest/v1/${APPOINTMENTS_TABLE}`, {
      method: "POST",
      headers: {
        apikey: API_KEY,
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal"
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Supabase error:", err);
      alert("Could not add appointment.");
      return;
    }

    alert("Appointment booked successfully!");

    // 5. Clear the form
    document.getElementById("patient_name").value = "";
    document.getElementById("patient_email").value = "";
    document.getElementById("appointment_at").value = "";
    document.getElementById("reason_for_visit").value = "";

    // 6. (Optional) reload the list of appointments here
    // loadAppointments();

  } catch (error) {
    console.error(error);
    alert("Something went wrong. Check the console.");
  }
}
