import { useState } from "react";
import Header from "../components/Header";
import TaskInput from "../components/TaskInput";
import TaskList from "../components/TaskList";

export default function Home() {
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-neutral-800">
      <Header />
      <main className="max-w-2xl mx-auto p-6">
        <TaskInput onAddTask={addTask} />
        <TaskList tasks={tasks} onDelete={deleteTask} />
      </main>
    </div>
  );
}
