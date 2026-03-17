import React from 'react';

export default function Academics() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-indigo-700">Academics</h1>
      <p className="text-lg mb-4">
        Explore our wide range of undergraduate, graduate, and doctoral programs across multiple faculties.
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Faculty of Engineering & Technology</li>
        <li>Faculty of Business & Economics</li>
        <li>Faculty of Humanities & Social Sciences</li>
        <li>Faculty of Health Sciences</li>
      </ul>
    </div>
  );
}