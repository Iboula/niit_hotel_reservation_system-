# Reset Database Script
# This script drops all tables and recreates them with seed data

Write-Host "⚠️  WARNING: This will DELETE all data in the database!" -ForegroundColor Red
Write-Host ""
$confirmation = Read-Host "Type 'YES' to confirm"

if ($confirmation -ne 'YES') {
    Write-Host "❌ Operation cancelled" -ForegroundColor Yellow
    exit
}

Write-Host ""
Write-Host "🗑️  Dropping all tables..." -ForegroundColor Cyan

# Drop all tables
$dropTables = @"
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS reservations;
DROP TABLE IF EXISTS guests;
DROP TABLE IF EXISTS rooms;
DROP TABLE IF EXISTS users;
SET FOREIGN_KEY_CHECKS = 1;
"@

docker exec -i hotel-mysql mysql -uroot -proot hotel_db -e $dropTables

Write-Host "✅ Tables dropped" -ForegroundColor Green
Write-Host ""
Write-Host "🔄 Restarting backend to recreate tables..." -ForegroundColor Cyan

# Restart backend to let Hibernate recreate tables
docker-compose restart backend

Write-Host "⏳ Waiting for backend to start (15 seconds)..." -ForegroundColor Yellow
Start-Sleep -Seconds 15

Write-Host ""
Write-Host "🌱 Seeding database..." -ForegroundColor Cyan

# Run seed script
& "$PSScriptRoot\seed-data.ps1"
