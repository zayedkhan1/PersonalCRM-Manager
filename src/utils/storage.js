export const saveJSON = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (err) {
    console.error('Error saving to localStorage', err)
  }
}

export const loadJSON = key => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  } catch (err) {
    console.error('Error loading from localStorage', err)
    return null
  }
}

export const removeItem = key => {
  try {
    localStorage.removeItem(key)
  } catch (err) {
    console.error('Error removing localStorage item', err)
  }
}
