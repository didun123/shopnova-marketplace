import { useState } from 'react'
import { useStore } from '../context/StoreContext'

export default function AddressesPage() {
  const { addresses, addAddress, deleteAddress, setDefaultAddress } = useStore()
  const [form, setForm] = useState({ name: '', phone: '', line1: '', city: '', state: '', pincode: '' })

  const submit = (event) => {
    event.preventDefault()
    if (!form.name || !form.line1 || !form.city || !form.pincode) return
    addAddress({ ...form, isDefault: addresses.length === 0 })
    setForm({ name: '', phone: '', line1: '', city: '', state: '', pincode: '' })
  }

  return (
    <div className="container-x py-6">
      <h1 className="text-2xl font-semibold">Manage Addresses</h1>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <form className="card space-y-2 p-4" onSubmit={submit}>
          <input className="input" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className="input" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <input className="input" placeholder="Address" value={form.line1} onChange={(e) => setForm({ ...form, line1: e.target.value })} />
          <input className="input" placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
          <input className="input" placeholder="State" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} />
          <input className="input" placeholder="Pincode" value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} />
          <button className="btn btn-primary" type="submit">Add address</button>
        </form>
        <section className="space-y-2">
          {addresses.map((address) => (
            <article key={address.id} className="card p-4 text-sm">
              <p className="font-semibold">{address.name} {address.isDefault && <span className="chip ml-1">Default</span>}</p>
              <p className="text-muted">{address.line1}, {address.city}, {address.state} - {address.pincode}</p>
              <div className="mt-2 flex gap-2">
                {!address.isDefault && <button className="btn btn-ghost" onClick={() => setDefaultAddress(address.id)}>Set default</button>}
                <button className="btn btn-ghost text-red-600" onClick={() => deleteAddress(address.id)}>Delete</button>
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  )
}
