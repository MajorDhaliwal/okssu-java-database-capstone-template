/*
  doctorCard.js

  Import the overlay function for booking appointments from loggedPatient.js
  Import the deleteDoctor API function to remove doctors (admin role) from doctorServices.js
  Import function to fetch patient details (used during booking) from patientServices.js
*/

import { showBookingOverlay } from "./modals.js";
import { deleteDoctor } from "../services/doctorServices.js";
import { getPatientData } from "../services/patientServices.js";

/*
  Function to create and return a DOM element for a single doctor card
*/
export function createDoctorCard(doctor) {
  // Create the main container for the doctor card
  const card = document.createElement("div");
  card.classList.add("doctor-card");

  // Retrieve the current user role from localStorage
  const role = localStorage.getItem("userRole");

  // Create a div to hold doctor information
  const infoDiv = document.createElement("div");
  infoDiv.classList.add("doctor-info");

  // Create and set the doctor’s name
  const name = document.createElement("h3");
  name.textContent = doctor.name;

  // Create and set the doctor's specialization
  const specialization = document.createElement("p");
  specialization.textContent = `Specialty: ${doctor.specialty}`;

  // Create and set the doctor's email
  const email = document.createElement("p");
  email.textContent = `Email: ${doctor.email}`;

  // Create and list available appointment times
  const availability = document.createElement("p");
  availability.textContent = `Available: ${doctor.availability?.join(", ") || "N/A"}`;

  // Append all info elements to the doctor info container
  infoDiv.appendChild(name);
  infoDiv.appendChild(specialization);
  infoDiv.appendChild(email);
  infoDiv.appendChild(availability);

  // Create a container for card action buttons
  const actionsDiv = document.createElement("div");
  actionsDiv.classList.add("card-actions");

  // === ADMIN ROLE ACTIONS ===
  if (role === "admin") {
    // Create a delete button
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Delete";

    // Add click handler for delete button
    removeBtn.addEventListener("click", async () => {
      const confirmDelete = confirm(`Are you sure you want to delete Dr. ${doctor.name}?`);
      if (!confirmDelete) return;

      // Get the admin token from localStorage
      const token = localStorage.getItem("token");

      try {
        // Call API to delete the doctor
        const success = await deleteDoctor(doctor.id, token);
        if (success) {
          card.remove(); // Remove card from DOM
          alert("Doctor deleted successfully.");
        } else {
          alert("Failed to delete doctor.");
        }
      } catch (err) {
        console.error("Error deleting doctor:", err);
        alert("An error occurred while deleting the doctor.");
      }
    });

    // Add delete button to actions container
    actionsDiv.appendChild(removeBtn);
  }

  // === PATIENT (NOT LOGGED-IN) ROLE ACTIONS ===
  else if (role === "patient") {
    // Create a book now button
    const bookNow = document.createElement("button");
    bookNow.textContent = "Book Now";

    // Alert patient to log in before booking
    bookNow.addEventListener("click", () => {
      alert("Please log in to book an appointment.");
    });

    // Add button to actions container
    actionsDiv.appendChild(bookNow);
  }

  // === LOGGED-IN PATIENT ROLE ACTIONS === 
  else if (role === "loggedPatient") {
    // Create a book now button
    const bookNow = document.createElement("button");
    bookNow.textContent = "Book Now";

    // Handle booking logic for logged-in patient
    bookNow.addEventListener("click", async (e) => {
      const token = localStorage.getItem("token");

      // Redirect if token not available
      if (!token) {
        alert("Session expired. Please log in again.");
        window.location.href = "/login.html";
        return;
      }

      try {
        // Fetch patient data with token
        const patientData = await getPatientData(token);

        // Show booking overlay UI with doctor and patient info
        showBookingOverlay(e, doctor, patientData);
      } catch (err) {
        console.error("Error during booking process:", err);
        alert("Unable to fetch patient information. Please try again later.");
      }
    });

    // Add button to actions container
    actionsDiv.appendChild(bookNow);
  }

  // Append doctor info and action buttons to the card
  card.appendChild(infoDiv);
  card.appendChild(actionsDiv);

  // Return the complete doctor card element
  return card;
}
