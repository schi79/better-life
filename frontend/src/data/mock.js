// Mock data for Better Lifestyles - THCA Cannabis Store

export const categories = [
  {
    id: 1,
    name: 'High THCa Flowers',
    slug: 'high-thca-flowers',
    image: 'https://hmp.store/wp-content/uploads/2025/08/Deep-Spac.png',
    description: 'Premium indoor and outdoor THCa flower strains'
  },
  {
    id: 2,
    name: 'Concentrates', 
    slug: 'concentrates',
    image: 'https://hmp.store/wp-content/uploads/2025/07/THCa-Dantes-Driver-Rosin-a-300x300.jpg',
    description: 'Live rosin and premium THCa concentrates'
  },
  {
    id: 3,
    name: 'Edibles',
    slug: 'edibles',
    image: 'https://hmp.store/wp-content/uploads/2025/07/Hero-Image-1-1024x674.png',
    description: 'THCa-infused edibles and treats'
  },
  {
    id: 4,
    name: 'Bundles',
    slug: 'bundles',
    image: 'https://hmp.store/wp-content/uploads/2025/07/Bubble-Gum-Runtz.png',
    description: 'Curated THCa product bundles and deals'
  },
  {
    id: 5,
    name: 'Wholesale',
    slug: 'wholesale',
    image: 'https://hmp.store/wp-content/uploads/2025/08/mochi-2.png',
    description: 'Bulk THCa products for wholesale buyers'
  }
];

