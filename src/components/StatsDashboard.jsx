import React from 'react';
import { motion } from "framer-motion";
import { delay } from 'framer-motion';

export default function StatsDashboard({ tasks }) {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'done').length;
    const inProgressTasks = tasks.filter(t => t.status === 'in-progress').length;
    const todoTasks = tasks.filter(t => t.status === 'todo').length;

    // Fix chia cho 0
    const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

    // 
    const radius = 28; // Bán kính
    const circumference = 2 * Math.PI * radius; // Chu vi
    const strokeDashoffset = circumference - (progress / 100) * circumference; // Độ dài phần đã hoàn thành

    const progressColor = progress === 100 ? "text-green-500" : "text-blue-500";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20}}
            animate={{ opacity: 1, y: 0}}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
        >
            {/* Card 1: Tổng quan (Biểu đồ tròn) */}
            <div className="col-span-2 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Tiến độ</p>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{progress.toFixed(1)}%</h3>
                    <p className="text-xs text-gray-400 mt-1">
                        {completedTasks}/{totalTasks} công việc
                    </p>
                </div>
                
                {/* SVG Chart*/}
                <div className="relative w-16 h-16 flex items-center justify-center">
                    <svg className="transform -rotate-90 w-16 h-16">
                        {/* Vòng tròn nền */}
                        <circle
                            cx="32" cy="32" r={radius}
                            stroke="currentColor"
                            strokeWidth="6"
                            fill="transparent"
                            className="text-gray-200 dark:text-gray-700"
                        />
                        {/* Vòng tròn tiến độ */}
                        <circle
                            cx="32" cy="32" r={radius}
                            stroke="currentColor"
                            strokeWidth="6"
                            fill="transparent"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            className={`${progressColor} transition-all duration-1000 ease-out`}
                        />
                    </svg>
                </div>
            </div>

            {/* Card 2: Cần làm */}
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-100 dark:border-red-900/30 flex flex-col justify-center">
                <p className="text-sm text-red-600 dark:text-red-300 font-medium">Cần làm</p>
                <h3 className="text-2xl font-bold text-red-700 dark:text-red-200">{todoTasks}</h3>
            </div>

            {/* Card 3: Đang làm */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-900/30 flex flex-col justify-center">
                <p className="text-sm text-blue-600 dark:text-blue-300 font-medium">Đang làm</p>
                <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-200">{inProgressTasks}</h3>
            </div>
        </motion.div>
    )
}