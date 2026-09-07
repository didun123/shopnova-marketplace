import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import CategoryNav from './components/CategoryNav'
import Footer from './components/Footer'
import Header from './components/Header'
import Skeleton from './components/Skeleton'

const HomePage = lazy(() => import('./pages/HomePage'))
const ShopPage = lazy(() => import('./pages/ShopPage'))
const ProductPage = lazy(() => import('./pages/ProductPage'))
const CartPage = lazy(() => import('./pages/CartPage'))
const WishlistPage = lazy(() => import('./pages/WishlistPage'))
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'))
const OrderSuccessPage = lazy(() => import('./pages/OrderSuccessPage'))
const OrdersPage = lazy(() => import('./pages/OrdersPage'))
const OrderDetailPage = lazy(() => import('./pages/OrderDetailPage'))
const TrackOrderPage = lazy(() => import('./pages/TrackOrderPage'))
const AccountPage = lazy(() => import('./pages/AccountPage'))
const AddressesPage = lazy(() => import('./pages/AddressesPage'))
const CouponsPage = lazy(() => import('./pages/CouponsPage'))
const NotificationsPage = lazy(() => import('./pages/NotificationsPage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const SignupPage = lazy(() => import('./pages/SignupPage'))
const StaticPage = lazy(() => import('./pages/StaticPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

const fallback = <div className="container-x py-8"><Skeleton className="h-72" /></div>

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <Header />
      <CategoryNav />
      <main>
        <Suspense fallback={fallback}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/category/:category" element={<ShopPage />} />
            <Route path="/search" element={<ShopPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-success" element={<OrderSuccessPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/orders/:id" element={<OrderDetailPage />} />
            <Route path="/track-order/:id" element={<TrackOrderPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/account/addresses" element={<AddressesPage />} />
            <Route path="/account/coupons" element={<CouponsPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/about" element={<StaticPage title="About SHOPNOVA" description="SHOPNOVA is a modern marketplace frontend focused on practical shopping journeys and responsive design." />} />
            <Route path="/contact" element={<StaticPage title="Contact" description="Reach our support at support@shopnova.demo for order, delivery and account assistance." />} />
            <Route path="/faq" element={<StaticPage title="Frequently Asked Questions" description="Find answers on payments, delivery, returns, and account management." />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
