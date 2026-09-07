import { X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { inr } from '../utils/helpers'

export default function CartDrawer({ open, onClose }) {
  const { cart, removeFromCart, pricing } = useStore()
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/40 p-2" onClick={onClose}>
      <aside className="ml-auto h-full w-full max-w-md rounded-2xl bg-white p-4" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button className="icon-link" onClick={onClose} aria-label="Close cart"><X size={16} /></button>
        </div>
        <div className="mt-3 space-y-3 overflow-auto pb-28">
          {cart.length === 0 ? <p className="text-sm text-muted">Your cart is empty.</p> : cart.map((item) => (
            <div key={item.key} className="card flex gap-3 p-2">
              <img src={item.image} alt={item.name} className="h-14 w-14 rounded-lg object-cover" />
              <div className="flex-1 text-sm">
                <p className="line-clamp-2 font-medium">{item.name}</p>
                <p className="text-muted">Qty: {item.qty}</p>
                <p className="font-semibold">{inr(item.price * item.qty)}</p>
              </div>
              <button className="text-xs text-red-600" onClick={() => removeFromCart(item.key)}>Remove</button>
            </div>
          ))}
        </div>
        <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-line bg-white p-3">
          <div className="mb-2 flex justify-between text-sm"><span>Total</span><strong>{inr(pricing.total)}</strong></div>
          <div className="grid grid-cols-2 gap-2">
            <Link to="/cart" className="btn btn-ghost text-center" onClick={onClose}>View Cart</Link>
            <Link to="/checkout" className="btn btn-primary text-center" onClick={onClose}>Checkout</Link>
          </div>
        </div>
      </aside>
    </div>
  )
}
