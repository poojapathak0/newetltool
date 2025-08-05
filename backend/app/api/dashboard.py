from fastapi import APIRouter
from typing import Dict, Any
import random
from datetime import datetime, timedelta

router = APIRouter()

@router.get("/stats")
async def get_dashboard_stats():
    """Get dashboard statistics"""
    return {
        "total_jobs": 45,
        "successful_jobs": 38,
        "failed_jobs": 5,
        "running_jobs": 2,
        "data_sources": 4,
        "total_records_processed": 125000,
        "average_job_duration": "2m 15s",
        "success_rate": 84.4,
        "last_updated": datetime.now().isoformat()
    }

@router.get("/trends")
async def get_job_trends():
    """Get job execution trends"""
    trends = []
    base_date = datetime.now() - timedelta(days=30)
    
    for i in range(30):
        date = base_date + timedelta(days=i)
        trends.append({
            "date": date.strftime("%Y-%m-%d"),
            "successful": random.randint(5, 15),
            "failed": random.randint(0, 3),
            "total_records": random.randint(1000, 5000)
        })
    
    return {"trends": trends}

@router.get("/recent-jobs")
async def get_recent_jobs():
    """Get recent job executions"""
    return {
        "recent_jobs": [
            {
                "id": 1,
                "name": "Faculty Data Sync",
                "status": "success",
                "start_time": "2024-01-15T10:30:00",
                "duration": "2m 15s",
                "records": 1250
            },
            {
                "id": 2,
                "name": "Research Papers ETL",
                "status": "running",
                "start_time": "2024-01-15T11:00:00",
                "duration": "5m 30s",
                "records": 750
            },
            {
                "id": 3,
                "name": "Department Migration",
                "status": "success",
                "start_time": "2024-01-15T09:15:00",
                "duration": "1m 45s",
                "records": 45
            }
        ]
    }

@router.get("/system-health")
async def get_system_health():
    """Get system health metrics"""
    return {
        "cpu_usage": random.randint(20, 80),
        "memory_usage": random.randint(30, 70),
        "disk_usage": random.randint(40, 60),
        "active_connections": random.randint(5, 25),
        "queue_size": random.randint(0, 10),
        "uptime": "5d 12h 30m"
    }
