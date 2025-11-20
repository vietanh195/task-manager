// sortTasks
export function sortTasks(tasks, sortBy = "createdAt") {
  return [...tasks].sort((a, b) => {
    // Lấy giá trị sắp xếp, nếu không có, dùng ngày hiện tại (hoặc 0)
    const dateA = new Date(a[sortBy] || 0);
    const dateB = new Date(b[sortBy] || 0);

    if (sortBy === "deadline") {
      // Deadline: Sắp xếp tăng dần (sớm nhất lên đầu)
      return dateA.getTime() - dateB.getTime();
    }
    // createdAt: Sắp xếp giảm dần (mới nhất lên đầu)
    return dateB.getTime() - dateA.getTime();
  });
}