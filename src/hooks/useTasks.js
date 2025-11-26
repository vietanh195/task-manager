// useTasks
import { useState, useEffect } from "react";
// import { sampleTasks } from "../utils/constants";

export function useTasks() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    
    // Nếu có data, parse ra. Nếu không, dùng sampleTasks và thêm thuộc tính createdAt/done
    if (saved) {
      return JSON.parse(saved);
    } else {
      // // Chuẩn hóa data mẫu khi khởi tạo lần đầu
      // return sampleTasks.map(task => ({
      //   ...task,
      //   // Đảm bảo có createdAt nếu thiếu
      //   createdAt: task.createdAt || new Date().toISOString(), 
      //   // Đảm bảo có done nếu thiếu
      //   done: task.status === 'done', 
      // }));
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // cho TaskInput/AddTaskForm
  const addTask = (newTaskData) => {
    if (!newTaskData.title || !newTaskData.title.trim()) return;

    const newTask = {
      ...newTaskData,
      id: Date.now(),
      done: newTaskData.status === 'done' || false,
      status: newTaskData.status || "todo",
      createdAt: new Date().toISOString(),
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  // Toggle done/undone
  const toggleTask = (id) => {
    setTasks(prevTasks => prevTasks.map(t => {
      if (t.id === id) {
        let newStatus; 

        if (t.status === 'todo') {
          newStatus = 'in-progress';
        } else if (t.status === 'in-progress') {
          newStatus = 'done';
        } else {
          newStatus = 'todo';
        }

        const isDone = newStatus === 'done';
        return { ...t, status: newStatus, done: isDone };

        // const newDoneState = !t.done;
        // Cập nhật status dựa trên trạng thái done mới
        // const newStatus = newDoneState ? 'done' : 'todo';
        // return { ...t, done: newDoneState, status: newStatus };
      }
      return t;
    }));
  };

  const deleteTask = (id) => {
    setTasks(prevTasks => prevTasks.filter(t => t.id !== id));
  };

  return { tasks, setTasks, addTask, toggleTask, deleteTask }; 
}