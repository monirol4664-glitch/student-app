import { Routes, Route, Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

import Home from './pages/Home.jsx'
import Academics from './pages/Academics.jsx'
import Admissions from './pages/Admissions.jsx'
import NotFound from './pages/NotFound.jsx'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
      {/* Navbar – visible on all pages */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-indigo-700">
            GHU
          </Link>

          <div className="hidden md:flex items-center space-x-10 text-sm font-medium">
            <NavLink
              to="/academics"
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-600 font-semibold"
                  : "hover:text-indigo-600 transition"
              }
            >
              Academics
            </NavLink>
            <NavLink
              to="/admissions"
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-600 font-semibold"
                  : "hover:text-indigo-600 transition"
              }
            >
              Admissions
            </NavLink>
            <NavLink
              to="/research"
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-600 font-semibold"
                  : "hover:text-indigo-600 transition"
              }
            >
              Research
            </NavLink>
            {/* You can add more links here later */}
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/apply"
              className="hidden md:block px-5 py-2.5 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition text-sm font-medium"
            >
              Apply Now
            </Link>
            <Link
              to="/portal"
              className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition text-sm"
            >
              Portal Login
            </Link>

            <button
              className="md:hidden text-2xl text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-6 py-5 flex flex-col space-y-4 text-base">
              <NavLink to="/academics" onClick={() => setIsMenuOpen(false)}>
                Academics
              </NavLink>
              <NavLink to="/admissions" onClick={() => setIsMenuOpen(false)}>
                Admissions
              </NavLink>
              <NavLink to="/research" onClick={() => setIsMenuOpen(false)}>
                Research
              </NavLink>
              <Link
                to="/apply"
                className="mt-2 px-5 py-3 bg-indigo-600 text-white rounded-full text-center hover:bg-indigo-700 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Apply Now
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Page content changes here */}
      <main className="pt-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/admissions" element={<Admissions />} />
          {/* 404 catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Footer – visible on all pages */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center md:text-left">
          <p>© {new Date().getFullYear()} Global Horizon University. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App