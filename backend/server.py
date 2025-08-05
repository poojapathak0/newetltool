"""
ETL Tool Backend Server

This module starts the FastAPI backend server for the ETL Tool.
The server provides REST APIs for managing ETL jobs, data sources, and monitoring.
"""

import sys
import os

# Add the backend directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

if __name__ == "__main__":
    import uvicorn
    
    print("=" * 50)
    print("Starting ETL Tool Backend Server")
    print("=" * 50)
    print("API Documentation: http://localhost:8000/docs")
    print("Health Check: http://localhost:8000/health")
    print("=" * 50)
    
    uvicorn.run(
        "app.main:app", 
        host="0.0.0.0", 
        port=8000, 
        reload=True,
        log_level="info"
    )
