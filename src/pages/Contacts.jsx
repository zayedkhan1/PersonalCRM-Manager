
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { ContactContext } from '../context/ContactContext'
import ContactCard from '../components/ContactCard'
import { FiPlus, FiTrash2, FiTag, FiSearch, FiFilter, FiChevronDown, FiChevronUp, FiEdit2, FiPhone, FiMail } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

export default function Contacts() {
  const { contacts, deleteContact, bulkDelete, bulkUpdateTags } = useContext(ContactContext)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedContacts, setSelectedContacts] = useState([])
  const [filterTag, setFilterTag] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortKey, setSortKey] = useState('name')
  const [sortAsc, setSortAsc] = useState(true)
  const [expandedFilters, setExpandedFilters] = useState(false)

  const ITEMS_PER_PAGE = 10

  // Filter, search, and sort contacts
  const filteredContacts = contacts
    .filter(c => {
      if (filterTag && (!c.tags || !c.tags.includes(filterTag))) return false
      if (!searchTerm) return true
      const term = searchTerm.toLowerCase()
      return (
        c.name.toLowerCase().includes(term) ||
        (c.company && c.company.toLowerCase().includes(term)) ||
        (c.tags && c.tags.some(t => t.toLowerCase().includes(term)))
      )
    })
    .sort((a, b) => {
      let aVal = a[sortKey] || ''
      let bVal = b[sortKey] || ''
      if (sortKey === 'followUpDate' || sortKey === 'createdAt') {
        aVal = new Date(aVal)
        bVal = new Date(bVal)
      } else {
        aVal = aVal.toString().toLowerCase()
        bVal = bVal.toString().toLowerCase()
      }
      if (aVal < bVal) return sortAsc ? -1 : 1
      if (aVal > bVal) return sortAsc ? 1 : -1
      return 0
    })

  const pageCount = Math.ceil(filteredContacts.length / ITEMS_PER_PAGE)
  const pagedContacts = filteredContacts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  // Toggle contact selection for bulk actions
  const toggleSelect = id => {
    setSelectedContacts(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  // Select all on current page
  const selectAllCurrentPage = () => {
    const idsOnPage = pagedContacts.map(c => c.id)
    const allSelected = idsOnPage.every(id => selectedContacts.includes(id))
    if (allSelected) {
      setSelectedContacts(prev => prev.filter(id => !idsOnPage.includes(id)))
    } else {
      setSelectedContacts(prev => [...new Set([...prev, ...idsOnPage])])
    }
  }

  // Bulk delete handler
  const handleBulkDelete = () => {
    if (selectedContacts.length === 0) return
    if (window.confirm(`Delete ${selectedContacts.length} contacts?`)) {
      bulkDelete(selectedContacts)
      setSelectedContacts([])
    }
  }

  // Bulk add tag
  const [bulkTagInput, setBulkTagInput] = useState('')
  const handleBulkAddTag = () => {
    if (!bulkTagInput.trim()) return
    if (selectedContacts.length === 0) return
    bulkUpdateTags(selectedContacts, [bulkTagInput.trim()])
    setBulkTagInput('')
  }

  // Get all unique tags from contacts
  const allTags = [...new Set(contacts.flatMap(c => c.tags || []))]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Contacts</h1>
            <p className="text-gray-500 dark:text-gray-400">
              {filteredContacts.length} {filteredContacts.length === 1 ? 'contact' : 'contacts'} found
            </p>
          </div>
          <Link
            to="/contacts/add"
            className="mt-4 md:mt-0 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-sm transition-all duration-200"
          >
            <FiPlus className="w-5 h-5" />
            <span>Add Contact</span>
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-6 border border-gray-100 dark:border-gray-700">
          <div className="flex flex-col">
            <div className="flex items-center relative">
              <FiSearch className="absolute left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, company, or tag..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <button
                onClick={() => setExpandedFilters(!expandedFilters)}
                className="ml-2 flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
              >
                <FiFilter className="w-4 h-4" />
                {expandedFilters ? <FiChevronUp /> : <FiChevronDown />}
              </button>
            </div>

            <AnimatePresence>
              {expandedFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Filter by Tag</label>
                      <select
                        className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        value={filterTag}
                        onChange={e => setFilterTag(e.target.value)}
                      >
                        <option value="">All Tags</option>
                        {allTags.map(tag => (
                          <option key={tag} value={tag}>{tag}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sort By</label>
                      <div className="flex gap-2">
                        <select
                          className="flex-grow p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                          value={sortKey}
                          onChange={e => setSortKey(e.target.value)}
                        >
                          <option value="name">Name</option>
                          <option value="company">Company</option>
                          <option value="followUpDate">Follow-up Date</option>
                          <option value="createdAt">Created Date</option>
                        </select>
                        <button
                          onClick={() => setSortAsc(!sortAsc)}
                          className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition"
                          title={`Sort ${sortAsc ? 'Descending' : 'Ascending'}`}
                        >
                          {sortAsc ? <FiChevronUp /> : <FiChevronDown />}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bulk Actions */}
        <AnimatePresence>
          {selectedContacts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-indigo-50 dark:bg-indigo-900/30 rounded-xl p-4 mb-6 flex flex-wrap items-center gap-4"
            >
              <div className="text-indigo-700 dark:text-indigo-300 font-medium">
                {selectedContacts.length} selected
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={handleBulkDelete}
                  className="flex items-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                >
                  <FiTrash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Add tag..."
                    value={bulkTagInput}
                    onChange={e => setBulkTagInput(e.target.value)}
                    className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                  />
                  <button
                    onClick={handleBulkAddTag}
                    className="flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
                  >
                    <FiTag className="w-4 h-4" />
                    <span>Add Tag</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contacts List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={
                        pagedContacts.length > 0 &&
                        pagedContacts.every(c => selectedContacts.includes(c.id))
                      }
                      onChange={selectAllCurrentPage}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 rounded"
                    />
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Company
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Contact Info
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Follow-up
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Tags
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {pagedContacts.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                      No contacts found. Try adjusting your search or filters.
                    </td>
                  </tr>
                ) : (
                  pagedContacts.map(contact => (
                    <motion.tr
                      key={contact.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 ${selectedContacts.includes(contact.id) ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedContacts.includes(contact.id)}
                          onChange={() => toggleSelect(contact.id)}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 rounded"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-300">
                            {contact.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {contact.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">{contact.company || '-'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col gap-1">
                          {contact.phone && (
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <FiPhone className="mr-1 w-3 h-3" />
                              {contact.phone}
                            </div>
                          )}
                          {contact.email && (
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <FiMail className="mr-1 w-3 h-3" />
                              {contact.email}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {contact.followUpDate ? new Date(contact.followUpDate).toLocaleDateString() : '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {contact.tags && contact.tags.length > 0 ? (
                            contact.tags.map(tag => (
                              <span key={tag} className="px-2 py-1 text-xs rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200">
                                {tag}
                              </span>
                            ))
                          ) : (
                            <span className="text-xs text-gray-500 dark:text-gray-400">-</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <Link
                            to={`/contacts/edit/${contact.id}`}
                            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 transition"
                            title="Edit"
                          >
                            <FiEdit2 className="w-5 h-5" />
                          </Link>
                          <button
                            onClick={() => deleteContact(contact.id)}
                            className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 transition"
                            title="Delete"
                          >
                            <FiTrash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pageCount > 1 && (
            <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6">
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Showing <span className="font-medium">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to{' '}
                    <span className="font-medium">{Math.min(currentPage * ITEMS_PER_PAGE, filteredContacts.length)}</span> of{' '}
                    <span className="font-medium">{filteredContacts.length}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="sr-only">Previous</span>
                      <FiChevronUp className="h-5 w-5" />
                    </button>
                    {[...Array(pageCount)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          currentPage === i + 1
                            ? 'z-10 bg-indigo-50 dark:bg-indigo-900/30 border-indigo-500 text-indigo-600 dark:text-indigo-300'
                            : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(Math.min(pageCount, currentPage + 1))}
                      disabled={currentPage === pageCount}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="sr-only">Next</span>
                      <FiChevronDown className="h-5 w-5" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
