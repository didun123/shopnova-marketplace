import { createContext, useContext, useMemo, useState } from 'react'
import { readLS, writeLS } from '../utils/storage'
import { coupons } from '../data/coupons'

const Store = createContext(null)

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(readLS('sn_cart', []))
  const [wishlist, setWishlist] = useState(readLS('sn_wishlist', []))
  const [orders, setOrders] = useState(readLS('sn_orders', []))
  const [appliedCoupon, setAppliedCoupon] = useState(readLS('sn_coupon', null))
  const [notifications, setNotifications] = useState(readLS('sn_notifications', []))
  const [user, setUser] = useState(readLS('sn_user', { loggedIn: false, name: 'Guest User', email: '' }))

  const persist = (k, v, setter) => { setter(v); writeLS(k, v) }

  function addToCart(product, qty = 1, variant = {}) {
    const key = `${product.id}_${variant.color || ''}_${variant.size || ''}_${variant.storage || ''}_${variant.ram || ''}`
    const exists = cart.find(i => i.key === key)
    const next = exists ? cart.map(i => i.key === key ? { ...i, qty: i.qty + qty } : i) : [...cart, { key, productId: product.id, product, qty, variant }]
    persist('sn_cart', next, setCart)
  }

  function updateCartQty(key, qty) {
    const next = cart.map(i => i.key === key ? { ...i, qty: Math.max(1, qty) } : i)
    persist('sn_cart', next, setCart)
  }

  function removeFromCart(key) {
    persist('sn_cart', cart.filter(i => i.key !== key), setCart)
  }

  function toggleWishlist(id) {
    const next = wishlist.includes(id) ? wishlist.filter(x => x !== id) : [...wishlist, id]
    persist('sn_wishlist', next, setWishlist)
  }

  function applyCoupon(code) {
    persist('sn_coupon', code?.toUpperCase() || null, setAppliedCoupon)
  }

  const pricing = useMemo(() => {
    const subtotal = cart.reduce((s, i) => s + i.product.price * i.qty, 0)
    const mrp = cart.reduce((s, i) => s + i.product.originalPrice * i.qty, 0)
    const productDiscount = Math.max(0, mrp - subtotal)
    const c = coupons.find(x => x.code === appliedCoupon)
    const couponDiscount = c && subtotal >= c.minOrder ? (c.type === 'flat' ? c.value : Math.floor((subtotal * c.value) / 100)) : 0
    const delivery = subtotal > 699 ? 0 : (subtotal ? 49 : 0)
    const platformFee = subtotal ? 9 : 0
    const total = Math.max(0, subtotal - couponDiscount + delivery + platformFee)
    return { subtotal, mrp, productDiscount, couponDiscount, delivery, platformFee, total }
  }, [cart, appliedCoupon])

  function placeOrder({ address, paymentMethod, deliveryOption }) {
    const id = `SN${new Date().toISOString().slice(0,10).replaceAll('-','')}${String(orders.length + 1).padStart(4, '0')}`
    const order = { id, date: new Date().toISOString(), items: cart, pricing, address, paymentMethod, deliveryOption, status: 'Order Placed' }
    persist('sn_orders', [order, ...orders], setOrders)
    persist('sn_cart', [], setCart)
    persist('sn_coupon', null, setAppliedCoupon)
    persist('sn_notifications', [{ id: Date.now().toString(), text: `Your order ${id} has been placed.`, read: false, date: new Date().toISOString() }, ...notifications], setNotifications)
    return order
  }

  function mockLogin(payload) {
    const next = { loggedIn: true, name: payload.name || 'ShopNova User', email: payload.email || '' }
    persist('sn_user', next, setUser)
  }

  function logout() {
    persist('sn_user', { loggedIn: false, name: 'Guest User', email: '' }, setUser)
  }

  return <Store.Provider value={{ cart, wishlist, orders, notifications, user, appliedCoupon, addToCart, updateCartQty, removeFromCart, toggleWishlist, applyCoupon, placeOrder, pricing, mockLogin, logout, cartCount: cart.reduce((a,b)=>a+b.qty,0) }}>{children}</Store.Provider>
}

export const useStore = () => useContext(Store)
