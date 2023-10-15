import { useState } from "react";

export default function TodoItem({ task }) {
    const [completed, setCompleted] = useState(false);

    const handleCheckboxChange = () => {
        setCompleted(!completed);
    };

    return (
        <div className="todo-item">
            <input
                className="todo-checkbox"
                type="checkbox"
                checked={completed}
                onChange={handleCheckboxChange}
            />
            <span className={completed ? "line-through" : ""}>{task}</span>
            <img
                src="/images/icon-cross.svg"
                alt="cross-icon"
                className="w-3.5 cursor-pointer md:hidden"
                onClick={() => console.log("Delete task")}
            />
        </div>
    );
}
