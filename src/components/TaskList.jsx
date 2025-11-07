import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onDelete }) {
  if (tasks.length === 0)
    return (
      <p className="text-neutral-400 text-center mt-8 italic">
        Chưa có công việc nào.
      </p>
    );

  return (
    <div className="mt-6">
      {tasks.map((task, index) => (
        <TaskItem key={index} task={task} onDelete={() => onDelete(index)} />
      ))}
    </div>
  );
}
