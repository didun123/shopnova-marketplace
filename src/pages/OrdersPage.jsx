import { Link } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import { useStore } from '../context/StoreContext'
import { inr } from '../utils/helpers'

export default function OrdersPage() {
  const { orders } = useStore()

  return (
    <div className="container-x py-6">
      <h1 className="mb-4 text-2xl font-semibold">My Orders</h1>
      {!orders.length ? (
        <EmptyState title="No orders yet" message="Your future purchases will appear here." cta="Start shopping" />
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <article key={order.id} className="card p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-semibold">{order.id}</p>
                  <p className="text-sm text-muted">{new Date(order.date).toLocaleString('en-IN')}</p>
                </div>
                <p className="font-semibold">{inr(order.pricing.total)}</p>
              </div>
              <p className="mt-2 text-sm">{order.items.length} items • {order.status}</p>
              <div className="mt-3 flex gap-2">
                <Link className="btn btn-ghost" to={`/orders/${order.id}`}>View details</Link>
                <Link className="btn btn-primary" to={`/track-order/${order.id}`}>Track order</Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
