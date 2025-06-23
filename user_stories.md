# User Story Template

**Title:**
_As a [user role], I want [feature/goal], so that [reason]._

**Acceptance Criteria:**
1. [Criteria 1]
2. [Criteria 2]
3. [Criteria 3]

**Priority:** [High/Medium/Low]
**Story Points:** [Estimated Effort in Points]
**Notes:**
- [Additional information or edge cases]

## Admin User Stories
User Story 1





Title:


As an admin, I want to log into the portal with my username and password, so that I can manage the platform securely.


✅ Acceptance Criteria





Admin can access a login page





Admin can submit credentials (username and password)





Admin receives an error message for invalid credentials





    Admin is redirected to the admin dashboard upon successful login





🔢 Priority & Effort





    Priority: High





    Story Points: 3





📝 Notes





    Consider basic input validation and encryption





    Edge case: Account lockout after multiple failed attempts





User Story 2





Title:


As an admin, I want to log out of the portal, so that I can protect system access.


✅ Acceptance Criteria





Admin can click a "Logout" button from any page





Session is destroyed on logout





    Admin is redirected to the login screen





🔢 Priority & Effort





    Priority: High





    Story Points: 2





📝 Notes





    Ensure proper session invalidation





    Consider implementing CSRF protection





User Story 3





Title:


As an admin, I want to add doctors to the portal, so that they can access and manage their patient appointments.


✅ Acceptance Criteria





Admin can open a "Add Doctor" form





Admin can input name, email, and specialty





Admin receives confirmation when a doctor is successfully added





    New doctor appears in the list of active doctors





🔢 Priority & Effort





    Priority: High





    Story Points: 3





📝 Notes





    Validate unique email addresses





    Consider optional profile picture upload in future versions





User Story 4





Title:


As an admin, I want to delete a doctor’s profile from the portal, so that I can remove inactive or incorrect records.


✅ Acceptance Criteria





Admin can select a doctor from a list





Admin is prompted with a confirmation before deletion





Doctor is removed from the active database





    Deleted doctor no longer appears in searches or lists





🔢 Priority & Effort





    Priority: Medium





    Story Points: 2





📝 Notes





    Consider soft delete vs. hard delete





    Deleting a doctor should not delete historical appointment data





User Story 5





Title:


As an admin, I want to run a stored procedure in the MySQL CLI to get the number of appointments per month, so that I can track usage statistics.


✅ Acceptance Criteria





Stored procedure is documented and accessible via CLI





Procedure returns appointment count grouped by month





    Output includes at least the last 6 months of data





🔢 Priority & Effort





    Priority: Medium





    Story Points: 2





📝 Notes





    Stored procedure should use proper indexing for performance





    Consider exporting results to a CSV or dashboard in future







## Patient User Stories

User Story 1





Title:


As a patient, I want to view a list of doctors without logging in, so that I can explore my options before registering.


✅ Acceptance Criteria





Public homepage displays a list of available doctors





Each doctor entry includes name, specialty, and availability





    No login is required to access the list





🔢 Priority & Effort





    Priority: High





    Story Points: 2





📝 Notes





    Consider pagination or filtering (e.g., by specialty or location)





    Doctor contact details should not be shown until after login





User Story 2





Title:


As a patient, I want to sign up using my email and password, so that I can book appointments.


✅ Acceptance Criteria





Patient can access a registration form





Form collects email and password





System checks for existing accounts





    Confirmation message is displayed on successful sign-up





🔢 Priority & Effort





    Priority: High





    Story Points: 3





📝 Notes





    Implement email validation





    Consider sending a welcome or verification email





User Story 3





Title:


As a patient, I want to log into the portal, so that I can manage my bookings.


✅ Acceptance Criteria





Patient login form is available





Valid credentials redirect the patient to their dashboard





    Invalid credentials show appropriate error messages





🔢 Priority & Effort





    Priority: High





    Story Points: 2





📝 Notes





    Add "Forgot Password?" support in future releases





User Story 4





Title:


As a patient, I want to log out of the portal, so that I can secure my account.


✅ Acceptance Criteria





Patient sees a "Logout" option on all pages after login





Clicking "Logout" ends the session





    Patient is redirected to the public homepage





🔢 Priority & Effort





    Priority: Medium





    Story Points: 1





📝 Notes





    Ensure tokens or cookies are invalidated upon logout





User Story 5





Title:


As a patient, I want to book an hour-long appointment after logging in, so that I can consult with a doctor.


✅ Acceptance Criteria





Patient can select a doctor from the list





Patient can choose an available time slot (1-hour duration)





Confirmation is shown after successful booking





    The booking is saved and reflected in the patient’s dashboard





🔢 Priority & Effort





    Priority: High





    Story Points: 4





📝 Notes





    Prevent double-booking for overlapping slots





    Consider showing doctor availability calendar





User Story 6





Title:


As a patient, I want to view my upcoming appointments, so that I can prepare accordingly.


✅ Acceptance Criteria





Patient dashboard shows all future appointments





Each entry includes doctor name, time, and location





    Appointments are sorted chronologically





🔢 Priority & Effort





    Priority: Medium





    Story Points: 2





📝 Notes





    Add reschedule/cancel option in future sprints








## Docter User Stories


User Story 1





Title:


As a doctor, I want to log into the portal, so that I can manage my appointments.


✅ Acceptance Criteria





Doctor login page is accessible





Valid credentials redirect to the doctor dashboard





    Error is shown for invalid credentials





🔢 Priority & Effort





    Priority: High





    Story Points: 2





📝 Notes





    Consider MFA support in the future





User Story 2





Title:


As a doctor, I want to log out of the portal, so that I can protect my data.


✅ Acceptance Criteria





Doctor can log out from any page





Session is terminated after logout





    User is redirected to the login screen





🔢 Priority & Effort





    Priority: Medium





    Story Points: 1





📝 Notes





    Make sure session data is cleared and cookies are invalidated





User Story 3





Title:


As a doctor, I want to view my appointment calendar, so that I can stay organized.


✅ Acceptance Criteria





Doctor dashboard includes a calendar view





Calendar displays all upcoming appointments





    Each entry shows patient name, time, and date





🔢 Priority & Effort





    Priority: High





    Story Points: 3





📝 Notes





    Consider filtering by day, week, or month





User Story 4





Title:


As a doctor, I want to mark my unavailability, so that patients only see my available slots.


✅ Acceptance Criteria





Doctor can select dates/times to block off availability





Blocked slots are not shown to patients during booking





    Confirmation is displayed after saving changes





🔢 Priority & Effort





    Priority: High





    Story Points: 3





📝 Notes





    Edge case: Prevent blocking time if there's an existing appointment





User Story 5





Title:


As a doctor, I want to update my profile with specialization and contact information, so that patients have up-to-date information.


✅ Acceptance Criteria





Doctor can edit specialization and contact fields





Changes are saved and reflected on patient-facing pages





    Success message shown upon saving





🔢 Priority & Effort





    Priority: Medium





    Story Points: 2





📝 Notes





    Validate proper formats (e.g., phone/email)





User Story 6





Title:


As a doctor, I want to view the patient details for upcoming appointments, so that I can be prepared.


✅ Acceptance Criteria





Appointment entries include patient name and basic details





Doctor can access this info at least 24 hours before the appointmentAdd commentMore actions





    Sensitive information is protected and access-logged





🔢 Priority & Effort





    Priority: High





    Story Points: 3





📝 Notes





    Include emergency contact, if provided by patient
