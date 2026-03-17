// App.jsx (or main component)
import { useState } from 'react';
import { Menu, X } from 'lucide-react'; // or use react-icons: import { FaBars, FaTimes } from 'react-icons/fa';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b z-50 transition-all">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="text-2xl font-bold text-indigo-700">
            GHU
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10 text-sm font-medium">
            <a href="#" className="hover:text-indigo-600 transition">Academics</a>
            <a href="#" className="hover:text-indigo-600 transition">Admissions</a>
            <a href="#" className="hover:text-indigo-600 transition">Research</a>
            <a href="#" className="hover:text-indigo-600 transition">Student Life</a>
            <a href="#" className="hover:text-indigo-600 transition">News</a>
          </div>

          {/* Actions + Mobile Toggle */}
          <div className="flex items-center space-x-4">
            <a
              href="#"
              className="hidden md:block px-5 py-2.5 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition text-sm font-medium"
            >
              Apply Now
            </a>
            <a
              href="/portal"
              className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition text-sm"
            >
              Portal Login
            </a>

            {/* Mobile menu button */}
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
              <a href="#" className="hover:text-indigo-600 transition">Academics</a>
              <a href="#" className="hover:text-indigo-600 transition">Admissions</a>
              <a href="#" className="hover:text-indigo-600 transition">Research</a>
              <a href="#" className="hover:text-indigo-600 transition">Student Life</a>
              <a href="#" className="hover:text-indigo-600 transition">News</a>
              <a
                href="#"
                className="mt-2 px-5 py-3 bg-indigo-600 text-white rounded-full text-center hover:bg-indigo-700 transition"
              >
                Apply Now
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-indigo-50 via-white to-blue-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight mb-6">
            Shape Your Future at
            <br />
            <span className="text-indigo-600">Global Horizon University</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-10">
            Innovative programs • World-class faculty • Transformative student experience
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <a
              href="#"
              className="px-8 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition transform hover:-translate-y-1"
            >
              Explore Programs
            </a>
            <a
              href="#"
              className="px-8 py-4 bg-white text-indigo-700 border-2 border-indigo-600 text-lg font-semibold rounded-full hover:bg-indigo-50 transition transform hover:-translate-y-1"
            >
              Virtual Tour
            </a>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl md:text-5xl font-bold text-indigo-600">18k+</div>
            <p className="text-gray-600 mt-2">Students</p>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-indigo-600">120+</div>
            <p className="text-gray-600 mt-2">Programs</p>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-indigo-600">450+</div>
            <p className="text-gray-600 mt-2">Faculty</p>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-indigo-600">92%</div>
            <p className="text-gray-600 mt-2">Employment Rate</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-indigo-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl mb-10">Applications for Fall 2026 now open</p>
          <a
            href="#"
            className="inline-block px-10 py-5 bg-white text-indigo-700 font-bold text-lg rounded-full hover:bg-gray-100 transition transform hover:-translate-y-1 shadow-lg"
          >
            Start Your Application
          </a>
        </div>
      </section>

      {/* Footer placeholder */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center md:text-left">
          <p>© {new Date().getFullYear()} Global Horizon University. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;