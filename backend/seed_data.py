from models import Product, ProductCategory, ProductType
from services import ProductService

# THCa Cannabis Products Data
PRODUCTS_DATA = [
    {
        "name": "High THCa Deep Space",
        "slug": "high-thca-deep-space",
        "description": "Premium indoor THCa flower with exceptional potency and flavor",
        "category": ProductCategory.HIGH_THCA_FLOWERS,
        "type": ProductType.HYBRID,
        "price": 29.99,
        "original_price": 39.99,
        "thca_percentage": "25.8%",
        "variants": ["3.5g", "7g", "14g", "28g"],
        "benefits": ["Euphoric", "Relaxing", "Creative"],
        "image": "https://hmp.store/wp-content/uploads/2025/08/Deep-Spac.png",
        "additional_images": [
            "https://hmp.store/wp-content/uploads/2025/08/Deep-Spac.png",
            "https://hmp.store/wp-content/uploads/2025/08/Deep-Spac.png"
        ],
        "in_stock": True,
        "featured": True,
        "rating": 4.8,
        "review_count": 245
    },
    {
        "name": "High THCa Purple Soda",
        "slug": "high-thca-purple-soda",
        "description": "Relaxing indica-dominant THCa strain with sweet purple hues",
        "category": ProductCategory.HIGH_THCA_FLOWERS,
        "type": ProductType.INDICA,
        "price": 29.99,
        "thca_percentage": "24.1%",
        "variants": ["3.5g", "7g", "14g", "28g"],
        "benefits": ["Relaxing", "Sleep", "Pain Relief"],
        "image": "https://hmp.store/wp-content/uploads/2025/08/Purple-Soda-1.png",
        "additional_images": [
            "https://hmp.store/wp-content/uploads/2025/08/Purple-Soda-1.png"
        ],
        "in_stock": True,
        "featured": True,
        "rating": 4.9,
        "review_count": 189
    },
    {
        "name": "High THCa Cookies and Cream",
        "slug": "high-thca-cookies-cream",
        "description": "Balanced hybrid with sweet cookies and cream flavor profile",
        "category": ProductCategory.HIGH_THCA_FLOWERS,
        "type": ProductType.HYBRID,
        "price": 29.99,
        "thca_percentage": "26.3%",
        "variants": ["3.5g", "7g", "14g", "28g"],
        "benefits": ["Balanced", "Social", "Happy"],
        "image": "https://hmp.store/wp-content/uploads/2025/08/Cookies-And-Crea.png",
        "in_stock": True,
        "featured": True,
        "rating": 4.7,
        "review_count": 321
    },
    {
        "name": "High THCa Mochi",
        "slug": "high-thca-mochi",
        "description": "Exotic hybrid strain with unique mochi-like aroma and effects",
        "category": ProductCategory.HIGH_THCA_FLOWERS,
        "type": ProductType.HYBRID,
        "price": 29.99,
        "thca_percentage": "27.2%",
        "variants": ["3.5g", "7g", "14g", "28g"],
        "benefits": ["Euphoric", "Creative", "Uplifting"],
        "image": "https://hmp.store/wp-content/uploads/2025/08/mochi-2.png",
        "in_stock": True,
        "featured": True,
        "rating": 4.8,
        "review_count": 156
    },
    {
        "name": "High THCa Dirty Taxi - Light Dep",
        "slug": "high-thca-dirty-taxi-light-dep",
        "description": "Energizing sativa-dominant light dep with citrus notes",
        "category": ProductCategory.HIGH_THCA_FLOWERS,
        "type": ProductType.SATIVA,
        "price": 24.99,
        "original_price": 29.99,
        "thca_percentage": "22.8%",
        "variants": ["3.5g", "7g", "14g", "28g"],
        "benefits": ["Energizing", "Focus", "Uplifting"],
        "image": "https://hmp.store/wp-content/uploads/2025/08/Dirty-Taxi.png",
        "in_stock": True,
        "featured": True,
        "rating": 4.6,
        "review_count": 198
    },
    {
        "name": "Big Dipper Live Rosin",
        "slug": "big-dipper-live-rosin",
        "description": "Premium live rosin extracted using ice water and heat",
        "category": ProductCategory.CONCENTRATES,
        "type": ProductType.ROSIN,
        "price": 79.99,
        "original_price": 99.99,
        "thca_percentage": "78.2%",
        "variants": ["1g", "2g", "3g"],
        "benefits": ["Potent", "Full Spectrum", "Clean"],
        "image": "https://hmp.store/wp-content/uploads/2025/07/THCa-Dantes-Driver-Rosin-a-300x300.jpg",
        "in_stock": True,
        "featured": True,
        "rating": 4.9,
        "review_count": 89
    },
    {
        "name": "High THCa Bubblegum Runtz Bundle",
        "slug": "high-thca-bubblegum-runtz-bundle",
        "description": "Bulk bundle of premium Bubblegum Runtz THCa flower",
        "category": ProductCategory.BUNDLES,
        "type": ProductType.BUNDLE,
        "price": 450.00,
        "original_price": 550.00,
        "thca_percentage": "26.8%",
        "variants": ["Bulk 4oz", "Bulk 8oz", "Bulk 1lb"],
        "benefits": ["Value Pack", "Bulk Pricing", "Premium Quality"],
        "image": "https://hmp.store/wp-content/uploads/2025/07/Bubble-Gum-Runtz.png",
        "in_stock": True,
        "featured": True,
        "rating": 4.8,
        "review_count": 45
    }
]

async def seed_products():
    """Seed the database with initial product data"""
    from database import get_database
    
    db = await get_database()
    
    # Check if products already exist
    existing_products = await db.products.count_documents({})
    if existing_products > 0:
        print("Products already exist in database")
        return
    
    print("Seeding products...")
    
    for product_data in PRODUCTS_DATA:
        product = Product(**product_data)
        await db.products.insert_one(product.dict())
        print(f"Added product: {product.name}")
    
    print(f"Successfully seeded {len(PRODUCTS_DATA)} products!")

if __name__ == "__main__":
    import asyncio
    asyncio.run(seed_products())