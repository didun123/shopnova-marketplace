import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import CategoryNav from './components/CategoryNav'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import WishlistPage from './pages/WishlistPage'
import CheckoutPage from './pages/CheckoutPage'
import OrderSuccessPage from './pages/OrderSuccessPage'
import OrdersPage from './pages/OrdersPage'
import AccountPage from './pages/AccountPage'
import NotificationsPage from './pages/NotificationsPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import StaticPage from './pages/StaticPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CategoryNav />
      <main className="flex-1">
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
          <Route path="/account" element={<AccountPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/about" element={<StaticPage title="About ShopNova" description="ShopNova is a modern multi-category marketplace frontend demo." />} />
          <Route path="/contact" element={<StaticPage title="Contact Us" description="For support, email support@shopnova.demo" />} />
          <Route path="/faq" element={<StaticPage title="FAQ" description="Frequently asked questions about orders, returns and payments." />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
