import React, { useState } from 'react';
import { sampleTasks } from '../utils/constants';
import TaskCard from '../components/TaskCard';
import AddTaskForm from '../components/AddTaskForm';
import Header from '../components/Header';

const Home = () => {
    const [tasks, setTasks] = useState(sampleTasks)

    const handleAddTask = (newTask) => {
        setTasks((prev) => [...prev, newTask]);
    }

    const handleDelete = (id) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    }

    const handleEdit = (task) => {
        alert("Function is going to be developed!");
    }

    const renderColumn = (status, title, color) => {
        const filtered = tasks.filter((task) => task.status === status);

        return (
            <div className="bg-white rounded-xl shadow p-4 border">   
                <h2 className={`font-semibold text-lg mb-3 ${color}`}>{title}</h2>
                {filtered.length === 0 ? (
                    <p className='text-gray-400 text-sm'>No tasks available.</p>
                ) : (
                    filtered.map((task) =>
                    <TaskCard 
                        key={task.id}
                        task={task}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                    />
                    )
                )}
            </div>
        );
    };

    return (
        <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-6">
            🗂️ My Task Manager
            </h1>

            {/* Form thêm task */}
            <AddTaskForm onAdd={handleAddTask} />

            {/* 3 cột task */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {renderColumn("todo", "To Do", "text-blue-600")}
            {renderColumn("inprogress", "In Progress", "text-yellow-600")}
            {renderColumn("done", "Done", "text-green-600")}
            </div>
        </div>


        // <div className='max-w-6xl mx-auto'>   
        //     <Header />
        //     <h1 className='text-3xl font-bold text-center mb-6'>My Task Manager</h1>
        //     <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        //         <div className='bg-white rounded-xl shadow p-4'>
        //             <h2 className='font-semibold text-lg mb-2 text-blue-600'>To Do</h2>
        //             {/* Task hien thi o day */}
        //         </div>   

        //         <div className="bg-white rounded-xl shadow p-4">
        //             <h2 className="font-semibold text-lg mb-2 text-yellow-600">In Progress</h2>
        //         </div>

        //         <div className="bg-white rounded-xl shadow p-4">
        //             <h2 className="font-semibold text-lg mb-2 text-green-600">Done</h2>
        //         </div>
        //     </div>
        // </div>
    )
}

export default Home;