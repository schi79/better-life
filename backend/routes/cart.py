from fastapi import APIRouter, Depends, HTTPException
from typing import List, Dict, Any
from models import CartAddItem, CartUpdateItem, CartResponse, MessageResponse
from services import CartService, ProductService
from auth import get_current_active_user, get_optional_user
from models import User

router = APIRouter(prefix="/cart", tags=["Cart"])

async def get_cart_response(user_id: str) -> CartResponse:
    cart = await CartService.get_cart(user_id)
    
    # Get detailed cart items with product info
    detailed_items = []
    subtotal = 0
    
    for cart_item in cart.items:
        product = await ProductService.get_product_by_id(cart_item.product_id)
        if product:
            item_total = cart_item.price * cart_item.quantity
            subtotal += item_total
            
            detailed_items.append({
                "id": cart_item.product_id,
                "name": product.name,
                "slug": product.slug,
                "image": product.image,
                "variant": cart_item.variant,
                "quantity": cart_item.quantity,
                "price": cart_item.price,
                "total": item_total,
                "thca": product.thca_percentage
            })
    
    shipping = 0 if subtotal >= 50 else 9.99
    total = subtotal + shipping
    item_count = sum(item.quantity for item in cart.items)
    
    return CartResponse(
        items=detailed_items,
        subtotal=subtotal,
        shipping=shipping,
        total=total,
        item_count=item_count
    )

@router.get("/", response_model=CartResponse)
async def get_cart(current_user: User = Depends(get_current_active_user)):
    return await get_cart_response(current_user.id)

@router.post("/add", response_model=CartResponse)
async def add_to_cart(
    item: CartAddItem,
    current_user: User = Depends(get_current_active_user)
):
    try:
        await CartService.add_item(current_user.id, item)
        return await get_cart_response(current_user.id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.put("/update/{product_id}")
async def update_cart_item(
    product_id: str,
    variant: str,
    update: CartUpdateItem,
    current_user: User = Depends(get_current_active_user)
):
    await CartService.update_item(current_user.id, product_id, variant, update)
    return await get_cart_response(current_user.id)

@router.delete("/remove/{product_id}")
async def remove_from_cart(
    product_id: str,
    variant: str,
    current_user: User = Depends(get_current_active_user)
):
    await CartService.remove_item(current_user.id, product_id, variant)
    return await get_cart_response(current_user.id)

@router.delete("/clear", response_model=MessageResponse)
async def clear_cart(current_user: User = Depends(get_current_active_user)):
    await CartService.clear_cart(current_user.id)
    return MessageResponse(message="Cart cleared successfully")

# Guest cart endpoints (using session)
@router.get("/guest/{session_id}", response_model=CartResponse)
async def get_guest_cart(session_id: str):
    # For guest users, we'll use session_id as user_id
    return await get_cart_response(f"guest-{session_id}")

@router.post("/guest/{session_id}/add", response_model=CartResponse)
async def add_to_guest_cart(session_id: str, item: CartAddItem):
    try:
        await CartService.add_item(f"guest-{session_id}", item)
        return await get_cart_response(f"guest-{session_id}")
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))