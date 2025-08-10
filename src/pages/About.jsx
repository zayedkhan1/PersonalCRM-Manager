import React from 'react'

export default function About() {
  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow">
      <h1 className="text-3xl font-bold mb-4">About Personal CRM</h1>
      <p className="mb-2">
        This Personal CRM app helps you manage your contacts offline with features like:
      </p>
      <ul className="list-disc list-inside space-y-1 mb-4">
        <li>Secure local authentication</li>
        <li>Contact management with tags and follow-up reminders</li>
        <li>Search, filtering, sorting, and pagination</li>
        <li>Activity timeline and bulk actions</li>
        <li>Analytics dashboard with charts</li>
        <li>Responsive, modern UI with dark mode support</li>
      </ul>
      <p>
        Built with React, TailwindCSS, React Router, Framer Motion, and IndexedDB/LocalStorage.
      </p>
      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        © 2025 Personal CRM. All rights reserved.
      </p>
    </div>
  )
}
