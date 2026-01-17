# 🐳 Hotel Reservation System - Docker Guide

This guide explains how to run the application with Docker and how to migrate to a containerless execution.

---

## 📋 Prerequisites

- **Docker Desktop** installed ([Download](https://www.docker.com/products/docker-desktop))
- **Docker Compose** (included with Docker Desktop)

---

## 🚀 Quick Start with Docker

### 1. Start all services

Open PowerShell in the project directory and run:

```powershell
cd c:\Users\iboul\Documents\NIIT\hotel-reservation-system
docker-compose up -d
```

This command will:
- ✅ Create MySQL database
- ✅ Build and start Spring Boot backend
- ✅ Build and start React frontend
- ✅ Configure network between services

### 2. Check status

```powershell
docker-compose ps
```

You should see 3 services in "Up" state:
- `hotel-mysql` (port 3306)
- `hotel-backend` (port 8080)
- `hotel-frontend` (port 80)

### 3. Access the application

- **Frontend**: http://localhost
- **Backend API**: http://localhost:8080/api

### 4. View logs

```powershell
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mysql
```

### 5. Stop the application

```powershell
# Stop without removing containers
docker-compose stop

# Stop and remove containers
docker-compose down

# Stop and remove containers + volumes (delete database data)
docker-compose down -v
```

---

## 🔧 Useful Docker Commands

### Container Management

```powershell
# Restart a specific service
docker-compose restart backend

# Rebuild a service
docker-compose up -d --build backend

# View running containers
docker ps

# Access container shell
docker exec -it hotel-backend bash
docker exec -it hotel-mysql mysql -uroot -proot hotel_db
```

### Volume Management

```powershell
# List volumes
docker volume ls

# Inspect volume
docker volume inspect hotel-reservation-system_mysql-data
docker volume inspect hotel-reservation-system_uploads-data

# Remove all unused volumes
docker volume prune
```

### Image Management

```powershell
# List images
docker images

# Remove unused images
docker image prune

# Remove specific image
docker rmi hotel-reservation-system-backend
```

---

## 🔍 Troubleshooting

### Port conflicts

If port 80, 3306, or 8080 is already in use:

**Option 1**: Modify `docker-compose.yml`
```yaml
services:
  frontend:
    ports:
      - "8081:80"  # Change 80 to 8081
```

**Option 2**: Stop conflicting service
```powershell
# Find process using port
netstat -ano | findstr :80
# Kill process (replace PID)
taskkill /PID <PID> /F
```

### Services not starting

```powershell
# Check logs
docker-compose logs backend

# Rebuild from scratch
docker-compose down -v
docker-compose up -d --build
```

### Database connection errors

```powershell
# Wait for MySQL to be ready
docker-compose logs mysql | findstr "ready for connections"

# Verify database
docker exec -it hotel-mysql mysql -uroot -proot -e "SHOW DATABASES;"
```

### Image upload not persisting

Check if volume is properly mounted:
```powershell
docker volume inspect hotel-reservation-system_uploads-data
docker exec -it hotel-backend ls -la /app/uploads
```

---

## 🔄 Migrate from Docker to Local Execution

### Prerequisites

- **Java 17** or higher
- **Maven 3.8+**
- **Node.js 18+** and npm
- **MySQL 8.0** installed locally

### Step 1: Setup MySQL locally

1. Install MySQL 8.0
2. Create database and user:

```sql
CREATE DATABASE hotel_db;
CREATE USER 'hoteluser'@'localhost' IDENTIFIED BY 'hotelpass';
GRANT ALL PRIVILEGES ON hotel_db.* TO 'hoteluser'@'localhost';
FLUSH PRIVILEGES;
```

3. Import initial data:
```powershell
mysql -uroot -p hotel_db < backend/src/main/resources/data.sql
```

### Step 2: Configure Backend

Update `backend/src/main/resources/application.properties`:

```properties
# Change MySQL host from 'mysql' to 'localhost'
spring.datasource.url=jdbc:mysql://localhost:3306/hotel_db
spring.datasource.username=hoteluser
spring.datasource.password=hotelpass
```

### Step 3: Run Backend

```powershell
cd backend
mvn clean install
mvn spring-boot:run
```

Backend will run on http://localhost:8080

### Step 4: Configure Frontend

Update `frontend/src/services/apiService.ts`:

```typescript
// Change base URL
const API_BASE_URL = 'http://localhost:8080/api';
```

### Step 5: Run Frontend

```powershell
cd frontend
npm install
npm run dev
```

Frontend will run on http://localhost:5173

---

## 📦 Docker Architecture

### Services

**mysql**
- Image: mysql:8.0
- Port: 3306
- Volume: mysql-data (persistent database)
- Environment: root password, database name

**backend**
- Build: backend/Dockerfile
- Port: 8080
- Depends on: mysql
- Volume: uploads-data (persistent images)
- Environment: JWT config, database connection

**frontend**
- Build: frontend/Dockerfile
- Port: 80
- Nginx configuration for SPA routing
- Proxy /api requests to backend:8080

### Volumes

- `mysql-data`: MySQL database files
- `uploads-data`: Uploaded room images

### Network

All services communicate on default Docker network:
- Frontend → Backend: http://backend:8080
- Backend → MySQL: jdbc:mysql://mysql:3306/hotel_db

---

## 🔐 Production Deployment

### Security Checklist

- [ ] Change MySQL root password
- [ ] Use strong JWT secret key
- [ ] Enable HTTPS (nginx SSL)
- [ ] Configure CORS properly
- [ ] Use environment variables for secrets
- [ ] Enable rate limiting
- [ ] Set up backup for volumes

### Environment Variables

Create `.env` file:
```env
MYSQL_ROOT_PASSWORD=strong_password
JWT_SECRET=your_very_long_secret_key_here
JWT_EXPIRATION=86400000
```

Update `docker-compose.yml`:
```yaml
environment:
  - MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD}
```

---

## 📊 Monitoring

### Health Checks

```powershell
# Backend health
curl http://localhost:8080/actuator/health

# Database connection
docker exec hotel-mysql mysqladmin -uroot -proot ping
```

### Resource Usage

```powershell
# Container stats
docker stats

# Specific service
docker stats hotel-backend
```

---

## 🌍 Documentation

- [English Version](DOCKER_GUIDE.md) - English version
- [French Version](DOCKER_GUIDE_FR.md) - Version française

---

## 💡 Tips

1. **Development**: Use `docker-compose up` (without `-d`) to see logs in terminal
2. **Hot Reload**: Mount source code as volumes for auto-reload
3. **Clean Start**: Use `docker-compose down -v && docker-compose up -d --build`
4. **Backup**: Export volumes before major changes
5. **Logs**: Check logs first when troubleshooting

---

**Need help?** Check the main [README](README.md) or open an issue.
