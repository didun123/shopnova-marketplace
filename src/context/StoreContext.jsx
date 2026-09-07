import { createContext, useContext, useMemo, useState } from 'react'
import { coupons } from '../data/coupons'
import { readLS, writeLS } from '../utils/storage'

const StoreContext = createContext(null)

const defaults = {
  user: { loggedIn: false, name: 'Guest User', email: '' },
  cart: [],
  wishlist: [],
  orders: [],
  addresses: [],
  recentlyViewed: [],
  notifications: [{ id: 'welcome', title: 'Welcome to SHOPNOVA', text: 'Explore top deals across categories.', read: false, date: new Date().toISOString() }],
  appliedCoupon: null
}

function usePersistentState(key, initial) {
  const [value, setValue] = useState(() => readLS(key, initial))
  const setPersisted = (next) => {
    const resolved = typeof next === 'function' ? next(value) : next
    setValue(resolved)
    writeLS(key, resolved)
    return resolved
  }
  return [value, setPersisted]
}

const makeCartKey = (productId, variant = {}) => `${productId}_${variant.color || ''}_${variant.size || ''}_${variant.storage || ''}_${variant.ram || ''}`

const couponDiscountAmount = (coupon, subtotal) => {
  if (!coupon || subtotal < coupon.minOrder) return 0
  return coupon.type === 'flat' ? coupon.value : Math.floor((subtotal * coupon.value) / 100)
}

