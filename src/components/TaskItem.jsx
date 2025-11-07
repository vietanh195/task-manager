export default function TaskItem({ task, onDelete }) {
  return (
    <div className="flex justify-between items-center bg-white border border-neutral-200 rounded-lg p-4 mb-2 hover:shadow-sm transition">
      <span className="truncate">{task}</span>
      <button
        onClick={onDelete}
        className="text-neutral-400 hover:text-red-500 transition"
      >
        ✕
      </button>
    </div>
  );
}
