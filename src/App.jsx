import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Router from './router'
import { AuthProvider } from './context/AuthContext'
import { ContactProvider } from './context/ContactContext'
import Navbar from './components/Navbar'
import ThemeToggle from './components/ThemeToggle'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ContactProvider>
          <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500">
            <Navbar />
            <ThemeToggle />
            <main className="flex-grow container mx-auto p-4">
              <Router />
            </main>
          </div>
        </ContactProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
