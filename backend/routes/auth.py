from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer
from datetime import timedelta, datetime
from models import UserCreate, UserLogin, User, TokenResponse, MessageResponse
from auth import (
    verify_password, 
    get_password_hash, 
    create_access_token, 
    get_current_active_user,
    ACCESS_TOKEN_EXPIRE_MINUTES
)
from database import get_database

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=TokenResponse)
async def register(user_data: UserCreate, db = Depends(get_database)):
    # Check if user already exists
    existing_user = await db.users.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    existing_username = await db.users.find_one({"username": user_data.username})
    if existing_username:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already taken"
        )
    
    # Create user
    hashed_password = get_password_hash(user_data.password)
    user = User(**user_data.dict(exclude={"password"}))
    user_dict = user.dict()
    user_dict["password_hash"] = hashed_password
    
    await db.users.insert_one(user_dict)
    
    # Create token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.id}, expires_delta=access_token_expires
    )
    
    return TokenResponse(access_token=access_token, user=user)

@router.post("/login", response_model=TokenResponse)
async def login(login_data: UserLogin, db = Depends(get_database)):
    # Find user
    user_doc = await db.users.find_one({"email": login_data.email})
    if not user_doc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    # Verify password
    if not verify_password(login_data.password, user_doc["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    user = User(**{k: v for k, v in user_doc.items() if k != "password_hash"})
    
    # Create token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.id}, expires_delta=access_token_expires
    )
    
    return TokenResponse(access_token=access_token, user=user)

@router.get("/me", response_model=User)
async def get_current_user_info(current_user: User = Depends(get_current_active_user)):
    return current_user

@router.post("/verify-age")
async def verify_age(current_user: User = Depends(get_current_active_user), db = Depends(get_database)):
    # Update user age verification status
    await db.users.update_one(
        {"id": current_user.id},
        {"$set": {"age_verified": True, "updated_at": datetime.utcnow()}}
    )
    return MessageResponse(message="Age verification completed")