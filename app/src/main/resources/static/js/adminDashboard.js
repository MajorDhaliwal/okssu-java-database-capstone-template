/*
  This script handles the admin dashboard functionality for managing doctors:
  - Loads all doctor cards
  - Filters doctors by name, time, or specialty
  - Adds a new doctor via modal form


  Attach a click listener to the "Add Doctor" button
  When clicked, it opens a modal form using openModal('addDoctor')


  When the DOM is fully loaded:
    - Call loadDoctorCards() to fetch and display all doctors


  Function: loadDoctorCards
  Purpose: Fetch all doctors and display them as cards

    Call getDoctors() from the service layer
    Clear the current content area
    For each doctor returned:
    - Create a doctor card using createDoctorCard()
    - Append it to the content div

    Handle any fetch errors by logging them


  Attach 'input' and 'change' event listeners to the search bar and filter dropdowns
  On any input change, call filterDoctorsOnChange()


  Function: filterDoctorsOnChange
  Purpose: Filter doctors based on name, available time, and specialty

    Read values from the search bar and filters
    Normalize empty values to null
    Call filterDoctors(name, time, specialty) from the service

    If doctors are found:
    - Render them using createDoctorCard()
    If no doctors match the filter:
    - Show a message: "No doctors found with the given filters."

    Catch and display any errors with an alert


  Function: renderDoctorCards
  Purpose: A helper function to render a list of doctors passed to it

    Clear the content area
    Loop through the doctors and append each card to the content area


  Function: adminAddDoctor
  Purpose: Collect form data and add a new doctor to the system

    Collect input values from the modal form
    - Includes name, email, phone, password, specialty, and available times

    Retrieve the authentication token from localStorage
    - If no token is found, show an alert and stop execution

    Build a doctor object with the form values

    Call saveDoctor(doctor, token) from the service

    If save is successful:
    - Show a success message
    - Close the modal and reload the page

    If saving fails, show an error message
*/

// Import Required Modules
import { openModal } from '../components/modals.js';
import { getDoctors, filterDoctors, saveDoctor } from './services/doctorServices.js';
import { createDoctorCard } from './components/doctorCard.js';

// Load all doctors when the page is loaded
window.addEventListener('DOMContentLoaded', loadDoctorCards);

// Bind event to "Add Doctor" button
document.getElementById('addDocBtn')?.addEventListener('click', () => {
  openModal('addDoctor');
});

// Bind search and filter events
document.getElementById('searchBar')?.addEventListener('input', filterDoctorsOnChange);
document.getElementById('filterTime')?.addEventListener('change', filterDoctorsOnChange);
document.getElementById('filterSpecialty')?.addEventListener('change', filterDoctorsOnChange);

// Load and render all doctors
async function loadDoctorCards() {
  const contentDiv = document.getElementById('content');
  contentDiv.innerHTML = '';

  const doctors = await getDoctors();
  renderDoctorCards(doctors);
}

// Render list of doctor cards
function renderDoctorCards(doctors) {
  const contentDiv = document.getElementById('content');
  contentDiv.innerHTML = '';

  if (doctors.length === 0) {
    contentDiv.innerHTML = '<p>No doctors found.</p>';
    return;
  }

  doctors.forEach(doctor => {
    const card = createDoctorCard(doctor);
    contentDiv.appendChild(card);
  });
}

// Filter doctors based on search and dropdowns
async function filterDoctorsOnChange() {
  const name = document.getElementById('searchBar')?.value || '';
  const time = document.getElementById('filterTime')?.value || '';
  const specialty = document.getElementById('filterSpecialty')?.value || '';

  const filtered = await filterDoctors(name, time, specialty);
  renderDoctorCards(filtered);
}

// Handle Add Doctor form submission
window.adminAddDoctor = async function () {
  const name = document.getElementById('docName')?.value;
  const specialty = document.getElementById('docSpecialty')?.value;
  const email = document.getElementById('docEmail')?.value;
  const password = document.getElementById('docPassword')?.value;
  const mobile = document.getElementById('docMobile')?.value;
  const time = document.getElementById('docTime')?.value;

  // Optional: collect checkbox availability if applicable
  // const availability = [...document.querySelectorAll('.availabilityCheckbox:checked')].map(cb => cb.value);

  const token = localStorage.getItem('token');
  if (!token) {
    alert('Admin not authenticated. Please log in.');
    return;
  }

  const doctor = {
    name,
    specialty,
    email,
    password,
    mobile,
    time,
    // availability, // Uncomment if collecting from checkboxes
  };

  const result = await saveDoctor(doctor, token);
  if (result.success) {
    alert('Doctor added successfully!');
    document.getElementById('addDoctorModal').style.display = 'none';
    loadDoctorCards();
  } else {
    alert(`Failed to add doctor: ${result.message}`);
  }
};
