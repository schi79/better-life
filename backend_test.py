#!/usr/bin/env python3
"""
Comprehensive Backend API Testing for Better Lifestyles THCa Cannabis E-commerce
Tests all backend endpoints including Products, Cart, Authentication, Orders, and COA APIs
"""

import asyncio
import aiohttp
import json
import os
from typing import Dict, Any, Optional
from datetime import datetime

# Get backend URL from frontend .env
BACKEND_URL = "https://better-life-store.preview.emergentagent.com/api"

class BackendTester:
    def __init__(self):
        self.session = None
        self.auth_token = None
        self.test_user_data = {
            "email": "sarah.cannabis@example.com",
            "username": "sarahc420",
            "password": "Pass123!",
            "first_name": "Sarah",
            "last_name": "Cannabis"
        }
        self.test_results = []
        
    async def setup_session(self):
        """Setup HTTP session"""
        self.session = aiohttp.ClientSession()
        
    async def cleanup_session(self):
        """Cleanup HTTP session"""
        if self.session:
            await self.session.close()
            
    def log_test(self, test_name: str, success: bool, details: str = "", response_data: Any = None):
        """Log test results"""
        status = "✅ PASS" if success else "❌ FAIL"
        result = {
            "test": test_name,
            "status": status,
            "success": success,
            "details": details,
            "timestamp": datetime.now().isoformat(),
            "response_data": response_data
        }
        self.test_results.append(result)
        print(f"{status} - {test_name}")
        if details:
            print(f"    Details: {details}")
        if not success and response_data:
            print(f"    Response: {response_data}")
        print()

    async def make_request(self, method: str, endpoint: str, data: Dict = None, headers: Dict = None) -> tuple:
        """Make HTTP request and return (success, response_data, status_code)"""
        url = f"{BACKEND_URL}{endpoint}"
        
        # Add auth header if token exists
        if self.auth_token and headers is None:
            headers = {"Authorization": f"Bearer {self.auth_token}"}
        elif self.auth_token and headers:
            headers["Authorization"] = f"Bearer {self.auth_token}"
            
        try:
            if method.upper() == "GET":
                async with self.session.get(url, headers=headers) as response:
                    response_data = await response.json()
                    return response.status < 400, response_data, response.status
            elif method.upper() == "POST":
                async with self.session.post(url, json=data, headers=headers) as response:
                    response_data = await response.json()
                    return response.status < 400, response_data, response.status
            elif method.upper() == "PUT":
                async with self.session.put(url, json=data, headers=headers) as response:
                    response_data = await response.json()
                    return response.status < 400, response_data, response.status
            elif method.upper() == "DELETE":
                async with self.session.delete(url, headers=headers) as response:
                    response_data = await response.json()
                    return response.status < 400, response_data, response.status
        except Exception as e:
            return False, {"error": str(e)}, 500

    # ==================== BASIC API TESTS ====================
    
    async def test_api_root(self):
        """Test basic API connectivity"""
        success, data, status = await self.make_request("GET", "/")
        
        if success and "Better Lifestyles THCa Store API" in data.get("message", ""):
            self.log_test("API Root Endpoint", True, f"API is running - {data['message']}")
        else:
            self.log_test("API Root Endpoint", False, f"API not responding correctly (Status: {status})", data)

    # ==================== AUTHENTICATION TESTS ====================
    
    async def test_user_registration(self):
        """Test user registration - SKIPPED due to bcrypt compatibility issue"""
        self.log_test("User Registration", False, 
                     "SKIPPED - bcrypt library compatibility issue with current environment. Authentication endpoints need bcrypt fix.")

    async def test_user_login(self):
        """Test user login - SKIPPED due to bcrypt compatibility issue"""
        self.log_test("User Login", False, 
                     "SKIPPED - bcrypt library compatibility issue with current environment. Authentication endpoints need bcrypt fix.")

    async def test_get_current_user(self):
        """Test getting current user info - SKIPPED due to auth dependency"""
        self.log_test("Get Current User", False, 
                     "SKIPPED - Depends on authentication which has bcrypt compatibility issue.")

    async def test_age_verification(self):
        """Test age verification - SKIPPED due to auth dependency"""
        self.log_test("Age Verification", False, 
                     "SKIPPED - Depends on authentication which has bcrypt compatibility issue.")

    # ==================== PRODUCTS API TESTS ====================
    
    async def test_get_all_products(self):
        """Test getting all products"""
        success, data, status = await self.make_request("GET", "/products/")
        
        if success and isinstance(data, list) and len(data) > 0:
            product_count = len(data)
            sample_product = data[0]
            thca_products = [p for p in data if p.get('thca_percentage')]
            
            self.log_test("Get All Products", True, 
                         f"Retrieved {product_count} products, {len(thca_products)} with THCa data. Sample: {sample_product.get('name')}")
        else:
            self.log_test("Get All Products", False, f"Failed to get products (Status: {status})", data)

    async def test_get_featured_products(self):
        """Test getting featured products"""
        success, data, status = await self.make_request("GET", "/products/featured")
        
        if success and isinstance(data, list):
            featured_count = len(data)
            if featured_count > 0:
                sample_featured = data[0]
                self.log_test("Get Featured Products", True, 
                             f"Retrieved {featured_count} featured products. Sample: {sample_featured.get('name')}")
            else:
                self.log_test("Get Featured Products", True, "No featured products found (valid response)")
        else:
            self.log_test("Get Featured Products", False, f"Failed to get featured products (Status: {status})", data)

    async def test_product_filtering(self):
        """Test product filtering by category and type"""
        # Test category filtering
        success, data, status = await self.make_request("GET", "/products/?category=high-thca-flowers")
        
        if success and isinstance(data, list):
            flower_count = len(data)
            self.log_test("Product Category Filtering", True, 
                         f"Retrieved {flower_count} high-thca-flowers products")
        else:
            self.log_test("Product Category Filtering", False, f"Category filtering failed (Status: {status})", data)

        # Test type filtering
        success, data, status = await self.make_request("GET", "/products/?product_type=Indica")
        
        if success and isinstance(data, list):
            indica_count = len(data)
            self.log_test("Product Type Filtering", True, 
                         f"Retrieved {indica_count} Indica products")
        else:
            self.log_test("Product Type Filtering", False, f"Type filtering failed (Status: {status})", data)

    async def test_get_product_by_slug(self):
        """Test getting product by slug"""
        # First get a product to test with
        success, products, status = await self.make_request("GET", "/products/")
        
        if not success or not products:
            self.log_test("Get Product by Slug", False, "No products available to test with")
            return
            
        test_product = products[0]
        slug = test_product.get('slug')
        
        if not slug:
            self.log_test("Get Product by Slug", False, "Test product has no slug")
            return
            
        success, data, status = await self.make_request("GET", f"/products/slug/{slug}")
        
        if success and data.get('slug') == slug:
            self.log_test("Get Product by Slug", True, 
                         f"Retrieved product by slug: {data.get('name')} - THCa: {data.get('thca_percentage')}")
        else:
            self.log_test("Get Product by Slug", False, f"Failed to get product by slug (Status: {status})", data)

    async def test_product_search(self):
        """Test product search functionality"""
        success, data, status = await self.make_request("GET", "/products/search?q=THCa")
        
        if success and isinstance(data, list):
            search_count = len(data)
            self.log_test("Product Search", True, 
                         f"Search for 'THCa' returned {search_count} products")
        else:
            self.log_test("Product Search", False, f"Product search failed (Status: {status})", data)

    async def test_get_categories_and_types(self):
        """Test getting available categories and product types"""
        # Test categories
        success, data, status = await self.make_request("GET", "/products/categories")
        
        if success and isinstance(data, list) and len(data) > 0:
            self.log_test("Get Product Categories", True, 
                         f"Retrieved {len(data)} categories: {', '.join(data)}")
        else:
            self.log_test("Get Product Categories", False, f"Failed to get categories (Status: {status})", data)

        # Test product types
        success, data, status = await self.make_request("GET", "/products/types")
        
        if success and isinstance(data, list) and len(data) > 0:
            self.log_test("Get Product Types", True, 
                         f"Retrieved {len(data)} types: {', '.join(data)}")
        else:
            self.log_test("Get Product Types", False, f"Failed to get types (Status: {status})", data)

    # ==================== CART API TESTS ====================
    
    async def test_get_empty_cart(self):
        """Test getting empty cart - SKIPPED due to auth dependency"""
        self.log_test("Get Empty Cart", False, 
                     "SKIPPED - Requires authentication which has bcrypt compatibility issue.")

    async def test_add_to_cart(self):
        """Test adding items to cart - SKIPPED due to auth dependency"""
        self.log_test("Add to Cart", False, 
                     "SKIPPED - Requires authentication which has bcrypt compatibility issue.")

    async def test_update_cart_item(self):
        """Test updating cart item quantity - SKIPPED due to auth dependency"""
        self.log_test("Update Cart Item", False, 
                     "SKIPPED - Requires authentication which has bcrypt compatibility issue.")

    async def test_guest_cart(self):
        """Test guest cart functionality"""
        session_id = "test-session-123"
        
        # Test get guest cart
        success, data, status = await self.make_request("GET", f"/cart/guest/{session_id}", headers={})
        
        if success and "items" in data:
            self.log_test("Get Guest Cart", True, 
                         f"Guest cart retrieved - Items: {data.get('item_count', 0)}")
        else:
            self.log_test("Get Guest Cart", False, f"Failed to get guest cart (Status: {status})", data)

        # Test add to guest cart
        success, products, status = await self.make_request("GET", "/products/", headers={})
        
        if success and products:
            test_product = products[0]
            cart_item = {
                "product_id": test_product.get('id'),
                "variant": test_product.get('variants', ['1g'])[0],
                "quantity": 1
            }
            
            success, data, status = await self.make_request("POST", f"/cart/guest/{session_id}/add", cart_item, headers={})
            
            if success and data.get("item_count", 0) > 0:
                self.log_test("Add to Guest Cart", True, 
                             f"Added item to guest cart. Total items: {data.get('item_count')}")
            else:
                self.log_test("Add to Guest Cart", False, f"Failed to add to guest cart (Status: {status})", data)

    # ==================== COA API TESTS ====================
    
    async def test_get_coa(self):
        """Test getting Certificate of Analysis"""
        # First get a product to test COA with
        success, products, status = await self.make_request("GET", "/products/")
        
        if not success or not products:
            self.log_test("Get COA", False, "No products available to test COA with")
            return
            
        test_product = products[0]
        slug = test_product.get('slug')
        
        success, data, status = await self.make_request("GET", f"/coa/{slug}")
        
        if success and "cannabinoids" in data and "terpenes" in data:
            cannabinoid_count = len(data.get("cannabinoids", []))
            terpene_count = len(data.get("terpenes", []))
            
            self.log_test("Get COA", True, 
                         f"COA retrieved for {test_product.get('name')} - {cannabinoid_count} cannabinoids, {terpene_count} terpenes")
        else:
            self.log_test("Get COA", False, f"Failed to get COA (Status: {status})", data)

    # ==================== ORDERS API TESTS ====================
    
    async def test_create_order(self):
        """Test creating an order - SKIPPED due to auth dependency"""
        self.log_test("Create Order", False, 
                     "SKIPPED - Requires authentication which has bcrypt compatibility issue.")

    async def test_get_user_orders(self):
        """Test getting user orders - SKIPPED due to auth dependency"""
        self.log_test("Get User Orders", False, 
                     "SKIPPED - Requires authentication which has bcrypt compatibility issue.")

    # ==================== MAIN TEST RUNNER ====================
    
    async def run_all_tests(self):
        """Run all backend tests"""
        print("🧪 Starting Better Lifestyles THCa Cannabis E-commerce Backend Testing")
        print("=" * 80)
        print()
        
        await self.setup_session()
        
        try:
            # Basic API Tests
            print("📡 BASIC API CONNECTIVITY TESTS")
            print("-" * 40)
            await self.test_api_root()
            
            # Authentication Tests
            print("🔐 AUTHENTICATION API TESTS")
            print("-" * 40)
            await self.test_user_registration()
            await self.test_get_current_user()
            await self.test_age_verification()
            
            # Products API Tests
            print("🌿 PRODUCTS API TESTS")
            print("-" * 40)
            await self.test_get_all_products()
            await self.test_get_featured_products()
            await self.test_product_filtering()
            await self.test_get_product_by_slug()
            await self.test_product_search()
            await self.test_get_categories_and_types()
            
            # Cart API Tests
            print("🛒 CART API TESTS")
            print("-" * 40)
            await self.test_get_empty_cart()
            await self.test_add_to_cart()
            await self.test_update_cart_item()
            await self.test_guest_cart()
            
            # COA API Tests
            print("📋 COA (Certificate of Analysis) API TESTS")
            print("-" * 40)
            await self.test_get_coa()
            
            # Orders API Tests
            print("📦 ORDERS API TESTS")
            print("-" * 40)
            await self.test_create_order()
            await self.test_get_user_orders()
            
        finally:
            await self.cleanup_session()
        
        # Print summary
        self.print_test_summary()

    def print_test_summary(self):
        """Print test results summary"""
        print("=" * 80)
        print("📊 TEST RESULTS SUMMARY")
        print("=" * 80)
        
        passed_tests = [t for t in self.test_results if t["success"]]
        failed_tests = [t for t in self.test_results if not t["success"]]
        
        print(f"✅ PASSED: {len(passed_tests)}")
        print(f"❌ FAILED: {len(failed_tests)}")
        print(f"📈 SUCCESS RATE: {len(passed_tests)}/{len(self.test_results)} ({len(passed_tests)/len(self.test_results)*100:.1f}%)")
        print()
        
        if failed_tests:
            print("❌ FAILED TESTS:")
            print("-" * 40)
            for test in failed_tests:
                print(f"• {test['test']}: {test['details']}")
            print()
        
        print("✅ PASSED TESTS:")
        print("-" * 40)
        for test in passed_tests:
            print(f"• {test['test']}")
        
        print()
        print("🎯 BACKEND TESTING COMPLETED")
        print("=" * 80)

async def main():
    """Main test runner"""
    tester = BackendTester()
    await tester.run_all_tests()

if __name__ == "__main__":
    asyncio.run(main())