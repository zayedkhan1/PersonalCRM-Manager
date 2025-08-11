import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Contacts from './pages/Contacts'
import AddContact from './pages/AddContact'
import EditContact from './pages/EditContact'
import About from './pages/About'
import Settings from './pages/Settings'
import { AuthContext } from './context/AuthContext'
import Deals from './pages/Deals'
import Tasks from './pages/Tasks'

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext)
  if (!user) return <Navigate to="/login" replace />
  return children
}

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/contacts" element={
        <ProtectedRoute>
          <Contacts />
        </ProtectedRoute>
      } />
       <Route path='/deals' element={
        <ProtectedRoute>
        <Deals></Deals>
        </ProtectedRoute>
      } /> 

      <Route path='/tasks' element={
         <ProtectedRoute>
          <Tasks></Tasks>
      </ProtectedRoute>
      }
     
      ></Route>
      
      <Route path="/contacts/add" element={
        <ProtectedRoute>
          <AddContact />
        </ProtectedRoute>
      } />
      
      <Route path="/contacts/edit/:id" element={
        <ProtectedRoute>
          <EditContact />
        </ProtectedRoute>
      } />

          
      <Route path="/about" element={<About />} />
      {/* <Route path="/settings" element={
        <ProtectedRoute>
          <Settings />
        </ProtectedRoute>
      } /> */}
      
      <Route path="*" element={<p className="text-center mt-20">404 - Page Not Found</p>} />
    </Routes>
  )
}
