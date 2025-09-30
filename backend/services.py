from typing import List, Optional, Dict, Any
from datetime import datetime
import random
import string
from models import *
from database import get_database

class ProductService:
    @staticmethod
    async def create_product(product: ProductCreate) -> Product:
        db = await get_database()
        product_obj = Product(**product.dict())
        await db.products.insert_one(product_obj.dict())
        return product_obj
    
    @staticmethod
    async def get_product_by_id(product_id: str) -> Optional[Product]:
        db = await get_database()
        product = await db.products.find_one({"id": product_id})
        return Product(**product) if product else None
    
    @staticmethod
    async def get_product_by_slug(slug: str) -> Optional[Product]:
        db = await get_database()
        product = await db.products.find_one({"slug": slug})
        return Product(**product) if product else None
    
    @staticmethod
    async def get_products(
        category: Optional[str] = None,
        product_type: Optional[str] = None,
        featured: Optional[bool] = None,
        in_stock: Optional[bool] = None,
        skip: int = 0,
        limit: int = 100
    ) -> List[Product]:
        db = await get_database()
        filter_dict = {}
        
        if category:
            filter_dict["category"] = category
        if product_type:
            filter_dict["type"] = product_type
        if featured is not None:
            filter_dict["featured"] = featured
        if in_stock is not None:
            filter_dict["in_stock"] = in_stock
        
        cursor = db.products.find(filter_dict).skip(skip).limit(limit)
        products = await cursor.to_list(length=limit)
        return [Product(**product) for product in products]

class CartService:
    @staticmethod
    async def get_cart(user_id: str) -> Cart:
        db = await get_database()
        cart = await db.carts.find_one({"user_id": user_id})
        if not cart:
            cart = Cart(user_id=user_id)
            await db.carts.insert_one(cart.dict())
        else:
            cart = Cart(**cart)
        return cart
    
    @staticmethod
    async def add_item(user_id: str, item: CartAddItem) -> Cart:
        db = await get_database()
        product = await ProductService.get_product_by_id(item.product_id)
        if not product:
            raise ValueError("Product not found")
        
        cart = await CartService.get_cart(user_id)
        
        # Check if item already exists
        existing_item = None
        for cart_item in cart.items:
            if cart_item.product_id == item.product_id and cart_item.variant == item.variant:
                existing_item = cart_item
                break
        
        if existing_item:
            existing_item.quantity += item.quantity
        else:
            cart_item = CartItem(
                product_id=item.product_id,
                variant=item.variant,
                quantity=item.quantity,
                price=product.price
            )
            cart.items.append(cart_item)
        
        cart.updated_at = datetime.utcnow()
        await db.carts.update_one(
            {"user_id": user_id},
            {"$set": cart.dict()}
        )
        return cart
    
    @staticmethod
    async def update_item(user_id: str, product_id: str, variant: str, update: CartUpdateItem) -> Cart:
        db = await get_database()
        cart = await CartService.get_cart(user_id)
        
        for cart_item in cart.items:
            if cart_item.product_id == product_id and cart_item.variant == variant:
                if update.quantity <= 0:
                    cart.items.remove(cart_item)
                else:
                    cart_item.quantity = update.quantity
                break
        
        cart.updated_at = datetime.utcnow()
        await db.carts.update_one(
            {"user_id": user_id},
            {"$set": cart.dict()}
        )
        return cart
    
    @staticmethod
    async def remove_item(user_id: str, product_id: str, variant: str) -> Cart:
        db = await get_database()
        cart = await CartService.get_cart(user_id)
        
        cart.items = [
            item for item in cart.items 
            if not (item.product_id == product_id and item.variant == variant)
        ]
        
        cart.updated_at = datetime.utcnow()
        await db.carts.update_one(
            {"user_id": user_id},
            {"$set": cart.dict()}
        )
        return cart
    
    @staticmethod
    async def clear_cart(user_id: str) -> Cart:
        db = await get_database()
        cart = Cart(user_id=user_id)
        await db.carts.update_one(
            {"user_id": user_id},
            {"$set": cart.dict()},
            upsert=True
        )
        return cart

