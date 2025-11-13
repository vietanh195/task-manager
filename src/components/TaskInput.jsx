//Task Input
import { useState } from "react";
import { Plus } from "lucide-react";

export default function TaskInput({ onAdd }) {
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");

  // const handleAdd = () => {
  //   if (task.trim() === "") return;
  //   onAdd(task);
  //   setTask("");
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(title, deadline);
    setTitle("");
    setDeadline("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 mb-4">
      <input
        type="text"
        placeholder="Task name..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 border rounded px-3 py-2"
      />
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        className="border rounded px-3 py-2"
      />
      <button className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600">
        Add
      </button>
    </form>
  );
}
