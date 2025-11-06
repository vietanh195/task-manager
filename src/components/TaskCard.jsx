import React from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

const priorityColors = {
    high: "bg-red-100 text-red-700",
    medium: "bg-yellow-100 text-yellow-700",
    low: "bg-green-100 text-green-700",
};

const TaskCard = ({ task, onEdit, onDelete }) => {
    return (
        <div className='bg-gray-50 border border-gray-200 rounded-xl p-3 mb-3 shadow-sm hover:shadow-md transition'>
            <div className='flex justify-between items-start'>   
                <h3 className='font-semibold text-lg'>{task.title}</h3>
                <div className='flex gap-2'>
                    <button 
                        className='text-blue-500 hover:text-blue-700'
                        onClick={() => onEdit(task)}
                    >
                        <FaEdit />
                    </button>
                    <button
                        className='text-red-500 hover:text-red-700'
                        onClick={() => onDelete(task.id)}
                    >
                        <FaTrashAlt />
                    </button>
                </div>
            </div>

            <div className='text-gray-600 text-sm mt-1'>{task.description}</div>

            <div className='flex justify-between items-center mt-3'>
                <span 
                    className={`px-2 py-1 rounded-full text-xs font-medium  ${priorityColors[task.priority]}`}>
                    Priority: {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </span>
                <span className='text-gray-500 text-xs'>Deadline: {task.deadline}</span>
            </div>
        </div>
    );
};

export default TaskCard