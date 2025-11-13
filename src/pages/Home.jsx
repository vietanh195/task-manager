import { useState } from "react";
import TaskInput from "../components/TaskInput";
import TaskList from "../components/TaskList";
import { useTasks } from "../hooks/useTasks";

export default function Home() {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();
  const [sortBy, setSortBy] = useState("createdAt");

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <TaskInput onAdd={addTask} />

      <div className="flex justify-end mb-2">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="createdAt">Sort by Created</option>
          <option value="deadline">Sort by Deadline</option>
        </select>
      </div>

      <TaskList
        tasks={tasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
        sortBy={sortBy}
      />
    </div>
  );
}
