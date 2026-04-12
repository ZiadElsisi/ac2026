// handle backend
document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  // Show loading state
    const submitBtn = document.getElementById("submitBtn");
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.classList.add("loading");  
  try {
      const data = {
        fullName: document.getElementById("name").value,
        phoneNumber: document.getElementById("tel").value,
        email: document.getElementById("email").value,
        academicYear: document.getElementById("academicyear").value,
        first_preference: document.getElementById("first_preference").value,
        second_preference: document.getElementById("second_preference").value,
      };
      // ✅ Only add department if NOT freshman
    if (data.academicYear && data.academicYear !== "freshman") {
    data.department = document.getElementById("department").value;
}
     else {
             data.department = null;
            }   
    
    const res = await fetch("/api/submitForm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    
    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }
    
window.location.replace("/success.html");

  } catch (error) {
    console.error('Submission failed:', error);
          alert("Something went wrong ❌");

   
  } finally {
    submitBtn.disabled = false;
    submitBtn.classList.remove("loading");  }
});

// ===== SHOW/HIDE DEPARTMENT =====
document.addEventListener("DOMContentLoaded", () => {
  const academicYear = document.getElementById("academicyear");
  const departmentContainer = document.getElementById("departmentContainer");
  const departmentSelect = document.getElementById("department");

  academicYear.addEventListener("change", () => {
if (academicYear.value && academicYear.value !== "freshman") {
  departmentContainer.style.display = "block";
  departmentSelect.required = true;
} else {
  departmentContainer.style.display = "none";
  departmentSelect.value = "";
  departmentSelect.required = false;
}
  });
  academicYear.dispatchEvent(new Event("change"));

// ===== SHOW/HIDE Duplicated Preferences =====

const firstSelect = document.getElementById("first_preference");
const secondSelect = document.getElementById("second_preference");

function updateBoth() {
  const firstVal = firstSelect.value;
  const secondVal = secondSelect.value;

  // 🔥 STEP 1: reset ALL options first
  Array.from(firstSelect.options).forEach(opt => opt.disabled = false);
  Array.from(secondSelect.options).forEach(opt => opt.disabled = false);

  // 🔥 STEP 2: disable selected values
  if (firstVal) {
    Array.from(secondSelect.options).forEach(opt => {
      if (opt.value === firstVal) {
        opt.disabled = true;
      }
    });
  }

  if (secondVal) {
    Array.from(firstSelect.options).forEach(opt => {
      if (opt.value === secondVal) {
        opt.disabled = true;
      }
    });
  }

  // 🔥 STEP 3: prevent same selection (safety)
  if (firstVal && secondVal && firstVal === secondVal) {
    secondSelect.value = "";
  }
}

// listen to BOTH
firstSelect.addEventListener("change", updateBoth);
secondSelect.addEventListener("change", updateBoth);

// run once on load
updateBoth();


});

// Handle disclaimer buttons
document.getElementById("agree-btn").addEventListener("click", function () {
  document.getElementById("disclaimer-modal").style.display = "none";
  document.getElementById("main-form").style.display = "block";
});
