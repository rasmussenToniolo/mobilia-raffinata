import { useState } from "react"

interface TopBarProps {
  layout: string;
  setLayout: (layout: "row" | "grid") => void;
  handleSearch: (query: string) => void;
  query: string;
  productsFound: number;
}

export function TopBar(props: TopBarProps) {

  return (
    <div className="top-bar">
      <div className="top-bar__search">
        <input value={props.query} onChange={(e: any) => {props.handleSearch(e.target.value)}} id="search" type="text" className="top-bar__search--input" placeholder="Search..." />
        <label htmlFor="search" className="top-bar__search--label">
          {props.productsFound === 0 ? 'No products found' : props.productsFound === 1 ? '1 product found' : `${props.productsFound} products found`}
        </label>
      </div>

      <select name="sort" id="sort" className="top-bar__sort-selector">
        <option value="price-desc" className="top-bar__sort-selector--option">Price &darr;</option>
        <option value="price-asc" className="top-bar__sort-selector--option">Price &uarr;</option>

        <option value="rating-desc" className="top-bar__sort-selector--option">Rating &darr;</option>
        <option value="rating-asc" className="top-bar__sort-selector--option">Rating &uarr;</option>
      </select>

      <div className="top-bar__layout">
        <button onClick={() => props.setLayout('row')} className={`top-bar__layout--row layout-btn ${props.layout == 'row' ? 'selected' : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
          </svg>
        </button>
        <button onClick={() => props.setLayout('grid')} className={`top-bar__layout--grid layout-btn ${props.layout == 'grid' ? 'selected' : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-grid-3x3-gap-fill" viewBox="0 0 16 16">
            <path d="M1 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2zM1 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V7zM1 12a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2z"/>
          </svg>
        </button>
      </div>
    </div>
  )
}
