# Hotel Reservation System - Backend

Spring Boot backend application for Hotel Reservation System.

## Prerequisites

- Java 17 or higher
- Maven 3.6+
- MySQL 8.0+

## Setup Instructions

1. **Create MySQL Database**
   ```sql
   CREATE DATABASE hotel_db;
   ```

2. **Configure Database**
   - Database credentials are configured in `src/main/resources/application.properties`
   - Default settings:
     - Database: `hotel_db`
     - Username: `root`
     - Password: `root`
   - Update these values if your MySQL configuration is different

3. **Build the Project**
   ```bash
   mvn clean install
   ```

4. **Run the Application**
   ```bash
   mvn spring-boot:run
   ```

The application will start on `http://localhost:8080`

## Project Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/hotel/reservation/
│   │   │   ├── HotelReservationApplication.java
│   │   │   ├── entity/          # JPA Entities
│   │   │   ├── repository/      # Spring Data JPA Repositories
│   │   │   ├── service/         # Business Logic Layer
│   │   │   ├── controller/      # REST Controllers
│   │   │   ├── config/          # Configuration Classes
│   │   │   ├── dto/             # Data Transfer Objects
│   │   │   └── security/        # Security Components
│   │   └── resources/
│   │       └── application.properties
│   └── test/
└── pom.xml
```

## Technologies Used

- Spring Boot 3.2.1
- Spring Data JPA
- Spring Security
- MySQL Database
- Lombok
- Bean Validation
- Maven

## API Endpoints

To be defined based on requirements.
