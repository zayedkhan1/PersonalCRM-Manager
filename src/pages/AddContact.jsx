import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ContactContext } from '../context/ContactContext'

export default function AddContact() {
  const { addContact } = useContext(ContactContext)
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    notes: '',
    followUpDate: '',
    tags: '',
  })

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (!form.name.trim()) return alert('Name is required')
    const contact = {
      ...form,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
    }
    addContact(contact)
    navigate('/contacts')
  }

  return (
    <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add New Contact</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Name *"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
          required
        />
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
        />
        <input
          name="company"
          placeholder="Company"
          value={form.company}
          onChange={handleChange}
          className="w-full p-2 border rounded border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
        />
        <textarea
          name="notes"
          placeholder="Notes"
          value={form.notes}
          onChange={handleChange}
          className="w-full p-2 border rounded border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
          rows={4}
        />
        <input
          type="date"
          name="followUpDate"
          value={form.followUpDate}
          onChange={handleChange}
          className="w-full p-2 border rounded border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
        />
        <input
          name="tags"
          placeholder="Tags (comma separated)"
          value={form.tags}
          onChange={handleChange}
          className="w-full p-2 border rounded border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
        />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => navigate('/contacts')}
            className="px-4 py-2 border rounded border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          >
            Add Contact
          </button>
        </div>
      </form>
    </div>
  )
}
