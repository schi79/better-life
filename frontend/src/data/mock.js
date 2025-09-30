// Mock data for Better Lifestyles

export const categories = [
  {
    id: 1,
    name: 'Supplements',
    slug: 'supplements',
    image: 'https://images.unsplash.com/photo-1664956618021-73c47736845e',
    description: 'Premium wellness supplements for optimal health'
  },
  {
    id: 2,
    name: 'Fitness Equipment',
    slug: 'fitness-equipment',
    image: 'https://images.unsplash.com/photo-1627257058769-0a99529e4312',
    description: 'Quality fitness gear for home workouts'
  },
  {
    id: 3,
    name: 'Skincare',
    slug: 'skincare',
    image: 'https://images.pexels.com/photos/3321416/pexels-photo-3321416.jpeg',
    description: 'Natural skincare products for radiant skin'
  },
  {
    id: 4,
    name: 'Wellness Bundles',
    slug: 'wellness-bundles',
    image: 'https://images.pexels.com/photos/6694187/pexels-photo-6694187.jpeg',
    description: 'Curated wellness product combinations'
  },
  {
    id: 5,
    name: 'Bulk Orders',
    slug: 'bulk-orders',
    image: 'https://images.unsplash.com/photo-1591311630200-ffa9120a540f',
    description: 'Wholesale pricing for bulk purchases'
  }
];

