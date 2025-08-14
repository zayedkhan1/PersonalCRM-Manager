import { motion } from 'framer-motion';
import { FaCheck, FaLightbulb, FaStar } from 'react-icons/fa';
import { 
  FiUsers, 
  FiPieChart, 
  FiDollarSign, 
  FiActivity, 
  FiCalendar, 
  FiMail, 
  FiCheckCircle,
  FiBarChart2,
  FiShield,
  FiDatabase,
  FiZap,
  FiStar,
  FiAward
} from 'react-icons/fi';
import { Link } from 'react-router-dom';

const HomePage = () => {
  // Features data
  const features = [
    {
      icon: <FiUsers className="text-3xl" />,
      title: "Client Management",
      description: "Organize all client information in one centralized location with advanced filtering."
    },
    {
      icon: <FiBarChart2 className="text-3xl" />,
      title: "Sales Analytics",
      description: "Real-time sales pipeline visualization and performance metrics."
    },
    {
      icon: <FiMail className="text-3xl" />,
      title: "Automated Communication",
      description: "Schedule emails, follow-ups, and reminders to never miss an opportunity."
    },
    {
      icon: <FiShield className="text-3xl" />,
      title: "Data Security",
      description: "Enterprise-grade security with encryption and regular backups."
    },
    {
      icon: <FiDatabase className="text-3xl" />,
      title: "Custom Reporting",
      description: "Create tailored reports with drag-and-drop interface."
    },
    {
      icon: <FiZap className="text-3xl" />,
      title: "Workflow Automation",
      description: "Automate repetitive tasks to focus on what matters."
    }
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Sales Director, TechCorp",
      quote: "Our conversion rates increased by 40% within 3 months of using this CRM.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Founder, StartupHub",
      quote: "The intuitive interface saved our team hundreds of hours in training time.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Manager, BrandWorks",
      quote: "Customer support is exceptional - they actually listen to feature requests!",
      rating: 4
    }
  ];

  
  // Stats
  const stats = [
    { value: "10,000+", label: "Active Users" },
    { value: "85%", label: "Retention Rate" },
    { value: "4.9/5", label: "Average Rating" },
    { value: "150+", label: "Countries" }
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 text-white py-20 rounded-xl shadow-lg">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Revolutionize Your Customer Relationships</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              The most intuitive CRM platform designed to grow your business
            </p>
          <Link to='/contacts'>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-100  text-blue-600 px-8 py-3 rounded-lg font-bold shadow-lg cursor-pointer"
            >
              Start Free Trial
            </motion.button>
          </Link>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-6">About Our CRM Platform</h2>
            <p className="text-lg text-gray-600 mb-8">
              Our CRM application is built by sales professionals for sales teams. We've combined powerful automation with 
              intuitive design to create a platform that actually gets used daily, not just implemented and forgotten.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center bg-blue-50 px-4 py-2 rounded-full">
                <FiCheckCircle className="text-blue-500 mr-2" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center bg-blue-50 px-4 py-2 rounded-full">
                <FiCheckCircle className="text-blue-500 mr-2" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center bg-blue-50 px-4 py-2 rounded-full">
                <FiCheckCircle className="text-blue-500 mr-2" />
                <span>24/7 support</span>
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-gray-100 rounded-xl p-8 h-64 flex items-center justify-center">
                <FiPieChart className="text-6xl text-blue-500" />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-4">Why Choose Our CRM?</h3>
              <p className="text-gray-600 mb-6">
                Unlike other CRMs that require extensive training, our platform is designed for immediate productivity. 
                We focus on the features that actually drive sales while eliminating unnecessary complexity.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <FiCheckCircle className="text-green-500 mt-1 mr-2" />
                  <span>30-minute average onboarding time</span>
                </li>
                <li className="flex items-start">
                  <FiCheckCircle className="text-green-500 mt-1 mr-2" />
                  <span>Mobile-first design for on-the-go access</span>
                </li>
                <li className="flex items-start">
                  <FiCheckCircle className="text-green-500 mt-1 mr-2" />
                  <span>Integrates with your existing tools</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Pow<span className='border-b-4 border-purple-600'>erful Featur</span>es</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage customer relationships and grow your business
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-blue-500 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
 text-white rounded shadow-lg">
        <div className="container mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from businesses that transformed their sales process
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-gray-50 p-8 rounded-xl"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FiStar 
                      key={i} 
                      className={`${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'} mr-1`} 
                    />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6">"{testimonial.quote}"</p>
                <div className="font-bold">{testimonial.name}</div>
                <div className="text-sm text-gray-500">{testimonial.role}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
     
         <section className="py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4"
            >
              <FaStar className="text-yellow-300" />
              <span>Premium</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Upgrade Your Experience
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-xl text-indigo-100 max-w-3xl mx-auto"
            >
              Unlock advanced features and customization options
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20"
            >
              <h3 className="text-2xl font-bold mb-4">Basic</h3>
              <div className="text-4xl font-bold mb-6">$0<span className="text-xl text-white/70">/month</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2"><FaCheck className="text-green-300" /> Basic reminders</li>
                <li className="flex items-center gap-2"><FaCheck className="text-green-300" /> 5 events</li>
                <li className="flex items-center gap-2 text-white/50"><FaLightbulb /> No advanced features</li>
              </ul>
              <button className="w-full bg-white text-indigo-600 hover:bg-gray-100 py-3 rounded-lg font-medium">
                Current Plan
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white text-indigo-600 rounded-xl p-8 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 bg-yellow-400 text-indigo-800 text-xs font-bold px-2 py-1 rounded-full">
                POPULAR
              </div>
              <h3 className="text-2xl font-bold mb-4">Pro</h3>
              <div className="text-4xl font-bold mb-6">$9<span className="text-xl text-indigo-400">/month</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2"><FaCheck className="text-green-500" /> Unlimited events</li>
                <li className="flex items-center gap-2"><FaCheck className="text-green-500" /> Advanced notifications</li>
                <li className="flex items-center gap-2"><FaCheck className="text-green-500" /> Calendar integration</li>
                <li className="flex items-center gap-2"><FaCheck className="text-green-500" /> Custom themes</li>
              </ul>
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium">
                Upgrade Now
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20"
            >
              <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
              <div className="text-4xl font-bold mb-6">$29<span className="text-xl text-white/70">/month</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2"><FaCheck className="text-green-300" /> All Pro features</li>
                <li className="flex items-center gap-2"><FaCheck className="text-green-300" /> Team collaboration</li>
                <li className="flex items-center gap-2"><FaCheck className="text-green-300" /> Priority support</li>
                <li className="flex items-center gap-2"><FaCheck className="text-green-300" /> API access</li>
              </ul>
              <button className="w-full bg-white text-indigo-600 hover:bg-gray-100 py-3 rounded-lg font-medium">
                Contact Sales
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default HomePage;