import { useState } from 'react'
import { useUser } from '../context/UserContext'
import { PORTFOLIO_BRANDS, CATEGORIES, getBrandsByCategory } from '../data/portfolioBrands'

/* ── Two-tier brand selector ────────────────────────────────────────── */
export default function BrandSelector() {
  const { selectedBrand, setSelectedBrand } = useUser()
  const [view, setView] = useState('tag')  // tag | categories | brands
  const [activeCategory, setActiveCategory] = useState(null)

  const selectBrand = (name) => {
    setSelectedBrand(name)
    setView('tag')
    setActiveCategory(null)
  }

  const clear = () => {
    setSelectedBrand('Bayab Gin')
    setView('categories')
    setActiveCategory(null)
  }

  // Tag state
  if (view === 'tag') {
    return (
      <div className="brand-selector">
        <div className="brand-selector__tag">
          <span className="brand-selector__tag-label">Brand:</span>
          <span className="brand-selector__tag-name">{selectedBrand}</span>
          <button className="brand-selector__change" onClick={() => setView('categories')}>
            Change
          </button>
          {selectedBrand !== 'Bayab Gin' && (
            <button className="brand-selector__clear" onClick={clear} title="Reset to default">
              ✕
            </button>
          )}
        </div>
        {!PORTFOLIO_BRANDS.find(b => b.name === selectedBrand)?.verified && (
          <div className="brand-selector__thin-data">
            Limited public data available for this brand — output is directional.
          </div>
        )}
      </div>
    )
  }

  // Category selection
  if (view === 'categories') {
    return (
      <div className="brand-selector brand-selector--open">
        <div className="brand-selector__header">
          <span className="brand-selector__header-label">Select a category</span>
          <button className="brand-selector__close" onClick={() => setView('tag')}>✕</button>
        </div>
        <div className="brand-selector__categories">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className="brand-selector__category"
              onClick={() => { setActiveCategory(cat); setView('brands') }}
            >
              {cat}
              <span className="brand-selector__count">
                {getBrandsByCategory(cat).length}
              </span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  // Brand selection within category
  const brands = getBrandsByCategory(activeCategory)
  return (
    <div className="brand-selector brand-selector--open">
      <div className="brand-selector__header">
        <button className="brand-selector__back" onClick={() => setView('categories')}>
          ← {activeCategory}
        </button>
        <button className="brand-selector__close" onClick={() => setView('tag')}>✕</button>
      </div>
      <div className="brand-selector__brands">
        {brands.map(brand => (
          <button
            key={brand.name}
            className={`brand-selector__brand${brand.name === selectedBrand ? ' brand-selector__brand--active' : ''}`}
            onClick={() => selectBrand(brand.name)}
          >
            {brand.name}
            {brand.notes && <span className="brand-selector__brand-note"> · {brand.notes}</span>}
          </button>
        ))}
        <div className="brand-selector__more-note">
          Additional portfolio brands available in connected deployment.
        </div>
      </div>
    </div>
  )
}
