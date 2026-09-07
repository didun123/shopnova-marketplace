import { Link, useParams } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import { useStore } from '../context/StoreContext'
import { inr } from '../utils/helpers'

export default function OrderDetailPage() {
  const { id } = useParams()
  const { orders } = useStore()
  const order = orders.find((entry) => entry.id === id)

  if (!order) return <div className="container-x py-8"><EmptyState title="Order not found" message="This order does not exist." cta="Back to orders" to="/orders" /></div>

  return (
    <div className="container-x py-6">
      <h1 className="text-2xl font-semibold">Order {order.id}</h1>
      <p className="text-sm text-muted">Placed on {new Date(order.date).toLocaleString('en-IN')}</p>
      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_300px]">
        <section className="space-y-3">
          {order.items.map((item) => (
            <article key={item.key} className="card flex gap-3 p-3">
              <img src={item.image} alt={item.name} className="h-16 w-16 rounded-lg object-cover" />
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted">Qty: {item.qty}</p>
                <p className="text-sm">{inr(item.price * item.qty)}</p>
              </div>
            </article>
          ))}
        </section>
        <aside className="card h-fit p-4 text-sm">
          <p className="font-semibold">Shipping Address</p>
          <p className="mt-1 text-muted">{order.address?.name}, {order.address?.line1}, {order.address?.city}, {order.address?.state} - {order.address?.pincode}</p>
          <p className="mt-3">Payment: {order.paymentMethod}</p>
          <p>Status: {order.status}</p>
          <p className="mt-3 font-semibold">Total: {inr(order.pricing.total)}</p>
          <Link className="btn btn-primary mt-3" to={`/track-order/${order.id}`}>Track shipment</Link>
        </aside>
      </div>
    </div>
  )
}
