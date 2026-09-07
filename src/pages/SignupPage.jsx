import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext'

export default function SignupPage() {
  const navigate = useNavigate()
  const { mockSignup } = useStore()
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  const submit = (event) => {
    event.preventDefault()
    mockSignup(form)
    navigate('/account')
  }

  return (
    <div className="container-x py-10">
      <form className="card mx-auto max-w-md space-y-3 p-6" onSubmit={submit}>
        <h1 className="text-2xl font-semibold">Create Account</h1>
        <input className="input" required placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="input" type="email" required placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="input" type="password" required placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="btn btn-primary w-full" type="submit">Sign up</button>
        <p className="text-sm text-muted">Already have account? <Link className="text-brand" to="/login">Login</Link></p>
      </form>
    </div>
  )
}
