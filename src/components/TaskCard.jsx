import React from 'react';
import { motion } from "framer-motion"; // Import thư viện

export default function TaskCard({ task, onDelete, onToggle }) {
  // Màu theo độ ưu tiên
  const getPriorityColor = (p) => {
    switch(p) {
      case 'high': return 'bg-red-100 text-red-600';
      case 'medium': return 'bg-yellow-100 text-yellow-600';
      case 'low': return 'bg-green-100 text-green-600';
      default: return 'bg-gray-100 text-gray-500';
    }
  }

  // format Deadline
  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  const displayDate = task.deadline ? formatDate(task.deadline) : formatDate(task.createdAt);
  const isDeadlineLabel = task.deadline ? "Hạn chót" : "Ngày tạo";

  return (
    <motion.div
      layout 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, scale: 0.9 }} 
      transition={{ duration: 0.2 }}
      whileHover={{ scale: 1.02, boxShadow: "0px 5px 15px rgba(0,0,0,0.1)" }}
      whileTap={{ scale: 0.98 }}
      className={`bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 group relative`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1 cursor-pointer" onClick={() => onToggle(task.id)}>
          <h3 className={`font-medium text-gray-800 dark:text-gray-100 mb-1 transition-all duration-200 ${
            task.done ? 'line-through text-gray-400' : ''
          }`}>
            {task.title}
          </h3>

          {task.description && (
            <p className='text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 my-2'>
              {task.description}
            </p>
          )}
          
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
            </svg>
            <span className={`${task.deadline && new Date(task.deadline) < new Date() && !task.done ? 'text-red-500 font-semibold' : ''}`}>
              {isDeadlineLabel}: {displayDate}
            </span>
          </div>

          <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider ${getPriorityColor(task.priority)} mr-2`}>
            {task.priority || 'Normal'}
          </span>
          
          <span className={`inline-block mt-2 text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider ${
             task.status === 'done' ? 'bg-green-100 text-green-600' :
             task.status === 'in-progress' ? 'bg-blue-100 text-blue-600' :
             'bg-gray-100 text-gray-500'
          }`}>
            {task.status}
          </span>
        </div>

        <button 
          onClick={(e) => {
            e.stopPropagation(); // Chặn sự kiện để không kích hoạt toggle
            onDelete(task.id);
          }}
          className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}