export const products = [
  // Supplements
  {
    id: 1,
    name: 'Premium Omega-3 Complex',
    slug: 'premium-omega-3-complex',
    price: 29.99,
    originalPrice: 39.99,
    category: 'supplements',
    type: 'supplement',
    image: 'https://images.unsplash.com/photo-1664956618021-73c47736845e',
    variants: ['30 caps', '60 caps', '90 caps', '180 caps'],
    description: 'High-potency omega-3 fish oil for heart and brain health',
    benefits: ['Heart Health', 'Brain Function', 'Anti-inflammatory'],
    rating: 4.8,
    reviews: 245,
    inStock: true,
    featured: true
  },
  {
    id: 2,
    name: 'Vitamin D3 + K2 Boost',
    slug: 'vitamin-d3-k2-boost',
    price: 24.99,
    originalPrice: 34.99,
    category: 'supplements',
    type: 'supplement',
    image: 'https://images.unsplash.com/photo-1625480498292-631335ea1510',
    variants: ['30 caps', '60 caps', '90 caps', '180 caps'],
    description: 'Synergistic blend for bone and immune system support',
    benefits: ['Bone Health', 'Immune Support', 'Energy'],
    rating: 4.7,
    reviews: 189,
    inStock: true,
    featured: true
  },
  {
    id: 3,
    name: 'Multivitamin Complete',
    slug: 'multivitamin-complete',
    price: 34.99,
    originalPrice: 44.99,
    category: 'supplements',
    type: 'supplement',
    image: 'https://images.pexels.com/photos/208518/pexels-photo-208518.jpeg',
    variants: ['30 caps', '60 caps', '90 caps', '180 caps'],
    description: 'Complete daily nutrition in one convenient capsule',
    benefits: ['Complete Nutrition', 'Energy Support', 'Wellness'],
    rating: 4.9,
    reviews: 321,
    inStock: true,
    featured: true
  },
  
  // Fitness Equipment
  {
    id: 4,
    name: 'Adjustable Kettlebell Set',
    slug: 'adjustable-kettlebell-set',
    price: 89.99,
    originalPrice: 119.99,
    category: 'fitness-equipment',
    type: 'equipment',
    image: 'https://images.pexels.com/photos/221247/pexels-photo-221247.jpeg',
    variants: ['10-25lbs', '15-35lbs', '20-50lbs'],
    description: 'Space-saving adjustable kettlebell for full-body workouts',
    benefits: ['Full Body Workout', 'Space Saving', 'Adjustable Weight'],
    rating: 4.6,
    reviews: 156,
    inStock: true,
    featured: true
  },
  {
    id: 5,
    name: 'Premium Yoga Mat & Block Set',
    slug: 'premium-yoga-mat-block-set',
    price: 45.99,
    originalPrice: 65.99,
    category: 'fitness-equipment',
    type: 'equipment',
    image: 'https://images.pexels.com/photos/3927387/pexels-photo-3927387.jpeg',
    variants: ['Basic Set', 'Premium Set', 'Complete Set'],
    description: 'Non-slip yoga mat with supportive blocks and strap',
    benefits: ['Non-slip Surface', 'Eco-friendly', 'Complete Set'],
    rating: 4.8,
    reviews: 298,
    inStock: true,
    featured: true
  },
  {
    id: 6,
    name: 'Home Dumbbell Collection',
    slug: 'home-dumbbell-collection',
    price: 149.99,
    originalPrice: 199.99,
    category: 'fitness-equipment',
    type: 'equipment',
    image: 'https://images.unsplash.com/photo-1591311630200-ffa9120a540f',
    variants: ['5-25lbs', '10-50lbs', '15-75lbs'],
    description: 'Complete dumbbell set for strength training at home',
    benefits: ['Strength Training', 'Multiple Weights', 'Durable'],
    rating: 4.7,
    reviews: 134,
    inStock: true,
    featured: true
  },

  // Skincare
  {
    id: 7,
    name: 'Vitamin C Brightening Serum',
    slug: 'vitamin-c-brightening-serum',
    price: 39.99,
    originalPrice: 54.99,
    category: 'skincare',
    type: 'serum',
    image: 'https://images.unsplash.com/photo-1573461160327-b450ce3d8e7f',
    variants: ['15ml', '30ml', '50ml'],
    description: 'Potent vitamin C serum for radiant, youthful skin',
    benefits: ['Brightening', 'Anti-aging', 'Antioxidant'],
    rating: 4.9,
    reviews: 412,
    inStock: true,
    featured: true
  },
  {
    id: 8,
    name: 'Hydrating Skincare Bundle',
    slug: 'hydrating-skincare-bundle',
    price: 79.99,
    originalPrice: 109.99,
    category: 'skincare',
    type: 'bundle',
    image: 'https://images.pexels.com/photos/4154192/pexels-photo-4154192.jpeg',
    variants: ['Starter Kit', 'Complete Kit', 'Premium Kit'],
    description: 'Complete skincare routine for deep hydration',
    benefits: ['Deep Hydration', 'Complete Routine', 'Value Bundle'],
    rating: 4.8,
    reviews: 267,
    inStock: true,
    featured: true
  },

  // Wellness Products
  {
    id: 9,
    name: 'Natural Electrolyte Drink',
    slug: 'natural-electrolyte-drink',
    price: 19.99,
    originalPrice: 26.99,
    category: 'supplements',
    type: 'drink',
    image: 'https://images.unsplash.com/photo-1714761693838-e58d9b8677cc',
    variants: ['6-pack', '12-pack', '24-pack'],
    description: 'All-natural electrolyte replenishment for active lifestyles',
    benefits: ['Hydration', 'Natural Ingredients', 'Energy Boost'],
    rating: 4.6,
    reviews: 198,
    inStock: true,
    featured: true
  },
  {
    id: 10,
    name: 'Wellness Essential Oil Set',
    slug: 'wellness-essential-oil-set',
    price: 54.99,
    originalPrice: 74.99,
    category: 'wellness-bundles',
    type: 'oils',
    image: 'https://images.unsplash.com/photo-1713434638237-203fc6de993a',
    variants: ['Starter Set', 'Complete Set', 'Premium Collection'],
    description: 'Curated essential oils for relaxation and wellness',
    benefits: ['Aromatherapy', 'Relaxation', 'Natural'],
    rating: 4.7,
    reviews: 156,
    inStock: true,
    featured: true
  }
];

export const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    rating: 5,
    text: "Amazing quality supplements! I've been using the Omega-3 complex for months and feel the difference in my energy levels and overall health.",
    product: 'Premium Omega-3 Complex'
  },
  {
    id: 2,
    name: 'Mike Rodriguez',
    rating: 5,
    text: "The fitness equipment is top-notch. The adjustable kettlebell set has transformed my home workouts completely!",
    product: 'Adjustable Kettlebell Set'
  },
  {
    id: 3,
    name: 'Emily Chen',
    rating: 5,
    text: "The Vitamin C serum is incredible! My skin looks brighter and more radiant than ever. Will definitely order again.",
    product: 'Vitamin C Brightening Serum'
  },
  {
    id: 4,
    name: 'David Thompson',
    rating: 5,
    text: "Fast shipping and premium quality products. The wellness bundles offer great value and everything arrived perfectly packaged.",
    product: 'Hydrating Skincare Bundle'
  },
  {
    id: 5,
    name: 'Lisa Martinez',
    rating: 5,
    text: "The yoga mat set is amazing! Non-slip surface works perfectly and the blocks are sturdy. Highly recommend!",
    product: 'Premium Yoga Mat & Block Set'
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