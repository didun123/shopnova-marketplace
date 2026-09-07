import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext'

export default function LoginPage() {
  const navigate = useNavigate()
  const { mockLogin } = useStore()
  const [form, setForm] = useState({ email: '', password: '' })

  const submit = (event) => {
    event.preventDefault()
    mockLogin({ name: 'SHOPNOVA User', email: form.email })
    navigate('/account')
  }

  return (
    <div className="container-x py-10">
      <form className="card mx-auto max-w-md space-y-3 p-6" onSubmit={submit}>
        <h1 className="text-2xl font-semibold">Login</h1>
        <input className="input" type="email" required placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="input" type="password" required placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="btn btn-primary w-full" type="submit">Login</button>
        <p className="text-sm text-muted">New customer? <Link className="text-brand" to="/signup">Create account</Link></p>
      </form>
    </div>
  )
}
