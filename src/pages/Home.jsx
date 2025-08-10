import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow space-y-6">
      <h1 className="text-4xl font-bold">Welcome to Personal CRM</h1>
      <p className="text-lg">
        Manage your contacts, track follow-ups, and keep your business relationships organized — all offline and secure.
      </p>
      <div className="space-x-4">
        <Link
          to="/contacts"
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          View Contacts
        </Link>
        <Link
          to="/contacts/add"
          className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-100 transition"
        >
          Add Contact
        </Link>
      </div>
    </div>
  )
}
