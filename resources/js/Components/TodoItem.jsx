import { useForm, usePage, router } from "@inertiajs/react";
import { Draggable } from "react-beautiful-dnd";
import clsx from "clsx";

export default function TodoItem({ todo, index, setTodos }) {
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
            {(provided, snapshot) => (
                <div
                    className={clsx(
                        "todo-item group",
                        snapshot.isDragging
                            ? "rounded-md border-none shadow-md"
                            : null,
                    )}
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
                                : null
                        }
                    >
                        {todo.task}
                    </span>
                    <button
                        className="w-3.5 cursor-pointer group-hover:visible md:invisible"
                        aria-label="Delete"
                        onClick={() => {
                            setTodos(
                                props.todos.filter((td) => td.id !== todo.id),
                            );
                            router.delete(route("todos.destroy", todo.id));
                        }}
                    >
                        <img src="/images/icon-cross.svg" alt="cross-icon" />
                    </button>
                </div>
            )}
        </Draggable>
    );
}
