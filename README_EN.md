# Hotel Reservation System

A complete hotel reservation management application built with Spring Boot and React.

## 🏗️ Architecture

- **Backend**: Spring Boot 3.2.1 + MySQL
- **Frontend**: React 18 + TypeScript + Vite
- **Security**: JWT Authentication
- **Deployment**: Docker + Docker Compose

## 📁 Project Structure

```
hotel-reservation-system/
├── backend/              # Spring Boot API
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile
├── frontend/             # React App
│   ├── src/
│   ├── package.json
│   ├── nginx.conf
│   └── Dockerfile
├── docker-compose.yml    # Orchestration
└── DOCKER_GUIDE.md      # Detailed guide
```

## 🚀 Quick Start

### With Docker (Recommended)

```bash
# Start the complete application
docker-compose up -d

# Access the application
# Frontend: http://localhost
# Backend: http://localhost:8080
```

### Without Docker

See [DOCKER_GUIDE.md](DOCKER_GUIDE.md) for detailed instructions.

## ✨ Features

### Users
- ✅ Registration / Login
- ✅ JWT Authentication
- ✅ Profile Management

### Rooms
- ✅ Room Listing
- ✅ Search and Filtering
- ✅ Room Details
- ✅ Availability Check

### Reservations
- ✅ Create Reservation
- ✅ View My Reservations
- ✅ Cancel Reservation
- ✅ Reservation Confirmation

### Administration
- ✅ Room Management (CRUD)
- ✅ Reservation Management
- ✅ Guest Management

## 🛠️ Technologies

### Backend
- Spring Boot 3.2.1
- Spring Data JPA
- Spring Security
- JWT (io.jsonwebtoken)
- MySQL 8.0
- Lombok
- Maven

### Frontend
- React 18
- TypeScript
- Vite
- React Router v6
- Axios
- React Hook Form
- React Toastify

### DevOps
- Docker
- Docker Compose
- Nginx

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login

### Users
- `GET /api/users` - List users
- `GET /api/users/{id}` - Get user details
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

### Rooms
- `GET /api/rooms` - List rooms
- `GET /api/rooms/{id}` - Get room details
- `POST /api/rooms` - Create room
- `PUT /api/rooms/{id}` - Update room
- `DELETE /api/rooms/{id}` - Delete room
- `GET /api/rooms/search` - Search rooms
- `GET /api/rooms/available` - Check availability

### Guests
- `GET /api/guests` - List guests
- `GET /api/guests/{id}` - Get guest details
- `POST /api/guests` - Create guest
- `PUT /api/guests/{id}` - Update guest
- `DELETE /api/guests/{id}` - Delete guest

### Reservations
- `GET /api/reservations` - List reservations
- `GET /api/reservations/{id}` - Get reservation details
- `POST /api/reservations` - Create reservation
- `PUT /api/reservations/{id}` - Update reservation
- `DELETE /api/reservations/{id}` - Delete reservation
- `PUT /api/reservations/{id}/confirm` - Confirm reservation
- `PUT /api/reservations/{id}/cancel` - Cancel reservation

## 🔒 Security

- JWT Authentication
- BCrypt password hashing
- CORS configured
- Stateless sessions
- Role-based endpoint protection (USER/ADMIN)

## 🗄️ Database

### Entities
- **User** - System users
- **Room** - Available rooms
- **Guest** - Guest information
- **Reservation** - Reservations

### Relationships
- User ↔ Guest (One-to-Many)
- Room ↔ Reservation (One-to-Many)
- Guest ↔ Reservation (One-to-Many)

## 📖 Complete Documentation

See [DOCKER_GUIDE.md](DOCKER_GUIDE.md) for:
- Detailed installation guide
- Docker and local configuration
- Container → non-container migration
- Troubleshooting
- Useful commands

## 🎯 Usage

1. **Start the application**
   ```bash
   docker-compose up -d
   ```

2. **Create an admin account** (via API or database)

3. **Add rooms** (via admin panel)

4. **Test reservations**

## 🛑 Stop the Application

```bash
# Stop
docker-compose stop

# Stop and remove containers
docker-compose down

# Remove everything (containers + data)
docker-compose down -v
```

## 📝 Environment Variables

### Backend
```properties
SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/hotel_db
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=root
JWT_SECRET=hotelReservationSecretKey...
JWT_EXPIRATION=86400000
```

### Frontend
Variables are configured in code (no .env needed for Docker)

## 🌍 Documentation

- [French Version](README.md) - Version française
- [English Version](README_EN.md) - English version

## 📄 License

This project is part of NIIT educational program.

## 👨‍💻 Author

Developed with ❤️ for NIIT project
