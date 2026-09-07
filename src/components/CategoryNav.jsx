import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { categories, electronicsTaxonomy, fashionTaxonomy } from '../data/categories'
import { slugify } from '../utils/helpers'

export default function CategoryNav() {
  const [open, setOpen] = useState(false)
  const main = useMemo(() => categories.slice(0, 9), [])

  return (
    <nav className="border-b border-line bg-white" aria-label="Categories">
      <div className="container-x relative flex items-center gap-3 overflow-x-auto py-2 text-sm">
        {main.map((category) => (
          <Link key={category.name} className="chip whitespace-nowrap" to={`/category/${slugify(category.name)}`}>{category.icon} {category.name}</Link>
        ))}
        <button className="chip ml-auto" onClick={() => setOpen((prev) => !prev)} aria-label="More categories">More</button>
      </div>
      {open && (
        <div className="border-t border-line bg-white">
          <div className="container-x grid gap-6 py-4 md:grid-cols-3">
            <div>
              <h3 className="font-semibold">Fashion</h3>
              {Object.entries(fashionTaxonomy).map(([title, items]) => (
                <div key={title} className="mt-2 text-sm text-muted">
                  <p className="font-medium text-text">{title}</p>
                  <p>{items.join(' • ')}</p>
                </div>
              ))}
            </div>
            <div>
              <h3 className="font-semibold">Electronics</h3>
              {Object.entries(electronicsTaxonomy).map(([title, items]) => (
                <div key={title} className="mt-2 text-sm text-muted">
                  <p className="font-medium text-text">{title}</p>
                  <p>{items.join(' • ')}</p>
                </div>
              ))}
            </div>
            <div>
              <h3 className="font-semibold">More Categories</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {categories.slice(9).map((category) => (
                  <Link key={category.name} className="chip" to={`/category/${slugify(category.name)}`}>{category.name}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
