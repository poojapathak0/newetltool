#!/bin/bash

echo "====================================="
echo "ETL Tool - Starting Full Application"
echo "====================================="
echo

echo "Installing frontend dependencies..."
cd frontend
npm install
if [ $? -ne 0 ]; then
    echo "Error: Failed to install frontend dependencies"
    exit 1
fi

echo
echo "Installing backend dependencies..."
cd ../backend
pip install fastapi uvicorn python-multipart
if [ $? -ne 0 ]; then
    echo "Error: Failed to install backend dependencies"
    exit 1
fi

echo
echo "Starting backend server..."
python server.py &
BACKEND_PID=$!

echo "Waiting for backend to start..."
sleep 5

echo
echo "Starting frontend development server..."
cd ../frontend
npm start &
FRONTEND_PID=$!

echo
echo "====================================="
echo "ETL Tool is running!"
echo "====================================="
echo "Backend API: http://localhost:8000"
echo "Frontend UI: http://localhost:3000"
echo "API Docs: http://localhost:8000/docs"
echo "====================================="
echo
echo "Press Ctrl+C to stop both servers"

# Wait for user interrupt
trap "echo 'Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
