## MySQL Database Design

The following tables capture the core operational data for a smart clinic system.

---

### Table: patients
- id: INT, Primary Key, AUTO_INCREMENT
- first_name: VARCHAR(100), NOT NULL
- last_name: VARCHAR(100), NOT NULL
- date_of_birth: DATE, NOT NULL
- gender: ENUM('Male', 'Female', 'Other')
- email: VARCHAR(255), UNIQUE
- phone: VARCHAR(20)
- created_at: DATETIME, DEFAULT CURRENT_TIMESTAMP

> Each patient is uniquely identified by an auto-incremented ID. Email is optional but unique when present. Basic demographic data is required.

---

### Table: doctors
- id: INT, Primary Key, AUTO_INCREMENT
- first_name: VARCHAR(100), NOT NULL
- last_name: VARCHAR(100), NOT NULL
- specialization: VARCHAR(100), NOT NULL
- email: VARCHAR(255), UNIQUE, NOT NULL
- phone: VARCHAR(20)
- available_hours: TEXT
- created_at: DATETIME, DEFAULT CURRENT_TIMESTAMP

> Doctors must have a specialization. Available hours can be a serialized JSON string or handled via a separate availability table if needed later.

---

### Table: appointments
- id: INT, Primary Key, AUTO_INCREMENT
- doctor_id: INT, Foreign Key → doctors(id), NOT NULL
- patient_id: INT, Foreign Key → patients(id), NOT NULL
- appointment_time: DATETIME, NOT NULL
- status: ENUM('Scheduled', 'Completed', 'Cancelled'), DEFAULT 'Scheduled'
- notes: TEXT

> Appointments link a doctor to a patient at a specific time. Notes can capture visit details or issues discussed.

---

### Table: prescriptions
- id: INT, Primary Key, AUTO_INCREMENT
- appointment_id: INT, Foreign Key → appointments(id), NOT NULL
- medication_name: VARCHAR(255), NOT NULL
- dosage: VARCHAR(100), NOT NULL
- instructions: TEXT

> A prescription is tied to a specific appointment. This enforces medical accountability and history traceability.

---

### Table: admins
- id: INT, Primary Key, AUTO_INCREMENT
- username: VARCHAR(50), UNIQUE, NOT NULL
- password_hash: VARCHAR(255), NOT NULL
- email: VARCHAR(255), UNIQUE, NOT NULL
- role: ENUM('admin', 'super_admin'), DEFAULT 'admin'

> Admins can log in to manage the system. Passwords should be stored securely as hashes.

---

### Table: payments
- id: INT, Primary Key, AUTO_INCREMENT
- patient_id: INT, Foreign Key → patients(id), NOT NULL
- appointment_id: INT, Foreign Key → appointments(id), NOT NULL
- amount: DECIMAL(10,2), NOT NULL
- payment_date: DATETIME, DEFAULT CURRENT_TIMESTAMP
- payment_method: ENUM('Credit Card', 'Cash', 'Insurance')

> Payments are recorded per appointment. This allows the clinic to track finances and link payments directly to services rendered.

---

### Table: clinic_locations (optional, for multi-site clinics)
- id: INT, Primary Key, AUTO_INCREMENT
- name: VARCHAR(100), NOT NULL
- address: VARCHAR(255), NOT NULL
- phone: VARCHAR(20)

> Useful if the system expands to multiple clinic branches.

---

### Table: doctor_availability (optional, if you want to normalize time slots)
- id: INT, Primary Key, AUTO_INCREMENT
- doctor_id: INT, Foreign Key → doctors(id), NOT NULL
- day_of_week: ENUM('Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'), NOT NULL
- start_time: TIME, NOT NULL
- end_time: TIME, NOT NULL

> Provides a normalized and flexible way to handle doctor working hours per day.

---

## MongoDB Collection Design

MongoDB handles flexible or user-generated data. Here's an example `messages` collection for storing patient-doctor communication.

### Collection: messages

```json
{
  "_id": "ObjectId('6660ab12efc1a11b223cc789')",
  "appointmentId": 120,
  "patientId": 36,
  "doctorId": 9,
  "sender": {
    "role": "doctor",
    "name": "Dr. Emily Wong"
  },
  "message": "Please remember to take your blood pressure reading before your next visit.",
  "sentAt": "2025-06-13T14:45:12Z",
  "read": false,
  "attachments": [
    {
      "fileName": "bp-instructions.pdf",
      "fileType": "pdf",
      "url": "https://clinic-files.s3.amazonaws.com/bp-instructions.pdf"
    }
  ],
  "tags": ["reminder", "instructions"],
  "schemaVersion": 1
}
