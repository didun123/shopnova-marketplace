import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="container-x py-16 text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-2 text-muted">Page not found.</p>
      <Link to="/" className="btn btn-primary mt-4 inline-flex">Go home</Link>
    </div>
  )
}
