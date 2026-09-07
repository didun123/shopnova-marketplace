import { Link } from 'react-router-dom'
import HeroCarousel from '../components/HeroCarousel'
import ProductGrid from '../components/ProductGrid'
import SectionTitle from '../components/SectionTitle'
import { categories } from '../data/categories'
import { products } from '../data/products'
import { useStore } from '../context/StoreContext'
import { slugify } from '../utils/helpers'

export default function HomePage() {
  const { recentlyViewed, wishlist } = useStore()
  const deals = products.slice(0, 8)
  const trending = products.filter((item) => item.isTrending).slice(0, 8)
  const brands = [...new Set(products.map((item) => item.brand))].slice(0, 8)
  const recommended = products
    .filter((item) => wishlist.includes(item.id) || recentlyViewed.includes(item.id))
    .concat(products.filter((item) => item.isTrending))
    .filter((item, idx, arr) => arr.findIndex((entry) => entry.id === item.id) === idx)
    .slice(0, 8)
  const viewedProducts = recentlyViewed.map((id) => products.find((item) => item.id === id)).filter(Boolean).slice(0, 8)

  const dealEnds = new Date(Date.now() + 5 * 60 * 60 * 1000)
  const timer = `${String(dealEnds.getHours()).padStart(2, '0')}:${String(dealEnds.getMinutes()).padStart(2, '0')}:${String(dealEnds.getSeconds()).padStart(2, '0')}`

  return (
    <div className="container-x space-y-8 py-6">
      <HeroCarousel />

      <section>
        <SectionTitle title="Quick Categories" subtitle="Jump into top departments" />
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
          {categories.slice(0, 8).map((category) => (
            <Link key={category.name} className="card p-4 text-center hover:-translate-y-0.5 transition" to={`/category/${slugify(category.name)}`}>
              <div className="text-2xl">{category.icon}</div>
              <p className="mt-2 text-sm font-medium">{category.name}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle title="Deals of the Day" subtitle={`Hurry! Ends in ${timer}`} action={<Link className="text-sm text-brand" to="/shop">View all</Link>} />
        <ProductGrid products={deals} />
      </section>

      <section>
        <SectionTitle title="Trending Products" subtitle="Most purchased this week" />
        <ProductGrid products={trending} />
      </section>

      <section className="grid gap-3 md:grid-cols-2">
        {['Fashion refresh', 'Electronics upgrade', 'Home essentials', 'Beauty picks'].map((text) => (
          <div key={text} className="card p-6">
            <p className="text-sm text-muted">Shop by Category</p>
            <h3 className="text-xl font-semibold">{text}</h3>
            <Link to="/shop" className="mt-3 inline-block text-brand">Explore now</Link>
          </div>
        ))}
      </section>

      <section>
        <SectionTitle title="Top Brands" subtitle="Trusted sellers" />
        <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
          {brands.map((brand) => <Link key={brand} to={`/search?q=${encodeURIComponent(brand)}`} className="card p-4 text-center font-medium">{brand}</Link>)}
        </div>
      </section>

      <section>
        <SectionTitle title="Recommended for You" subtitle="Based on your activity" />
        <ProductGrid products={recommended.length ? recommended : trending} />
      </section>

      {viewedProducts.length > 0 && (
        <section>
          <SectionTitle title="Recently Viewed" subtitle="Continue where you left off" />
          <ProductGrid products={viewedProducts} />
        </section>
      )}
    </div>
  )
}
