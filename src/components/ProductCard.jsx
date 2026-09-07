import { Heart, ShoppingCart, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { inr } from '../utils/helpers'

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, wishlist } = useStore()
  const wished = wishlist.includes(product.id)

  return (
    <article className="card group flex h-full flex-col overflow-hidden">
      <Link to={`/product/${product.id}`} className="relative block">
        <img src={product.images[0]} alt={product.name} className="h-52 w-full object-cover" loading="lazy" />
        {product.discount > 0 && <span className="badge-discount absolute left-2 top-2">{product.discount}% OFF</span>}
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <p className="text-xs text-muted">{product.brand}</p>
        <Link to={`/product/${product.id}`} className="line-clamp-2 text-sm font-semibold">{product.name}</Link>
        <div className="flex items-center gap-1 text-xs text-muted">
          <Star size={14} className="fill-amber-400 text-amber-400" /> {product.rating} ({product.reviewCount})
        </div>
        <div className="mt-auto flex items-center gap-2 text-sm">
          <strong>{inr(product.price)}</strong>
          <span className="text-muted line-through">{inr(product.originalPrice)}</span>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <button className="btn btn-ghost w-full" aria-label="Toggle wishlist" onClick={() => toggleWishlist(product.id)}>
            <Heart size={16} className={wished ? 'fill-rose-500 text-rose-500' : ''} />
          </button>
          <button className="btn btn-primary w-full" aria-label="Add to cart" onClick={() => addToCart(product)}>
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </article>
  )
}
