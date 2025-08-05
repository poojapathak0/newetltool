@echo off
echo =====================================
echo Restarting Frontend (Clean Mode)
echo =====================================

cd frontend

echo Stopping any running React processes...
taskkill /f /im node.exe 2>nul

echo Starting clean frontend server...
set GENERATE_SOURCEMAP=false
set DISABLE_ESLINT_PLUGIN=true
npm start

pause
