import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'

const items = [
  ['Profile', '/account'],
  ['Orders', '/orders'],
  ['Wishlist', '/wishlist'],
  ['Addresses', '/account/addresses'],
  ['Coupons', '/account/coupons'],
  ['Saved Payments', '/checkout'],
  ['Notifications', '/notifications'],
  ['Settings', '/account'],
]

export default function AccountPage() {
  const { user, logout } = useStore()
  return (
    <div className="container-x py-6">
      <section className="card p-5">
        <h1 className="text-2xl font-semibold">My Account</h1>
        <p className="mt-1 text-sm text-muted">{user.name} • {user.email || 'No email added'}</p>
      </section>
      <section className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(([label, to]) => <Link key={label} to={to} className="card p-4 font-medium hover:-translate-y-0.5 transition">{label}</Link>)}
        <button className="card p-4 text-left font-medium text-red-600" onClick={logout}>Logout</button>
      </section>
    </div>
  )
}
