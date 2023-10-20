import { useForm, Link, usePage } from "@inertiajs/react";
import { Draggable } from "react-beautiful-dnd";

export default function TodoItem({ todo, index }) {
    const { put, data, setData } = useForm({ completed: todo.completed });
    const { props } = usePage();

    const handleCheckboxChange = () => {
        put(route("todos.update", todo.id), data);
        setData({ completed: !data.completed });
    };

    return (
        <Draggable
            draggableId={`todo-${todo.id}`}
            index={index}
            isDragDisabled={props.filterCompleted !== null}
        >
            {(provided) => (
                <div
                    className="todo-item group"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <input
                        className="todo-checkbox"
                        type="checkbox"
                        checked={data.completed}
                        onChange={handleCheckboxChange}
                        aria-label="Checkbox"
                    />
                    <span
                        className={
                            data.completed
                                ? "text-dark-grayish-blue line-through"
                                : ""
                        }
                    >
                        {todo.task}
                    </span>
                    <Link
                        as="button"
                        method="delete"
                        href={route("todos.destroy", todo.id)}
                        className="w-3.5 cursor-pointer group-hover:visible md:invisible"
                        aria-label="Delete"
                        preserveScroll
                    >
                        <img src="/images/icon-cross.svg" alt="cross-icon" />
                    </Link>
                </div>
            )}
        </Draggable>
    );
}
