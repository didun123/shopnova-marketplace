import { Link, Route, Routes, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { categories } from './data/categories'
import { products } from './data/products'
import { useStore } from './context/StoreContext'

function Header() {
  const { cartCount, wishlist, user } = useStore()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const query = searchParams.get('q') || ''

  function submitSearch(event) {
    event.preventDefault()
    const value = new FormData(event.currentTarget).get('q')?.toString().trim()
    navigate(value ? `/search?q=${encodeURIComponent(value)}` : '/shop')
  }

  return (
    <>
      <header className="border-b bg-white">
        <div className="container-x flex min-h-16 items-center gap-5">
          <Link to="/" className="text-2xl font-bold text-blue-600">ShopNova</Link>
          <form onSubmit={submitSearch} className="flex min-w-0 flex-1">
            <input name="q" defaultValue={query} placeholder="Search products, brands and more" className="w-full rounded-l-lg border border-r-0 px-4 py-2 outline-none focus:border-blue-500" />
            <button className="rounded-r-lg bg-blue-600 px-5 font-semibold text-white">Search</button>
          </form>
          <nav className="flex items-center gap-4 whitespace-nowrap text-sm">
            <Link to={user.loggedIn ? '/account' : '/login'}>{user.loggedIn ? user.name : 'Login'}</Link>
            <Link to="/wishlist">Wishlist ({wishlist.length})</Link>
            <Link to="/cart">Cart ({cartCount})</Link>
          </nav>
        </div>
      </header>
      <div className="border-b bg-white">
        <nav className="container-x flex gap-5 overflow-x-auto py-3 text-sm text-gray-600">
          {categories.map(category => <Link key={category} to={category === 'All' ? '/shop' : `/category/${encodeURIComponent(category)}`} className="whitespace-nowrap hover:text-blue-600">{category}</Link>)}
        </nav>
      </div>
    </>
  )
}

function ProductCard({ product }) {
  const { addToCart, toggleWishlist, wishlist } = useStore()
  return (
    <article className="card overflow-hidden">
      <Link to={`/product/${product.id}`} className="block bg-gray-50">
        <img src={product.images[0]} alt={product.name} className="h-48 w-full object-cover" />
      </Link>
      <div className="p-4">
        <p className="text-xs text-gray-500">{product.brand}</p>
        <Link to={`/product/${product.id}`} className="mt-1 block font-semibold hover:text-blue-600 line-clamp-2">{product.name}</Link>
        <p className="mt-2 text-lg font-bold">₹{product.price.toLocaleString('en-IN')} <span className="text-xs font-normal text-green-600">{product.discount}% off</span></p>
        <div className="mt-3 flex gap-2">
          <button onClick={() => addToCart(product)} className="btn btn-primary flex-1">Add to cart</button>
          <button aria-label="Toggle wishlist" onClick={() => toggleWishlist(product.id)} className="btn btn-ghost">{wishlist.includes(product.id) ? '♥' : '♡'}</button>
        </div>
      </div>
    </article>
  )
}

function ProductGrid({ items }) {
  if (!items.length) return <p className="card p-8 text-center text-gray-500">No products matched your search.</p>
  return <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{items.map(product => <ProductCard key={product.id} product={product} />)}</div>
}

function ShopPage() {
  const { category } = useParams()
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q')?.toLowerCase() || ''
  const items = products.filter(product => (!category || product.category.toLowerCase() === decodeURIComponent(category).toLowerCase()) && (!query || `${product.name} ${product.brand} ${product.category}`.toLowerCase().includes(query)))
  return <PageShell title={category ? `${decodeURIComponent(category)} products` : query ? `Search results for "${query}"` : 'All products'}><ProductGrid items={items} /></PageShell>
}

function HomePage() {
  return (
    <PageShell>
      <section className="mb-8 rounded-2xl bg-blue-600 px-6 py-12 text-white sm:px-12">
        <p className="mb-2 font-semibold text-blue-100">WELCOME TO SHOPNOVA</p>
        <h1 className="max-w-xl text-4xl font-bold sm:text-5xl">Everything you need, delivered to your door.</h1>
        <p className="mt-4 max-w-lg text-blue-100">Discover great deals across fashion, electronics, mobiles and more.</p>
        <Link to="/shop" className="mt-6 inline-block rounded-lg bg-white px-5 py-3 font-semibold text-blue-700">Shop now</Link>
      </section>
      <div className="mb-5 flex items-center justify-between"><h2 className="text-2xl font-bold">Trending products</h2><Link to="/shop" className="text-blue-600">View all</Link></div>
      <ProductGrid items={products.filter(product => product.isTrending).slice(0, 8)} />
    </PageShell>
  )
}

function ProductPage() {
  const { id } = useParams()
  const product = products.find(item => item.id === id)
  const { addToCart } = useStore()
  if (!product) return <NotFoundPage />
  return <PageShell><div className="card grid gap-8 p-6 md:grid-cols-2"><img src={product.images[0]} alt={product.name} className="h-96 w-full rounded-lg object-cover" /><div><p className="text-sm text-gray-500">{product.brand} · {product.category}</p><h1 className="mt-2 text-3xl font-bold">{product.name}</h1><p className="mt-4 text-3xl font-bold">₹{product.price.toLocaleString('en-IN')}</p><p className="mt-4 text-gray-600">{product.description}</p><button onClick={() => addToCart(product)} className="btn btn-primary mt-8 px-8">Add to cart</button></div></div></PageShell>
}

function CartPage() {
  const { cart, pricing, updateCartQty, removeFromCart } = useStore()
  return <PageShell title="Your cart">{cart.length ? <div className="grid gap-5 lg:grid-cols-[1fr_320px]"><div className="space-y-3">{cart.map(item => <div key={item.key} className="card flex items-center gap-4 p-4"><img src={item.product.images[0]} alt="" className="h-20 w-20 rounded object-cover" /><div className="min-w-0 flex-1"><p className="font-semibold">{item.product.name}</p><p>₹{item.product.price.toLocaleString('en-IN')}</p></div><input type="number" min="1" value={item.qty} onChange={event => updateCartQty(item.key, Number(event.target.value))} className="w-16 rounded border p-2" /><button onClick={() => removeFromCart(item.key)} className="text-sm text-red-600">Remove</button></div>)}</div><aside className="card h-fit p-5"><h2 className="text-lg font-bold">Price details</h2><p className="mt-4 flex justify-between">Subtotal <span>₹{pricing.subtotal.toLocaleString('en-IN')}</span></p><p className="mt-2 flex justify-between">Delivery <span>₹{pricing.delivery}</span></p><hr className="my-4" /><p className="flex justify-between font-bold">Total <span>₹{pricing.total.toLocaleString('en-IN')}</span></p><Link to="/checkout" className="btn btn-primary mt-5 block text-center">Proceed to checkout</Link></aside></div> : <div className="card p-10 text-center"><p className="text-lg">Your cart is empty.</p><Link to="/shop" className="btn btn-primary mt-5 inline-block">Browse products</Link></div>}</PageShell>
}

function LoginPage() {
  const { mockLogin } = useStore()
  const navigate = useNavigate()
  function submit(event) { event.preventDefault(); const data = Object.fromEntries(new FormData(event.currentTarget)); mockLogin(data); navigate('/account') }
  return <PageShell title="Welcome back"><form onSubmit={submit} className="card mx-auto max-w-md space-y-4 p-6"><input required name="name" placeholder="Your name" className="w-full rounded border p-3" /><input required type="email" name="email" placeholder="Email address" className="w-full rounded border p-3" /><button className="btn btn-primary w-full">Continue</button></form></PageShell>
}

function PageShell({ title, children }) { return <main className="container-x flex-1 py-8">{title && <h1 className="mb-6 text-3xl font-bold">{title}</h1>}{children}</main> }
function NotFoundPage() { return <PageShell title="Page not found"><Link to="/" className="text-blue-600">Return home</Link></PageShell> }
function StaticPage({ title, description }) { return <PageShell title={title}><p className="card p-6 text-gray-600">{description}</p></PageShell> }
function Footer() { return <footer className="mt-12 border-t bg-white py-6 text-center text-sm text-gray-500">© {new Date().getFullYear()} ShopNova Marketplace</footer> }

export default function App() {
  return <div className="flex min-h-screen flex-col"><Header /><main className="flex-1"><Routes><Route path="/" element={<HomePage />} /><Route path="/shop" element={<ShopPage />} /><Route path="/category/:category" element={<ShopPage />} /><Route path="/search" element={<ShopPage />} /><Route path="/product/:id" element={<ProductPage />} /><Route path="/cart" element={<CartPage />} /><Route path="/login" element={<LoginPage />} /><Route path="/account" element={<StaticPage title="My account" description="Your ShopNova account is ready." />} /><Route path="/about" element={<StaticPage title="About ShopNova" description="ShopNova is a modern multi-category marketplace frontend demo." />} /><Route path="/contact" element={<StaticPage title="Contact us" description="For support, email support@shopnova.demo" />} /><Route path="*" element={<NotFoundPage />} /></Routes></main><Footer /></div>
}
