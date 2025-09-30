from fastapi import APIRouter, Depends, HTTPException, Query
from typing import List, Optional
from models import Product, ProductCategory, ProductType
from services import ProductService
from database import get_database

router = APIRouter(prefix="/products", tags=["Products"])

@router.get("/", response_model=List[Product])
async def get_products(
    category: Optional[str] = Query(None, description="Filter by category"),
    product_type: Optional[str] = Query(None, description="Filter by product type"),
    featured: Optional[bool] = Query(None, description="Filter by featured status"),
    in_stock: Optional[bool] = Query(None, description="Filter by stock status"),
    skip: int = Query(0, ge=0, description="Number of products to skip"),
    limit: int = Query(100, ge=1, le=100, description="Maximum number of products to return"),
    search: Optional[str] = Query(None, description="Search in product name and description"),
    db = Depends(get_database)
):
    # Build filter
    filter_dict = {}
    
    if category:
        try:
            filter_dict["category"] = ProductCategory(category)
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid category")
    
    if product_type:
        try:
            filter_dict["type"] = ProductType(product_type)
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid product type")
    
    if featured is not None:
        filter_dict["featured"] = featured
    if in_stock is not None:
        filter_dict["in_stock"] = in_stock
    
    if search:
        filter_dict["$text"] = {"$search": search}
    
    # Get products
    cursor = db.products.find(filter_dict).skip(skip).limit(limit)
    products = await cursor.to_list(length=limit)
    
    return [Product(**product) for product in products]

@router.get("/featured", response_model=List[Product])
async def get_featured_products(limit: int = Query(8, ge=1, le=20)):
    return await ProductService.get_products(featured=True, limit=limit)

@router.get("/categories", response_model=List[str])
async def get_categories():
    return [category.value for category in ProductCategory]

@router.get("/types", response_model=List[str])
async def get_product_types():
    return [product_type.value for product_type in ProductType]

@router.get("/search")
async def search_products(
    q: str = Query(..., description="Search query"),
    limit: int = Query(20, ge=1, le=50),
    db = Depends(get_database)
):
    # Text search
    cursor = db.products.find(
        {"$text": {"$search": q}},
        {"score": {"$meta": "textScore"}}
    ).sort([("score", {"$meta": "textScore"})]).limit(limit)
    
    products = await cursor.to_list(length=limit)
    return [Product(**product) for product in products]

@router.get("/{product_id}", response_model=Product)
async def get_product(product_id: str):
    product = await ProductService.get_product_by_id(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.get("/slug/{slug}", response_model=Product)
async def get_product_by_slug(slug: str):
    product = await ProductService.get_product_by_slug(slug)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product