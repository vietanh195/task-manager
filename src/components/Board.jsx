import React, { useState } from 'react';
import TaskCard from './TaskCard';
import { AnimatePresence, motion } from "framer-motion";

export default function Board({ tasks, setTasks, onDelete, onToggle, filter, search }) {
    const statuses = ["todo", "in-progress", "done"];
    
    // State để lưu trạng thái kéo thả (để làm hiệu ứng visual nếu cần)
    const [draggedTaskId, setDraggedTaskId] = useState(null);
    const [activeTab, setActiveTab] = useState('todo');

    // 1. Bắt đầu kéo
    const handleDragStart = (e, taskId) => {
        setDraggedTaskId(taskId);
        // Lưu ID của task đang kéo vào dataTransfer để dùng khi thả
        e.dataTransfer.setData("taskId", taskId.toString());
        e.dataTransfer.effectAllowed = "move";
    };

    // 2. Khi kéo qua vùng thả (Bắt buộc phải có để cho phép Drop)
    const handleDragOver = (e) => {
        e.preventDefault(); // Cho phép thả
        e.dataTransfer.dropEffect = "move";
    };

    // 3. Khi thả task vào cột mới
    const handleDrop = (e, newStatus) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData("taskId");
        
        if (!taskId) return;

        // Cập nhật trạng thái mới cho task
        const updatedTasks = tasks.map(task => {
            if (task.id.toString() === taskId) {
                // Nếu chuyển sang cột 'done', cập nhật luôn thuộc tính done
                const isDone = newStatus === 'done';
                return { ...task, status: newStatus, done: isDone };
            }
            return task;
        });

        setTasks(updatedTasks);
        setDraggedTaskId(null);
    };

    // Lọc task theo bộ lọc (filter) và tìm kiếm (search)
    const filteredAndSearchedTasks = tasks.filter(task => {
        if (filter !== 'all') {
            const isActive = task.status !== 'done';
            if (filter === 'active' && !isActive) return false;
            if (filter === 'completed' && isActive) return false;
        }
        if (search && !task.title.toLowerCase().includes(search.toLowerCase())) {
            return false;
        }
        return true;
    });

    const getStatusLabel = (status) => 
        status.replace("todo", "Cần Làm")
              .replace("in-progress", "Đang Làm")
              .replace("done", "Hoàn Thành");

    return (
        <div>
            {/* TAB FOR MOBILE */}
            <div className="flex md:hidden mb-6 bg-white dark:bg-gray-800 p-1 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                {statuses.map((status) => (
                    <button
                        key={status}
                        onClick={() => setActiveTab(status)}
                        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                            activeTab === status 
                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 shadow-sm' 
                                : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-400'
                        }`}
                    >
                        {getStatusLabel(status)}
                    </button>
                ))}
            </div>
            {/* TAB FOR DESKTOP */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                {statuses.map((status) => (
                    <div
                        key={status}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, status)}
                        className={`${status === activeTab ? 'block' : 'hidden'} md:block 
                            bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 min-h-[400px] 
                            transition-colors duration-200 border border-transparent
                            ${draggedTaskId ? 'border-dashed border-blue-300 dark:border-blue-700 bg-blue-50/30' : ''}
                        `}
                    >
                        <h2 className="font-semibold capitalize mb-4 text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center justify-between">
                            {status.replace("todo", "Cần Làm").replace("in-progress", "Đang Làm").replace("done", "Hoàn Thành")}
                            <span className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-md text-xs">
                                {filteredAndSearchedTasks.filter(t => t.status === status).length}
                            </span>
                        </h2>

                        <div className="flex flex-col gap-3">
                            {/* Bọc danh sách bằng AnimatePresence */}
                            <AnimatePresence mode='popLayout'> 
                                {filteredAndSearchedTasks
                                    .filter((t) => t.status === status)
                                    .map((task) => (
                                        <div
                                            key={task.id}
                                            draggable={true}
                                            onDragStart={(e) => handleDragStart(e, task.id)}
                                            // Chúng ta bỏ class wrapper cũ vì style đã nằm trong TaskCard (motion.div)
                                            className="cursor-grab active:cursor-grabbing"
                                            style={{
                                                opacity: draggedTaskId === task.id ? 0.5 : 1
                                            }}
                                        >
                                            <TaskCard
                                                task={task}
                                                onDelete={onDelete}
                                                onToggle={onToggle}
                                            />
                                        </div>
                                    ))}
                            </AnimatePresence>
                        </div>

                        {filteredAndSearchedTasks.filter((t) => t.status === status).length === 0 && (
                            <p className="text-gray-400 text-sm italic pt-10 text-center pointer-events-none">
                                Kéo thả công việc vào đây
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}