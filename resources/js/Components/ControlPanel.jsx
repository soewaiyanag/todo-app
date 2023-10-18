import { Link, usePage } from "@inertiajs/react";

export default function ControlPanel() {
    const { props } = usePage();

    const filterOptions = [
        { label: "All", value: "" },
        { label: "Active", value: "false" },
        { label: "Completed", value: "true" },
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
                        href={value === "" ? "/" : `/?completed=${value}`}
                        preserveScroll
                    >
                        {label}
                    </Link>
                ))}
            </div>
            <Link
                as="button"
                method="delete"
                href={route("todos.clear-completed")}
                className="clear-completed"
            >
                Clear Completed
            </Link>
        </div>
    );
}
