// AddTaskForm

import React, { useState } from "react";
import { motion } from "framer-motion";

const AddTaskForm = ({ onAddTask }) => {
    const [formData, setFormData] = useState ({
        title: "",
        description: "",
        priority: "medium",
        deadline: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title.trim()) return;

        const newTask = {
            id: Date.now(),
            ...formData,
            status: "todo",
        };

        onAddTask(newTask);
        setFormData({
            title: "",
            description: "",
            priority: "medium",
            deadline: "",
        });
    }

    const inputClass = "w-full border border-gray-200 dark:border-gray-600 rounded-lg p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 transition-colors duration-200";

    return (
        <motion.form
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-4 mb-5 border border-gray-200 dark:border-gray-700 transition-colors duration-300"
        >
            <h2 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-200">➕ Thêm công việc mới</h2>
            
            <input
                type="text"
                name="title"
                placeholder="Tên công việc..."
                value={formData.title}
                onChange={handleChange}
                className={inputClass}
            />

            <textarea
                name="description"
                placeholder="Mô tả chi tiết..."
                value={formData.description}
                onChange={handleChange}
                className={inputClass}
            ></textarea>

            <div className="flex gap-2 mb-2">
                <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className={`${inputClass} w-1/2 cursor-pointer`}
                >
                    <option value='low'>Thấp</option>
                    <option value='medium'>Trung bình</option>
                    <option value='high'>Cao</option>
                </select>

                <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    className={`${inputClass} w-1/2 cursor-pointer`}
                />
            </div>

            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-full font-medium transition-transform active:scale-95 shadow-md hover:shadow-lg"
            >
                Thêm Task
            </button>
        </motion.form>
    );
};

export default AddTaskForm;