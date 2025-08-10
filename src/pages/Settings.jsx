import React, { useContext } from 'react'
// import { ThemeContext } from '../context/ThemeContext'
// import { ThemeContext } from '../context/ThemeContext'
export default function Settings() {
  const { darkMode, toggleDarkMode } = useContext( )
  

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>

      <div className="flex items-center space-x-4">
        <label htmlFor="dark-mode-toggle" className="font-semibold">
          Dark Mode
        </label>
        <input
          id="dark-mode-toggle"
          type="checkbox"
          checked={darkMode}
          onChange={toggleDarkMode}
          className="w-5 h-5"
        />
      </div>

      {/* Future settings like notifications, backups, import/export, etc. */}
    </div>
  )
}
