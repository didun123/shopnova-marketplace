import EmptyState from '../components/EmptyState'
import ProductGrid from '../components/ProductGrid'
import { useStore } from '../context/StoreContext'
import { products } from '../data/products'

export default function WishlistPage() {
  const { wishlist } = useStore()
  const items = products.filter((product) => wishlist.includes(product.id))

  return (
    <div className="container-x py-6">
      <h1 className="mb-4 text-2xl font-semibold">My Wishlist</h1>
      {items.length ? <ProductGrid products={items} /> : <EmptyState title="Wishlist is empty" message="Save products you love for later." cta="Explore products" />}
    </div>
  )
}
