from fastapi import APIRouter, Depends, HTTPException
from typing import List
from models import Order, OrderCreate, MessageResponse
from services import OrderService
from auth import get_current_active_user
from models import User
from database import get_database

router = APIRouter(prefix="/orders", tags=["Orders"])

@router.post("/", response_model=Order)
async def create_order(
    order_data: OrderCreate,
    current_user: User = Depends(get_current_active_user)
):
    try:
        order = await OrderService.create_order(current_user.id, order_data)
        return order
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/", response_model=List[Order])
async def get_user_orders(
    current_user: User = Depends(get_current_active_user),
    db = Depends(get_database)
):
    orders = await db.orders.find({"user_id": current_user.id}).sort("created_at", -1).to_list(100)
    return [Order(**order) for order in orders]

@router.get("/{order_id}", response_model=Order)
async def get_order(
    order_id: str,
    current_user: User = Depends(get_current_active_user),
    db = Depends(get_database)
):
    order = await db.orders.find_one({"id": order_id, "user_id": current_user.id})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return Order(**order)