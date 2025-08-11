import React, { useState, useEffect } from "react";
import { FaTrash, FaPlus, FaStar, FaEllipsisV, FaCheck } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Tasks() {
  const [tasks, setTasks] = useState([
    { 
      id: 1, 
      title: "Follow up with client", 
      completed: false,
      category: "Work",
      priority: "high",
      dueDate: "2023-06-15"
    },
    { 
      id: 2, 
      title: "Prepare proposal", 
      completed: true,
      category: "Work",
      priority: "medium",
      dueDate: "2023-06-10"
    },
    { 
      id: 3, 
      title: "Buy groceries", 
      completed: false,
      category: "Personal",
      priority: "low",
      dueDate: "2023-06-12"
    },
  ]);
  
  const [newTask, setNewTask] = useState("");
  const [newCategory, setNewCategory] = useState("Work");
  const [newPriority, setNewPriority] = useState("medium");
  const [newDueDate, setNewDueDate] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === "") return;
    const task = { 
      id: Date.now(), 
      title: newTask, 
      completed: false,
      category: newCategory,
      priority: newPriority,
      dueDate: newDueDate
    };
    setTasks([task, ...tasks]);
    setNewTask("");
    setNewCategory("Work");
    setNewPriority("medium");
    setNewDueDate("");
    setIsAddingTask(false);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = 
      activeFilter === "all" || 
      (activeFilter === "completed" && task.completed) || 
      (activeFilter === "active" && !task.completed) ||
      (activeFilter === "high" && task.priority === "high") ||
      (activeFilter === task.category.toLowerCase());
    
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const getPriorityColor = (priority) => {
    switch(priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case "Work": return "bg-blue-100 text-blue-800";
      case "Personal": return "bg-purple-100 text-purple-800";
      case "Health": return "bg-pink-100 text-pink-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Tasks</h1>
            <p className="text-gray-500">{filteredTasks.length} tasks</p>
          </div>
          <button 
            onClick={() => setIsAddingTask(true)}
            className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
          >
            <FaPlus className="text-sm" />
            <span>Add Task</span>
          </button>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <svg
                className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            
            <div className="flex space-x-2 overflow-x-auto pb-2">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${activeFilter === "all" ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
              >
                All Tasks
              </button>
              <button
                onClick={() => setActiveFilter("active")}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${activeFilter === "active" ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
              >
                Active
              </button>
              <button
                onClick={() => setActiveFilter("completed")}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${activeFilter === "completed" ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
              >
                Completed
              </button>
              <button
                onClick={() => setActiveFilter("high")}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${activeFilter === "high" ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
              >
                High Priority
              </button>
            </div>
          </div>
        </motion.div>

        {/* Add Task Form - Modal */}
        {isAddingTask && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0    backdrop-blur-lg  flex items-center justify-center p-4 z-50"
            onClick={() => setIsAddingTask(false)}
          >
            <motion.div 
              className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Add New Task</h2>
                <button 
                  onClick={() => setIsAddingTask(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
                  <input
                    type="text"
                    placeholder="What needs to be done?"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    autoFocus
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="Work">Work</option>
                      <option value="Personal">Personal</option>
                      <option value="Health">Health</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select
                      value={newPriority}
                      onChange={(e) => setNewPriority(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date (optional)</label>
                  <input
                    type="date"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                
                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    onClick={() => setIsAddingTask(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addTask}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center space-x-2"
                  >
                    <FaPlus className="text-sm" />
                    <span>Add Task</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Task List */}
        <motion.div layout className="space-y-3">
          <AnimatePresence>
            {filteredTasks.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-12"
              >
                <div className="bg-indigo-100 p-6 rounded-full mb-4">
                  <FaCheck className="text-indigo-600 text-3xl" />
                </div>
                <h3 className="text-xl font-medium text-gray-700 mb-1">No tasks found</h3>
                <p className="text-gray-500">Add a new task or try a different filter</p>
              </motion.div>
            ) : (
              filteredTasks.map((task) => (
                <motion.li
                  key={task.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className={`list-none flex items-center justify-between p-4 rounded-xl shadow-sm ${task.completed ? 'bg-gray-50' : 'bg-white'} hover:shadow-md transition-shadow duration-300`}
                >
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${task.completed ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 hover:border-indigo-500'}`}
                    >
                      {task.completed && <FaCheck className="text-xs" />}
                    </button>
                    
                    <div>
                      <p className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                        {task.title}
                      </p>
                      <div className="flex items-center space-x-3 mt-1">
                        <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(task.category)}`}>
                          {task.category}
                        </span>
                        {task.priority === "high" && (
                          <span className="text-yellow-500">
                            <FaStar className="text-sm" />
                          </span>
                        )}
                        {task.dueDate && (
                          <span className="text-xs text-gray-500">
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors duration-200"
                    >
                      <FaTrash className="text-sm" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors duration-200">
                      <FaEllipsisV className="text-sm" />
                    </button>
                  </div>
                </motion.li>
              ))
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}


// ///




// import React, { useState, useEffect } from "react";
// import { FaTrash, FaPlus, FaStar, FaEllipsisV, FaCheck, FaCalendarAlt, FaTags, FaBell, FaChartPie } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";

// export default function Tasks() {
//   const [tasks, setTasks] = useState([
//     { 
//       id: 1, 
//       title: "Follow up with client", 
//       completed: false,
//       category: "Work",
//       priority: "high",
//       dueDate: "2023-06-15",
//       notes: "Client waiting for proposal update",
//       reminder: "2023-06-14T09:00"
//     },
//     { 
//       id: 2, 
//       title: "Prepare quarterly report", 
//       completed: false,
//       category: "Work",
//       priority: "medium",
//       dueDate: "2023-06-20",
//       subtasks: [
//         { id: 21, title: "Gather sales data", completed: false },
//         { id: 22, title: "Analyze metrics", completed: false }
//       ]
//     },
//     { 
//       id: 3, 
//       title: "Buy groceries", 
//       completed: false,
//       category: "Personal",
//       priority: "low",
//       dueDate: "2023-06-12",
//       tags: ["shopping", "essentials"]
//     },
//   ]);
  
//   const [newTask, setNewTask] = useState("");
//   const [newCategory, setNewCategory] = useState("Work");
//   const [newPriority, setNewPriority] = useState("medium");
//   const [newDueDate, setNewDueDate] = useState("");
//   const [newNotes, setNewNotes] = useState("");
//   const [newReminder, setNewReminder] = useState("");
//   const [newTags, setNewTags] = useState("");
//   const [activeFilter, setActiveFilter] = useState("all");
//   const [isAddingTask, setIsAddingTask] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [viewMode, setViewMode] = useState("list"); // 'list' or 'board'
//   const [newSubtask, setNewSubtask] = useState("");
//   const [stats, setStats] = useState({
//     total: 0,
//     completed: 0,
//     overdue: 0,
//     highPriority: 0
//   });

//   // Load tasks from localStorage
//   useEffect(() => {
//     const savedTasks = localStorage.getItem('tasks');
//     if (savedTasks) {
//       setTasks(JSON.parse(savedTasks));
//     }
//   }, []);

//   // Save tasks to localStorage
//   useEffect(() => {
//     localStorage.setItem('tasks', JSON.stringify(tasks));
//     calculateStats();
//   }, [tasks]);

//   // Calculate statistics
//   const calculateStats = () => {
//     const today = new Date().toISOString().split('T')[0];
//     setStats({
//       total: tasks.length,
//       completed: tasks.filter(t => t.completed).length,
//       overdue: tasks.filter(t => !t.completed && t.dueDate && t.dueDate < today).length,
//       highPriority: tasks.filter(t => t.priority === "high").length
//     });
//   };

//   const addTask = () => {
//     if (newTask.trim() === "") return;
//     const task = { 
//       id: Date.now(), 
//       title: newTask, 
//       completed: false,
//       category: newCategory,
//       priority: newPriority,
//       dueDate: newDueDate,
//       notes: newNotes,
//       reminder: newReminder,
//       tags: newTags ? newTags.split(',').map(tag => tag.trim()) : []
//     };
//     setTasks([task, ...tasks]);
//     resetForm();
//     setIsAddingTask(false);
//   };

//   const resetForm = () => {
//     setNewTask("");
//     setNewCategory("Work");
//     setNewPriority("medium");
//     setNewDueDate("");
//     setNewNotes("");
//     setNewReminder("");
//     setNewTags("");
//   };

//   const toggleTask = (id) => {
//     setTasks(
//       tasks.map((task) =>
//         task.id === id ? { ...task, completed: !task.completed } : task
//       )
//     );
//   };

//   const toggleSubtask = (taskId, subtaskId) => {
//     setTasks(
//       tasks.map(task => {
//         if (task.id === taskId && task.subtasks) {
//           return {
//             ...task,
//             subtasks: task.subtasks.map(subtask => 
//               subtask.id === subtaskId 
//                 ? { ...subtask, completed: !subtask.completed } 
//                 : subtask
//             )
//           };
//         }
//         return task;
//       })
//     );
//   };

//   const deleteTask = (id) => {
//     setTasks(tasks.filter((task) => task.id !== id));
//     if (selectedTask && selectedTask.id === id) {
//       setSelectedTask(null);
//     }
//   };

//   const addSubtask = (taskId) => {
//     if (!newSubtask.trim()) return;
//     setTasks(
//       tasks.map(task => {
//         if (task.id === taskId) {
//           const subtasks = task.subtasks || [];
//           return {
//             ...task,
//             subtasks: [
//               ...subtasks,
//               { id: Date.now(), title: newSubtask, completed: false }
//             ]
//           };
//         }
//         return task;
//       })
//     );
//     setNewSubtask("");
//   };

//   const filteredTasks = tasks.filter(task => {
//     const matchesFilter = 
//       activeFilter === "all" || 
//       (activeFilter === "completed" && task.completed) || 
//       (activeFilter === "active" && !task.completed) ||
//       (activeFilter === "high" && task.priority === "high") ||
//       (activeFilter === task.category.toLowerCase());
    
//     const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    
//     return matchesFilter && matchesSearch;
//   });

//   const getPriorityColor = (priority) => {
//     switch(priority) {
//       case "high": return "bg-red-100 text-red-800";
//       case "medium": return "bg-yellow-100 text-yellow-800";
//       case "low": return "bg-green-100 text-green-800";
//       default: return "bg-gray-100 text-gray-800";
//     }
//   };

//   const getCategoryColor = (category) => {
//     switch(category) {
//       case "Work": return "bg-blue-100 text-blue-800";
//       case "Personal": return "bg-purple-100 text-purple-800";
//       case "Health": return "bg-pink-100 text-pink-800";
//       default: return "bg-gray-100 text-gray-800";
//     }
//   };

//   const isOverdue = (dueDate) => {
//     if (!dueDate) return false;
//     const today = new Date().toISOString().split('T')[0];
//     return dueDate < today;
//   };

//   // Reorder task function
//   const reorderTask = (fromIndex, toIndex) => {
//     const newTasks = [...tasks];
//     const [removed] = newTasks.splice(fromIndex, 1);
//     newTasks.splice(toIndex, 0, removed);
//     setTasks(newTasks);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <motion.div 
//           initial={{ y: -20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.5 }}
//           className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
//         >
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800">Task Master</h1>
//             <p className="text-gray-500">Stay organized and productive</p>
//           </div>
          
//           <div className="flex items-center space-x-4 w-full md:w-auto">
//             <div className="relative flex-1 md:w-64">
//               <input
//                 type="text"
//                 placeholder="Search tasks..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//               />
//               <svg
//                 className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                 />
//               </svg>
//             </div>
            
//             <button 
//               onClick={() => setIsAddingTask(true)}
//               className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg whitespace-nowrap"
//             >
//               <FaPlus className="text-sm" />
//               <span>Add Task</span>
//             </button>
//           </div>
//         </motion.div>

//         {/* Stats Dashboard */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2 }}
//           className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
//         >
//           <div className="bg-white p-4 rounded-xl shadow-sm flex items-center">
//             <div className="bg-indigo-100 p-3 rounded-full mr-4">
//               <FaCheck className="text-indigo-600" />
//             </div>
//             <div>
//               <p className="text-gray-500 text-sm">Total Tasks</p>
//               <p className="text-2xl font-bold">{stats.total}</p>
//             </div>
//           </div>
          
//           <div className="bg-white p-4 rounded-xl shadow-sm flex items-center">
//             <div className="bg-green-100 p-3 rounded-full mr-4">
//               <FaCheck className="text-green-600" />
//             </div>
//             <div>
//               <p className="text-gray-500 text-sm">Completed</p>
//               <p className="text-2xl font-bold">{stats.completed}</p>
//             </div>
//           </div>
          
//           <div className="bg-white p-4 rounded-xl shadow-sm flex items-center">
//             <div className="bg-red-100 p-3 rounded-full mr-4">
//               <FaBell className="text-red-600" />
//             </div>
//             <div>
//               <p className="text-gray-500 text-sm">Overdue</p>
//               <p className="text-2xl font-bold">{stats.overdue}</p>
//             </div>
//           </div>
          
//           <div className="bg-white p-4 rounded-xl shadow-sm flex items-center">
//             <div className="bg-yellow-100 p-3 rounded-full mr-4">
//               <FaStar className="text-yellow-600" />
//             </div>
//             <div>
//               <p className="text-gray-500 text-sm">High Priority</p>
//               <p className="text-2xl font-bold">{stats.highPriority}</p>
//             </div>
//           </div>
//         </motion.div>

//         {/* Main Content Area */}
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Task List Section */}
//           <div className={`${selectedTask ? 'lg:w-2/3' : 'w-full'}`}>
//             {/* Filters and View Toggle */}
//             <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//               <div className="flex space-x-2 overflow-x-auto pb-2 w-full">
//                 <button
//                   onClick={() => setActiveFilter("all")}
//                   className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${activeFilter === "all" ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
//                 >
//                   All Tasks
//                 </button>
//                 <button
//                   onClick={() => setActiveFilter("active")}
//                   className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${activeFilter === "active" ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
//                 >
//                   Active
//                 </button>
//                 <button
//                   onClick={() => setActiveFilter("completed")}
//                   className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${activeFilter === "completed" ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
//                 >
//                   Completed
//                 </button>
//                 <button
//                   onClick={() => setActiveFilter("high")}
//                   className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${activeFilter === "high" ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
//                 >
//                   High Priority
//                 </button>
//                 {['Work', 'Personal', 'Health'].map(category => (
//                   <button
//                     key={category}
//                     onClick={() => setActiveFilter(category.toLowerCase())}
//                     className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${activeFilter === category.toLowerCase() ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
//                   >
//                     {category}
//                   </button>
//                 ))}
//               </div>
              
//               <div className="flex space-x-2 bg-white p-1 rounded-lg">
//                 <button
//                   onClick={() => setViewMode("list")}
//                   className={`p-2 rounded-md ${viewMode === "list" ? 'bg-indigo-100 text-indigo-600' : 'text-gray-500 hover:bg-gray-100'}`}
//                 >
//                   List
//                 </button>
//                 <button
//                   onClick={() => setViewMode("board")}
//                   className={`p-2 rounded-md ${viewMode === "board" ? 'bg-indigo-100 text-indigo-600' : 'text-gray-500 hover:bg-gray-100'}`}
//                 >
//                   Board
//                 </button>
//               </div>
//             </div>

//             {/* Task List */}
//             {viewMode === "list" ? (
//               <div className="space-y-3">
//                 <AnimatePresence>
//                   {filteredTasks.length === 0 ? (
//                     <motion.div
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       className="flex flex-col items-center justify-center py-12 bg-white rounded-xl shadow-sm"
//                     >
//                       <div className="bg-indigo-100 p-6 rounded-full mb-4">
//                         <FaCheck className="text-indigo-600 text-3xl" />
//                       </div>
//                       <h3 className="text-xl font-medium text-gray-700 mb-1">No tasks found</h3>
//                       <p className="text-gray-500">Add a new task or try a different filter</p>
//                     </motion.div>
//                   ) : (
//                     filteredTasks.map((task) => (
//                       <motion.div
//                         key={task.id}
//                         layout
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, x: -20 }}
//                         transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                         className={`list-none ${selectedTask?.id === task.id ? 'ring-2 ring-indigo-500' : ''} bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer`}
//                         onClick={() => setSelectedTask(task)}
//                         whileHover={{ scale: 1.01 }}
//                         whileTap={{ scale: 0.98 }}
//                       >
//                         <div className="p-4">
//                           <div className="flex items-center justify-between">
//                             <div className="flex items-center space-x-4">
//                               <button
//                                 onClick={(e) => { e.stopPropagation(); toggleTask(task.id); }}
//                                 className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${task.completed ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 hover:border-indigo-500'}`}
//                               >
//                                 {task.completed && <FaCheck className="text-xs" />}
//                               </button>
                              
//                               <div className="flex-1 min-w-0">
//                                 <p className={`font-medium truncate ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
//                                   {task.title}
//                                 </p>
//                                 <div className="flex items-center flex-wrap gap-2 mt-1">
//                                   <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(task.category)}`}>
//                                     {task.category}
//                                   </span>
//                                   {task.priority === "high" && (
//                                     <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-800">
//                                       <FaStar className="inline mr-1" /> High
//                                     </span>
//                                   )}
//                                   {task.dueDate && (
//                                     <span className={`text-xs px-2 py-1 rounded-full ${isOverdue(task.dueDate) && !task.completed ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
//                                       <FaCalendarAlt className="inline mr-1" />
//                                       {new Date(task.dueDate).toLocaleDateString()}
//                                       {isOverdue(task.dueDate) && !task.completed && ' (Overdue)'}
//                                     </span>
//                                   )}
//                                   {task.tags?.map(tag => (
//                                     <span key={tag} className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
//                                       <FaTags className="inline mr-1" /> {tag}
//                                     </span>
//                                   ))}
//                                 </div>
//                               </div>
//                             </div>
                            
//                             <button
//                               onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }}
//                               className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors duration-200"
//                             >
//                               <FaTrash className="text-sm" />
//                             </button>
//                           </div>
                          
//                           {task.notes && (
//                             <div className="mt-3 pl-9 text-sm text-gray-600 bg-gray-50 p-2 rounded">
//                               {task.notes}
//                             </div>
//                           )}
                          
//                           {task.subtasks && task.subtasks.length > 0 && (
//                             <div className="mt-3 pl-9 space-y-2">
//                               {task.subtasks.map(subtask => (
//                                 <div key={subtask.id} className="flex items-center text-sm">
//                                   <input
//                                     type="checkbox"
//                                     checked={subtask.completed}
//                                     onChange={() => toggleSubtask(task.id, subtask.id)}
//                                     className="mr-2"
//                                   />
//                                   <span className={subtask.completed ? 'line-through text-gray-400' : 'text-gray-600'}>
//                                     {subtask.title}
//                                   </span>
//                                 </div>
//                               ))}
//                               <div className="flex mt-2">
//                                 <input
//                                   type="text"
//                                   value={newSubtask}
//                                   onChange={(e) => setNewSubtask(e.target.value)}
//                                   onKeyPress={(e) => e.key === 'Enter' && addSubtask(task.id)}
//                                   placeholder="Add subtask..."
//                                   className="flex-1 text-sm border-b border-gray-300 focus:outline-none focus:border-indigo-500 mr-2"
//                                 />
//                                 <button
//                                   onClick={() => addSubtask(task.id)}
//                                   className="text-sm text-indigo-600 hover:text-indigo-800"
//                                 >
//                                   Add
//                                 </button>
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       </motion.div>
//                     ))
//                   )}
//                 </AnimatePresence>
//               </div>
//             ) : (
//               // Kanban Board View
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 {['Not Started', 'In Progress', 'Completed'].map(status => (
//                   <motion.div 
//                     key={status} 
//                     className="bg-gray-50 rounded-lg p-4"
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <h3 className="font-medium text-gray-700 mb-4">{status}</h3>
//                     <div className="space-y-3">
//                       {filteredTasks
//                         .filter(task => {
//                           if (status === 'Not Started') return !task.completed;
//                           if (status === 'In Progress') return false; // You could add progress tracking
//                           if (status === 'Completed') return task.completed;
//                           return true;
//                         })
//                         .map(task => (
//                           <motion.div
//                             key={task.id}
//                             layout
//                             className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
//                             onClick={() => setSelectedTask(task)}
//                             whileHover={{ scale: 1.02 }}
//                             whileTap={{ scale: 0.98 }}
//                           >
//                             <div className="flex justify-between">
//                               <p className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
//                                 {task.title}
//                               </p>
//                               {task.priority === "high" && (
//                                 <FaStar className="text-yellow-500" />
//                               )}
//                             </div>
//                             {task.dueDate && (
//                               <p className="text-xs text-gray-500 mt-1">
//                                 <FaCalendarAlt className="inline mr-1" />
//                                 {new Date(task.dueDate).toLocaleDateString()}
//                               </p>
//                             )}
//                           </motion.div>
//                         ))}
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Task Detail Sidebar */}
//           {selectedTask && (
//             <motion.div 
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: 20 }}
//               className="lg:w-1/3 bg-white rounded-xl shadow-lg overflow-hidden"
//             >
//               <div className="p-6">
//                 <div className="flex justify-between items-start mb-4">
//                   <h2 className="text-xl font-bold text-gray-800">{selectedTask.title}</h2>
//                   <button 
//                     onClick={() => setSelectedTask(null)}
//                     className="text-gray-500 hover:text-gray-700"
//                   >
//                     ✕
//                   </button>
//                 </div>
                
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//                     <div className="flex items-center">
//                       <button
//                         onClick={() => toggleTask(selectedTask.id)}
//                         className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${selectedTask.completed ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 hover:border-indigo-500'}`}
//                       >
//                         {selectedTask.completed && <FaCheck className="text-xs" />}
//                       </button>
//                       <span className="ml-2">
//                         {selectedTask.completed ? 'Completed' : 'Active'}
//                       </span>
//                     </div>
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
//                     <span className={`px-3 py-1 rounded-full text-sm ${getCategoryColor(selectedTask.category)}`}>
//                       {selectedTask.category}
//                     </span>
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
//                     <span className={`px-3 py-1 rounded-full text-sm ${getPriorityColor(selectedTask.priority)}`}>
//                       {selectedTask.priority.charAt(0).toUpperCase() + selectedTask.priority.slice(1)}
//                     </span>
//                   </div>
                  
//                   {selectedTask.dueDate && (
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
//                       <div className="flex items-center">
//                         <FaCalendarAlt className="text-gray-500 mr-2" />
//                         <span className={isOverdue(selectedTask.dueDate) && !selectedTask.completed ? 'text-red-600' : 'text-gray-700'}>
//                           {new Date(selectedTask.dueDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
//                           {isOverdue(selectedTask.dueDate) && !selectedTask.completed && ' (Overdue)'}
//                         </span>
//                       </div>
//                     </div>
//                   )}
                  
//                   {selectedTask.reminder && (
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Reminder</label>
//                       <div className="flex items-center">
//                         <FaBell className="text-gray-500 mr-2" />
//                         <span>
//                           {new Date(selectedTask.reminder).toLocaleString('en-US', {
//                             month: 'short',
//                             day: 'numeric',
//                             hour: '2-digit',
//                             minute: '2-digit'
//                           })}
//                         </span>
//                       </div>
//                     </div>
//                   )}
                  
//                   {selectedTask.tags && selectedTask.tags.length > 0 && (
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
//                       <div className="flex flex-wrap gap-2">
//                         {selectedTask.tags.map(tag => (
//                           <span key={tag} className="px-2 py-1 rounded-full bg-gray-100 text-gray-800 text-sm">
//                             <FaTags className="inline mr-1" /> {tag}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   )}
                  
//                   {selectedTask.notes && (
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
//                       <p className="bg-gray-50 p-3 rounded text-gray-700">
//                         {selectedTask.notes}
//                       </p>
//                     </div>
//                   )}
                  
//                   {selectedTask.subtasks && selectedTask.subtasks.length > 0 && (
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Subtasks</label>
//                       <div className="space-y-2">
//                         {selectedTask.subtasks.map(subtask => (
//                           <div key={subtask.id} className="flex items-center">
//                             <input
//                               type="checkbox"
//                               checked={subtask.completed}
//                               onChange={() => toggleSubtask(selectedTask.id, subtask.id)}
//                               className="mr-2"
//                             />
//                             <span className={subtask.completed ? 'line-through text-gray-400' : 'text-gray-700'}>
//                               {subtask.title}
//                             </span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
                  
//                   <div className="pt-4 border-t border-gray-200">
//                     <button
//                       onClick={() => deleteTask(selectedTask.id)}
//                       className="w-full bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100 transition-colors"
//                     >
//                       Delete Task
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </div>
//       </div>

//       {/* Add Task Modal */}
//       <AnimatePresence>
//         {isAddingTask && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
//             onClick={() => setIsAddingTask(false)}
//           >
//             <motion.div 
//               className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
//               onClick={(e) => e.stopPropagation()}
//               initial={{ scale: 0.9 }}
//               animate={{ scale: 1 }}
//               exit={{ scale: 0.9 }}
//             >
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-bold text-gray-800">Add New Task</h2>
//                 <button 
//                   onClick={() => setIsAddingTask(false)}
//                   className="text-gray-500 hover:text-gray-700"
//                 >
//                   ✕
//                 </button>
//               </div>
              
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Task Title*</label>
//                   <input
//                     type="text"
//                     placeholder="What needs to be done?"
//                     value={newTask}
//                     onChange={(e) => setNewTask(e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                     autoFocus
//                   />
//                 </div>
                
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
//                     <select
//                       value={newCategory}
//                       onChange={(e) => setNewCategory(e.target.value)}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                     >
//                       <option value="Work">Work</option>
//                       <option value="Personal">Personal</option>
//                       <option value="Health">Health</option>
//                       <option value="Other">Other</option>
//                     </select>
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
//                     <select
//                       value={newPriority}
//                       onChange={(e) => setNewPriority(e.target.value)}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                     >
//                       <option value="high">High</option>
//                       <option value="medium">Medium</option>
//                       <option value="low">Low</option>
//                     </select>
//                   </div>
//                 </div>
                
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
//                     <input
//                       type="date"
//                       value={newDueDate}
//                       onChange={(e) => setNewDueDate(e.target.value)}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Reminder</label>
//                     <input
//                       type="datetime-local"
//                       value={newReminder}
//                       onChange={(e) => setNewReminder(e.target.value)}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                     />
//                   </div>
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
//                   <input
//                     type="text"
//                     placeholder="Comma separated tags (e.g., urgent, project)"
//                     value={newTags}
//                     onChange={(e) => setNewTags(e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
//                   <textarea
//                     placeholder="Additional details..."
//                     value={newNotes}
//                     onChange={(e) => setNewNotes(e.target.value)}
//                     rows="3"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   />
//                 </div>
                
//                 <div className="flex justify-end space-x-3 pt-2">
//                   <button
//                     onClick={() => setIsAddingTask(false)}
//                     className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={addTask}
//                     className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center space-x-2"
//                     disabled={!newTask.trim()}
//                   >
//                     <FaPlus className="text-sm" />
//                     <span>Add Task</span>
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }