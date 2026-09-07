import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import { useStore } from '../context/StoreContext'
import { inr } from '../utils/helpers'

const steps = ['Address', 'Delivery', 'Payment', 'Review']

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { cart, addresses, addAddress, setDefaultAddress, pricing, placeOrder, addNotification } = useStore()
  const [step, setStep] = useState(0)
  const [deliveryOption, setDeliveryOption] = useState('standard')
  const [paymentMethod, setPaymentMethod] = useState('UPI')
  const [addressForm, setAddressForm] = useState({ name: '', phone: '', line1: '', city: '', state: '', pincode: '' })
  const [error, setError] = useState('')

  if (!cart.length) return <div className="container-x py-8"><EmptyState title="No items to checkout" message="Add products to cart first." cta="Shop now" /></div>

  const selectedAddress = addresses.find((entry) => entry.isDefault) || addresses[0]

  const createAddress = () => {
    if (!addressForm.name || !addressForm.line1 || !addressForm.city || !addressForm.pincode) {
      setError('Please fill all required fields.')
      return
    }
    addAddress({ ...addressForm, isDefault: true })
    setAddressForm({ name: '', phone: '', line1: '', city: '', state: '', pincode: '' })
    setError('')
  }

  const submitOrder = () => {
    const order = placeOrder({ address: selectedAddress, paymentMethod, deliveryOption })
    if (!order) {
      addNotification('Order failed', 'Unable to place order. Please retry.')
      setError('Payment failed mock state. Please retry.')
      return
    }
    navigate(`/order-success?id=${order.id}`)
  }

  return (
    <div className="container-x grid gap-4 py-6 lg:grid-cols-[1fr_340px]">
      <section className="space-y-4">
        <div className="card p-3">
          <div className="flex gap-2 text-sm">{steps.map((label, idx) => <span key={label} className={`chip ${idx === step ? 'chip-active' : ''}`}>{idx + 1}. {label}</span>)}</div>
        </div>

        {step === 0 && (
          <div className="card p-4 space-y-3">
            <h2 className="font-semibold">Select address</h2>
            {addresses.length ? addresses.map((address) => (
              <label key={address.id} className="block rounded-xl border border-line p-3">
                <input type="radio" checked={selectedAddress?.id === address.id} onChange={() => setDefaultAddress(address.id)} />
                <span className="ml-2 font-medium">{address.name}</span>
                <p className="ml-6 text-sm text-muted">{address.line1}, {address.city}, {address.state} - {address.pincode}</p>
              </label>
            )) : <p className="text-sm text-muted">No saved addresses. Add one below.</p>}
            <div className="grid gap-2 md:grid-cols-2">
              <input className="input" placeholder="Name" value={addressForm.name} onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })} />
              <input className="input" placeholder="Phone" value={addressForm.phone} onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })} />
              <input className="input md:col-span-2" placeholder="Address line" value={addressForm.line1} onChange={(e) => setAddressForm({ ...addressForm, line1: e.target.value })} />
              <input className="input" placeholder="City" value={addressForm.city} onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })} />
              <input className="input" placeholder="State" value={addressForm.state} onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })} />
              <input className="input" placeholder="Pincode" value={addressForm.pincode} onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })} />
              <button className="btn btn-ghost" onClick={createAddress}>Save address</button>
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>
        )}

        {step === 1 && (
          <div className="card p-4">
            <h2 className="font-semibold">Delivery options</h2>
            <div className="mt-2 space-y-2 text-sm">
              {[
                { key: 'standard', label: 'Standard Delivery', eta: '3-5 days', fee: '₹49' },
                { key: 'express', label: 'Express Delivery', eta: '1-2 days', fee: '₹99' },
                { key: 'free', label: 'Eco Free Delivery', eta: '5-7 days', fee: 'Free' }
              ].map((option) => (
                <label key={option.key} className="block rounded-xl border border-line p-3">
                  <input type="radio" checked={deliveryOption === option.key} onChange={() => setDeliveryOption(option.key)} />
                  <span className="ml-2 font-medium">{option.label}</span>
                  <span className="ml-2 text-muted">({option.eta} • {option.fee})</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="card p-4">
            <h2 className="font-semibold">Payment method</h2>
            <div className="mt-2 space-y-2 text-sm">
              {['UPI', 'Card', 'Net Banking', 'Wallet', 'COD'].map((method) => (
                <label key={method} className="block rounded-xl border border-line p-3">
                  <input type="radio" checked={paymentMethod === method} onChange={() => setPaymentMethod(method)} />
                  <span className="ml-2">{method}</span>
                </label>
              ))}
            </div>
            <p className="mt-2 text-sm text-muted">Mock payment flow enabled. No real transaction is processed.</p>
          </div>
        )}

        {step === 3 && (
          <div className="card p-4 text-sm">
            <h2 className="font-semibold">Review order</h2>
            <p className="mt-2">Items: {cart.length}</p>
            <p>Deliver to: {selectedAddress ? `${selectedAddress.name}, ${selectedAddress.city}` : 'No address selected'}</p>
            <p>Payment: {paymentMethod}</p>
            <p>Total: <strong>{inr(pricing.total)}</strong></p>
            <button className="btn btn-primary mt-3" onClick={submitOrder}>Place order</button>
            {error && <p className="mt-2 text-red-600">{error}</p>}
          </div>
        )}

        <div className="flex justify-between">
          <button className="btn btn-ghost" disabled={step === 0} onClick={() => setStep((prev) => prev - 1)}>Back</button>
          <button className="btn btn-primary" disabled={step === steps.length - 1} onClick={() => setStep((prev) => prev + 1)}>Next</button>
        </div>
      </section>

      <aside className="card h-fit p-4 text-sm">
        <h3 className="font-semibold">Price details</h3>
        <div className="mt-2 space-y-1">
          <div className="flex justify-between"><span>Subtotal</span><span>{inr(pricing.subtotal)}</span></div>
          <div className="flex justify-between text-green-700"><span>Savings</span><span>-{inr(pricing.productDiscount + pricing.couponDiscount)}</span></div>
          <div className="flex justify-between"><span>Total</span><strong>{inr(pricing.total)}</strong></div>
        </div>
      </aside>
    </div>
  )
}
