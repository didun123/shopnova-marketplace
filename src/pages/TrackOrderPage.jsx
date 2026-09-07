import { useParams } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import { useStore } from '../context/StoreContext'

export default function TrackOrderPage() {
  const { id } = useParams()
  const { orders } = useStore()
  const order = orders.find((entry) => entry.id === id)

  if (!order) return <div className="container-x py-8"><EmptyState title="Tracking unavailable" message="Order not found." cta="Back to orders" to="/orders" /></div>

  return (
    <div className="container-x py-6">
      <h1 className="text-2xl font-semibold">Track Order {order.id}</h1>
      <section className="card mt-4 p-4">
        <ol className="space-y-4">
          {order.timeline.map((step, idx) => (
            <li key={step.key} className="flex items-start gap-3">
              <span className={`mt-0.5 h-5 w-5 rounded-full ${step.done ? 'bg-green-600' : 'bg-slate-300'}`} />
              <div>
                <p className="font-medium">{idx + 1}. {step.label}</p>
                <p className="text-sm text-muted">{step.done ? new Date(step.timestamp || order.date).toLocaleString('en-IN') : 'Pending'}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
