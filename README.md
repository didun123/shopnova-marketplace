# SHOPNOVA Marketplace Frontend

Production-style multi-category e-commerce frontend built with **React + Vite + Tailwind + React Router + Context + localStorage persistence**.

## Run locally

```bash
npm install
npm run dev
```

For production build:

```bash
npm run build
npm run preview
```

## Core features

- Marketplace homepage with hero carousel, quick categories, deals, trending, brands, recommendations, and recently viewed products.
- Full product data layer with 64 realistic products across 16 categories.
- Search with live suggestions, recent and popular search chips.
- Product listing routes (`/shop`, `/category/:category`, `/search`) with filter + sort workflows.
- Product details with image gallery, variant selectors, pincode delivery check, offer toggles, tabs, and similar products.
- Persistent global state for cart, wishlist, user session, addresses, orders, notifications, recently viewed, and coupons.
- Cart drawer + cart page with quantity controls, remove, move-to-wishlist, coupon validation, and complete price summary.
- Checkout journey in 4 steps: Address, Delivery, Payment, Review.
- Order placement with generated order ID, success page, order history, order detail, and tracking timeline.
- Account area with address management, coupons page, notifications, login/signup mock, and auxiliary static pages.
- Responsive UI, reusable components, empty states, and skeleton loading fallback.

## Routes

`/`, `/shop`, `/category/:category`, `/search`, `/product/:id`, `/cart`, `/wishlist`, `/checkout`, `/order-success`, `/orders`, `/orders/:id`, `/track-order/:id`, `/account`, `/account/addresses`, `/account/coupons`, `/notifications`, `/login`, `/signup`, `/about`, `/contact`, `/faq`, `*`
