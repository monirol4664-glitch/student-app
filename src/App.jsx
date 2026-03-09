import React, { useState, useEffect } from 'react'

export default function App() {
  const [faculty, setFaculty] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/api/faculty')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch')
        return res.json()
      })
      .then(data => {
        setFaculty(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (error) {
    return <div className="error">Error: {error}</div>
  }

  return (
    <div>
      <header>
        <h1>🏛️ State University</h1>
        <nav>
          <a href="/">Home</a>
          <a href="/faculty">Faculty</a>
          <a href="/courses">Courses</a>
          <a href="/news">News</a>
          <a href="/search">Search</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <h2>Welcome to State University</h2>
          <p>Excellence in Education Since 1950</p>
        </section>

        <section className="faculty-preview">
          <h3>Our Faculty</h3>
          {loading ? (
            <div className="loading-spinner">Loading...</div>
          ) : (
            <div className="faculty-grid">
              {faculty.slice(0, 3).map(prof => (
                <div key={prof.id} className="faculty-card">
                  <h4>{prof.name}</h4>
                  <p>{prof.title}</p>
                  <p>{prof.department}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}