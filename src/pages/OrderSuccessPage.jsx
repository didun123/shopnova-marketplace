import { Link, useSearchParams } from 'react-router-dom'
import { etaDate } from '../utils/helpers'

export default function OrderSuccessPage() {
  const [params] = useSearchParams()
  const id = params.get('id')

  return (
    <div className="container-x py-10">
      <section className="card mx-auto max-w-xl p-8 text-center">
        <h1 className="text-3xl font-bold text-green-700">Order Placed 🎉</h1>
        <p className="mt-2 text-muted">Thank you for shopping with SHOPNOVA.</p>
        <p className="mt-3">Order ID: <strong>{id || 'N/A'}</strong></p>
        <p>Estimated delivery by {etaDate(5)}</p>
        <div className="mt-5 flex justify-center gap-2">
          <Link className="btn btn-primary" to="/orders">View Orders</Link>
          <Link className="btn btn-ghost" to="/shop">Continue Shopping</Link>
        </div>
      </section>
    </div>
  )
}
