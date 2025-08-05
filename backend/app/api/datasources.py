from fastapi import APIRouter, HTTPException
from typing import List, Optional, Dict, Any
from pydantic import BaseModel
import json

router = APIRouter()

# Models
class DataSource(BaseModel):
    name: str
    type: str  # mysql, postgresql, mongodb, etc.
    host: str
    port: int
    database: str
    username: str
    password: str
    ssl: bool = False

class DataSourceUpdate(BaseModel):
    name: Optional[str] = None
    type: Optional[str] = None
    host: Optional[str] = None
    port: Optional[int] = None
    database: Optional[str] = None
    username: Optional[str] = None
    password: Optional[str] = None
    ssl: Optional[bool] = None

# Mock data storage
datasources_db = []
datasource_counter = 0

@router.get("/")
async def get_datasources():
    """Get all data sources"""
    # Remove sensitive information from response
    safe_datasources = []
    for ds in datasources_db:
        safe_ds = ds.copy()
        safe_ds.pop("password", None)
        safe_datasources.append(safe_ds)
    
    return {"datasources": safe_datasources}

@router.post("/")
async def create_datasource(datasource: DataSource):
    """Create a new data source"""
    global datasource_counter
    datasource_counter += 1
    
    new_datasource = {
        "id": datasource_counter,
        "name": datasource.name,
        "type": datasource.type,
        "host": datasource.host,
        "port": datasource.port,
        "database": datasource.database,
        "username": datasource.username,
        "password": datasource.password,
        "ssl": datasource.ssl,
        "status": "connected",  # Mock status
        "created_at": "2024-01-15T10:00:00",
        "last_connected": "2024-01-15T10:00:00"
    }
    
    datasources_db.append(new_datasource)
    
    # Return without password
    safe_datasource = new_datasource.copy()
    safe_datasource.pop("password")
    
    return {"message": "Data source created successfully", "datasource": safe_datasource}

@router.put("/{datasource_id}")
async def update_datasource(datasource_id: int, datasource_update: DataSourceUpdate):
    """Update an existing data source"""
    datasource = next((ds for ds in datasources_db if ds["id"] == datasource_id), None)
    if not datasource:
        raise HTTPException(status_code=404, detail="Data source not found")
    
    update_data = datasource_update.dict(exclude_unset=True)
    datasource.update(update_data)
    
    # Return without password
    safe_datasource = datasource.copy()
    safe_datasource.pop("password")
    
    return {"message": "Data source updated successfully", "datasource": safe_datasource}

@router.delete("/{datasource_id}")
async def delete_datasource(datasource_id: int):
    """Delete a data source"""
    global datasources_db
    datasource = next((ds for ds in datasources_db if ds["id"] == datasource_id), None)
    if not datasource:
        raise HTTPException(status_code=404, detail="Data source not found")
    
    datasources_db = [ds for ds in datasources_db if ds["id"] != datasource_id]
    return {"message": "Data source deleted successfully"}

@router.post("/test")
async def test_connection(datasource: DataSource):
    """Test connection to a data source"""
    # Mock connection test
    # In real implementation, this would actually test the connection
    
    import random
    import time
    
    # Simulate connection test delay
    time.sleep(1)
    
    # Mock success/failure
    if random.random() > 0.1:  # 90% success rate
        return {
            "status": "success",
            "message": "Connection test successful",
            "response_time": random.randint(50, 200)
        }
    else:
        return {
            "status": "error",
            "message": "Connection failed: Unable to connect to database",
            "error_code": "CONNECTION_TIMEOUT"
        }

@router.get("/{datasource_id}/tables")
async def get_tables(datasource_id: int):
    """Get list of tables from a data source"""
    datasource = next((ds for ds in datasources_db if ds["id"] == datasource_id), None)
    if not datasource:
        raise HTTPException(status_code=404, detail="Data source not found")
    
    # Mock table list based on datasource type
    if datasource["type"] == "mysql":
        tables = [
            {"name": "faculty", "rows": 1250, "columns": 8},
            {"name": "departments", "rows": 15, "columns": 5},
            {"name": "schools", "rows": 8, "columns": 4}
        ]
    elif datasource["type"] == "mongodb":
        tables = [
            {"name": "research_papers", "rows": 890, "columns": 12},
            {"name": "publications", "rows": 340, "columns": 9}
        ]
    else:
        tables = [
            {"name": "analytics_data", "rows": 5000, "columns": 15},
            {"name": "reports", "rows": 200, "columns": 10}
        ]
    
    return {"tables": tables}

@router.get("/{datasource_id}/tables/{table_name}/data")
async def get_table_data(
    datasource_id: int, 
    table_name: str,
    limit: int = 100,
    offset: int = 0,
    search: Optional[str] = None
):
    """Get data from a specific table"""
    datasource = next((ds for ds in datasources_db if ds["id"] == datasource_id), None)
    if not datasource:
        raise HTTPException(status_code=404, detail="Data source not found")
    
    # Mock data based on table name
    if table_name == "faculty":
        data = [
            {
                "id": i,
                "name": f"Dr. Faculty {i}",
                "email": f"faculty{i}@university.edu",
                "department": "Computer Science" if i % 3 == 0 else "Mathematics" if i % 3 == 1 else "Physics",
                "position": "Professor" if i % 3 == 0 else "Associate Professor" if i % 3 == 1 else "Assistant Professor",
                "hire_date": f"20{15 + (i % 10)}-0{1 + (i % 9)}-{10 + (i % 20)}"
            }
            for i in range(offset + 1, offset + limit + 1)
        ]
        total = 1250
    elif table_name == "research_papers":
        data = [
            {
                "id": i,
                "title": f"Research Paper {i}",
                "author": f"Dr. Author {i}",
                "journal": "Journal of Science" if i % 2 == 0 else "Nature",
                "year": 2020 + (i % 4),
                "citations": 10 + (i * 3)
            }
            for i in range(offset + 1, offset + limit + 1)
        ]
        total = 890
    else:
        data = [
            {
                "id": i,
                "field1": f"Value {i}",
                "field2": f"Data {i}",
                "field3": i * 10
            }
            for i in range(offset + 1, offset + limit + 1)
        ]
        total = 500
    
    return {
        "data": data,
        "total": total,
        "limit": limit,
        "offset": offset
    }
