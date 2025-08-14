import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { FiLogOut, FiUsers, FiHome, FiSettings } from 'react-icons/fi'
import { TbLayoutDashboard } from "react-icons/tb";
import { AiOutlineLogin } from "react-icons/ai";
import { MdOutlineAppRegistration } from "react-icons/md";
export default function Navbar() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }
//need to desgint my login and register navicons
  return (
    <nav className="bg-gray-100 dark:bg-gray-800 p-4 flex justify-between items-center shadow-md">
      <Link to="/ " className=" text-xl font-montserrat font-extrabold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent dark:text-indigo-400 ml-5 "> CRM</Link>
      {user ? (
        <div className="flex items-center space-x-6">
          <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1">
            <FiHome />Home
          </Link>
          <Link to="/dashboard" className="hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1">
            <TbLayoutDashboard /> Dashboard
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
        <div className='flex items-center justify-center mr-1 md:mr-5'>
          <div className='flex items-center  text-md  hover:text-indigo-600 font-semibold'>
          <AiOutlineLogin />
          <Link to="/login" className="mr-4 dark:hover:text-indigo-400">  Login</Link>
          </div>
          <div className='flex items-center  text-md  hover:text-indigo-600 font-semibold'>
         <MdOutlineAppRegistration />
          <Link to="/register" className=" dark:hover:text-indigo-400">Register</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
