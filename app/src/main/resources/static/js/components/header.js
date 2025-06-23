/*
  header.js
  This file dynamically renders the header based on user role, session state, and current page context.
*/

function renderHeader() {
  // 2. Select the Header Div
  const headerDiv = document.getElementById("header");

  // 3. Check if current page is the root (homepage)
  if (window.location.pathname.endsWith("/")) {
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
    headerDiv.innerHTML = `
      <header class="header">
        <div class="logo-section">
          <img src="../assets/images/logo/logo.png" alt="Hospital CRM Logo" class="logo-img">
          <span class="logo-title">Hospital CMS</span>
        </div>
      </header>`;
    return;
  }

  // 4. Retrieve the User's Role and Token
  const role = localStorage.getItem("userRole");
  const token = localStorage.getItem("token");

  // 5. Initialize the Header Content (start with logo and nav)
  let headerContent = `<header class="header">
    <div class="logo-section">
      <img src="../assets/images/logo/logo.png" alt="Hospital CRM Logo" class="logo-img">
      <span class="logo-title">Hospital CMS</span>
    </div>
    <nav>`;

  // 6. Handle Session Expiry or Invalid Login
  if ((role === "loggedPatient" || role === "admin" || role === "doctor") && !token) {
    localStorage.removeItem("userRole");
    alert("Session expired or invalid login. Please log in again.");
    window.location.href = "/";
    return;
  }

  // 7. Add Role-Specific Header Content
  if (role === "admin") {
    headerContent += `
      <button id="addDocBtn" class="adminBtn" onclick="openModal('addDoctor')">Add Doctor</button>
      <a href="#" id="logoutLink">Logout</a>`;
  } else if (role === "doctor") {
    headerContent += `
      <button class="adminBtn" onclick="window.location.href='/doctorDashboard.html'">Home</button>
      <a href="#" id="logoutLink">Logout</a>`;
  } else if (role === "patient") {
    headerContent += `
      <button id="patientLogin" class="adminBtn">Login</button>
      <button id="patientSignup" class="adminBtn">Sign Up</button>`;
  } else if (role === "loggedPatient") {
    headerContent += `
      <button id="home" class="adminBtn" onclick="window.location.href='/pages/loggedPatientDashboard.html'">Home</button>
      <button id="patientAppointments" class="adminBtn" onclick="window.location.href='/pages/patientAppointments.html'">Appointments</button>
      <a href="#" id="logoutPatientLink">Logout</a>`;
  }

  // 9. Close the Header Section
  headerContent += `</nav></header>`;

  // 10. Render the Header Content
  headerDiv.innerHTML = headerContent;

  // 11. Attach Event Listeners to Header Buttons
  attachHeaderButtonListeners();
}

/*
  13. attachHeaderButtonListeners:
  Attaches 'click' event listeners to dynamic elements after header rendering
*/
function attachHeaderButtonListeners() {
  const logoutLink = document.getElementById("logoutLink");
  if (logoutLink) {
    logoutLink.addEventListener("click", logout);
  }

  const logoutPatientLink = document.getElementById("logoutPatientLink");
  if (logoutPatientLink) {
    logoutPatientLink.addEventListener("click", logoutPatient);
  }

  const loginBtn = document.getElementById("patientLogin");
  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      window.location.href = "/login.html";
    });
  }

  const signupBtn = document.getElementById("patientSignup");
  if (signupBtn) {
    signupBtn.addEventListener("click", () => {
      window.location.href = "/signup.html";
    });
  }
}

/*
  14. logout:
  Clears all session data and redirects to homepage
*/
function logout() {
  localStorage.removeItem("userRole");
  localStorage.removeItem("token");
  window.location.href = "/";
}

/*
  15. logoutPatient:
  Clears token only, and downgrades role to "patient" for login/signup access
*/
function logoutPatient() {
  localStorage.removeItem("token");
  localStorage.setItem("userRole", "patient");
  window.location.href = "/pages/patientDashboard.html";
}

/*
  16. Render the Header on Page Load
*/
document.addEventListener("DOMContentLoaded", renderHeader);
