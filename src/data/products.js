const categoryTemplates = [
  {
    category: 'Fashion', subcategory: 'Kurtas', brand: 'NovaWear',
    names: ['Printed Cotton Kurta', 'A-line Ethnic Kurta', 'Festive Embroidered Kurta', 'Daily Wear Straight Kurta'],
    basePrice: 899, baseMrp: 1799, colors: ['Maroon', 'Navy', 'Olive'], sizes: ['S', 'M', 'L', 'XL'], tags: ['ethnic', 'women', 'festive'],
    specs: { Fabric: 'Cotton Blend', Fit: 'Regular', Sleeve: '3/4 Sleeve' },
    image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=900'
  },
  {
    category: 'Electronics', subcategory: 'Audio', brand: 'TechAura',
    names: ['Wireless Earbuds Pro', 'Noise Cancelling Headphones', 'Portable Bluetooth Speaker', 'Gaming Headset'],
    basePrice: 1999, baseMrp: 3999, colors: ['Black', 'White', 'Blue'], sizes: [], tags: ['audio', 'wireless', 'bluetooth'],
    specs: { Connectivity: 'Bluetooth 5.3', Battery: '30 Hours', Warranty: '1 Year' },
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900'
  },
  {
    category: 'Mobiles', subcategory: 'Smartphones', brand: 'PulseMob',
    names: ['5G Smartphone 128GB', 'Camera Smartphone 256GB', 'Performance Phone 8GB RAM', 'All-Day Battery Phone'],
    basePrice: 14999, baseMrp: 18999, colors: ['Graphite', 'Sky Blue', 'Mint'], sizes: [], tags: ['5g', 'android', 'camera'],
    specs: { Display: '6.6 inch FHD+', Camera: '50MP AI', Processor: 'Octa-core' },
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=900',
    variants: { storage: ['128GB', '256GB'], ram: ['8GB', '12GB'] }
  },
  {
    category: 'Beauty', subcategory: 'Skincare', brand: 'GlowCraft',
    names: ['Vitamin C Face Serum', 'Hydrating Gel Moisturizer', 'Sunscreen SPF 50', 'Brightening Night Cream'],
    basePrice: 499, baseMrp: 899, colors: [], sizes: ['30ml', '50ml', '100ml'], tags: ['skincare', 'glow', 'daily care'],
    specs: { SkinType: 'All Skin Types', KeyIngredient: 'Vitamin C', Usage: 'AM/PM' },
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=900'
  },
  {
    category: 'Home', subcategory: 'Decor', brand: 'HomeNest',
    names: ['Minimal Table Lamp', 'Boho Cushion Set', 'Wall Art Frame Trio', 'Scented Candle Jar'],
    basePrice: 699, baseMrp: 1299, colors: ['Beige', 'White', 'Grey'], sizes: ['Set of 2', 'Set of 3'], tags: ['decor', 'living room', 'home'],
    specs: { Material: 'Composite', Care: 'Dry cloth clean', Warranty: '6 Months' },
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=900'
  },
  {
    category: 'Appliances', subcategory: 'Kitchen', brand: 'ChillMate',
    names: ['Mixer Grinder 750W', 'Air Fryer 4L', 'Induction Cooktop', 'Electric Kettle 1.5L'],
    basePrice: 2499, baseMrp: 3999, colors: ['Black', 'Silver'], sizes: [], tags: ['kitchen', 'home appliance', 'cooking'],
    specs: { Power: '750W', Warranty: '2 Years', Voltage: '230V' },
    image: 'https://images.unsplash.com/photo-1584269600519-a56f7f9f7456?w=900'
  },
  {
    category: 'Sports', subcategory: 'Fitness', brand: 'Athletico',
    names: ['Yoga Mat Premium', 'Adjustable Dumbbells', 'Skipping Rope Pro', 'Sports Shaker Bottle'],
    basePrice: 799, baseMrp: 1499, colors: ['Black', 'Purple', 'Teal'], sizes: ['Standard'], tags: ['fitness', 'workout', 'sport'],
    specs: { Material: 'High Density Foam', Use: 'Indoor/Outdoor', Warranty: '6 Months' },
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900'
  },
  {
    category: 'Grocery', subcategory: 'Snacks', brand: 'DailyBasket',
    names: ['Roasted Almond Mix', 'Protein Granola', 'Multigrain Chips', 'Organic Green Tea'],
    basePrice: 249, baseMrp: 399, colors: [], sizes: ['250g', '500g'], tags: ['healthy', 'snacks', 'grocery'],
    specs: { ShelfLife: '9 Months', Vegetarian: 'Yes', Origin: 'India' },
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=900'
  },
  {
    category: 'Books', subcategory: 'Fiction', brand: 'ReadSphere',
    names: ['Mystery Bestseller', 'Startup Stories', 'Mindset Mastery', 'Science Explained'],
    basePrice: 299, baseMrp: 599, colors: [], sizes: ['Paperback', 'Hardcover'], tags: ['books', 'reading', 'bestseller'],
    specs: { Language: 'English', Pages: '280', Publisher: 'ReadSphere Press' },
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=900'
  },
  {
    category: 'Accessories', subcategory: 'Bags', brand: 'CarryLab',
    names: ['Laptop Backpack', 'Crossbody Sling Bag', 'Travel Duffle Bag', 'Compact Wallet'],
    basePrice: 999, baseMrp: 1899, colors: ['Black', 'Tan', 'Olive'], sizes: ['Standard'], tags: ['bags', 'travel', 'daily use'],
    specs: { Material: 'Vegan Leather', Compartments: 'Multiple', Warranty: '1 Year' },
    image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=900'
  },
  {
    category: 'Footwear', subcategory: 'Sneakers', brand: 'StrideX',
    names: ['Running Sneakers', 'Street Casual Sneakers', 'Training Shoes', 'Slip-on Walking Shoes'],
    basePrice: 1499, baseMrp: 2999, colors: ['Black', 'White', 'Blue'], sizes: ['6', '7', '8', '9', '10'], tags: ['shoes', 'running', 'comfort'],
    specs: { Material: 'Mesh', Sole: 'EVA', Warranty: '3 Months' },
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900'
  },
  {
    category: 'Toys', subcategory: 'Learning', brand: 'PlayMint',
    names: ['STEM Building Blocks', 'Remote Control Car', 'Kids Puzzle Set', 'Magnetic Drawing Board'],
    basePrice: 599, baseMrp: 999, colors: ['Red', 'Blue', 'Yellow'], sizes: ['3+ Years', '6+ Years'], tags: ['kids', 'toy', 'learning'],
    specs: { Material: 'Non-toxic Plastic', AgeGroup: '3-10 Years', Safety: 'BIS Certified' },
    image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=900'
  },
  {
    category: 'Automotive', subcategory: 'Car Care', brand: 'RoadVibe',
    names: ['Microfiber Cleaning Kit', 'Tyre Inflator', 'Phone Mount for Car', 'Car Perfume Combo'],
    basePrice: 699, baseMrp: 1299, colors: ['Black'], sizes: ['Standard'], tags: ['car', 'automotive', 'maintenance'],
    specs: { Compatibility: 'Universal', Usage: 'Car/Bike', Warranty: '1 Year' },
    image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=900'
  },
  {
    category: 'Personal Care', subcategory: 'Grooming', brand: 'PureRoot',
    names: ['Beard Trimmer Kit', 'Hair Dryer 1200W', 'Electric Toothbrush', 'Body Groomer'],
    basePrice: 1199, baseMrp: 1999, colors: ['Black', 'Grey'], sizes: [], tags: ['grooming', 'care', 'personal'],
    specs: { Battery: '90 mins', Warranty: '2 Years', Washable: 'Yes' },
    image: 'https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=900'
  },
  {
    category: 'Watches', subcategory: 'Smart Watches', brand: 'Chronique',
    names: ['Smart Fitness Watch', 'Classic Analog Watch', 'AMOLED Smart Watch', 'Sports Digital Watch'],
    basePrice: 2299, baseMrp: 3999, colors: ['Black', 'Rose Gold', 'Silver'], sizes: ['42mm', '46mm'], tags: ['watch', 'wearable', 'fitness'],
    specs: { Display: 'AMOLED', WaterResistance: 'IP68', Battery: '7 Days' },
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900'
  },
  {
    category: 'Jewellery', subcategory: 'Fashion Jewellery', brand: 'Aurum',
    names: ['Silver Plated Necklace Set', 'Gold Tone Hoop Earrings', 'Minimal Ring Set', 'Pearl Bracelet'],
    basePrice: 899, baseMrp: 1599, colors: ['Gold', 'Silver', 'Rose Gold'], sizes: ['Free Size'], tags: ['jewellery', 'fashion', 'gift'],
    specs: { Metal: 'Alloy', Finish: 'Anti Tarnish', SkinFriendly: 'Yes' },
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=900'
  }
]

