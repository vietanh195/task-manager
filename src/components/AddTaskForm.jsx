import React, { useState } from "react";

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

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white shadow rounded-xl p-4 mb-5 border border-gray-200"
        >
            <h2 className="font-semibold text-lg mb-3">➕ Thêm công việc mới</h2>
            <input
                type="text"
                name="title"
                placeholder="Work name..."
                value={formData.title}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <textarea
                name="description"
                placeholder="Description..."
                value={formData.description}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>

            <div className="flex gap-2 mb-2">
                <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="border rounded-lg p-2 w-1/2"
                >
                    <option value='low'>Low</option>
                    <option value='medium'>Medium</option>
                    <option value='high'>High</option>
                </select>

                <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="border rounded-lg p-2 w-1/2"
                />
            </div>

            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-full"
            >
                Add Task
            </button>
        </form>
    );
};

export default AddTaskForm;