
// import React, { useState, useContext } from 'react'
// import { useNavigate, Link } from 'react-router-dom'
// import { AuthContext } from '../context/AuthContext'
// import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowRight } from 'react-icons/fa'
// import { motion } from 'framer-motion'
// import { FiUser, FiMail, FiLock } from 'react-icons/fi'

// export default function Register() {
//   const { register } = useContext(AuthContext)
//   const navigate = useNavigate()

//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//   })

//   const [showPassword, setShowPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)
//   const [error, setError] = useState('')
//   const [isLoading, setIsLoading] = useState(false)

//   const handleChange = e => {
//     setForm({ ...form, [e.target.name]: e.target.value })
//     setError('')
//   }

//   const handleSubmit = async e => {
//     e.preventDefault()
//     setIsLoading(true)

//     if (!form.name.trim()) {
//       setError('Name is required')
//       setIsLoading(false)
//       return
//     }
//     if (!form.email.trim()) {
//       setError('Email is required')
//       setIsLoading(false)
//       return
//     }
//     if (!form.password) {
//       setError('Password is required')
//       setIsLoading(false)
//       return
//     }
//     if (form.password !== form.confirmPassword) {
//       setError('Passwords do not match')
//       setIsLoading(false)
//       return
//     }

//     try {
//       const result = await register({
//         name: form.name.trim(),
//         email: form.email.trim(),
//         password: form.password
//       })

//       if (result.success) {
//         navigate('/dashboard')
//       } else {
//         setError(result.message || 'Registration failed')
//       }
//     } catch (err) {
//       setError('An error occurred during registration')
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2
//       }
//     }
//   }

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: 'spring',
//         stiffness: 100
//       }
//     }
//   }

//   return (
//     <div className="min-h-screen  flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 px-4 py-12">
//       <motion.div 
//         initial={{ scale: 0.95, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 0.5 }}
//         className="w-8/12 mx-atuo"
//       >
//         <motion.div 
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
//         >
//           <div className=" w-full bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-center">
//             <motion.h2 
//               variants={itemVariants}
//               className="text-3xl font-bold text-white"
//             >
//               Create Account
//             </motion.h2>
//             <motion.p 
//               variants={itemVariants}
//               className="text-indigo-100 mt-2"
//             >
//               Join us today and get started
//             </motion.p>
//           </div>

//           <div className="p-8">
//             {error && (
//               <motion.div 
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 className="mb-6 p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300 rounded-lg flex items-center"
//               >
//                 <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//                 {error}
//               </motion.div>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-5">
//               <motion.div variants={itemVariants}>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FiUser className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     type="text"
//                     name="name"
//                     placeholder="Full Name"
//                     value={form.name}
//                     onChange={handleChange}
//                     className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition duration-200"
//                     required
//                   />
//                 </div>
//               </motion.div>

//               <motion.div variants={itemVariants}>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FiMail className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     type="email"
//                     name="email"
//                     placeholder="Email Address"
//                     value={form.email}
//                     onChange={handleChange}
//                     className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition duration-200"
//                     required
//                   />
//                 </div>
//               </motion.div>

//               <motion.div variants={itemVariants}>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FiLock className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     name="password"
//                     placeholder="Password"
//                     value={form.password}
//                     onChange={handleChange}
//                     className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition duration-200"
//                     required
//                   />
//                   <button
//                     type="button"
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? (
//                       <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//                     ) : (
//                       <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//                     )}
//                   </button>
//                 </div>
//               </motion.div>

//               <motion.div variants={itemVariants}>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FiLock className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     type={showConfirmPassword ? "text" : "password"}
//                     name="confirmPassword"
//                     placeholder="Confirm Password"
//                     value={form.confirmPassword}
//                     onChange={handleChange}
//                     className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition duration-200"
//                     required
//                   />
//                   <button
//                     type="button"
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   >
//                     {showConfirmPassword ? (
//                       <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//                     ) : (
//                       <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//                     )}
//                   </button>
//                 </div>
//               </motion.div>

//               <motion.div variants={itemVariants}>
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className="w-full flex justify-center items-center py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
//                 >
//                   {isLoading ? (
//                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                   ) : (
//                     <>
//                       Register
//                       <FaArrowRight className="ml-2" />
//                     </>
//                   )}
//                 </button>
//               </motion.div>
//             </form>

//             <motion.div 
//               variants={itemVariants}
//               className="mt-6 text-center text-gray-600 dark:text-gray-400"
//             >
//               <p>
//                 Already have an account?{' '}
//                 <Link 
//                   to="/login" 
//                   className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline hover:text-indigo-700 dark:hover:text-indigo-300 transition"
//                 >
//                   Sign in
//                 </Link>
//               </p>
//             </motion.div>
//           </div>
//         </motion.div>
//       </motion.div>
//     </div>
//   )
// }





//




import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowRight, FaChartLine, FaShieldAlt, FaSync, FaUsers } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { FiUser, FiMail, FiLock } from 'react-icons/fi'

