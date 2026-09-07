import { Link } from 'react-router-dom'

export default function EmptyState({ title, message, cta, to = '/shop' }) {
  return (
    <section className="card p-8 text-center">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-muted">{message}</p>
      {cta && (
        <Link className="btn btn-primary mt-5 inline-flex" to={to}>
          {cta}
        </Link>
      )}
    </section>
  )
}
