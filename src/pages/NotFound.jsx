import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-indigo-600">404</h1>
        <p className="text-2xl mt-4 mb-8">Page Not Found</p>
        <Link 
          to="/" 
          className="px-8 py-4 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}