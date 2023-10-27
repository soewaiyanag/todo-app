import { Link, usePage, router } from "@inertiajs/react";

export default function ControlPanel({ setTodos }) {
    const { props } = usePage();

    const filterOptions = [
        { label: "All", value: null },
        { label: "Active", value: false },
        { label: "Completed", value: true },
    ];

    return (
        <div className="control-panel">
            <span>
                {props.todos.filter((todo) => !todo.completed).length} items
                left
            </span>
            <div className="filters">
                {filterOptions.map(({ label, value }) => (
                    <Link
                        as="button"
                        key={label.toLowerCase()}
                        href={value === null ? "/" : `/?completed=${value}`}
                        preserveScroll
                        className={
                            props.filterCompleted === value
                                ? "text-bright-blue"
                                : ""
                        }
                    >
                        {label}
                    </Link>
                ))}
            </div>
            <button
                className="clear-completed"
                onClick={() => {
                    setTodos(props.todos.filter((todo) => !todo.completed));
                    router.delete(route("todos.clear-completed"));
                }}
            >
                Clear Completed
            </button>
        </div>
    );
}
