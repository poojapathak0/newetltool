@echo off
echo =====================================
echo ETL Tool - Starting Full Application
echo =====================================
echo.

echo Installing frontend dependencies...
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo Error: Failed to install frontend dependencies
    pause
    exit /b 1
)

echo.
echo Installing backend dependencies...
cd ..\backend
pip install fastapi uvicorn python-multipart
if %errorlevel% neq 0 (
    echo Error: Failed to install backend dependencies
    pause
    exit /b 1
)

echo.
echo Starting backend server...
start "ETL Tool Backend" cmd /k "python server.py"

echo Waiting for backend to start...
timeout /t 5

echo.
echo Starting frontend development server...
cd ..\frontend
start "ETL Tool Frontend" cmd /k "npm start"

echo.
echo =====================================
echo ETL Tool is starting up!
echo =====================================
echo Backend API: http://localhost:8000
echo Frontend UI: http://localhost:3000
echo API Docs: http://localhost:8000/docs
echo =====================================
echo.
echo Both servers will open in separate windows.
echo You can close this window once both servers are running.
echo.
pause
