import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ContactContext } from '../context/ContactContext'

export default function EditContact() {
  const { contacts, updateContact } = useContext(ContactContext)
  const navigate = useNavigate()
  const { id } = useParams()

  const contact = contacts.find(c => c.id === id)

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    notes: '',
    followUpDate: '',
    tags: '',
  })

  useEffect(() => {
    if (contact) {
      setForm({
        name: contact.name || '',
        phone: contact.phone || '',
        email: contact.email || '',
        company: contact.company || '',
        notes: contact.notes || '',
        followUpDate: contact.followUpDate || '',
        tags: contact.tags ? contact.tags.join(', ') : '',
      })
    } else {
      navigate('/contacts')
    }
  }, [contact])

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (!form.name.trim()) return alert('Name is required')
    const updated = {
      ...form,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
    }
    updateContact(id, updated)
    navigate('/contacts')
  }

  return (
    <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Edit Contact</h2>
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
            Save Changes
          </button>
        </div>
      </form>
    </div>
  )
}
