import { useState } from "react";

export default function TodoItem({ task }) {
    const [completed, setCompleted] = useState(false);

    const handleCheckboxChange = () => {
        setCompleted(!completed);
    };

    return (
        <div className="p-2 bg-white border-bottom border last:border-none grid grid-cols-[auto_1fr_auto] gap-4 items-center">
            <input
                className="todo-checkbox"
                type="checkbox"
                checked={completed}
                onChange={handleCheckboxChange}
            />
            <span className={completed ? "line-through" : ""}>{task}</span>
            <img
                src="/images/icon-cross.svg"
                alt="cross icon"
                className="w-3.5"
            />
        </div>
    );
}
