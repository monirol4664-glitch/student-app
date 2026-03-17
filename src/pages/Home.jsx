import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
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
    </>
  )
}