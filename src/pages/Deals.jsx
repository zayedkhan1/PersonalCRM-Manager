// import React, { useState } from "react";
// import { FiPlus, FiDollarSign, FiTrendingUp, FiTrendingDown, FiMoreHorizontal } from "react-icons/fi";
// import { motion, AnimatePresence } from "framer-motion";

// const initialDeals = {
//   lead: [
//     { id: 1, title: "Website Redesign", value: 1200, client: "Acme Corp", date: "2023-05-15", probability: 20 },
//     { id: 2, title: "SEO Optimization", value: 800, client: "Beta LLC", date: "2023-05-18", probability: 30 },
//   ],
//   contacted: [
//     { id: 3, title: "Mobile App Proposal", value: 3500, client: "Gamma Inc", date: "2023-05-10", probability: 50 },
//   ],
//   negotiation: [
//     { id: 4, title: "CRM Integration", value: 2000, client: "Delta Co", date: "2023-05-05", probability: 70 },
//   ],
//   won: [
//     { id: 5, title: "E-commerce Platform", value: 5000, client: "Epsilon Ltd", date: "2023-04-28", probability: 100 },
//   ],
//   lost: [
//     { id: 6, title: "CMS Migration", value: 1500, client: "Zeta GmbH", date: "2023-04-20", probability: 0 },
//   ],
// };

// const columns = [
//   { key: "lead", title: "Lead", color: "bg-amber-100", textColor: "text-amber-800", borderColor: "border-amber-200" },
//   { key: "contacted", title: "Contacted", color: "bg-blue-100", textColor: "text-blue-800", borderColor: "border-blue-200" },
//   { key: "negotiation", title: "Negotiation", color: "bg-purple-100", textColor: "text-purple-800", borderColor: "border-purple-200" },
//   { key: "won", title: "Won", color: "bg-green-100", textColor: "text-green-800", borderColor: "border-green-200" },
//   { key: "lost", title: "Lost", color: "bg-red-100", textColor: "text-red-800", borderColor: "border-red-200" },
// ];

// export default function Deals() {
//   const [deals, setDeals] = useState(initialDeals);
//   const [newDealForm, setNewDealForm] = useState({ show: false, stage: "" });
//   const [newDealData, setNewDealData] = useState({ title: "", value: "", client: "" });

//   const handleAddDeal = (stage) => {
//     setNewDealForm({ show: true, stage });
//     setNewDealData({ title: "", value: "", client: "" });
//   };

//   const handleSubmitDeal = (e) => {
//     e.preventDefault();
//     if (!newDealData.title || !newDealData.value || !newDealData.client) return;
    
//     const newDeal = {
//       id: Math.max(...Object.values(deals).flat().map(d => d.id)) + 1,
//       title: newDealData.title,
//       value: parseInt(newDealData.value),
//       client: newDealData.client,
//       date: new Date().toISOString().split('T')[0],
//       probability: columns.find(c => c.key === newDealForm.stage)?.key === "won" ? 100 : 
//                  columns.find(c => c.key === newDealForm.stage)?.key === "lost" ? 0 : 
//                  columns.findIndex(c => c.key === newDealForm.stage) * 25
//     };

//     setDeals(prev => ({
//       ...prev,
//       [newDealForm.stage]: [...prev[newDealForm.stage], newDeal]
//     }));

//     setNewDealForm({ show: false, stage: "" });
//   };

//   const moveDeal = (dealId, fromStage, toStage) => {
//     const deal = deals[fromStage].find(d => d.id === dealId);
//     if (!deal) return;

//     setDeals(prev => ({
//       ...prev,
//       [fromStage]: prev[fromStage].filter(d => d.id !== dealId),
//       [toStage]: [...prev[toStage], deal]
//     }));
//   };

//   const getTotalValue = (stage) => {
//     return deals[stage].reduce((sum, deal) => sum + deal.value, 0);
//   };

