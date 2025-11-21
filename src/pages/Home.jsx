// Home - Component chính của ứng dụng
import React, { useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import AddTaskForm from "../components/AddTaskForm";
import Board from "../components/Board";
import FilterBar from "../components/FilterBar";
import { useTasks } from "../hooks/useTasks";
import { motion } from "framer-motion";

export default function Home() {
  // Lỗi đã khắc phục: Giải nén setTasks từ useTasks()
  const { tasks, setTasks, addTask, toggleTask, deleteTask } = useTasks();
  
  // State cho Filter và Search
  const [filter, setFilter] = useState("all"); 
  const [search, setSearch] = useState(""); 
  
  // State Sorting (Giữ lại nếu bạn muốn dùng sorting cho mục đích debug/hiển thị)
  const [sortBy, setSortBy] = useState("createdAt"); 

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 text-gray-800 dark:text-gray-100 font-sans">
      <Navbar />
        
        {/* Thêm hiệu ứng Fade In cho toàn bộ nội dung chính */}
      <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="container mx-auto px-4 py-8 max-w-7xl"
      >
        <Header />
        
        <div className="max-w-6xl mx-auto mt-6">
          
          {/* Component thêm Task */}
          <AddTaskForm onAddTask={addTask} />
          
          {/* Component Lọc và Tìm kiếm */}
          {/* <FilterBar 
            filter={filter} 
            setFilter={setFilter} 
            search={search}
            setSearch={setSearch} 
          /> */}
          
          {/* Sorting (Đã loại bỏ vì Board là hiển thị chính) */}

          {/* Component Drag & Drop Board */}
          <Board 
            tasks={tasks} 
            setTasks={setTasks} // Truyền setTasks đã được giải nén
            onDelete={deleteTask}
            onToggle={toggleTask}
            // Truyền filter và search xuống Board để Board tự lọc
            filter={filter} 
            search={search}
          />
        </div>
      </motion.div>
    </div>
  );
}