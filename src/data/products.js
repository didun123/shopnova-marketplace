const sample = [
  {
    id: 'P1001', name: "Men's Running Sneakers", brand: 'StrideX', category: 'Footwear', subcategory: 'Sneakers',
    description: 'Breathable mesh running shoes for daily training.', price: 1499, originalPrice: 2999, discount: 50,
    rating: 4.3, reviewCount: 1245,
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800'],
    colors: ['Black','Blue','White'], sizes: ['7','8','9','10'], variants: { color: ['Black','Blue','White'], size: ['7','8','9','10'] },
    stock: 24, seller: 'RetailNet', delivery: 'Free delivery by Thu', isNew: false, isBestseller: true, isTrending: true,
    tags: ['running','sports','shoes'], specifications: { Material: 'Mesh', Sole: 'EVA', Warranty: '3 Months' }, reviews: []
  },
  {
    id: 'P1002', name: 'Wireless Bluetooth Headphones', brand: 'SonicPro', category: 'Electronics', subcategory: 'Audio',
    description: '40-hour battery, deep bass, low-latency mode.', price: 2199, originalPrice: 4999, discount: 56,
    rating: 4.5, reviewCount: 3210,
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800'],
    colors: ['Black','White'], sizes: [], variants: { color: ['Black','White'] },
    stock: 18, seller: 'TechKart', delivery: 'Delivery by Wed', isNew: true, isBestseller: true, isTrending: true,
    tags: ['headphones','wireless'], specifications: { Battery: '40h', Bluetooth: '5.3', Warranty: '1 Year' }, reviews: []
  },
  {
    id: 'P1003', name: '5G Smartphone 128GB', brand: 'NovaMobile', category: 'Mobiles', subcategory: 'Smartphones',
    description: '6.6-inch FHD display, 8GB RAM, 50MP camera.', price: 15999, originalPrice: 18999, discount: 16,
    rating: 4.4, reviewCount: 2331,
    images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800'],
    colors: ['Black','Blue'], sizes: [], variants: { color: ['Black','Blue'], storage: ['128GB','256GB'], ram: ['8GB','12GB'] },
    stock: 14, seller: 'MobileWorld', delivery: 'Delivery by Tue', isNew: true, isBestseller: true, isTrending: true,
    tags: ['5g','smartphone'], specifications: { Display: '6.6 inch FHD+', RAM: '8GB', Storage: '128GB' }, reviews: []
  }
]

const categories = ['Fashion','Electronics','Mobiles','Beauty','Home','Appliances','Sports','Grocery','Books','Accessories','Footwear','Toys']

export const products = (() => {
  const arr = [...sample]
  for (let i = 4; i <= 60; i++) {
    const b = sample[i % sample.length]
    const price = b.price + i * 19
    const originalPrice = b.originalPrice + i * 29
    arr.push({
      ...b,
      id: `P${1000+i}`,
      name: `${b.name} ${i}`,
      category: categories[i % categories.length],
      price,
      originalPrice,
      discount: Math.min(75, Math.round(((originalPrice - price) / originalPrice) * 100)),
      rating: Math.min(4.9, Number((3.9 + (i % 8) * 0.1).toFixed(1))),
      reviewCount: b.reviewCount + i * 9,
      isTrending: i % 2 === 0,
      isNew: i % 3 === 0,
      isBestseller: i % 4 === 0
    })
  }
  return arr
})()
