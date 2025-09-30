from fastapi import APIRouter, Depends, HTTPException
from models import COA
from services import COAService

router = APIRouter(prefix="/coa", tags=["COA"])

@router.get("/{product_slug}", response_model=COA)
async def get_product_coa(product_slug: str):
    coa = await COAService.get_coa_by_product_slug(product_slug)
    if not coa:
        raise HTTPException(status_code=404, detail="COA not found for this product")
    return coa