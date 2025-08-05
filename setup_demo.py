"""
Demo Data Setup Script

This script sets up demo data for the ETL Tool to showcase its capabilities.
It creates sample data sources and ETL jobs that can be used for demonstration.
"""

import json
import sys
import os

# Add the backend directory to Python path
sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'backend'))

def setup_demo_data():
    """Set up demo data for the ETL Tool"""
    
    # Demo data sources
    demo_datasources = [
        {
            "id": 1,
            "name": "MySQL Faculty Database",
            "type": "mysql",
            "host": "localhost",
            "port": 3306,
            "database": "university",
            "username": "etl_user",
            "status": "connected",
            "created_at": "2024-01-15T10:00:00",
            "last_connected": "2024-01-15T10:00:00"
        },
        {
            "id": 2,
            "name": "MongoDB Research Papers",
            "type": "mongodb",
            "host": "localhost",
            "port": 27017,
            "database": "research_db",
            "username": "mongo_user",
            "status": "connected",
            "created_at": "2024-01-15T10:00:00",
            "last_connected": "2024-01-15T09:45:00"
        },
        {
            "id": 3,
            "name": "PostgreSQL Analytics",
            "type": "postgresql",
            "host": "analytics.company.com",
            "port": 5432,
            "database": "analytics",
            "username": "analyst",
            "status": "error",
            "created_at": "2024-01-14T16:00:00",
            "last_connected": "2024-01-14T16:20:00"
        }
    ]
    
    # Demo ETL jobs
    demo_jobs = [
        {
            "id": 1,
            "name": "Daily Faculty Sync",
            "description": "Synchronize faculty data from MySQL to data warehouse",
            "source": "MySQL Faculty Database",
            "destination": "Data Warehouse",
            "schedule": "daily",
            "transformations": "Clean email addresses, standardize department names",
            "enabled": True,
            "created_at": "2024-01-10T09:00:00",
            "updated_at": "2024-01-15T10:00:00",
            "last_run": "2024-01-15T10:30:00",
            "status": "idle"
        },
        {
            "id": 2,
            "name": "Research Papers ETL",
            "description": "Extract research papers from MongoDB and load to analytics database",
            "source": "MongoDB Research Papers",
            "destination": "Analytics Database",
            "schedule": "weekly",
            "transformations": "Parse citations, extract keywords, calculate impact scores",
            "enabled": True,
            "created_at": "2024-01-12T14:00:00",
            "updated_at": "2024-01-15T09:00:00",
            "last_run": "2024-01-15T09:15:00",
            "status": "idle"
        },
        {
            "id": 3,
            "name": "Student Records Migration",
            "description": "Migrate student records from legacy system with data cleaning",
            "source": "Legacy Student System",
            "destination": "New Student Database",
            "schedule": "manual",
            "transformations": "Validate SSN format, standardize addresses, merge duplicate records",
            "enabled": False,
            "created_at": "2024-01-08T11:00:00",
            "updated_at": "2024-01-14T16:00:00",
            "last_run": "2024-01-14T08:00:00",
            "status": "idle"
        }
    ]
    
    print("=" * 60)
    print("ETL Tool - Demo Data Setup")
    print("=" * 60)
    print()
    print("Setting up demo data sources:")
    for ds in demo_datasources:
        status_icon = "✅" if ds["status"] == "connected" else "❌"
        print(f"  {status_icon} {ds['name']} ({ds['type']})")
    
    print()
    print("Setting up demo ETL jobs:")
    for job in demo_jobs:
        status_icon = "✅" if job["enabled"] else "⏸️"
        print(f"  {status_icon} {job['name']}")
        print(f"     Source: {job['source']}")
        print(f"     Schedule: {job['schedule']}")
        print()
    
    print("Demo data setup complete!")
    print()
    print("You can now:")
    print("1. View data sources in the 'Data Sources' tab")
    print("2. Run ETL jobs from the 'ETL Jobs' tab")
    print("3. Monitor progress on the Dashboard")
    print("4. Browse data in the 'Data Preview' tab")
    print("5. Check execution history in 'Job History'")
    print()
    print("=" * 60)

if __name__ == "__main__":
    setup_demo_data()
