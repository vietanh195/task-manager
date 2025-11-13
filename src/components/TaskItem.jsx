// Task Item
export default function TaskItem({ task, onDelete, onToggle }) {
  return (
    <div
      className={`flex justify-between items-center p-3 border rounded ${
        task.done ? "bg-green-50" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => onToggle(task.id)}
        />
        <div>
          <p className={`${task.done ? "line-through text-gray-500" : ""}`}>
            {task.title}
          </p>
          {task.deadline && (
            <p className="text-sm text-gray-400">
              Deadline: {task.deadline}
            </p>
          )}
        </div>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        className="text-red-500 hover:text-red-700"
      >
        ✕
      </button>
    </div>
  );
}
