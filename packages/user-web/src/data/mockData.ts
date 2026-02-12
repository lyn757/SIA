/**
 * 模拟数据中心
 * 用于在未接入真实接口前，实现页面间的数据联动
 */

export interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  description: string;
  image: string;
  avatar: string;
  views: string;
  likes?: string;
  favorites?: string;
  shares?: string;
  cart?: string;
  designer: {
    name: string;
    avatar: string;
  };
  // 案例详情页额外数据
  detailImages?: string[];
  rating?: number;
  reviewCount?: number;
  caseProducts?: CaseProduct[];
  hasDesignInspiration?: boolean;
  designInspiration?: DesignInspiration;
  reviews?: Review[];
}

export interface CaseProduct {
  id: number;
  name: string;
  price: number | null;
  color: string;
  size: string;
  material: string;
  description: string;
  image: string;
}

export interface DesignInspiration {
  title: string;
  intro: string;
  colorMatching: string;
  materialSelection: string;
  spatialCharacteristics: string;
  designerSuggestion: string;
}

export interface Review {
  id: number;
  username: string;
  avatar: string;
  text: string;
  images: string[];
  rating?: number;
}

// 基础商品数据
export const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Elegant and romantic minimalist aesthetics',
    price: 1099,
    description: 'The modern minimalist style of Nordic style pursues a design concept of simplicity and brightness',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop&q=80',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=designer1',
    views: '9.8K',
    likes: '1.2K',
    favorites: '854',
    shares: '22',
    cart: '12',
    designer: {
      name: 'Nancy',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=designer1'
    },
    detailImages: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop&q=80'
    ],
    rating: 5.0,
    reviewCount: 1200,
    hasDesignInspiration: true,
    designInspiration: {
      title: 'Design inspiration',
      intro: 'The overall design is dominated by warm wooden elements, paired with a soft beige color scheme, creating a comfortable and cozy Nordic style bedroom.',
      colorMatching: 'Mainly in beige and natural wood colors, with a small amount of gray and green plant accents',
      materialSelection: 'Natural wood, cotton and linen fabric, wool carpet',
      spatialCharacteristics: 'Open and bright, with simple lines and practical functions',
      designerSuggestion: 'Soft decoration color matching can be adjusted according to personal preferences, and adding green plants can make the space more vibrant.'
    },
    caseProducts: [
      {
        id: 1,
        name: 'White birch sofa',
        price: 1000,
        color: 'beige',
        size: 'Double seat+Noble Consort seat+Single seat',
        material: 'Fabric + Solid Wood',
        description: 'This white birch sofa is made of high-density sponge and high-quality fabric, providing excellent comfort.',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop&q=80'
      },
      {
        id: 2,
        name: 'Cloud Small Circle',
        price: null,
        color: 'beige',
        size: 'Double seat+Noble Consort seat+Single seat',
        material: 'Fabric + Solid Wood',
        description: 'Comfortable and stylish small circular furniture piece.',
        image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=300&fit=crop&q=80'
      }
    ],
    reviews: [
      {
        id: 1,
        username: 'Sarah Johnson',
        avatar: 'https://i.pravatar.cc/150?img=1',
        text: 'Absolutely love this design! The warm wooden elements create such a cozy atmosphere.',
        images: []
      },
      {
        id: 2,
        username: 'Michael Chen',
        avatar: 'https://i.pravatar.cc/150?img=2',
        text: 'Perfect Nordic style bedroom. The color scheme is exactly what I was looking for.',
        images: [
          'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=300&fit=crop&q=80'
        ]
      },
      {
        id: 3,
        username: 'Emma Wilson',
        avatar: 'https://i.pravatar.cc/150?img=3',
        text: 'The materials used are top quality. Very satisfied with the overall design.',
        images: []
      },
      {
        id: 4,
        username: 'David Martinez',
        avatar: 'https://i.pravatar.cc/150?img=4',
        text: 'Great work! The space feels so open and bright.',
        images: []
      },
      {
        id: 5,
        username: 'Lisa Anderson',
        avatar: 'https://i.pravatar.cc/150?img=5',
        text: 'Beautiful design with excellent functionality.',
        images: []
      },
      {
        id: 6,
        username: 'Tom Harris',
        avatar: 'https://i.pravatar.cc/150?img=13',
        text: 'Exceeded my expectations! The minimalist aesthetic is perfect.',
        images: []
      }
    ]
  },
  {
    id: 2,
    title: 'Elegant and romantic minimalist aesthetics',
    price: 1300,
    description: 'The modern minimalist style of Nordic style pursues a design concept of simplicity and brightness',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&q=80',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=designer2',
    views: '856',
    designer: {
      name: 'Emma Wilson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=designer2'
    },
    detailImages: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop&q=80'
    ],
    rating: 4.8,
    reviewCount: 856,
    hasDesignInspiration: false,
    caseProducts: [],
    reviews: []
  },
  {
    id: 3,
    title: 'Elegant and romantic minimalist aesthetics',
    price: 848,
    description: 'The modern minimalist style of Nordic style pursues a design concept of simplicity and brightness',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop&q=80',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=designer3',
    views: '2.1k',
    designer: {
      name: 'David Martinez',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=designer3'
    },
    detailImages: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop&q=80'
    ],
    rating: 4.5,
    reviewCount: 210,
    hasDesignInspiration: true,
    caseProducts: [],
    reviews: []
  },
  {
    id: 4,
    title: 'Elegant and romantic minimalist aesthetics',
    price: 1680,
    originalPrice: 2000,
    discount: 16,
    description: 'The modern minimalist style of Nordic style pursues a design concept of simplicity and brightness',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop&q=80',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=designer4',
    views: '320',
    likes: '1.2K',
    favorites: '320',
    shares: '320',
    designer: {
      name: 'Lisa Anderson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=designer4'
    },
    detailImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop&q=80'
    ],
    rating: 4.9,
    reviewCount: 320,
    hasDesignInspiration: false,
    caseProducts: [],
    reviews: []
  },
  {
    id: 5,
    title: 'Elegant and romantic minimalist aesthetics',
    price: 2508,
    description: 'The modern minimalist style of Nordic style pursues a design concept of simplicity and brightness',
    image: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&h=600&fit=crop&q=80',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=designer5',
    views: '1.8k',
    designer: {
      name: 'Robert Taylor',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=designer5'
    },
    detailImages: [
      'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&h=600&fit=crop&q=80'
    ],
    rating: 4.7,
    reviewCount: 180,
    hasDesignInspiration: true,
    caseProducts: [],
    reviews: []
  },
  {
    id: 6,
    title: 'Warm wooden Nordic kitchen',
    price: 405,
    description: 'The modern minimalist style of Nordic style pursues a design concept of simplicity and brightness',
    image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&h=600&fit=crop&q=80',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=designer6',
    views: '945',
    designer: {
      name: 'Nancy',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=designer6'
    },
    detailImages: [
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600566752229-250ed79470e6?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&q=80'
    ],
    rating: 5.0,
    reviewCount: 1000,
    hasDesignInspiration: true,
    designInspiration: {
      title: 'Design inspiration',
      intro: 'The overall design is dominated by warm wooden elements, paired with a soft beige color scheme, creating a comfortable and cozy Nordic style bedroom. The design inspiration for this space comes from the natural scenery of Scandinavia, pursuing a simple yet not simplistic aesthetic of life.',
      colorMatching: 'Mainly in beige and natural wood colors, with a small amount of gray and green plant accents',
      materialSelection: 'Natural wood, cotton and linen fabric, wool carpet',
      spatialCharacteristics: 'Open and bright, with simple lines and practical functions',
      designerSuggestion: 'Soft decoration color matching can be adjusted according to personal preferences, and adding green plants can make the space more vibrant.'
    },
    caseProducts: [
      {
        id: 1,
        name: 'White birch sofa',
        price: 1000,
        color: 'beige',
        size: 'Double seat+Noble Consort seat+Single seat',
        material: 'Fabric + Solid Wood',
        description: 'This white birch sofa is made of high-density sponge and high-quality fabric, providing excellent comfort. Solid wood frame structure is stable, Nordic minimalist design, suitable for various home styles',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop&q=80'
      },
      {
        id: 2,
        name: 'Cloud Small Circle',
        price: null,
        color: 'beige',
        size: 'Double seat+Noble Consort seat+Single seat',
        material: 'Fabric + Solid Wood',
        description: 'This white birch sofa is made of high-density sponge and high-quality fabric, providing excellent comfort. Solid wood frame structure is stable, Nordic minimalist design, suitable for various home styles',
        image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=300&fit=crop&q=80'
      },
      {
        id: 3,
        name: 'All wood small desk',
        price: null,
        color: 'beige',
        size: '120cm in length, 60cm in width, and 45cm in height',
        material: 'ash',
        description: 'This white birch sofa is made of high-density sponge and high-quality fabric, providing excellent comfort. Solid wood frame structure is stable, Nordic minimalist design, suitable for various home styles',
        image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=300&fit=crop&q=80'
      },
      {
        id: 4,
        name: 'desk lamp',
        price: 50,
        color: 'Rice white+gray',
        size: 'Double seat+Noble Consort seat+Single seat',
        material: 'wool',
        description: 'This white birch sofa is made of high-density sponge and high-quality fabric, providing excellent comfort. Solid wood frame structure is stable, Nordic minimalist design, suitable for various home styles',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop&q=80'
      },
      {
        id: 5,
        name: 'Nordic Coffee Table',
        price: 350,
        color: 'Natural wood',
        size: '100cm x 60cm x 45cm',
        material: 'Oak + Glass',
        description: 'Modern minimalist coffee table with tempered glass top and solid oak legs. Perfect for Nordic style living rooms.',
        image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&h=300&fit=crop&q=80'
      },
      {
        id: 6,
        name: 'Wool Area Rug',
        price: 280,
        color: 'Cream white',
        size: '200cm x 150cm',
        material: '100% Wool',
        description: 'Soft and comfortable wool rug with minimalist design. Adds warmth and texture to any Nordic interior.',
        image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=300&fit=crop&q=80'
      },
      {
        id: 7,
        name: 'Wall Shelf Unit',
        price: 180,
        color: 'White + Natural wood',
        size: '120cm x 25cm x 80cm',
        material: 'Pine wood',
        description: 'Floating wall shelf with clean lines and practical storage. Ideal for displaying books and decorative items.',
        image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400&h=300&fit=crop&q=80'
      },
      {
        id: 8,
        name: 'Floor Standing Lamp',
        price: 120,
        color: 'Black + Brass',
        size: 'Height: 160cm',
        material: 'Metal + Fabric',
        description: 'Elegant floor lamp with adjustable head. Provides ambient lighting perfect for reading corners.',
        image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&h=300&fit=crop&q=80'
      }
    ],
    reviews: [
      {
        id: 1,
        username: 'Sarah Johnson',
        avatar: 'https://i.pravatar.cc/150?img=1',
        text: 'Absolutely love this design! The warm wooden elements create such a cozy atmosphere. The attention to detail is impressive.',
        images: [],
        rating: 5
      },
      {
        id: 2,
        username: 'Michael Chen',
        avatar: 'https://i.pravatar.cc/150?img=2',
        text: 'Perfect Nordic style bedroom. The color scheme is exactly what I was looking for. Highly recommend!',
        images: [
          'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=300&fit=crop&q=80',
          'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&h=300&fit=crop&q=80'
        ],
        rating: 5
      },
      {
        id: 3,
        username: 'Emma Wilson',
        avatar: 'https://i.pravatar.cc/150?img=3',
        text: 'The materials used are top quality. Very satisfied with the overall design and execution.',
        images: [],
        rating: 5
      },
      {
        id: 4,
        username: 'David Martinez',
        avatar: 'https://i.pravatar.cc/150?img=4',
        text: 'Great work! The space feels so open and bright. The designer really understood what I wanted.',
        images: [
          'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=400&h=300&fit=crop&q=80'
        ],
        rating: 5
      },
      {
        id: 5,
        username: 'Lisa Anderson',
        avatar: 'https://i.pravatar.cc/150?img=5',
        text: 'Beautiful design with excellent functionality. The wooden elements add so much warmth to the room.',
        images: [],
        rating: 5
      },
      {
        id: 6,
        username: 'John Smith',
        avatar: 'https://i.pravatar.cc/150?img=6',
        text: 'Outstanding craftsmanship! Every detail has been carefully considered. The Nordic aesthetic is perfectly executed.',
        images: [],
        rating: 5
      },
      {
        id: 7,
        username: 'Maria Garcia',
        avatar: 'https://i.pravatar.cc/150?img=7',
        text: 'I love how the natural light flows through the space. The color palette is soothing and inviting.',
        images: [
          'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&h=300&fit=crop&q=80'
        ],
        rating: 5
      },
      {
        id: 8,
        username: 'Robert Brown',
        avatar: 'https://i.pravatar.cc/150?img=8',
        text: 'Exceptional design work. The minimalist approach creates such a peaceful environment.',
        images: [],
        rating: 4
      },
      {
        id: 9,
        username: 'Jennifer Lee',
        avatar: 'https://i.pravatar.cc/150?img=9',
        text: 'The attention to detail is remarkable. Every piece of furniture complements the overall design perfectly.',
        images: [
          'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&h=300&fit=crop&q=80',
          'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400&h=300&fit=crop&q=80'
        ],
        rating: 4
      },
      {
        id: 10,
        username: 'William Davis',
        avatar: 'https://i.pravatar.cc/150?img=10',
        text: 'This is exactly what I envisioned for my home. The designer captured the essence of Nordic living beautifully.',
        images: [],
        rating: 4
      },
      {
        id: 11,
        username: 'Sophie Martin',
        avatar: 'https://i.pravatar.cc/150?img=11',
        text: 'The use of natural materials creates such a warm and inviting atmosphere. Highly recommend this designer!',
        images: [],
        rating: 3
      },
      {
        id: 12,
        username: 'James Wilson',
        avatar: 'https://i.pravatar.cc/150?img=12',
        text: 'Clean, functional, and beautiful. Everything I wanted in a Nordic-inspired space.',
        images: [
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop&q=80'
        ],
        rating: 4
      }
    ]
  },
  {
    id: 7,
    title: 'Modern luxury living space design',
    price: 1899,
    description: 'Contemporary design with premium materials and sophisticated aesthetics',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop&q=80',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=designer7',
    views: '3.2k',
    likes: '980',
    favorites: '654',
    shares: '45',
    cart: '18',
    designer: {
      name: 'James Brown',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=designer7'
    },
    detailImages: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop&q=80'
    ],
    rating: 4.8,
    reviewCount: 320,
    hasDesignInspiration: true,
    caseProducts: [],
    reviews: []
  },
  {
    id: 8,
    title: 'Scandinavian style bedroom suite',
    price: 2199,
    originalPrice: 2800,
    discount: 21,
    description: 'Clean lines and natural materials create a peaceful retreat',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&h=600&fit=crop&q=80',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=designer8',
    views: '4.5k',
    likes: '1.5K',
    favorites: '892',
    shares: '67',
    cart: '25',
    designer: {
      name: 'Sophia Lee',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=designer8'
    },
    detailImages: [
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&h=600&fit=crop&q=80'
    ],
    rating: 4.9,
    reviewCount: 450,
    hasDesignInspiration: true,
    caseProducts: [],
    reviews: []
  },
  {
    id: 9,
    title: 'Industrial chic loft design',
    price: 1599,
    description: 'Raw materials and exposed elements for urban living',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop&q=80',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=designer9',
    views: '2.8k',
    likes: '876',
    favorites: '543',
    shares: '34',
    cart: '15',
    designer: {
      name: 'Oliver White',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=designer9'
    },
    detailImages: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop&q=80'
    ],
    rating: 4.6,
    reviewCount: 280,
    hasDesignInspiration: false,
    caseProducts: [],
    reviews: []
  },
  {
    id: 10,
    title: 'Coastal inspired living room',
    price: 1750,
    description: 'Light and airy design with ocean-inspired color palette',
    image: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&h=600&fit=crop&q=80',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=designer10',
    views: '3.6k',
    likes: '1.1K',
    favorites: '721',
    shares: '52',
    cart: '20',
    designer: {
      name: 'Isabella Garcia',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=designer10'
    },
    detailImages: [
      'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&h=600&fit=crop&q=80'
    ],
    rating: 4.7,
    reviewCount: 360,
    hasDesignInspiration: true,
    caseProducts: [],
    reviews: []
  }
];

/**
 * 根据ID获取商品详情
 */
export function getProductById(id: number | string): Product | undefined {
  const productId = typeof id === 'string' ? parseInt(id) : id;
  return mockProducts.find(p => p.id === productId);
}

/**
 * 获取所有商品列表
 */
export function getAllProducts(): Product[] {
  return mockProducts;
}

/**
 * 根据分类筛选商品（预留接口）
 */
export function getProductsByCategory(category: string): Product[] {
  // TODO: 实现分类筛选逻辑
  return mockProducts;
}

/**
 * 搜索商品（预留接口）
 */
export function searchProducts(keyword: string): Product[] {
  // TODO: 实现搜索逻辑
  return mockProducts.filter(p => 
    p.title.toLowerCase().includes(keyword.toLowerCase()) ||
    p.description.toLowerCase().includes(keyword.toLowerCase())
  );
}
