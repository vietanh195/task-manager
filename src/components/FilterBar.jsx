// FilterBar

export default function FilterBar({ filter, setFilter, search, setSearch }) {
    const filterOptions = [
        { key: "all", label: "Tất cả" },
        { key: "todo", label: "Cần Làm" },
        { key: "in-progress", label: "Đang Làm" },
        { key: "done", label: "Hoàn Thành" }
    ];

    return (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <div className="flex flex-wrap gap-2 mb-3 sm:mb-0">
                {filterOptions.map((f) => (
                    <button
                        key={f.key}
                        onClick={() => setFilter(f.key)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition active:scale-[0.98]
                            ${
                                filter === f.key
                                ? "bg-blue-600 text-white shadow-md"
                                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                            }`}
                    >
                        {f.label}
                    </button>
                ))}
            </div>
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm kiếm công việc..."
                className="w-full sm:w-64 px-4 py-2 rounded-lg border border-neutral-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-neutral-400 transition"
            />   
        </div>
    )
};