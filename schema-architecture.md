This Spring Boot application uses both MVC and REST controllers. Thymeleaf templates are used for the Admin and Doctor dashboards, while REST APIs serve all other modules. The application interacts with two databases—MySQL (for patient, doctor, appointment, and admin data) and MongoDB (for prescriptions). All controllers route requests through a common service layer, which in turn delegates to the appropriate repositories. MySQL uses JPA entities while MongoDB uses document models.

<img src="architecture-diagram.png" width="900"/>

1. User accesses either a web page (like AdminDashboard, DoctorDashboard) or uses a client app (like Appointments, PatientDashboard).
2. The request is routed to the correct controller—either a Thymeleaf controller for HTML pages or a REST controller for API calls.
3. The controller calls the service layer, which contains the core business logic.
4. The service layer applies rules (e.g., checks availability, validates input) and coordinates multiple operations.
5. The service then communicates with the repository layer to get or save data.
6. The repository layer accesses the database, using:
   - MySQL for structured data (e.g., users, appointments)
   - MongoDB for flexible data (e.g., prescriptions)
7. The retrieved data is mapped into Java model classes (@Entity for MySQL, @Document for MongoDB).
8. These models are used in the response:
   - For web pages, they go into Thymeleaf templates and render HTML.
   - For API calls, they’re converted to JSON and sent to the client.
