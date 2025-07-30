@echo off
echo Starting Car Rental Application...
echo.

echo Starting Spring Boot Backend...
echo Please ensure MySQL is running and database 'car_rental_app' exists
echo Backend will be available at: http://localhost:8080
echo.
start "Spring Boot Backend" cmd /k "mvn spring-boot:run"

echo.
echo Waiting 10 seconds for backend to start...
timeout /t 10 /nobreak > nul

echo.
echo Starting React Frontend...
echo Frontend will be available at: http://localhost:3000
echo.
cd car-rental-frontend
start "React Frontend" cmd /k "npm start"

echo.
echo Applications are starting...
echo Backend: http://localhost:8080
echo Frontend: http://localhost:3000
echo.
echo Press any key to exit this script (applications will continue running)
pause > nul 