//   const getTotalPipelineValue = () => {
//     return columns.slice(0, 3).reduce((sum, col) => sum + getTotalValue(col.key), 0);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
//           <div>
//             <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Deals Pipeline</h1>
//             <p className="text-gray-500">Track and manage your sales opportunities</p>
//           </div>
//           <div className="mt-4 md:mt-0">
//             <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
//               <div className="flex items-center gap-4">
//                 <div className="text-center">
//                   <p className="text-sm text-gray-500">Pipeline Value</p>
//                   <p className="text-xl font-bold text-indigo-600">${getTotalPipelineValue().toLocaleString()}</p>
//                 </div>
//                 <div className="h-10 border-r border-gray-200"></div>
//                 <div className="text-center">
//                   <p className="text-sm text-gray-500">Won This Month</p>
//                   <p className="text-xl font-bold text-green-600">${getTotalValue("won").toLocaleString()}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Pipeline Stats */}
//         <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
//           {columns.map((col) => (
//             <motion.div 
//               key={col.key}
//               whileHover={{ y: -2 }}
//               className={`p-4 rounded-lg shadow-sm border ${col.borderColor} ${col.color} cursor-pointer`}
//             >
//               <div className="flex justify-between items-start">
//                 <div>
//                   <p className={`text-sm font-medium ${col.textColor}`}>{col.title}</p>
//                   <p className="text-xl font-bold text-gray-900">${getTotalValue(col.key).toLocaleString()}</p>
//                 </div>
//                 {col.key === "won" ? (
//                   <FiTrendingUp className="w-5 h-5 text-green-600" />
//                 ) : col.key === "lost" ? (
//                   <FiTrendingDown className="w-5 h-5 text-red-600" />
//                 ) : (
//                   <div className={`w-5 h-5 rounded-full ${col.textColor} bg-opacity-30 flex items-center justify-center`}>
//                     <span className="text-xs font-bold">{deals[col.key].length}</span>
//                   </div>
//                 )}
//               </div>
//               <div className="mt-2 h-2 bg-white bg-opacity-50 rounded-full overflow-hidden">
//                 {col.key !== "won" && col.key !== "lost" && (
//                   <div 
//                     className={`h-full ${col.textColor.replace('800', '500')} bg-opacity-70`}
//                     style={{ width: `${(deals[col.key].length / Math.max(1, Object.values(deals).flat().length)) * 100}%` }}
//                   ></div>
//                 )}
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Pipeline Board */}
//         <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
//           {columns.map((col) => (
//             <motion.div 
//               key={col.key}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.3 }}
//               className={`p-4 rounded-xl shadow-sm border ${col.borderColor} ${col.color} min-h-[400px]`}
//             >
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className={`font-semibold ${col.textColor}`}>{col.title}</h2>
//                 <span className={`px-2 py-1 text-xs rounded-full ${col.textColor} bg-white bg-opacity-50`}>
//                   {deals[col.key].length} deals
//                 </span>
//               </div>

//               <button
//                 onClick={() => handleAddDeal(col.key)}
//                 className={`w-full mb-4 flex items-center justify-center gap-2 p-2 rounded-lg ${col.textColor} bg-white bg-opacity-70 hover:bg-opacity-100 transition border ${col.borderColor}`}
//               >
//                 <FiPlus className="w-4 h-4" />
//                 <span>Add Deal</span>
//               </button>

//               <AnimatePresence>
//                 {newDealForm.show && newDealForm.stage === col.key && (
//                   <motion.div
//                     initial={{ opacity: 0, height: 0 }}
//                     animate={{ opacity: 1, height: 'auto' }}
//                     exit={{ opacity: 0, height: 0 }}
//                     className="mb-4 overflow-hidden"
//                   >
//                     <form onSubmit={handleSubmitDeal} className="bg-white p-3 rounded-lg shadow border border-gray-200">
//                       <input
//                         type="text"
//                         placeholder="Deal title"
//                         className="w-full p-2 mb-2 text-sm border border-gray-200 rounded"
//                         value={newDealData.title}
//                         onChange={(e) => setNewDealData({...newDealData, title: e.target.value})}
//                         required
//                       />
//                       <input
//                         type="number"
//                         placeholder="Value ($)"
//                         className="w-full p-2 mb-2 text-sm border border-gray-200 rounded"
//                         value={newDealData.value}
//                         onChange={(e) => setNewDealData({...newDealData, value: e.target.value})}
//                         required
//                       />
//                       <input
//                         type="text"
//                         placeholder="Client name"
//                         className="w-full p-2 mb-2 text-sm border border-gray-200 rounded"
//                         value={newDealData.client}
//                         onChange={(e) => setNewDealData({...newDealData, client: e.target.value})}
//                         required
//                       />
//                       <div className="flex gap-2">
//                         <button
//                           type="submit"
//                           className="flex-1 bg-indigo-600 text-white py-1 px-3 rounded text-sm hover:bg-indigo-700 transition"
//                         >
//                           Add
//                         </button>
//                         <button
//                           type="button"
//                           onClick={() => setNewDealForm({ show: false, stage: "" })}
//                           className="flex-1 bg-gray-200 py-1 px-3 rounded text-sm hover:bg-gray-300 transition"
//                         >
//                           Cancel
//                         </button>
//                       </div>
//                     </form>
//                   </motion.div>
//                 )}
//               </AnimatePresence>

