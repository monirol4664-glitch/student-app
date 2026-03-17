import { Routes, Route, Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

import Home from './pages/Home';
import Academics from './pages/Academics';
import Admissions from './pages/Admissions';
import NotFound from './pages/NotFound';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
      {/* Navbar - stays on every page */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-indigo-700">
            GHU
          </Link>

          <div className="hidden md:flex items-center space-x-10 text-sm font-medium">
            <NavLink 
              to="/academics"
              className={({ isActive }) => isActive ? "text-indigo-600 font-semibold" : "hover:text-indigo-600 transition"}
            >
              Academics
            </NavLink>
            <NavLink 
              to="/admissions"
              className={({ isActive }) => isActive ? "text-indigo-600 font-semibold" : "hover:text-indigo-600 transition"}
            >
              Admissions
            </NavLink>
            {/* Add more links later */}
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/apply" className="hidden md:block px-5 py-2.5 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition text-sm font-medium">
              Apply Now
            </Link>
            <Link to="/portal" className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition text-sm">
              Portal Login
            </Link>

            <button className="md:hidden text-2xl text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-6 py-5 flex flex-col space-y-4 text-base">
              <NavLink to="/academics" onClick={() => setIsMenuOpen(false)}>Academics</NavLink>
              <NavLink to="/admissions" onClick={() => setIsMenuOpen(false)}>Admissions</NavLink>
              <Link to="/apply" onClick={() => setIsMenuOpen(false)}>Apply Now</Link>
            </div>
          </div>
        )}
      </nav>

      {/* This is where page content changes */}
      <main className="pt-24">  {/* pt-24 = padding-top to avoid overlap with fixed navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="*" element={<NotFound />} />  {/* 404 for unknown URLs */}
        </Routes>
      </main>

      {/* Footer - stays on every page */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center md:text-left">
          <p>© {new Date().getFullYear()} Global Horizon University. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;