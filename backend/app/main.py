from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.api import auth_simple as auth, etl, datasources, dashboard

app = FastAPI(
    title="ETL Tool API",
    description="API for ETL Tool - Easy data extraction, transformation, and loading",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(etl.router, prefix="/api/etl", tags=["ETL Jobs"])
app.include_router(datasources.router, prefix="/api/datasources", tags=["Data Sources"])
app.include_router(dashboard.router, prefix="/api/dashboard", tags=["Dashboard"])

@app.get("/")
async def root():
    return {
        "message": "ETL Tool API",
        "version": "1.0.0",
        "docs": "/docs",
        "status": "running"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": "2024-01-15T10:00:00Z"}