export default function Register() {
  const { register } = useContext(AuthContext)
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setIsLoading(true)

    if (!form.name.trim()) {
      setError('Name is required')
      setIsLoading(false)
      return
    }
    if (!form.email.trim()) {
      setError('Email is required')
      setIsLoading(false)
      return
    }
    if (!form.password) {
      setError('Password is required')
      setIsLoading(false)
      return
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    try {
      const result = await register({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password
      })

      if (result.success) {
        navigate('/login')
      } else {
        setError(result.message || 'Registration failed')
      }
    } catch (err) {
      setError('An error occurred during registration')
    } finally {
      setIsLoading(false)
    }
  }

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
        stiffness: 100
      }
    }
  }

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  }

  const features = [
    {
      icon: <FaChartLine className="text-indigo-500 text-2xl" />,
      title: "Advanced Analytics",
      description: "Gain insights with real-time data visualization"
    },
    {
      icon: <FaShieldAlt className="text-indigo-500 text-2xl" />,
      title: "Enterprise Security",
      description: "Your data is protected with industry-leading security"
    },
    {
      icon: <FaSync className="text-indigo-500 text-2xl" />,
      title: "Automated Workflows",
      description: "Streamline processes with smart automation"
    },
    {
      icon: <FaUsers className="text-indigo-500 text-2xl" />,
      title: "Team Collaboration",
      description: "Work seamlessly with your entire team"
    }
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 px-4 py-12">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Feature Highlights Section */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:flex flex-col justify-center"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 h-full flex flex-col justify-center">
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-gray-800 dark:text-white mb-6"
            >
              Unlock Premium Features
            </motion.h2>
            
            <div className="space-y-6">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={featureVariants}
                  className="flex items-start space-x-4"
                >
                  <div className="p-2 bg-indigo-50 dark:bg-gray-700 rounded-lg">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center space-x-2">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                  <FaChartLine className="text-indigo-600 dark:text-indigo-300 text-xl" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-white">Trusted by businesses worldwide</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Join our growing community</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Registration Form Section (unchanged) */}
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-center">
              <motion.h2 
                variants={itemVariants}
                className="text-3xl font-bold text-white"
              >
                Create Account
              </motion.h2>
              <motion.p 
                variants={itemVariants}
                className="text-indigo-100 mt-2"
              >
                Join us today and get started
              </motion.p>
            </div>

            <div className="p-8">
              {error && (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="mb-6 p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300 rounded-lg flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <motion.div variants={itemVariants}>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition duration-200"
                      required
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition duration-200"
                      required
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      value={form.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition duration-200"
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition duration-200"
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center items-center py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    {isLoading ? (
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <>
                        Register
                        <FaArrowRight className="ml-2" />
                      </>
                    )}
                  </button>
                </motion.div>
              </form>

              <motion.div 
                variants={itemVariants}
                className="mt-6 text-center text-gray-600 dark:text-gray-400"
              >
                <p>
                  Already have an account?{' '}
                  <Link 
                    to="/login" 
                    className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline hover:text-indigo-700 dark:hover:text-indigo-300 transition"
                  >
                    Sign in
                  </Link>
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