class OrderService:
    @staticmethod
    def generate_order_number() -> str:
        return f"BL-{''.join(random.choices(string.ascii_uppercase + string.digits, k=8))}"
    
    @staticmethod
    async def create_order(user_id: str, order_data: OrderCreate) -> Order:
        db = await get_database()
        cart = await CartService.get_cart(user_id)
        
        if not cart.items:
            raise ValueError("Cart is empty")
        
        # Calculate totals
        order_items = []
        subtotal = 0
        
        for cart_item in cart.items:
            product = await ProductService.get_product_by_id(cart_item.product_id)
            if not product:
                continue
            
            item_total = cart_item.price * cart_item.quantity
            subtotal += item_total
            
            order_item = OrderItem(
                product_id=cart_item.product_id,
                product_name=product.name,
                variant=cart_item.variant,
                quantity=cart_item.quantity,
                price=cart_item.price,
                total=item_total
            )
            order_items.append(order_item)
        
        # Calculate shipping and tax
        shipping_cost = 0 if subtotal >= 50 else 9.99
        tax_amount = subtotal * 0.08  # 8% tax
        total = subtotal + shipping_cost + tax_amount
        
        # Create order
        order = Order(
            user_id=user_id,
            order_number=OrderService.generate_order_number(),
            items=order_items,
            subtotal=subtotal,
            shipping_cost=shipping_cost,
            tax_amount=tax_amount,
            total=total,
            shipping_address=order_data.shipping_address,
            payment_method=order_data.payment_method,
            notes=order_data.notes
        )
        
        await db.orders.insert_one(order.dict())
        
        # Clear cart
        await CartService.clear_cart(user_id)
        
        return order

class COAService:
    @staticmethod
    async def get_coa_by_product_slug(product_slug: str) -> Optional[COA]:
        db = await get_database()
        product = await ProductService.get_product_by_slug(product_slug)
        if not product:
            return None
        
        coa = await db.coas.find_one({"product_id": product.id})
        if coa:
            return COA(**coa)
        
        # Generate mock COA if not exists
        mock_coa = COA(
            product_id=product.id,
            test_date="2025-01-20",
            sample_date="2025-01-18",
            batch_number=f"BL-{product.id[-8:]}-2025",
            certificate_number=f"COA-{product.id[-8:]}-20250120",
            cannabinoids=[
                {"compound": "THCa", "percentage": product.thca_percentage or "25.8%", "mg_g": "258.0 mg/g"},
                {"compound": "Delta-9 THC", "percentage": "0.12%", "mg_g": "1.2 mg/g"},
                {"compound": "CBDa", "percentage": "0.8%", "mg_g": "8.0 mg/g"},
                {"compound": "CBD", "percentage": "0.05%", "mg_g": "0.5 mg/g"},
                {"compound": "CBG", "percentage": "1.2%", "mg_g": "12.0 mg/g"},
                {"compound": "CBN", "percentage": "0.1%", "mg_g": "1.0 mg/g"}
            ],
            terpenes=[
                {"compound": "Myrcene", "percentage": "0.65%"},
                {"compound": "Limonene", "percentage": "0.42%"},
                {"compound": "Caryophyllene", "percentage": "0.38%"},
                {"compound": "Linalool", "percentage": "0.21%"},
                {"compound": "Pinene", "percentage": "0.18%"}
            ],
            contaminants={
                "pesticides": "None Detected",
                "residualSolvents": "None Detected", 
                "heavyMetals": "Within Safe Limits",
                "microbials": "Pass",
                "moisture": "8.2%"
            }
        )
        
        await db.coas.insert_one(mock_coa.dict())
        return mock_coa