// Task Item
export default function TaskItem({ task, onDelete, onToggle }) {
  return (
    <div className="flex justify-between items-center bg-white border border-neutral-200 rounded-lg p-4 mb-2 hover:shadow-sm transition">
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
        className="accent-primary w-4 h-4 cursor-pointer"
      />
      <span 
        className={`${
          task.done
            ? "text-gray-400 line-through"
            : "text-text"  
        } transition`}
      >
        {task.title}
      </span>

      <button
        onClick={() => onDelete(task.id)}
        className="text-neutral-400 hover:text-red-500 transition"
      >
        ✕
      </button>
    </div>
  );
}
