import React, { createContext, useEffect, useState } from 'react'

const AUTH_STORAGE_KEY = 'offlinecrm_auth'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem(AUTH_STORAGE_KEY)
    if (storedUser) setUser(JSON.parse(storedUser))
  }, [])

  const login = ({ email, password }) => {
    const users = JSON.parse(localStorage.getItem('offlinecrm_users')) || []
    const existingUser = users.find(u => u.email === email && u.password === password)
    if (existingUser) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(existingUser))
      setUser(existingUser)
      return { success: true }
    }
    return { success: false, message: 'Invalid credentials' }
  }

  const register = ({ name, email, password }) => {
    const users = JSON.parse(localStorage.getItem('offlinecrm_users')) || []
    if (users.find(u => u.email === email)) {
      return { success: false, message: 'Email already exists' }
    }
    const newUser = { id: Date.now(), name, email, password }
    users.push(newUser)
    localStorage.setItem('offlinecrm_users', JSON.stringify(users))
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser))
    setUser(newUser)
    return { success: true }
  }

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}
