from fastapi import APIRouter, HTTPException, BackgroundTasks
from typing import List, Optional, Dict, Any
from pydantic import BaseModel
from datetime import datetime
import json

router = APIRouter()

# Models
class ETLJob(BaseModel):
    name: str
    description: str
    source: str
    destination: str
    schedule: Optional[str] = "manual"
    transformations: Optional[str] = ""
    enabled: bool = True

class ETLJobUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    source: Optional[str] = None
    destination: Optional[str] = None
    schedule: Optional[str] = None
    transformations: Optional[str] = None
    enabled: Optional[bool] = None

class JobRun(BaseModel):
    job_id: int
    status: str
    start_time: datetime
    end_time: Optional[datetime] = None
    records_processed: int = 0
    records_successful: int = 0
    records_failed: int = 0
    error_message: Optional[str] = None

# Mock data storage (replace with actual database)
jobs_db = []
job_runs_db = []
job_counter = 0

@router.get("/jobs")
async def get_jobs():
    """Get all ETL jobs"""
    return {"jobs": jobs_db}

@router.post("/jobs")
async def create_job(job: ETLJob):
    """Create a new ETL job"""
    global job_counter
    job_counter += 1
    
    new_job = {
        "id": job_counter,
        "name": job.name,
        "description": job.description,
        "source": job.source,
        "destination": job.destination,
        "schedule": job.schedule,
        "transformations": job.transformations,
        "enabled": job.enabled,
        "created_at": datetime.now().isoformat(),
        "updated_at": datetime.now().isoformat(),
        "last_run": None,
        "status": "idle"
    }
    
    jobs_db.append(new_job)
    return {"message": "Job created successfully", "job": new_job}

@router.put("/jobs/{job_id}")
async def update_job(job_id: int, job_update: ETLJobUpdate):
    """Update an existing ETL job"""
    job = next((j for j in jobs_db if j["id"] == job_id), None)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    update_data = job_update.dict(exclude_unset=True)
    job.update(update_data)
    job["updated_at"] = datetime.now().isoformat()
    
    return {"message": "Job updated successfully", "job": job}

@router.delete("/jobs/{job_id}")
async def delete_job(job_id: int):
    """Delete an ETL job"""
    global jobs_db
    job = next((j for j in jobs_db if j["id"] == job_id), None)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    jobs_db = [j for j in jobs_db if j["id"] != job_id]
    return {"message": "Job deleted successfully"}

@router.post("/jobs/{job_id}/run")
async def run_job(job_id: int, background_tasks: BackgroundTasks):
    """Run an ETL job"""
    job = next((j for j in jobs_db if j["id"] == job_id), None)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    if job["status"] == "running":
        raise HTTPException(status_code=400, detail="Job is already running")
    
    # Update job status
    job["status"] = "running"
    job["last_run"] = datetime.now().isoformat()
    
    # Create job run record
    job_run = {
        "id": len(job_runs_db) + 1,
        "job_id": job_id,
        "job_name": job["name"],
        "status": "running",
        "start_time": datetime.now().isoformat(),
        "end_time": None,
        "records_processed": 0,
        "records_successful": 0,
        "records_failed": 0,
        "error_message": None,
        "logs": [
            {
                "timestamp": datetime.now().isoformat(),
                "level": "INFO",
                "message": f"Job '{job['name']}' started"
            }
        ]
    }
    job_runs_db.append(job_run)
    
    # Add background task to simulate job execution
    background_tasks.add_task(simulate_job_execution, job_id, job_run["id"])
    
    return {"message": "Job started successfully", "run_id": job_run["id"]}

@router.post("/jobs/{job_id}/stop")
async def stop_job(job_id: int):
    """Stop a running ETL job"""
    job = next((j for j in jobs_db if j["id"] == job_id), None)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    if job["status"] != "running":
        raise HTTPException(status_code=400, detail="Job is not running")
    
    job["status"] = "stopped"
    return {"message": "Job stopped successfully"}

@router.get("/jobs/{job_id}/status")
async def get_job_status(job_id: int):
    """Get the status of a specific job"""
    job = next((j for j in jobs_db if j["id"] == job_id), None)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    return {"job_id": job_id, "status": job["status"], "last_run": job["last_run"]}

@router.get("/history")
async def get_job_history(
    status: Optional[str] = None,
    job_id: Optional[int] = None,
    limit: int = 100,
    offset: int = 0
):
    """Get job execution history"""
    history = job_runs_db.copy()
    
    if status:
        history = [run for run in history if run["status"] == status]
    if job_id:
        history = [run for run in history if run["job_id"] == job_id]
    
    # Sort by start time (most recent first)
    history.sort(key=lambda x: x["start_time"], reverse=True)
    
    # Apply pagination
    total = len(history)
    history = history[offset:offset + limit]
    
    return {
        "history": history,
        "total": total,
        "limit": limit,
        "offset": offset
    }

@router.get("/history/{run_id}/logs")
async def get_job_logs(run_id: int):
    """Get logs for a specific job run"""
    job_run = next((run for run in job_runs_db if run["id"] == run_id), None)
    if not job_run:
        raise HTTPException(status_code=404, detail="Job run not found")
    
    return {"logs": job_run.get("logs", [])}

# Background task to simulate job execution
async def simulate_job_execution(job_id: int, run_id: int):
    """Simulate ETL job execution"""
    import asyncio
    import random
    
    # Find the job and job run
    job = next((j for j in jobs_db if j["id"] == job_id), None)
    job_run = next((run for run in job_runs_db if run["id"] == run_id), None)
    
    if not job or not job_run:
        return
    
    try:
        # Simulate job execution steps
        steps = [
            ("Connecting to data source", 2),
            ("Extracting data", 5),
            ("Transforming data", 8),
            ("Loading data to destination", 3),
            ("Finalizing job", 1)
        ]
        
        total_records = random.randint(500, 2000)
        processed_records = 0
        
        for step, duration in steps:
            # Add log entry
            job_run["logs"].append({
                "timestamp": datetime.now().isoformat(),
                "level": "INFO",
                "message": step
            })
            
            # Simulate processing time
            await asyncio.sleep(duration)
            
            # Update progress
            if step == "Extracting data":
                processed_records = total_records
                job_run["records_processed"] = processed_records
            elif step == "Loading data to destination":
                # Simulate some failed records
                failed_records = random.randint(0, 10)
                job_run["records_successful"] = processed_records - failed_records
                job_run["records_failed"] = failed_records
        
        # Job completed successfully
        job_run["status"] = "success"
        job_run["end_time"] = datetime.now().isoformat()
        job["status"] = "idle"
        
        job_run["logs"].append({
            "timestamp": datetime.now().isoformat(),
            "level": "SUCCESS",
            "message": f"Job completed successfully. Processed {processed_records} records."
        })
        
    except Exception as e:
        # Job failed
        job_run["status"] = "error"
        job_run["end_time"] = datetime.now().isoformat()
        job_run["error_message"] = str(e)
        job["status"] = "idle"
        
        job_run["logs"].append({
            "timestamp": datetime.now().isoformat(),
            "level": "ERROR",
            "message": f"Job failed: {str(e)}"
        })
