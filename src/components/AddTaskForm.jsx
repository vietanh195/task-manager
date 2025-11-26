// AddTaskForm

import React, { useState } from "react";
import { motion } from "framer-motion";
import { analyzeTaskInput } from "../utils/aiService";

const AddTaskForm = ({ onAddTask }) => {
    const [formData, setFormData] = useState ({
        title: "",
        description: "",
        priority: "medium",
        deadline: "",
    });

    // State ô nhập liệu thông minh
    const [aiInput, setAiInput] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    // Xử lý khi nhấn nút AI
    const handleAiAnalyze = async () => {
        if (!aiInput.trim()) return;
        
        setIsAnalyzing(true);
        const result = await analyzeTaskInput(aiInput);
        setIsAnalyzing(false);

        if (result) {
            // Tự động điền thông tin AI trả về vào Form
            setFormData({
                title: result.title || "",
                description: result.description || "",
                priority: result.priority || "medium",
                deadline: result.deadline || "",
            });
            setAiInput(""); // Xóa ô nhập AI
        } else {
            alert("AI chưa hiểu câu này, bạn thử lại nhé!");
        }
    };

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
            
            {/* --- AI INPUT SECTION --- */}
            <div className="mb-4 flex gap-2">
                <input
                    type="text"
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    placeholder="✨ Nhập nhanh: 'Gửi báo cáo lúc 5h chiều mai'..."
                    className={`${inputClass} mb-0 flex-1 border-blue-200 dark:border-blue-800 ring-blue-100`}
                />

                <button
                    onClick={handleAiAnalyze}
                    disabled={isAnalyzing}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg 
                            transition-colors flex items-center justify-center gap-2 
                            disabled:opacity-50 min-w-[68px] h-[42px]"
                >
                    {isAnalyzing ? (
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10"
                                    stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 
                                    5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 
                                    5.824 3 7.938l3-2.647z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                            fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd"
                                d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 
                                    3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 
                                    0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 
                                    2.576l-.813 2.846a.75.75 0 0 1-1.442 
                                    0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 
                                    0 0 1 0-1.442l2.846-.813a3.75 3.75 0 0 0 
                                    2.576-2.576l.813-2.846A.75.75 0 0 1 9 4.5Z"
                                clipRule="evenodd" />
                        </svg>
                    )}
                    AI
                </button>
            </div>

            
            <hr className="mb-4 border-gray-100 dark:border-gray-700" />

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