from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from database import connect_to_mongo, close_mongo_connection
from seed_data import seed_products
import logging
from pathlib import Path

# Import routes
from routes import auth, products, cart, orders, coa

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("Starting up Better Lifestyles API...")
    await connect_to_mongo()
    await seed_products()  # Seed database with products
    logger.info("Database connected and seeded successfully")
    yield
    # Shutdown
    logger.info("Shutting down...")
    await close_mongo_connection()

# Create the main app
app = FastAPI(
    title="Better Lifestyles THCa Store API",
    description="Backend API for Better Lifestyles cannabis e-commerce store",
    version="1.0.0",
    lifespan=lifespan
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Legacy hello world endpoint
@api_router.get("/")
async def root():
    return {"message": "Better Lifestyles THCa Store API - Ready for Business!"}

# Include all route modules
api_router.include_router(auth.router)
api_router.include_router(products.router)
api_router.include_router(cart.router)
api_router.include_router(orders.router)
api_router.include_router(coa.router)

# Include the router in the main app
app.include_router(api_router)