export const products = [
  // High THCa Flowers - Indoor
  {
    id: 1,
    name: 'High THCa Deep Space',
    slug: 'high-thca-deep-space',
    price: 29.99,
    originalPrice: 39.99,
    category: 'high-thca-flowers',
    type: 'Hybrid',
    image: 'https://hmp.store/wp-content/uploads/2025/08/Deep-Spac.png',
    variants: ['3.5g', '7g', '14g', '28g'],
    description: 'Premium indoor THCa flower with exceptional potency and flavor',
    benefits: ['Euphoric', 'Relaxing', 'Creative'],
    rating: 4.8,
    reviews: 245,
    inStock: true,
    featured: true,
    thca: '25.8%'
  },
  {
    id: 2,
    name: 'High THCa Purple Soda',
    slug: 'high-thca-purple-soda',
    price: 29.99,
    originalPrice: null,
    category: 'high-thca-flowers',
    type: 'Indica',
    image: 'https://hmp.store/wp-content/uploads/2025/08/Purple-Soda-1.png',
    variants: ['3.5g', '7g', '14g', '28g'],
    description: 'Relaxing indica-dominant THCa strain with sweet purple hues',
    benefits: ['Relaxing', 'Sleep', 'Pain Relief'],
    rating: 4.9,
    reviews: 189,
    inStock: true,
    featured: true,
    thca: '24.1%'
  },
  {
    id: 3,
    name: 'High THCa Cookies and Cream',
    slug: 'high-thca-cookies-cream',
    price: 29.99,
    originalPrice: null,
    category: 'high-thca-flowers',
    type: 'Hybrid',
    image: 'https://hmp.store/wp-content/uploads/2025/08/Cookies-And-Crea.png',
    variants: ['3.5g', '7g', '14g', '28g'],
    description: 'Balanced hybrid with sweet cookies and cream flavor profile',
    benefits: ['Balanced', 'Social', 'Happy'],
    rating: 4.7,
    reviews: 321,
    inStock: true,
    featured: true,
    thca: '26.3%'
  },
  {
    id: 4,
    name: 'High THCa Mochi',
    slug: 'high-thca-mochi',
    price: 29.99,
    originalPrice: null,
    category: 'high-thca-flowers',
    type: 'Hybrid',
    image: 'https://hmp.store/wp-content/uploads/2025/08/mochi-2.png',
    variants: ['3.5g', '7g', '14g', '28g'],
    description: 'Exotic hybrid strain with unique mochi-like aroma and effects',
    benefits: ['Euphoric', 'Creative', 'Uplifting'],
    rating: 4.8,
    reviews: 156,
    inStock: true,
    featured: true,
    thca: '27.2%'
  },

  // Light Dep Flowers
  {
    id: 5,
    name: 'High THCa Dirty Taxi - Light Dep',
    slug: 'high-thca-dirty-taxi-light-dep',
    price: 24.99,
    originalPrice: 29.99,
    category: 'high-thca-flowers',
    type: 'Sativa',
    image: 'https://hmp.store/wp-content/uploads/2025/08/Dirty-Taxi.png',
    variants: ['3.5g', '7g', '14g', '28g'],
    description: 'Energizing sativa-dominant light dep with citrus notes',
    benefits: ['Energizing', 'Focus', 'Uplifting'],
    rating: 4.6,
    reviews: 198,
    inStock: true,
    featured: true,
    thca: '22.8%'
  },
  {
    id: 6,
    name: 'High THCa Orange Sunset - Light Dep',
    slug: 'high-thca-orange-sunset-light-dep',
    price: 24.99,
    originalPrice: null,
    category: 'high-thca-flowers',
    type: 'Hybrid',
    image: 'https://hmp.store/wp-content/uploads/2025/08/Orange-Sunset.png',
    variants: ['3.5g', '7g', '14g', '28g'],
    description: 'Beautiful orange-hued hybrid with sunset citrus flavors',
    benefits: ['Balanced', 'Happy', 'Social'],
    rating: 4.7,
    reviews: 267,
    inStock: true,
    featured: true,
    thca: '23.5%'
  },
  {
    id: 7,
    name: 'High THCa Z Cake - Light Dep',
    slug: 'high-thca-z-cake-light-dep',
    price: 24.99,
    originalPrice: null,
    category: 'high-thca-flowers',
    type: 'Indica',
    image: 'https://hmp.store/wp-content/uploads/2025/08/Z-Cake.png',
    variants: ['3.5g', '7g', '14g', '28g'],
    description: 'Dessert-like indica with cake batter and vanilla notes',
    benefits: ['Relaxing', 'Sleep', 'Pain Relief'],
    rating: 4.8,
    reviews: 134,
    inStock: true,
    featured: true,
    thca: '24.7%'
  },

  // Concentrates
  {
    id: 8,
    name: 'Big Dipper Live Rosin',
    slug: 'big-dipper-live-rosin',
    price: 79.99,
    originalPrice: 99.99,
    category: 'concentrates',
    type: 'Rosin',
    image: 'https://hmp.store/wp-content/uploads/2025/07/THCa-Dantes-Driver-Rosin-a-300x300.jpg',
    variants: ['1g', '2g', '3g'],
    description: 'Premium live rosin extracted using ice water and heat',
    benefits: ['Potent', 'Full Spectrum', 'Clean'],
    rating: 4.9,
    reviews: 89,
    inStock: true,
    featured: true,
    thca: '78.2%'
  },

  // Bundles
  {
    id: 9,
    name: 'High THCa Bubblegum Runtz Bundle',
    slug: 'high-thca-bubblegum-runtz-bundle',
    price: 450.00,
    originalPrice: 550.00,
    category: 'bundles',
    type: 'Bundle',
    image: 'https://hmp.store/wp-content/uploads/2025/07/Bubble-Gum-Runtz.png',
    variants: ['Bulk 4oz', 'Bulk 8oz', 'Bulk 1lb'],
    description: 'Bulk bundle of premium Bubblegum Runtz THCa flower',
    benefits: ['Value Pack', 'Bulk Pricing', 'Premium Quality'],
    rating: 4.8,
    reviews: 45,
    inStock: true,
    featured: true,
    thca: '26.8%'
  },

  // More popular strains
  {
    id: 10,
    name: 'High THCa Obama Runtz',
    slug: 'high-thca-obama-runtz',
    price: 29.99,
    originalPrice: null,
    category: 'high-thca-flowers',
    type: 'Hybrid',
    image: 'https://hmp.store/wp-content/uploads/2025/08/Obama-Runtz.png',
    variants: ['3.5g', '7g', '14g', '28g'],
    description: 'Presidential hybrid with complex fruity flavors',
    benefits: ['Balanced', 'Social', 'Creative'],
    rating: 4.7,
    reviews: 298,
    inStock: true,
    featured: false,
    thca: '25.1%'
  }
];

