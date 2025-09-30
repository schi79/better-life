from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from typing import Optional
import os

class Database:
    client: Optional[AsyncIOMotorClient] = None
    database: Optional[AsyncIOMotorDatabase] = None

db = Database()

async def get_database() -> AsyncIOMotorDatabase:
    return db.database

async def connect_to_mongo():
    """Create database connection"""
    db.client = AsyncIOMotorClient(os.environ['MONGO_URL'])
    db.database = db.client[os.environ['DB_NAME']]
    
    # Create indexes
    await create_indexes()

async def close_mongo_connection():
    """Close database connection"""
    if db.client:
        db.client.close()

async def create_indexes():
    """Create database indexes for better performance"""
    
    # Users collection indexes
    await db.database.users.create_index("email", unique=True)
    await db.database.users.create_index("username", unique=True)
    
    # Products collection indexes
    await db.database.products.create_index("slug", unique=True)
    await db.database.products.create_index("category")
    await db.database.products.create_index("type")
    await db.database.products.create_index("featured")
    await db.database.products.create_index([("name", "text"), ("description", "text")])
    
    # Orders collection indexes
    await db.database.orders.create_index("user_id")
    await db.database.orders.create_index("order_number", unique=True)
    await db.database.orders.create_index("status")
    await db.database.orders.create_index("created_at")
    
    # Reviews collection indexes
    await db.database.reviews.create_index("product_id")
    await db.database.reviews.create_index("user_id")
    
    # Cart collection indexes
    await db.database.carts.create_index("user_id", unique=True)
    
    # COA collection indexes
    await db.database.coas.create_index("product_id")
    
    print("Database indexes created successfully")