const reviewTexts = ['Great quality for the price.', 'Exactly as described and delivered quickly.', 'Value for money purchase.', 'Packaging was neat and product works well.']

function makeProduct(template, idx, categoryIdx) {
  const name = `${template.names[idx % template.names.length]} ${idx + 1}`
  const price = template.basePrice + (idx % 4) * 120 + categoryIdx * 35
  const originalPrice = template.baseMrp + (idx % 4) * 160 + categoryIdx * 40
  const discount = Math.round(((originalPrice - price) / originalPrice) * 100)
  const rating = Number((4 + ((idx + categoryIdx) % 10) / 10).toFixed(1))
  const reviewCount = 120 + idx * 17 + categoryIdx * 13
  const stock = Math.max(0, 5 + ((idx + categoryIdx * 2) % 25))

  return {
    id: `SNP${String(categoryIdx * 10 + idx + 1).padStart(4, '0')}`,
    name,
    brand: template.brand,
    category: template.category,
    subcategory: template.subcategory,
    description: `${name} by ${template.brand} designed for daily performance and reliable long-term use in Indian conditions.`,
    price,
    originalPrice,
    discount,
    rating,
    reviewCount,
    images: [template.image, `${template.image}&q=80`, `${template.image}&q=70`],
    colors: template.colors,
    sizes: template.sizes,
    variants: {
      color: template.colors,
      size: template.sizes,
      ...(template.variants || {})
    },
    stock,
    seller: `${template.brand} Official`,
    delivery: { standardDays: '3-5 days', expressDays: '1-2 days', codAvailable: true },
    isNew: idx % 3 === 0,
    isBestseller: idx % 4 === 0,
    isTrending: idx % 2 === 0,
    tags: [...template.tags, template.category.toLowerCase(), template.subcategory.toLowerCase()],
    specifications: template.specs,
    reviews: reviewTexts.map((text, ridx) => ({
      id: `${categoryIdx}-${idx}-${ridx}`,
      user: `Shopper ${ridx + 1}`,
      rating: Math.max(3, rating - (ridx % 2) * 0.4),
      comment: text,
      date: `2026-0${(ridx % 8) + 1}-1${ridx}`
    }))
  }
}

export const products = categoryTemplates.flatMap((template, categoryIdx) =>
  Array.from({ length: 4 }).map((_, idx) => makeProduct(template, idx, categoryIdx))
)