export const testimonials = [
  {
    id: 1,
    name: 'Davion Taylor',
    rating: 5,
    text: "Thank God I got a half oz of this and only 3.5 of the animal mints. This strain is KILLER! Half a blunt and I'm floating. Can't even describe the buzz its so well rounded.",
    product: 'High THCa Deep Space'
  },
  {
    id: 2,
    name: 'Chris Teran',
    rating: 5,
    text: "I spent weeks researching best thca before making the decision to try it for the first time and man this blew my expectations! taste is amazing nice cookies every hit, and the smell is crazy! def will be shopping again soon.",
    product: 'High THCa Cookies and Cream'
  },
  {
    id: 3,
    name: 'Wrs Hurmer',
    rating: 5,
    text: "Super smooth, not as flavorful when compared to other garlic strains. Got me stoned no problem, and looks and smells amazing! Great dabs for the cost.",
    product: 'Big Dipper Live Rosin'
  },
  {
    id: 4,
    name: 'Jacob DeGrand',
    rating: 5,
    text: "Pretty good. Unique nose. Better Lifestyles always delivers and fast. Double vacuum sealed mylar and vacuum sealed jars. Never had a bad strain from these guys. Excellent customer service too!",
    product: 'High THCa Purple Soda'
  },
  {
    id: 5,
    name: 'Chad Owen',
    rating: 5,
    text: "I can't say enough about this strain. It really is god mode bud. I bought an ounce of this and I absolutely love this. It tastes so gassy and fresh at the same time. Buds were so beautiful. Will buy this again for sure. 10/10",
    product: 'High THCa Mochi'
  }
];

export const blogPosts = [
  {
    id: 1,
    title: 'The Science Behind Vitamin D3 and K2 Synergy',
    slug: 'vitamin-d3-k2-synergy-science',
    excerpt: 'Discover why combining Vitamin D3 with K2 creates a powerful duo for bone health and immune support.',
    image: 'https://images.pexels.com/photos/3683099/pexels-photo-3683099.jpeg',
    date: '2025-01-15',
    author: 'Dr. Lisa Chen',
    category: 'Nutrition'
  },
  {
    id: 2,
    title: 'Building Your Perfect Home Gym on Any Budget',
    slug: 'home-gym-budget-guide',
    excerpt: 'Complete guide to creating an effective home workout space without breaking the bank.',
    image: 'https://images.unsplash.com/photo-1627257058769-0a99529e4312',
    date: '2025-01-10',
    author: 'Mike Johnson',
    category: 'Fitness'
  },
  {
    id: 3,
    title: 'Natural Skincare: Understanding Your Skin Type',
    slug: 'natural-skincare-skin-types',
    excerpt: 'Learn how to identify your skin type and choose the right natural skincare products for optimal results.',
    image: 'https://images.pexels.com/photos/3321416/pexels-photo-3321416.jpeg',
    date: '2025-01-05',
    author: 'Sarah Williams',
    category: 'Skincare'
  },
  {
    id: 4,
    title: 'The Ultimate Guide to Daily Wellness Routines',
    slug: 'daily-wellness-routines-guide',
    excerpt: 'Discover how to create sustainable daily wellness habits that transform your health and energy.',
    image: 'https://images.pexels.com/photos/6694187/pexels-photo-6694187.jpeg',
    date: '2024-12-28',
    author: 'Emma Davis',
    category: 'Wellness'
  }
];

export const moods = [
  {
    id: 1,
    name: 'Energize',
    slug: 'energize',
    color: '#FF6B35',
    products: [1, 2, 9]
  },
  {
    id: 2,
    name: 'Focus',
    slug: 'focus',
    color: '#4ECDC4',
    products: [1, 3, 4]
  },
  {
    id: 3,
    name: 'Relax',
    slug: 'relax',
    color: '#45B7D1',
    products: [5, 7, 10]
  },
  {
    id: 4,
    name: 'Restore',
    slug: 'restore',
    color: '#96CEB4',
    products: [6, 7, 8]
  }
];

export const navigationMenus = {
  categories: [
    {
      name: 'Premium Supplements',
      items: [
        'Omega-3 Complex',
        'Vitamin D3 + K2',
        'Multivitamins',
        'Probiotics',
        'Protein Powders',
        'Supplement Bundles',
        'Bulk Supplements'
      ]
    }
  ],
  shopByMood: [
    'Energize',
    'Focus', 
    'Relax',
    'Restore'
  ],
  more: [
    'Best Selling',
    'New Arrivals',
    'Bundle Deals',
    'Seasonal Favorites'
  ],
  learn: [
    'Wellness Information',
    'Product Guides',
    'Affiliate Program',
    'Blog Articles'
  ]
};