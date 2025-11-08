export default function FilterBar() {
    const filters = [
        { key: "all", label: "All" },
        { key: "active", label: "Active" },
        { key: "completed", label: "Completed" }
    ];

    return (
        <div className="flex justify-center gap-4 mt-6">
            {filters.map((filter) => (
                <button
                    key={filter.key}
                    className={`px-4 py-2 bg-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-300 transition
                        ${
                            filter === filter.key
                            ? "bg-primary text-white"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                >
                    {filter.label}
                </button>
            ))}
        </div>
    )
};

