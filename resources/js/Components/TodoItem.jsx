import { useForm } from "@inertiajs/react";

export default function TodoItem({ todo }) {
    const { put, data, setData } = useForm({ completed: todo.completed });

    const handleCheckboxChange = () => {
        put(route("todos.update", todo), data);
        setData({ completed: !data.completed });
    };

    return (
        <div className="todo-item">
            <input
                className="todo-checkbox"
                type="checkbox"
                checked={data.completed}
                onChange={handleCheckboxChange}
            />
            <span className={data.completed ? "line-through" : ""}>
                {todo.task}
            </span>
            <img
                src="/images/icon-cross.svg"
                alt="cross-icon"
                className="w-3.5 cursor-pointer md:hidden"
            />
        </div>
    );
}
