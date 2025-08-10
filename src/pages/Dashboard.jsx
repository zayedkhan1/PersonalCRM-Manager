

import React, { useContext } from 'react'
import { ContactContext } from '../context/ContactContext'
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'
import { FiUsers, FiTag, FiActivity, FiCalendar, FiStar, FiTrendingUp } from 'react-icons/fi'
import { FaRegClock, FaUserCheck } from 'react-icons/fa'

const COLORS = ['#6366F1', '#8B5CF6', '#EC4899', '#F97316', '#10B981']

export default function Dashboard() {
  const { contacts } = useContext(ContactContext)

  // Count contacts by tag
  const tagCounts = {}
  contacts.forEach(c => {
    if (c.tags && c.tags.length > 0) {
      c.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1
      })
    } else {
      tagCounts['Untagged'] = (tagCounts['Untagged'] || 0) + 1
    }
  })

  const pieData = Object.entries(tagCounts).map(([name, value]) => ({ name, value }))

  // Additional stats
  const recentContacts = contacts.slice(-5).reverse()
  const contactActivity = [
    { name: 'Jan', contacts: 12 },
    { name: 'Feb', contacts: 19 },
    { name: 'Mar', contacts: 15 },
    { name: 'Apr', contacts: 28 },
    { name: 'May', contacts: 32 },
    { name: 'Jun', contacts: 24 },
  ]

  // Status counts
  const statusCounts = {
    'New': contacts.filter(c => c.status === 'New').length,
    'Contacted': contacts.filter(c => c.status === 'Contacted').length,
    'Qualified': contacts.filter(c => c.status === 'Qualified').length,
    'Lost': contacts.filter(c => c.status === 'Lost').length
  }

  const statusData = Object.entries(statusCounts).map(([name, value]) => ({ name, value }))

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    }
  }

  const cardVariants = {
    hover: {
      y: -5,
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
      transition: { duration: 0.3 }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400">Welcome back! Here's what's happening with your contacts.</p>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center">
              <FiTrendingUp className="mr-2" />
              Generate Report
            </button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {/* Total Contacts */}
          <motion.div
            variants={itemVariants}
            whileHover="hover"
            variants={cardVariants}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Contacts</p>
                <h3 className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">{contacts.length}</h3>
              </div>
              <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300">
                <FiUsers className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600 dark:text-green-400">
              <FiTrendingUp className="mr-1" />
              <span>12% from last month</span>
            </div>
          </motion.div>

          {/* Tagged Contacts */}
          <motion.div
            variants={itemVariants}
            whileHover="hover"
            variants={cardVariants}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Tagged Contacts</p>
                <h3 className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">
                  {contacts.filter(c => c.tags && c.tags.length > 0).length}
                </h3>
              </div>
              <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300">
                <FiTag className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600 dark:text-green-400">
              <FiTrendingUp className="mr-1" />
              <span>8% from last month</span>
            </div>
          </motion.div>

          {/* New This Month */}
          <motion.div
            variants={itemVariants}
            whileHover="hover"
            variants={cardVariants}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">New This Month</p>
                <h3 className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">24</h3>
              </div>
              <div className="p-3 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-300">
                <FaUserCheck className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600 dark:text-green-400">
              <FiTrendingUp className="mr-1" />
              <span>5% from last month</span>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            variants={itemVariants}
            whileHover="hover"
            variants={cardVariants}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending Follow-ups</p>
                <h3 className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">7</h3>
              </div>
              <div className="p-3 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-300">
                <FaRegClock className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-red-600 dark:text-red-400">
              <FiTrendingUp className="mr-1 transform rotate-180" />
              <span>3% from last month</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Charts Section */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
        >
          {/* Contacts by Tag */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Contacts by Tag</h2>
              <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
                View All
              </button>
            </div>
            {pieData.length === 0 ? (
              <div className="h-64 flex items-center justify-center text-gray-500">
                No tagged contacts yet.
              </div>
            ) : (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      label
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        borderRadius: '0.5rem',
                        border: 'none',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        padding: '0.5rem'
                      }}
                    />
                    <Legend 
                      layout="vertical" 
                      verticalAlign="middle" 
                      align="right"
                      wrapperStyle={{
                        paddingLeft: '20px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </motion.div>

          {/* Contact Status */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Contact Status</h2>
              <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
                View All
              </button>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={statusData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      borderRadius: '0.5rem',
                      border: 'none',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      padding: '0.5rem'
                    }}
                  />
                  <Bar dataKey="value" fill="#6366F1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </motion.div>

        {/* Recent Contacts & Activity */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Recent Contacts */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Contacts</h2>
              <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentContacts.length > 0 ? (
                recentContacts.map((contact, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 5 }}
                    className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition"
                  >
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-300">
                      <FiUsers className="w-5 h-5" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">{contact.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{contact.email}</p>
                    </div>
                    <div className="ml-auto flex items-center">
                      {contact.tags && contact.tags.length > 0 ? (
                        <span className="px-2 py-1 text-xs rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200">
                          {contact.tags[0]}
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                          Untagged
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No recent contacts to display
                </div>
              )}
            </div>
          </motion.div>

          {/* Monthly Activity */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Monthly Activity</h2>
              <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
                View All
              </button>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={contactActivity}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      borderRadius: '0.5rem',
                      border: 'none',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      padding: '0.5rem'
                    }}
                  />
                  <Bar dataKey="contacts" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
