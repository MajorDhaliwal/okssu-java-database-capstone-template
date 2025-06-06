/* 

 Import necessary modules:
   - getDoctors: Fetches all doctors from the backend.
   - openModal: Opens modal dialogs (Signup/Login).
   - createDoctorCard: Renders individual doctor cards.
   - filterDoctors: Used to search and filter doctors by name, time, or specialty.
   - patientSignup, patientLogin: Functions for user registration and login.

 Initialize the page:
   - On DOMContentLoaded, load all doctor cards onto the page.
   - Attach event listeners for:
     - "Patient Signup" button: Opens signup modal.
     - "Patient Login" button: Opens login modal.

 Display all doctor cards:
   - Use loadDoctorCards() to fetch and render each doctor as a card.
   - If data fails to load, log the error in the console.

 Enable doctor filtering:
   - Users can search by name, or filter by time and specialty.
   - On input/change, call filterDoctors() to fetch matching doctors.
   - Update the DOM with new cards or show a message if none found.

 Utility function: renderDoctorCards()
   - This function simply re-renders a given list of doctor objects.

 Patient Signup Flow:
   - Collect input values from the signup form (name, email, password, etc).
   - Call patientSignup() with the data.
   - On success: Show a message, close modal, reload the page.
   - On failure: Show an alert with the error message.

 Patient Login Flow:
   - Collect credentials from the login form.
   - Call patientLogin(), then check the HTTP response:
     - If successful: Extract token, save to localStorage, redirect to logged-in dashboard.
     - If failed: Alert the user about incorrect credentials.
   - Errors are logged in the console and shown via alerts.

*/