//               <div className="space-y-3">
//                 <AnimatePresence>
//                   {deals[col.key].length > 0 ? (
//                     deals[col.key].map((deal) => (
//                       <motion.div
//                         key={deal.id}
//                         layout
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         whileHover={{ scale: 1.02 }}
//                         className={`bg-white rounded-lg p-4 shadow border border-gray-100 relative group`}
//                       >
//                         <div className="flex justify-between items-start">
//                           <div>
//                             <p className="font-medium text-gray-900">{deal.title}</p>
//                             <p className="text-sm text-gray-500">{deal.client}</p>
//                           </div>
//                           <button className="opacity-0 group-hover:opacity-100 transition p-1 text-gray-400 hover:text-gray-600">
//                             <FiMoreHorizontal />
//                           </button>
//                         </div>
                        
//                         <div className="mt-3 flex justify-between items-center">
//                           <div className="flex items-center gap-2">
//                             <FiDollarSign className="text-amber-500" />
//                             <span className="font-bold text-gray-900">${deal.value.toLocaleString()}</span>
//                           </div>
                          
//                           {col.key !== "won" && col.key !== "lost" && (
//                             <div className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
//                               {deal.probability}%
//                             </div>
//                           )}
//                         </div>
                        
//                         <div className="mt-2 text-xs text-gray-400">
//                           Created: {new Date(deal.date).toLocaleDateString()}
//                         </div>

//                         {col.key !== "won" && col.key !== "lost" && (
//                           <div className="mt-3 flex justify-between gap-2">
//                             {columns.slice(columns.findIndex(c => c.key === col.key) + 1, columns.length).map(nextCol => (
//                               <button
//                                 key={nextCol.key}
//                                 onClick={() => moveDeal(deal.id, col.key, nextCol.key)}
//                                 className={`flex-1 text-xs py-1 px-2 rounded ${nextCol.textColor} ${nextCol.color} hover:opacity-90 transition`}
//                               >
//                                 Move to {nextCol.title}
//                               </button>
//                             ))}
//                           </div>
//                         )}
//                       </motion.div>
//                     ))
//                   ) : (
//                     <motion.div
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       className="text-center py-8 text-gray-400 text-sm"
//                     >
//                       No deals in this stage
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


//

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiPlus, FiX, FiEdit2, FiTrash2, FiCheck, FiDollarSign, 
  FiTrendingUp, FiTrendingDown, FiUser, FiClock 
} from "react-icons/fi";
import { FaHandshake, FaPhone } from "react-icons/fa";

const initialDeals = {
  lead: [
    { id: 1, title: "Website Redesign", value: 1200, contact: "Acme Inc", date: "2023-05-15" },
    { id: 2, title: "SEO Optimization", value: 800, contact: "Beta Corp", date: "2023-05-18" },
  ],
  contacted: [
    { id: 3, title: "Mobile App Proposal", value: 3500, contact: "Gamma LLC", date: "2023-05-10" }
  ],
  negotiation: [
    { id: 4, title: "CRM Integration", value: 2000, contact: "Delta Co", date: "2023-05-05" }
  ],
  won: [],
  lost: [],
};

const columns = [
  { 
    key: "lead", 
    title: "Lead", 
    color: "bg-yellow-50 border-yellow-200",
    icon: <FiUser className="text-yellow-500" />,
    accent: "text-yellow-600"
  },
  { 
    key: "contacted", 
    title: "Contacted", 
    color: "bg-blue-50 border-blue-200",
    icon: <FaPhone className="text-blue-500" />,
    accent: "text-blue-600"
  },
  { 
    key: "negotiation", 
    title: "Negotiation", 
    color: "bg-purple-50 border-purple-200",
    icon: <FaHandshake className="text-purple-500" />,
    accent: "text-purple-600"
  },
  { 
    key: "won", 
    title: "Won", 
    color: "bg-green-50 border-green-200",
    icon: <FiTrendingUp className="text-green-500" />,
    accent: "text-green-600"
  },
  { 
    key: "lost", 
    title: "Lost", 
    color: "bg-red-50 border-red-200",
    icon: <FiTrendingDown className="text-red-500" />,
    accent: "text-red-600"
  },
];

