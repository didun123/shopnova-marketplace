import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const slides = [
  { title: 'Mega Fashion Week', subtitle: 'Up to 70% off on top styles', cta: 'Shop Fashion', to: '/category/fashion', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1400' },
  { title: 'Upgrade Your Gadgets', subtitle: 'Smart tech deals under ₹1999', cta: 'Shop Electronics', to: '/category/electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1400' },
  { title: 'Home Essentials', subtitle: 'Modern living, better pricing', cta: 'Shop Home', to: '/category/home', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1400' }
]

export default function HeroCarousel() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % slides.length), 4000)
    return () => clearInterval(timer)
  }, [])

  const slide = slides[index]

  return (
    <section className="card relative overflow-hidden">
      <img src={slide.image} alt={slide.title} className="h-56 w-full object-cover md:h-96" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/65 to-black/15" />
      <div className="absolute left-6 top-1/2 max-w-lg -translate-y-1/2 text-white">
        <h1 className="text-2xl font-bold md:text-4xl">{slide.title}</h1>
        <p className="mt-2 text-sm text-slate-100 md:text-base">{slide.subtitle}</p>
        <Link to={slide.to} className="btn btn-primary mt-4 inline-flex">{slide.cta}</Link>
      </div>
      <button aria-label="Previous slide" className="icon-btn absolute left-2 top-1/2 -translate-y-1/2" onClick={() => setIndex((prev) => (prev - 1 + slides.length) % slides.length)}><ChevronLeft size={18} /></button>
      <button aria-label="Next slide" className="icon-btn absolute right-2 top-1/2 -translate-y-1/2" onClick={() => setIndex((prev) => (prev + 1) % slides.length)}><ChevronRight size={18} /></button>
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, idx) => <button key={idx} className={`h-2 w-2 rounded-full ${idx === index ? 'bg-white' : 'bg-white/50'}`} aria-label={`Slide ${idx + 1}`} onClick={() => setIndex(idx)} />)}
      </div>
    </section>
  )
}
