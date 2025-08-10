import React from 'react'
import { Link } from 'react-router-dom'
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import { format, isPast, isToday, parseISO } from 'date-fns'

export default function ContactCard({ contact, selected, toggleSelect, deleteContact }) {
  const { id, name, company, phone, email, followUpDate, tags } = contact

  let reminderColor = 'text-gray-500'
  if (followUpDate) {
    const date = parseISO(followUpDate)
    if (isPast(date) && !isToday(date)) reminderColor = 'text-red-600 font-bold'
    else if (isToday(date)) reminderColor = 'text-yellow-600 font-semibold'
    else reminderColor = 'text-green-600'
  }

  return (
    <tr className="border-b border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
      <td className="p-2 border border-gray-300 dark:border-gray-700 text-center">
        <input type="checkbox" checked={selected} onChange={toggleSelect} />
      </td>
      <td className="p-2 border border-gray-300 dark:border-gray-700">{name}</td>
      <td className="p-2 border border-gray-300 dark:border-gray-700">{company || '-'}</td>
      <td className="p-2 border border-gray-300 dark:border-gray-700">{phone || '-'}</td>
      <td className="p-2 border border-gray-300 dark:border-gray-700">{email || '-'}</td>
      <td className={`p-2 border border-gray-300 dark:border-gray-700 ${reminderColor}`}>
        {followUpDate ? format(parseISO(followUpDate), 'yyyy-MM-dd') : '-'}
      </td>
      <td className="p-2 border border-gray-300 dark:border-gray-700">
        {tags && tags.length > 0 ? tags.join(', ') : '-'}
      </td>
      <td className="p-2 border border-gray-300 dark:border-gray-700 space-x-2 text-center">
        <Link
          to={`/contacts/edit/${id}`}
          className="text-indigo-600 hover:text-indigo-800"
          title="Edit Contact"
        >
          <FiEdit />
        </Link>
        <button
          onClick={() => {
            if (window.confirm(`Delete contact "${name}"?`)) deleteContact()
          }}
          className="text-red-600 hover:text-red-800"
          title="Delete Contact"
        >
          <FiTrash2 />
        </button>
      </td>
    </tr>
  )
}
