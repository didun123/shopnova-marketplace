import { Bell, Heart, Search, ShoppingCart, User } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { products } from '../data/products'
import { popularSearches } from '../data/coupons'
import { useStore } from '../context/StoreContext'
import CartDrawer from './CartDrawer'

export default function Header() {
  const navigate = useNavigate()
  const { cartCount, wishlistCount, unreadNotifications, recentlyViewed, setCartOpen, cartOpen } = useStore()
  const [query, setQuery] = useState('')
  const [focus, setFocus] = useState(false)

  const suggestions = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    const byName = products.filter((item) => item.name.toLowerCase().includes(q)).slice(0, 5)
    const byTag = products.filter((item) => item.tags.some((tag) => tag.includes(q))).slice(0, 5)
    return [...new Map([...byName, ...byTag].map((item) => [item.id, item])).values()].slice(0, 8)
  }, [query])

  const submit = (value = query) => {
    const text = value.trim()
    if (!text) return
    navigate(`/search?q=${encodeURIComponent(text)}`)
    setFocus(false)
  }

  const recentSearches = useMemo(
    () => recentlyViewed.map((id) => products.find((item) => item.id === id)?.name).filter(Boolean).slice(0, 4),
    [recentlyViewed]
  )

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
        <div className="container-x flex flex-wrap items-center gap-3 py-3">
          <Link to="/" className="text-xl font-black tracking-wide text-brand">SHOPNOVA</Link>
          <div className="relative min-w-[220px] flex-1">
            <form
              className="flex h-11 items-center rounded-xl border border-line bg-bg px-3"
              onSubmit={(event) => {
                event.preventDefault()
                submit()
              }}
            >
              <Search size={18} className="text-muted" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onFocus={() => setFocus(true)}
                onBlur={() => setTimeout(() => setFocus(false), 130)}
                placeholder="Search for products, brands and more"
                className="ml-2 flex-1 bg-transparent text-sm outline-none"
                aria-label="Search products"
              />
            </form>
            {focus && (
              <div className="card absolute left-0 right-0 top-12 z-50 p-3">
                {suggestions.length > 0 ? (
                  <ul className="space-y-2 text-sm">
                    {suggestions.map((item) => (
                      <li key={item.id}>
                        <button className="w-full rounded-lg px-2 py-1 text-left hover:bg-bg" onMouseDown={() => submit(item.name)}>
                          {item.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted">Try searching by product, brand, or tag.</p>
                )}
                <div className="mt-3">
                  <p className="text-xs font-semibold text-muted">Recent searches</p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {recentSearches.length ? recentSearches.map((text) => <button key={text} className="chip" onMouseDown={() => submit(text)}>{text}</button>) : <span className="text-xs text-muted">No recent searches</span>}
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-xs font-semibold text-muted">Popular</p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {popularSearches.map((text) => <button key={text} className="chip" onMouseDown={() => submit(text)}>{text}</button>)}
                  </div>
                </div>
              </div>
            )}
          </div>

          <nav className="ml-auto flex items-center gap-1 text-sm" aria-label="Quick actions">
            <Link className="icon-link" to="/account" aria-label="Account"><User size={18} /></Link>
            <Link className="icon-link relative" to="/wishlist" aria-label="Wishlist"><Heart size={18} />{wishlistCount > 0 && <span className="pill">{wishlistCount}</span>}</Link>
            <button className="icon-link relative" onClick={() => setCartOpen(true)} aria-label="Cart"><ShoppingCart size={18} />{cartCount > 0 && <span className="pill">{cartCount}</span>}</button>
            <Link className="icon-link relative" to="/notifications" aria-label="Notifications"><Bell size={18} />{unreadNotifications > 0 && <span className="pill">{unreadNotifications}</span>}</Link>
          </nav>
        </div>
      </header>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
