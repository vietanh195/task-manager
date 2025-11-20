import React, { useState } from 'react';
import TaskCard from './TaskCard';

export default function Board({ tasks, setTasks, onDelete, onToggle, filter, search }) {
    const statuses = ["todo", "in-progress", "done"];
    
    // State để lưu trạng thái kéo thả (để làm hiệu ứng visual nếu cần)
    const [draggedTaskId, setDraggedTaskId] = useState(null);

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

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {statuses.map((status) => (
                <div
                    key={status}
                    // --- HTML5 DROPPABLE EVENTS ---
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, status)}
                    // ------------------------------
                    className={`bg-gray-100 dark:bg-gray-800 rounded-xl p-4 min-h-[400px] transition-colors duration-200 ${
                        // Hiệu ứng khi đang kéo thả (tùy chọn)
                        draggedTaskId ? 'border-2 border-dashed border-gray-300 dark:border-gray-600' : ''
                    }`}
                >
                    <h2 className="font-semibold capitalize mb-4 text-xl text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2">
                        {status.replace("todo", "Cần Làm").replace("in-progress", "Đang Làm").replace("done", "Hoàn Thành")}
                    </h2>

                    <div className="flex flex-col gap-3">
                        {filteredAndSearchedTasks
                            .filter((t) => t.status === status)
                            .map((task) => (
                                <div
                                    key={task.id}
                                    // --- HTML5 DRAGGABLE EVENTS ---
                                    draggable={true} // Bật tính năng kéo
                                    onDragStart={(e) => handleDragStart(e, task.id)}
                                    // ------------------------------
                                    className="cursor-grab active:cursor-grabbing transition-transform hover:scale-[1.02]"
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
                    </div>

                    {filteredAndSearchedTasks.filter((t) => t.status === status).length === 0 && (
                        <p className="text-gray-400 text-sm italic pt-10 text-center pointer-events-none">
                            Kéo thả công việc vào đây
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
}