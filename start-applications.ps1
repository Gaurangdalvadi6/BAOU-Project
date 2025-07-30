Write-Host "Starting Car Rental Application..." -ForegroundColor Green
Write-Host ""

Write-Host "Starting Spring Boot Backend..." -ForegroundColor Yellow
Write-Host "Please ensure MySQL is running and database 'car_rental_app' exists" -ForegroundColor Cyan
Write-Host "Backend will be available at: http://localhost:8080" -ForegroundColor Cyan
Write-Host ""

# Start Spring Boot backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "mvn spring-boot:run" -WindowStyle Normal

Write-Host ""
Write-Host "Waiting 10 seconds for backend to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

Write-Host ""
Write-Host "Starting React Frontend..." -ForegroundColor Yellow
Write-Host "Frontend will be available at: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""

# Change to frontend directory and start React app
Set-Location "car-rental-frontend"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm start" -WindowStyle Normal

Write-Host ""
Write-Host "Applications are starting..." -ForegroundColor Green
Write-Host "Backend: http://localhost:8080" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to exit this script (applications will continue running)" -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") 