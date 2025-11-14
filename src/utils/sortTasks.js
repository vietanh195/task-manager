// sortTasks
export function sortTasks(tasks, sortBy = "createdAt") {
  return [...tasks].sort((a, b) => {
    if (sortBy === "deadline") {
      return new Date(a.deadline) - new Date(b.deadline);
    }
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
}
