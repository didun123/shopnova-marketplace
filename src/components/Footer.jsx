import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-line bg-slate-950 text-slate-200">
      <div className="container-x grid gap-6 py-8 md:grid-cols-3">
        <div>
          <p className="text-lg font-bold text-white">SHOPNOVA</p>
          <p className="mt-2 text-sm text-slate-400">Modern multi-category marketplace frontend demo with end-to-end shopping flows.</p>
        </div>
        <div className="text-sm">
          <p className="font-semibold text-white">Customer</p>
          <div className="mt-2 space-y-1 text-slate-400">
            <Link to="/about">About</Link><br />
            <Link to="/contact">Contact</Link><br />
            <Link to="/faq">FAQ</Link>
          </div>
        </div>
        <div className="text-sm text-slate-400">
          <p className="font-semibold text-white">Quick Links</p>
          <Link to="/orders">Orders</Link><br />
          <Link to="/wishlist">Wishlist</Link><br />
          <Link to="/account/addresses">Addresses</Link>
        </div>
      </div>
    </footer>
  )
}
