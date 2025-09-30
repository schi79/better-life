from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Dict, Any
from datetime import datetime
from enum import Enum
import uuid

# User Models
class UserRole(str, Enum):
    CUSTOMER = "customer"
    ADMIN = "admin"

class UserBase(BaseModel):
    email: EmailStr
    username: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone: Optional[str] = None
    age_verified: bool = False
    role: UserRole = UserRole.CUSTOMER

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class User(UserBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    is_active: bool = True

class UserUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone: Optional[str] = None
    age_verified: Optional[bool] = None

# Product Models
class ProductType(str, Enum):
    INDICA = "Indica"
    SATIVA = "Sativa"
    HYBRID = "Hybrid"
    ROSIN = "Rosin"
    BUNDLE = "Bundle"

class ProductCategory(str, Enum):
    HIGH_THCA_FLOWERS = "high-thca-flowers"
    CONCENTRATES = "concentrates"
    EDIBLES = "edibles"
    BUNDLES = "bundles"
    WHOLESALE = "wholesale"

class ProductBase(BaseModel):
    name: str
    slug: str
    description: str
    category: ProductCategory
    type: ProductType
    price: float
    original_price: Optional[float] = None
    thca_percentage: Optional[str] = None
    variants: List[str]
    benefits: List[str]
    image: str
    additional_images: List[str] = []
    in_stock: bool = True
    featured: bool = False
    rating: float = 0.0
    review_count: int = 0

class ProductCreate(ProductBase):
    pass

class Product(ProductBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    original_price: Optional[float] = None
    in_stock: Optional[bool] = None
    featured: Optional[bool] = None

# Cart Models
class CartItem(BaseModel):
    product_id: str
    variant: str
    quantity: int = 1
    price: float

class Cart(BaseModel):
    user_id: str
    items: List[CartItem] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class CartAddItem(BaseModel):
    product_id: str
    variant: str
    quantity: int = 1

class CartUpdateItem(BaseModel):
    quantity: int

# Order Models
class OrderStatus(str, Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    PROCESSING = "processing"
    SHIPPED = "shipped"
    DELIVERED = "delivered"
    CANCELLED = "cancelled"

class OrderItem(BaseModel):
    product_id: str
    product_name: str
    variant: str
    quantity: int
    price: float
    total: float

class ShippingAddress(BaseModel):
    first_name: str
    last_name: str
    address_line_1: str
    address_line_2: Optional[str] = None
    city: str
    state: str
    zip_code: str
    country: str = "US"

class OrderCreate(BaseModel):
    shipping_address: ShippingAddress
    payment_method: str = "card"
    notes: Optional[str] = None

class Order(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    order_number: str
    items: List[OrderItem]
    subtotal: float
    shipping_cost: float
    tax_amount: float
    total: float
    status: OrderStatus = OrderStatus.PENDING
    shipping_address: ShippingAddress
    payment_method: str
    notes: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

# Review Models
class ReviewCreate(BaseModel):
    product_id: str
    rating: int = Field(ge=1, le=5)
    title: Optional[str] = None
    comment: Optional[str] = None

class Review(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    product_id: str
    rating: int
    title: Optional[str] = None
    comment: Optional[str] = None
    verified_purchase: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)

# COA Models
class COAData(BaseModel):
    product_id: str
    lab_name: str = "Green Scientific Labs"
    test_date: str
    sample_date: str
    batch_number: str
    certificate_number: str
    cannabinoids: List[Dict[str, str]]
    terpenes: List[Dict[str, str]]
    contaminants: Dict[str, str]

class COA(COAData):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)

# Response Models
class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: User

class MessageResponse(BaseModel):
    message: str
    success: bool = True

class CartResponse(BaseModel):
    items: List[Dict[str, Any]]
    subtotal: float
    shipping: float
    total: float
    item_count: int