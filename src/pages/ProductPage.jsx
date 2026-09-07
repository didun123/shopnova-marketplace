import { Heart, ShoppingCart } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import ProductGrid from '../components/ProductGrid'
import SectionTitle from '../components/SectionTitle'
import { useStore } from '../context/StoreContext'
import { products } from '../data/products'
import { inr, isValidPincode } from '../utils/helpers'

const tabs = ['description', 'specifications', 'reviews', 'offers', 'delivery']

export default function ProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart, toggleWishlist, wishlist, addRecentlyViewed } = useStore()
  const product = products.find((item) => item.id === id)
  const [imageIndex, setImageIndex] = useState(0)
  const [pincode, setPincode] = useState('')
  const [pincodeState, setPincodeState] = useState('')
  const [activeTab, setActiveTab] = useState('description')
  const [showOffers, setShowOffers] = useState(false)
  const [feedback, setFeedback] = useState('')

  const [selected, setSelected] = useState(() => ({
    color: product?.variants?.color?.[0] || '',
    size: product?.variants?.size?.[0] || '',
    storage: product?.variants?.storage?.[0] || '',
    ram: product?.variants?.ram?.[0] || ''
  }))

  useEffect(() => {
    if (product?.id) addRecentlyViewed(product.id)
  }, [addRecentlyViewed, product?.id])

  if (!product) return <div className="container-x py-8"><EmptyState title="Product unavailable" message="This product does not exist or is no longer available." cta="Back to shop" /></div>
  const similar = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 8)
  const isWished = wishlist.includes(product.id)

  const offerList = useMemo(() => ['Extra 10% off with select cards', 'Free delivery above ₹799', 'No-cost EMI on orders above ₹3000', 'Exchange bonus up to ₹1500'], [])

  const variantKeys = ['color', 'size', 'storage', 'ram'].filter((key) => product.variants?.[key]?.length)

  const actionFeedback = (text) => {
    setFeedback(text)
    setTimeout(() => setFeedback(''), 1400)
  }

  return (
    <div className="container-x py-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="card p-4">
          <div className="relative">
            <img src={product.images[imageIndex]} alt={product.name} className="h-96 w-full rounded-xl object-cover" />
            <div className="absolute bottom-2 right-2 flex gap-2">
              <button className="icon-btn" onClick={() => setImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)} aria-label="Previous image">‹</button>
              <button className="icon-btn" onClick={() => setImageIndex((prev) => (prev + 1) % product.images.length)} aria-label="Next image">›</button>
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            {product.images.map((image, idx) => (
              <button key={image + idx} className={`h-16 w-16 overflow-hidden rounded-lg border ${idx === imageIndex ? 'border-brand' : 'border-line'}`} onClick={() => setImageIndex(idx)}>
                <img src={image} alt={`${product.name} ${idx + 1}`} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="card p-4">
            <p className="text-sm text-muted">{product.brand} • {product.seller}</p>
            <h1 className="mt-1 text-2xl font-semibold">{product.name}</h1>
            <p className="mt-2 text-sm text-muted">{product.description}</p>
            <div className="mt-3 flex items-end gap-2">
              <strong className="text-2xl">{inr(product.price)}</strong>
              <span className="text-muted line-through">{inr(product.originalPrice)}</span>
              <span className="text-green-700">{product.discount}% off</span>
            </div>
          </div>

          <div className="card p-4">
            <h2 className="font-semibold">Select variants</h2>
            <div className="mt-2 space-y-3">
              {variantKeys.map((key) => (
                <div key={key}>
                  <p className="text-sm capitalize text-muted">{key}</p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {product.variants[key].map((value) => (
                      <button key={value} className={`chip ${selected[key] === value ? 'chip-active' : ''}`} onClick={() => setSelected((prev) => ({ ...prev, [key]: value }))}>{value}</button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-4">
            <h2 className="font-semibold">Delivery check</h2>
            <div className="mt-2 flex gap-2">
              <input className="input" value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder="Enter 6-digit pincode" />
              <button
                className="btn btn-primary"
                onClick={() => setPincodeState(isValidPincode(pincode) ? 'success' : 'error')}
              >
                Check
              </button>
            </div>
            {pincodeState === 'success' && <p className="mt-2 text-sm text-green-700">Delivery available. Estimated by 3-5 days.</p>}
            {pincodeState === 'error' && <p className="mt-2 text-sm text-red-600">Invalid pincode or currently not serviceable.</p>}
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button className="btn btn-primary" onClick={() => { addToCart(product, 1, selected); actionFeedback('Added to cart') }}><ShoppingCart size={16} /> Add</button>
            <button className="btn btn-ghost" onClick={() => { toggleWishlist(product.id); actionFeedback(isWished ? 'Removed from wishlist' : 'Added to wishlist') }}><Heart size={16} className={isWished ? 'fill-rose-500 text-rose-500' : ''} /> Wishlist</button>
            <button className="btn btn-ghost" onClick={() => { addToCart(product, 1, selected); navigate('/checkout') }}>Buy now</button>
          </div>
          {feedback && <p className="text-sm text-brand">{feedback}</p>}

          <div className="card p-4">
            <h2 className="font-semibold">Offers</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
              {(showOffers ? offerList : offerList.slice(0, 2)).map((offer) => <li key={offer}>{offer}</li>)}
            </ul>
            <button className="mt-2 text-sm text-brand" onClick={() => setShowOffers((prev) => !prev)}>{showOffers ? 'View less' : 'View all offers'}</button>
          </div>
        </section>
      </div>

      <section className="mt-8">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button key={tab} className={`chip capitalize ${activeTab === tab ? 'chip-active' : ''}`} onClick={() => setActiveTab(tab)}>{tab.replace('&', ' & ')}</button>
          ))}
        </div>
        <div className="card mt-3 p-4 text-sm">
          {activeTab === 'description' && <p>{product.description}</p>}
          {activeTab === 'specifications' && <ul className="space-y-2">{Object.entries(product.specifications).map(([k, v]) => <li key={k}><strong>{k}:</strong> {v}</li>)}</ul>}
          {activeTab === 'reviews' && <div className="space-y-3">{product.reviews.map((review) => <div key={review.id} className="border-b border-line pb-2"><p className="font-medium">{review.user} • {review.rating}★</p><p className="text-muted">{review.comment}</p></div>)}</div>}
          {activeTab === 'offers' && <ul className="list-disc pl-5">{offerList.map((offer) => <li key={offer}>{offer}</li>)}</ul>}
          {activeTab === 'delivery' && <p>7-day return policy for eligible products. Delivery timelines vary by location and option selected.</p>}
        </div>
      </section>

      <section className="mt-8">
        <SectionTitle title="Similar products" />
        <ProductGrid products={similar} />
      </section>
    </div>
  )
}
