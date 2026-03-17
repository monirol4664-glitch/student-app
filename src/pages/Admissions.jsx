import React from 'react';

export default function Admissions() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-indigo-700">Admissions</h1>
      <p className="text-lg mb-4">
        Join our vibrant community. Applications for Fall 2026 are open!
      </p>
      <div className="bg-indigo-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Key Dates</h2>
        <ul className="space-y-2">
          <li><strong>Application Opens:</strong> January 15, 2026</li>
          <li><strong>Early Decision Deadline:</strong> November 1, 2025</li>
          <li><strong>Regular Decision Deadline:</strong> March 1, 2026</li>
        </ul>
      </div>
    </div>
  );
}