const DealCard = ({ deal, onEdit, onDelete, onMove, columnKey }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({...deal});

  const handleSave = () => {
    onEdit(editData);
    setIsEditing(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className="bg-white rounded-lg p-4 mb-3 shadow-sm border border-gray-100 hover:border-gray-200 transition-all"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isEditing ? (
        <div className="space-y-2">
          <input
            type="text"
            value={editData.title}
            onChange={(e) => setEditData({...editData, title: e.target.value})}
            className="w-full p-2 border rounded"
          />
          <div className="flex items-center space-x-2">
            <FiDollarSign className="text-gray-400" />
            <input
              type="number"
              value={editData.value}
              onChange={(e) => setEditData({...editData, value: parseInt(e.target.value) || 0})}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex justify-end space-x-2 mt-2">
            <button 
              onClick={() => setIsEditing(false)}
              className="px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-gray-800">{deal.title}</h3>
            <div className="flex items-center space-x-1">
              <span className="text-sm font-semibold text-gray-700">
                ${deal.value.toLocaleString()}
              </span>
            </div>
          </div>
          
          <div className="mt-2 text-sm text-gray-500 flex items-center">
            <FiUser className="mr-1" size={14} />
            <span>{deal.contact}</span>
          </div>
          
          <div className="mt-1 text-xs text-gray-400 flex items-center">
            <FiClock className="mr-1" size={12} />
            <span>{new Date(deal.date).toLocaleDateString()}</span>
          </div>
          
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="flex justify-end space-x-1 mt-2"
              >
                <button 
                  onClick={() => setIsEditing(true)}
                  className="p-1 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded"
                >
                  <FiEdit2 size={16} />
                </button>
                <button 
                  onClick={() => onDelete(deal.id)}
                  className="p-1 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded"
                >
                  <FiTrash2 size={16} />
                </button>
                {columnKey !== "won" && columnKey !== "lost" && (
                  <div className="flex space-x-1">
                    <button 
                      onClick={() => onMove(deal.id, columnKey, "won")}
                      className="p-1 text-gray-500 hover:text-green-500 hover:bg-green-50 rounded"
                      title="Mark as Won"
                    >
                      <FiCheck size={16} />
                    </button>
                    <button 
                      onClick={() => onMove(deal.id, columnKey, "lost")}
                      className="p-1 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded"
                      title="Mark as Lost"
                    >
                      <FiX size={16} />
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </motion.div>
  );
};

const AddDealForm = ({ onAdd, columnKey, onCancel }) => {
  const [newDeal, setNewDeal] = useState({
    title: "",
    value: "",
    contact: "",
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newDeal.title && newDeal.value) {
      onAdd({
        id: Date.now(),
        title: newDeal.title,
        value: parseInt(newDeal.value),
        contact: newDeal.contact || "New Contact",
        date: newDeal.date
      });
      setNewDeal({
        title: "",
        value: "",
        contact: "",
        date: new Date().toISOString().split('T')[0]
      });
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      onSubmit={handleSubmit}
      className="bg-white p-3 rounded-lg shadow-sm border border-dashed border-gray-300 mb-3"
    >
      <div className="space-y-2">
        <input
          type="text"
          placeholder="Deal title"
          value={newDeal.title}
          onChange={(e) => setNewDeal({...newDeal, title: e.target.value})}
          className="w-full p-2 text-sm border rounded"
          required
        />
        <div className="flex items-center space-x-2">
          <FiDollarSign className="text-gray-400" />
          <input
            type="number"
            placeholder="Value"
            value={newDeal.value}
            onChange={(e) => setNewDeal({...newDeal, value: e.target.value})}
            className="w-full p-2 text-sm border rounded"
            required
          />
        </div>
        <input
          type="text"
          placeholder="Contact name"
          value={newDeal.contact}
          onChange={(e) => setNewDeal({...newDeal, contact: e.target.value})}
          className="w-full p-2 text-sm border rounded"
        />
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
          >
            <FiPlus className="mr-1" size={14} />
            Add Deal
          </button>
        </div>
      </div>
    </motion.form>
  );
};

export default function Deals() {
  const [deals, setDeals] = useState(initialDeals);
  const [addingDeal, setAddingDeal] = useState(null);
  const [stats, setStats] = useState({
    totalValue: 7500,
    wonValue: 0,
    lostValue: 0,
    openValue: 7500
  });

  const addDeal = (columnKey, deal) => {
    setDeals(prev => ({
      ...prev,
      [columnKey]: [...prev[columnKey], deal]
    }));
    setAddingDeal(null);
    updateStats(columnKey, deal.value, 'add');
  };

  const editDeal = (updatedDeal) => {
    const columnKey = Object.keys(deals).find(key => 
      deals[key].some(d => d.id === updatedDeal.id)
    );
    
    if (columnKey) {
      const oldDeal = deals[columnKey].find(d => d.id === updatedDeal.id);
      const valueDiff = updatedDeal.value - oldDeal.value;
      
      setDeals(prev => ({
        ...prev,
        [columnKey]: prev[columnKey].map(d => 
          d.id === updatedDeal.id ? updatedDeal : d
        )
      }));
      
      updateStats(columnKey, valueDiff, 'edit');
    }
  };

  const deleteDeal = (id) => {
    const columnKey = Object.keys(deals).find(key => 
      deals[key].some(d => d.id === id)
    );
    
    if (columnKey) {
      const deal = deals[columnKey].find(d => d.id === id);
      
      setDeals(prev => ({
        ...prev,
        [columnKey]: prev[columnKey].filter(d => d.id !== id)
      }));
      
      updateStats(columnKey, -deal.value, 'delete');
    }
  };

  const moveDeal = (id, fromColumn, toColumn) => {
    const deal = deals[fromColumn].find(d => d.id === id);
    
    if (deal) {
      setDeals(prev => ({
        ...prev,
        [fromColumn]: prev[fromColumn].filter(d => d.id !== id),
        [toColumn]: [...prev[toColumn], deal]
      }));
      
      updateStats(fromColumn, -deal.value, 'move');
      updateStats(toColumn, deal.value, 'move');
    }
  };

  const updateStats = (columnKey, value, action) => {
    setStats(prev => {
      let newStats = {...prev};
      newStats.totalValue = columnKey === 'lost' && action === 'delete' ? 
        prev.totalValue : 
        prev.totalValue + (action === 'edit' ? value : 0);
      
      if (columnKey === 'won') {
        newStats.wonValue = action === 'delete' ? 
          prev.wonValue - value : 
          prev.wonValue + value;
      } else if (columnKey === 'lost') {
        newStats.lostValue = action === 'delete' ? 
          prev.lostValue - value : 
          prev.lostValue + value;
      }
      
      newStats.openValue = newStats.totalValue - newStats.wonValue - newStats.lostValue;
      return newStats;
    });
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Deals Pipeline</h1>
          <p className="text-gray-500 text-sm">Track and manage your sales opportunities</p>
        </div>
        
        <div className="mt-4 md:mt-0 grid grid-cols-2 md:flex gap-2 md:gap-4">
          <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 min-w-[120px]">
            <p className="text-xs text-gray-500">Total Value</p>
            <p className="font-semibold text-gray-800">${stats.totalValue.toLocaleString()}</p>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 min-w-[120px]">
            <p className="text-xs text-gray-500">Open Value</p>
            <p className="font-semibold text-blue-600">${stats.openValue.toLocaleString()}</p>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 min-w-[120px]">
            <p className="text-xs text-gray-500">Won Value</p>
            <p className="font-semibold text-green-600">${stats.wonValue.toLocaleString()}</p>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 min-w-[120px]">
            <p className="text-xs text-gray-500">Lost Value</p>
            <p className="font-semibold text-red-600">${stats.lostValue.toLocaleString()}</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {columns.map((col) => (
          <motion.div
            key={col.key}
            layout
            className={`p-4 rounded-lg shadow-sm border ${col.color} min-h-[300px] flex flex-col`}
          >
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center space-x-2">
                {col.icon}
                <h2 className={`font-semibold ${col.accent}`}>{col.title}</h2>
              </div>
              <span className="text-xs bg-white px-2 py-1 rounded-full shadow-xs">
                {deals[col.key].length}
              </span>
            </div>
            
            <div className="flex-grow overflow-y-auto pr-1">
              <AnimatePresence>
                {addingDeal === col.key && (
                  <AddDealForm 
                    onAdd={(deal) => addDeal(col.key, deal)} 
                    columnKey={col.key}
                    onCancel={() => setAddingDeal(null)}
                  />
                )}
                
                {deals[col.key].length > 0 ? (
                  deals[col.key].map((deal) => (
                    <DealCard
                      key={deal.id}
                      deal={deal}
                      onEdit={editDeal}
                      onDelete={deleteDeal}
                      onMove={moveDeal}
                      columnKey={col.key}
                    />
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    className="text-center text-gray-400 py-8 text-sm"
                  >
                    No deals in this stage
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setAddingDeal(col.key)}
              className="mt-3 text-sm text-gray-500 hover:text-blue-500 flex items-center justify-center py-2 border border-dashed border-gray-300 rounded-lg hover:border-blue-300 transition"
            >
              <FiPlus className="mr-1" />
              Add Deal
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}