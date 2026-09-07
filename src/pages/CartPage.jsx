import { Link } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import { useStore } from '../context/StoreContext'
import { coupons } from '../data/coupons'
import { inr } from '../utils/helpers'
import { useState } from 'react'

export default function CartPage() {
  const { cart, updateCartQty, removeFromCart, toggleWishlist, pricing, applyCoupon, appliedCoupon, removeCoupon } = useStore()
  const [couponCode, setCouponCode] = useState('')
  const [couponMsg, setCouponMsg] = useState('')

  if (!cart.length) return <div className="container-x py-8"><EmptyState title="Your cart is empty" message="Add products to continue shopping." cta="Shop now" /></div>

  const submitCoupon = (code) => {
    const result = applyCoupon(code || couponCode)
    setCouponMsg(result.message)
  }

  return (
    <div className="container-x grid gap-4 py-6 lg:grid-cols-[1fr_340px]">
      <section className="space-y-3">
        {cart.map((item) => (
          <article key={item.key} className="card flex gap-4 p-3">
            <img src={item.image} alt={item.name} className="h-28 w-28 rounded-xl object-cover" />
            <div className="flex-1">
              <h2 className="font-semibold">{item.name}</h2>
              <p className="text-sm text-muted">Seller: {item.seller}</p>
              <p className="mt-1"><strong>{inr(item.price)}</strong> <span className="text-muted line-through">{inr(item.originalPrice)}</span></p>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                <button className="chip" onClick={() => updateCartQty(item.key, item.qty - 1)}>-</button>
                <span>{item.qty}</span>
                <button className="chip" onClick={() => updateCartQty(item.key, item.qty + 1)}>+</button>
                <button className="text-red-600" onClick={() => removeFromCart(item.key)}>Remove</button>
                <button className="text-brand" onClick={() => { toggleWishlist(item.productId); removeFromCart(item.key) }}>Move to wishlist</button>
              </div>
            </div>
          </article>
        ))}
      </section>

      <aside className="card h-fit p-4">
        <h2 className="text-lg font-semibold">Price Summary</h2>
        <div className="mt-3 space-y-2 text-sm">
          <div className="flex justify-between"><span>Subtotal</span><span>{inr(pricing.subtotal)}</span></div>
          <div className="flex justify-between text-green-700"><span>MRP Discount</span><span>-{inr(pricing.productDiscount)}</span></div>
          <div className="flex justify-between text-green-700"><span>Coupon Discount</span><span>-{inr(pricing.couponDiscount)}</span></div>
          <div className="flex justify-between"><span>Delivery</span><span>{pricing.deliveryCharge ? inr(pricing.deliveryCharge) : 'Free'}</span></div>
          <div className="flex justify-between"><span>Platform Fee</span><span>{inr(pricing.platformFee)}</span></div>
          <div className="border-t border-line pt-2 text-base font-semibold flex justify-between"><span>Total</span><span>{inr(pricing.total)}</span></div>
        </div>

        <div className="mt-4 rounded-xl border border-line p-3">
          <h3 className="font-semibold">Apply Coupon</h3>
          <div className="mt-2 flex gap-2">
            <input className="input" value={couponCode} onChange={(e) => setCouponCode(e.target.value.toUpperCase())} placeholder="Enter coupon" />
            <button className="btn btn-primary" onClick={() => submitCoupon()}>Apply</button>
          </div>
          {appliedCoupon && <p className="mt-2 text-sm text-green-700">Applied: {appliedCoupon} <button onClick={removeCoupon} className="text-red-600">Remove</button></p>}
          {couponMsg && <p className={`mt-2 text-sm ${couponMsg.includes('applied') ? 'text-green-700' : 'text-red-600'}`}>{couponMsg}</p>}
          <div className="mt-3 flex flex-wrap gap-2">
            {coupons.map((coupon) => <button key={coupon.code} className="chip" onClick={() => submitCoupon(coupon.code)}>{coupon.code}</button>)}
          </div>
        </div>

        <Link to="/checkout" className="btn btn-primary mt-4 w-full justify-center">Proceed to Checkout</Link>
      </aside>
    </div>
  )
}
