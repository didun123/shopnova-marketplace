import { SlidersHorizontal } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import ProductGrid from '../components/ProductGrid'
import { brands } from '../data/brands'
import { products } from '../data/products'
import { deslugify } from '../utils/helpers'

const sorters = {
  recommended: (a, b) => Number(b.isTrending) - Number(a.isTrending),
  new: (a, b) => Number(b.isNew) - Number(a.isNew),
  popularity: (a, b) => b.reviewCount - a.reviewCount,
  priceLow: (a, b) => a.price - b.price,
  priceHigh: (a, b) => b.price - a.price,
  rating: (a, b) => b.rating - a.rating,
  discount: (a, b) => b.discount - a.discount,
  reviewed: (a, b) => b.reviewCount - a.reviewCount
}

export default function ShopPage() {
  const { category } = useParams()
  const [searchParams] = useSearchParams()
  const [sortBy, setSortBy] = useState('recommended')
  const [open, setOpen] = useState(false)
  const [selectedBrands, setSelectedBrands] = useState([])
  const [minRating, setMinRating] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [inStock, setInStock] = useState(false)
  const [maxPrice, setMaxPrice] = useState(50000)
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const searchText = searchParams.get('q')?.toLowerCase().trim() || ''
  const categoryText = category ? deslugify(category) : ''

  const filtered = useMemo(() => {
    let list = [...products]
    if (categoryText) list = list.filter((item) => item.category.toLowerCase() === categoryText.toLowerCase())
    if (searchText) list = list.filter((item) => [item.name, item.brand, item.category, item.subcategory, ...item.tags].join(' ').toLowerCase().includes(searchText))
    if (selectedBrands.length) list = list.filter((item) => selectedBrands.includes(item.brand))
    if (minRating) list = list.filter((item) => item.rating >= minRating)
    if (discount) list = list.filter((item) => item.discount >= discount)
    if (inStock) list = list.filter((item) => item.stock > 0)
    if (maxPrice) list = list.filter((item) => item.price <= maxPrice)
    if (selectedColor) list = list.filter((item) => item.colors.includes(selectedColor))
    if (selectedSize) list = list.filter((item) => item.sizes.includes(selectedSize))

    return list.sort(sorters[sortBy])
  }, [categoryText, searchText, selectedBrands, minRating, discount, inStock, maxPrice, selectedColor, selectedSize, sortBy])

  const allColors = [...new Set(products.flatMap((item) => item.colors))].filter(Boolean)
  const allSizes = [...new Set(products.flatMap((item) => item.sizes))].filter(Boolean)

  const toggleBrand = (brand) => setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((entry) => entry !== brand) : [...prev, brand]))

  const Filters = (
    <aside className="space-y-4 text-sm">
      <section className="card p-4">
        <h3 className="font-semibold">Brand</h3>
        <div className="mt-2 max-h-40 space-y-1 overflow-auto">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center gap-2">
              <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => toggleBrand(brand)} /> {brand}
            </label>
          ))}
        </div>
      </section>
      <section className="card p-4">
        <h3 className="font-semibold">Price up to {maxPrice}</h3>
        <input type="range" min="199" max="50000" step="100" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="mt-2 w-full" />
      </section>
      <section className="card p-4">
        <h3 className="font-semibold">Rating</h3>
        <select className="input mt-2" value={minRating} onChange={(e) => setMinRating(Number(e.target.value))}>
          <option value="0">All</option><option value="4">4★ & above</option><option value="4.5">4.5★ & above</option>
        </select>
      </section>
      <section className="card p-4">
        <h3 className="font-semibold">Discount</h3>
        <select className="input mt-2" value={discount} onChange={(e) => setDiscount(Number(e.target.value))}>
          <option value="0">All</option><option value="10">10%+</option><option value="25">25%+</option><option value="40">40%+</option>
        </select>
      </section>
      <section className="card p-4">
        <h3 className="font-semibold">Color</h3>
        <select className="input mt-2" value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
          <option value="">All</option>{allColors.map((color) => <option key={color} value={color}>{color}</option>)}
        </select>
      </section>
      <section className="card p-4">
        <h3 className="font-semibold">Size</h3>
        <select className="input mt-2" value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
          <option value="">All</option>{allSizes.map((size) => <option key={size} value={size}>{size}</option>)}
        </select>
      </section>
      <section className="card p-4">
        <label className="flex items-center gap-2"><input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} /> In stock only</label>
      </section>
    </aside>
  )

  return (
    <div className="container-x py-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">{categoryText || (searchText ? `Search: ${searchText}` : 'All Products')} ({filtered.length})</h1>
        <div className="flex items-center gap-2">
          <button className="btn btn-ghost lg:hidden" onClick={() => setOpen(true)}><SlidersHorizontal size={16} /> Filter</button>
          <select className="input" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="recommended">Recommended</option>
            <option value="new">New</option>
            <option value="popularity">Popularity</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
            <option value="rating">Rating</option>
            <option value="discount">Discount</option>
            <option value="reviewed">Most Reviewed</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
        <div className="hidden lg:block">{Filters}</div>
        <div>
          {filtered.length ? <ProductGrid products={filtered} /> : <EmptyState title="No products found" message="Try adjusting filters or search query." cta="Browse all products" to="/shop" />}
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 p-3 lg:hidden" onClick={() => setOpen(false)}>
          <div className="h-full overflow-auto rounded-2xl bg-white p-4" onClick={(e) => e.stopPropagation()}>{Filters}</div>
        </div>
      )}
    </div>
  )
}
