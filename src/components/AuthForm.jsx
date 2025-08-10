import React from 'react'

export default function AuthForm({ form, setForm, onSubmit, error, isRegister }) {
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
        {isRegister ? 'Register' : 'Login'}
      </h2>

      {error && <div className="text-red-600 font-semibold">{error}</div>}

      {isRegister && (
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 border rounded border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
          required
        />
      )}

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full p-3 border rounded border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="w-full p-3 border rounded border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
        required
      />

      {isRegister && (
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full p-3 border rounded border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
          required
        />
      )}

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white p-3 rounded hover:bg-indigo-700 transition"
      >
        {isRegister ? 'Register' : 'Login'}
      </button>
    </form>
  )
}
