import { useEffect, useState } from 'react'

export function useTheme() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('darkMode') === 'true'
  })

  useEffect(() => {
    const className = 'dark'
    const bodyClass = window.document.body.classList
    if (darkMode) {
      bodyClass.add(className)
    } else {
      bodyClass.remove(className)
    }
    localStorage.setItem('darkMode', darkMode)
  }, [darkMode])

  const toggleDarkMode = () => setDarkMode(prev => !prev)

  return { darkMode, toggleDarkMode }
}
