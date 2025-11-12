import { useEffect, useState } from "react";
import Header from "../components/Header";
import TaskInput from "../components/TaskInput";
import TaskList from "../components/TaskList";
import FilterBar from "../components/FilterBar";
import "@fontsource-variable/inter";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title) => {
    const newTask = {
      id: Date.now(),
      title,
      done: false,
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const visibleTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "active" && !task.done) ||
      (filter === "completed" && task.done);
    
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
  
    return matchesFilter && matchesSearch;
  })
  //   if (filter === "active") return !task.done;
  //   if (filter === "completed") return task.done;
  //   return true;
  // });

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-neutral-800">
      <Header />
      <main className="max-w-2xl mx-auto p-6">
        <TaskInput onAddTask={addTask} />
        <FilterBar
          filter={filter}
          setFilter={setFilter}
          search={search}
          setSearch={setSearch}
        />
        <TaskList
          tasks={visibleTasks}
          onDelete={deleteTask}
          onToggle={toggleTask}
        />
      </main>
    </div>
  );
}
