import { coupons } from '../data/coupons'

export default function CouponsPage() {
  return (
    <div className="container-x py-6">
      <h1 className="text-2xl font-semibold">Available Coupons</h1>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {coupons.map((coupon) => (
          <article key={coupon.code} className="card p-4">
            <p className="text-lg font-bold text-brand">{coupon.code}</p>
            <p className="text-sm text-muted">{coupon.description}</p>
            <p className="mt-1 text-xs text-muted">Minimum order: ₹{coupon.minOrder}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
