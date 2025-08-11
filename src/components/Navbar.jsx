import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { FiLogOut, FiUsers, FiHome, FiSettings } from 'react-icons/fi'


export default function Navbar() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }
//need to desgint my login and register navicons
  return (
    <nav className="bg-gray-100 dark:bg-gray-800 p-4 flex justify-between items-center shadow-md">
      <Link to="/dashboard" className="font-bold text-xl text-indigo-600 dark:text-indigo-400"> CRM</Link>
      {user ? (
        <div className="flex items-center space-x-4">
          <Link to="/dashboard" className="hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1">
            <FiHome /> Dashboard
          </Link>
          <Link to="/contacts" className="hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1">
            <FiUsers /> Contacts
          </Link>
          <Link to="/deals" className="hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1">
            <FiUsers /> Deals
          </Link>
          <Link to="/tasks" className="hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1">
            <FiUsers /> Tasks
          </Link>
          {/* <Link to="/settings" className="hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1">
            <FiSettings /> Settings
          </Link> */}
          <button
            onClick={handleLogout}
            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-600 flex items-center gap-1"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      ) : (
        <div>
          <Link to="/login" className="mr-4 hover:text-indigo-600 dark:hover:text-indigo-400">Login</Link>
          <Link to="/register" className="hover:text-indigo-600 dark:hover:text-indigo-400">Register</Link>
        </div>
      )}
    </nav>
  )
}
