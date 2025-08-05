from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer
from pydantic import BaseModel
from typing import Optional
import hashlib
import secrets

router = APIRouter()
security = HTTPBearer(auto_error=False)

# Simple password context
class SimplePasswordContext:
    def verify(self, plain_password: str, hashed_password: str) -> bool:
        return hashlib.sha256(plain_password.encode()).hexdigest() == hashed_password
    
    def hash(self, password: str) -> str:
        return hashlib.sha256(password.encode()).hexdigest()

pwd_context = SimplePasswordContext()

class UserLogin(BaseModel):
    username: str
    password: str

class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

# Mock user database
fake_users_db = {
    "admin": {
        "username": "admin",
        "email": "admin@etltool.com",
        "hashed_password": pwd_context.hash("admin123"),
        "is_active": True,
    }
}

@router.post("/login", response_model=Token)
async def login(user_data: UserLogin):
    """Login endpoint"""
    user = fake_users_db.get(user_data.username)
    if not user or not pwd_context.verify(user_data.password, user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Generate a simple token
    token = secrets.token_hex(32)
    
    return {"access_token": token, "token_type": "bearer"}

@router.post("/register")
async def register(user_data: UserCreate):
    """Registration endpoint"""
    if user_data.username in fake_users_db:
        raise HTTPException(status_code=400, detail="Username already exists")
    
    fake_users_db[user_data.username] = {
        "username": user_data.username,
        "email": user_data.email,
        "hashed_password": pwd_context.hash(user_data.password),
        "is_active": True,
    }
    
    return {"message": "User registered successfully"}

@router.get("/me")
async def get_current_user(authorization = Depends(security)):
    """Get current user info"""
    return {
        "username": "admin",
        "email": "admin@etltool.com",
        "is_active": True
    }
