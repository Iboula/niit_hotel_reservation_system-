# Seed Data Script for Hotel Reservation System
# This script populates the database with test data

Write-Host "🌱 Seeding database with test data..." -ForegroundColor Green

# Copy SQL file to MySQL container
Write-Host "📁 Copying seed data file to container..." -ForegroundColor Cyan
docker cp backend/src/main/resources/data.sql hotel-mysql:/tmp/data.sql

# Execute SQL file
Write-Host "🔄 Executing SQL seed script..." -ForegroundColor Cyan
docker exec -i hotel-mysql mysql -uroot -proot hotel_db -e "source /tmp/data.sql"

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Database seeded successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📊 Test Data Summary:" -ForegroundColor Yellow
    Write-Host "  • 4 Users (1 Admin, 3 Regular)" -ForegroundColor White
    Write-Host "  • 15 Rooms (3 Single, 5 Double, 3 Suite, 3 Deluxe)" -ForegroundColor White
    Write-Host "  • 6 Guests" -ForegroundColor White
    Write-Host "  • 8 Reservations (various statuses)" -ForegroundColor White
    Write-Host ""
    Write-Host "🔐 Login Credentials:" -ForegroundColor Yellow
    Write-Host "  Admin:" -ForegroundColor Cyan
    Write-Host "    Username: admin" -ForegroundColor White
    Write-Host "    Password: password" -ForegroundColor White
    Write-Host ""
    Write-Host "  Regular Users:" -ForegroundColor Cyan
    Write-Host "    Username: john.doe / jane.smith / bob.wilson" -ForegroundColor White
    Write-Host "    Password: password (for all)" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host "❌ Failed to seed database!" -ForegroundColor Red
    Write-Host "Make sure the Docker containers are running: docker-compose ps" -ForegroundColor Yellow
}
