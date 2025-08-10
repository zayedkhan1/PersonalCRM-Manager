export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(String(email).toLowerCase())
}

export function validatePassword(password) {
  return password.length >= 6
}

export function validateName(name) {
  return name.trim().length > 0
}
