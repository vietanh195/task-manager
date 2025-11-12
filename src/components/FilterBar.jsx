export default function FilterBar({ filter, setFilter, search, setSearch }) {
    const filters = [
        { key: "all", label: "All" },
        { key: "active", label: "Active" },
        { key: "completed", label: "Completed" }
    ];

    return (
        <div className="flex justify-between items-center mt-6">
            <div className="space-x-2">
                {["all", "active", "completed"].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-3 py-1 rounded-full text-sm
                            ${
                                filter === f
                                ? "bg-blue-500 text-white"
                                : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
                            }`}
                    >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tasks..."
                className="px-4 py-2 rounded-lg border border-neutral-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-neutral-400 transition"
            />   
        </div>
    )
};

