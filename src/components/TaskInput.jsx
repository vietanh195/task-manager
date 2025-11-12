//Task Input
import { useState } from "react";
import { Plus } from "lucide-react";

export default function TaskInput({ onAddTask }) {
  const [task, setTask] = useState("");

  const handleAdd = () => {
    if (task.trim() === "") return;
    onAddTask(task);
    setTask("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAdd();
  };

  return (
    <div className="flex gap-3 mt-6">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add new task..."
        className="flex-1 px-4 py-3 rounded-lg border border-neutral-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-neutral-400 transition"
      />
      <button
        onClick={handleAdd}
        className="px-5 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition active:scale-[0.98]"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
