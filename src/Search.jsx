import React, { useState } from 'react'

export default function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [searching, setSearching] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!query.trim()) return
    
    setSearching(true)
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
      const data = await res.json()
      setResults(data)
    } catch (error) {
      console.error('Search failed:', error)
    } finally {
      setSearching(false)
    }
  }

  return (
    <div className="search-page">
      <h1>Search University</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search faculty, courses, news..."
        />
        <button type="submit" disabled={searching}>
          {searching ? 'Searching...' : 'Search'}
        </button>
      </form>
      
      <div className="search-results">
        {results.map((item, index) => (
          <div key={index} className={`result-card ${item.type}`}>
            <span className="result-type">{item.type}</span>
            <h3>{item.title}</h3>
            <p className="result-category">{item.category}</p>
          </div>
        ))}
      </div>
    </div>
  )
}