export function StoreProvider({ children }) {
  const [user, setUser] = usePersistentState('sn_user', defaults.user)
  const [cart, setCart] = usePersistentState('sn_cart', defaults.cart)
  const [wishlist, setWishlist] = usePersistentState('sn_wishlist', defaults.wishlist)
  const [orders, setOrders] = usePersistentState('sn_orders', defaults.orders)
  const [addresses, setAddresses] = usePersistentState('sn_addresses', defaults.addresses)
  const [recentlyViewed, setRecentlyViewed] = usePersistentState('sn_recently_viewed', defaults.recentlyViewed)
  const [notifications, setNotifications] = usePersistentState('sn_notifications', defaults.notifications)
  const [appliedCoupon, setAppliedCoupon] = usePersistentState('sn_coupon', defaults.appliedCoupon)
  const [cartOpen, setCartOpen] = useState(false)

  const pricing = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
    const mrp = cart.reduce((sum, item) => sum + item.originalPrice * item.qty, 0)
    const productDiscount = Math.max(0, mrp - subtotal)
    const coupon = coupons.find((entry) => entry.code === appliedCoupon)
    const couponDiscount = couponDiscountAmount(coupon, subtotal)
    const deliveryCharge = subtotal === 0 ? 0 : subtotal >= 799 ? 0 : 49
    const platformFee = subtotal === 0 ? 0 : 9
    const total = Math.max(0, subtotal - couponDiscount + deliveryCharge + platformFee)
    return { subtotal, mrp, productDiscount, couponDiscount, deliveryCharge, platformFee, total, appliedCouponMeta: coupon || null }
  }, [cart, appliedCoupon])

  const addNotification = (title, text) => {
    const next = { id: String(Date.now()), title, text, read: false, date: new Date().toISOString() }
    setNotifications((prev) => [next, ...prev])
  }

  const markNotificationRead = (id) => {
    setNotifications((prev) => prev.map((note) => (note.id === id ? { ...note, read: true } : note)))
  }

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((note) => ({ ...note, read: true })))
  }

  const addToCart = (product, qty = 1, variant = {}) => {
    const key = makeCartKey(product.id, variant)
    setCart((prev) => {
      const existing = prev.find((item) => item.key === key)
      if (existing) {
        return prev.map((item) => (item.key === key ? { ...item, qty: item.qty + qty } : item))
      }
      return [
        ...prev,
        {
          key,
          productId: product.id,
          name: product.name,
          image: product.images?.[0],
          price: product.price,
          originalPrice: product.originalPrice,
          stock: product.stock,
          seller: product.seller,
          qty,
          variant
        }
      ]
    })
    setCartOpen(true)
    addNotification('Cart updated', `${product.name} added to cart.`)
  }

  const updateCartQty = (key, qty) => {
    setCart((prev) => prev.map((item) => (item.key === key ? { ...item, qty: Math.min(Math.max(1, qty), item.stock || 99) } : item)))
  }

  const removeFromCart = (key) => {
    setCart((prev) => prev.filter((item) => item.key !== key))
  }

  const clearCart = () => setCart([])

  const toggleWishlist = (productId) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const addRecentlyViewed = (productId) => {
    setRecentlyViewed((prev) => [productId, ...prev.filter((id) => id !== productId)].slice(0, 12))
  }

  const addAddress = (address) => {
    const id = `ADDR${Date.now()}`
    setAddresses((prev) => {
      const next = { ...address, id, isDefault: prev.length === 0 || !!address.isDefault }
      if (next.isDefault) return [next, ...prev.map((entry) => ({ ...entry, isDefault: false }))]
      return [next, ...prev]
    })
    return id
  }

  const editAddress = (id, updatedAddress) => {
    setAddresses((prev) => {
      const isDefault = !!updatedAddress.isDefault
      return prev.map((entry) => {
        if (isDefault && entry.id !== id) return { ...entry, isDefault: false }
        return entry.id === id ? { ...entry, ...updatedAddress } : entry
      })
    })
  }

  const deleteAddress = (id) => {
    setAddresses((prev) => {
      const next = prev.filter((entry) => entry.id !== id)
      if (!next.some((entry) => entry.isDefault) && next[0]) next[0].isDefault = true
      return [...next]
    })
  }

  const setDefaultAddress = (id) => {
    setAddresses((prev) => prev.map((entry) => ({ ...entry, isDefault: entry.id === id })))
  }

  const applyCoupon = (code) => {
    const normalized = (code || '').toUpperCase().trim()
    const coupon = coupons.find((entry) => entry.code === normalized)
    if (!coupon) return { ok: false, message: 'Invalid coupon code' }
    if (pricing.subtotal < coupon.minOrder) return { ok: false, message: `Minimum order ${coupon.minOrder} required` }
    setAppliedCoupon(normalized)
    return { ok: true, message: `${coupon.code} applied` }
  }

  const removeCoupon = () => setAppliedCoupon(null)

  const mockLogin = ({ name, email }) => {
    setUser({ loggedIn: true, name: name || 'SHOPNOVA User', email: email || '' })
    addNotification('Login successful', 'Welcome back to SHOPNOVA.')
  }

  const mockSignup = ({ name, email }) => {
    setUser({ loggedIn: true, name: name || 'New User', email: email || '' })
    addNotification('Account created', 'Your SHOPNOVA account is ready.')
  }

  const logout = () => setUser(defaults.user)

  const placeOrder = ({ address, paymentMethod, deliveryOption = 'standard' }) => {
    if (!cart.length) return null
    const now = new Date()
    const dateCode = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`
    const seq = String(orders.length + 1).padStart(4, '0')
    const id = `SN${dateCode}${seq}`

    const timeline = [
      { key: 'placed', label: 'Order Placed', done: true, timestamp: now.toISOString() },
      { key: 'packed', label: 'Packed', done: false },
      { key: 'shipped', label: 'Shipped', done: false },
      { key: 'out', label: 'Out for Delivery', done: false },
      { key: 'delivered', label: 'Delivered', done: false }
    ]

    const order = {
      id,
      date: now.toISOString(),
      items: cart,
      pricing,
      address,
      paymentMethod,
      deliveryOption,
      status: 'Order Placed',
      etaDays: deliveryOption === 'express' ? 2 : deliveryOption === 'free' ? 7 : 5,
      timeline
    }

    setOrders((prev) => [order, ...prev])
    setCart([])
    setAppliedCoupon(null)
    addNotification('Order confirmed', `Order ${id} placed successfully.`)
    return order
  }

  const value = {
    user,
    cart,
    wishlist,
    orders,
    addresses,
    recentlyViewed,
    notifications,
    appliedCoupon,
    cartOpen,
    pricing,
    addToCart,
    updateCartQty,
    removeFromCart,
    clearCart,
    toggleWishlist,
    addRecentlyViewed,
    addAddress,
    editAddress,
    deleteAddress,
    setDefaultAddress,
    applyCoupon,
    removeCoupon,
    placeOrder,
    mockLogin,
    mockSignup,
    logout,
    addNotification,
    markNotificationRead,
    markAllNotificationsRead,
    setCartOpen,
    cartCount: cart.reduce((sum, item) => sum + item.qty, 0),
    wishlistCount: wishlist.length,
    unreadNotifications: notifications.filter((note) => !note.read).length
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export const useStore = () => useContext(StoreContext)
