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
    title: 'Indoor vs. Light Deprivation vs. Outdoor Cannabis',
    slug: 'indoor-vs-light-deprivation-vs-outdoor-cannabis',
    excerpt: 'Learn the differences between indoor, light dep, and outdoor cannabis cultivation methods and their effects on quality and potency.',
    image: 'https://hmp.store/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-23-at-64602-PM-1024x682.jpeg',
    date: '2025-06-23',
    author: 'Better Lifestyles Team',
    category: 'Education'
  },
  {
    id: 2,
    title: 'THCA: The Untapped Potential of Raw Cannabis',
    slug: 'thca-the-untapped-potential-of-raw-cannabis',
    excerpt: 'Discover the unique properties of THCA and how it differs from THC in terms of effects, benefits, and consumption methods.',
    image: 'https://hmp.store/wp-content/uploads/2025/05/BLOG_IAMGE_1-1-2-1024x683.webp',
    date: '2025-05-23',
    author: 'Better Lifestyles Team',
    category: 'Science'
  },
  {
    id: 3,
    title: 'THCa Flower: The Ultimate Guide for Curious Consumers',
    slug: 'thca-flower-the-ultimate-guide-for-curious-consumers',
    excerpt: 'Everything you need to know about THCa flower - from what it is to how to use it safely and effectively.',
    image: 'https://hmp.store/wp-content/uploads/2025/05/Blog_Image_2-1-1-1.png',
    date: '2025-05-18',
    author: 'Better Lifestyles Team',
    category: 'Guide'
  },
  {
    id: 4,
    title: 'The Ultimate Guide to Choosing the Right Cannabis Strain for You',
    slug: 'the-ultimate-guide-to-choosing-the-right-cannabis-strain-for-you',
    excerpt: 'Navigate the world of cannabis strains with confidence. Learn how to select the perfect strain based on your needs and preferences.',
    image: 'https://hmp.store/wp-content/uploads/2025/03/Rectangle-34625171.png',
    date: '2025-02-07',
    author: 'Better Lifestyles Team',
    category: 'Guide'
  }
];

export const moods = [
  {
    id: 1,
    name: 'Chill',
    slug: 'chill',
    color: '#45B7D1',
    products: [2, 7]  // Purple Soda, Z Cake
  },
  {
    id: 2,
    name: 'Happy',
    slug: 'happy',
    color: '#FF6B35',
    products: [3, 4, 10]  // Cookies and Cream, Mochi, Obama Runtz
  },
  {
    id: 3,
    name: 'Sleep',
    slug: 'sleep',
    color: '#6B46C1',
    products: [2, 7]  // Purple Soda, Z Cake
  },
  {
    id: 4,
    name: 'Social',
    slug: 'social',
    color: '#10B981',
    products: [1, 5, 6]  // Deep Space, Dirty Taxi, Orange Sunset
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