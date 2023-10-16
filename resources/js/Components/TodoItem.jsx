import { useForm, Link } from "@inertiajs/react";

export default function TodoItem({ todo }) {
    const { put, data, setData } = useForm({ completed: todo.completed });

    const handleCheckboxChange = () => {
        put(route("todos.update", todo.id), data);
        setData({ completed: !data.completed });
    };

    return (
        <div className="todo-item group">
            <input
                className="todo-checkbox"
                type="checkbox"
                checked={data.completed}
                onChange={handleCheckboxChange}
            />
            <span className={data.completed ? "line-through" : ""}>
                {todo.task}
            </span>
            <Link
                as="button"
                method="delete"
                href={route("todos.destroy", todo.id)}
                className="md:invisible w-3.5 cursor-pointer group-hover:visible"
                aria-label="Delete"
            >
                <img src="/images/icon-cross.svg" alt="cross-icon" />
            </Link>
        </div>
    );
}
