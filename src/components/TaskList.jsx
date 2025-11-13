// Task List
import TaskItem from "./TaskItem";
import { sortTasks } from "../utils/sortTasks";

export default function TaskList({ tasks, onDelete, onToggle, sortBy }) {
  const sortedTasks = sortTasks(tasks, sortBy);
  
  if (tasks.length === 0)
    return (
      <p className="text-neutral-400 text-center mt-8 italic">
        There are no task in here.
      </p>
    );

  return (
    <div className="flex flex-col gap-2 mt-6 space-y-3">
      {sortedTasks.map((task) => (
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
