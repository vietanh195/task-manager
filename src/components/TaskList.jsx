import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onDelete, onToggle }) {
  if (tasks.length === 0)
    return (
      <p className="text-neutral-400 text-center mt-8 italic">
        There are no task in here.
      </p>
    );

  return (
    <div className="mt-4">
      {tasks.map((task) => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onToggle={onToggle}
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
}
