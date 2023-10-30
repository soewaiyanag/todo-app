import BackgroundImage from "@/Components/BackgroundImage";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";
import TodoItems from "@/Components/TodoItems";
import Header from "@/Components/Header";

export default function App({ auth, todos: initialTodos }) {
    const [todos, setTodos] = useState(initialTodos);

    const { data, setData, post, reset } = useForm({
        task: "",
    });

    const submit = (e) => {
        e.preventDefault();

        if (data.task.trim() === "") return;

        const maxId = todos.reduce((max, todo) => {
            return todo.id > max ? todo.id : max;
        }, 0);

        setTodos([
            {
                id: maxId + 1,
                task: data.task,
                position: todos.length + 1,
                user_id: auth.user?.id,
            },
            ...todos,
        ]);
        post(route("todos.store"), { onSuccess: () => reset() });
    };

    return (
        <div className="min-h-screen bg-very-light-gray px-6 pb-40 font-josefin transition-colors dark:bg-very-dark-blue">
            <Head title="Todo App" />
            <BackgroundImage />
            <Header />
            <div className="relative z-20">
                <form onSubmit={submit} className="todo-form">
                    <div className="todo-checkbox absolute border"></div>
                    <input
                        type="text"
                        name="task"
                        id="task"
                        value={data.task}
                        onChange={(e) => setData("task", e.target.value)}
                        placeholder="Create a new todo..."
                        className="absolute inset-0 h-12 min-w-full rounded-md border-none bg-transparent pl-[3.25rem] outline-none dark:text-very-light-grayish-blue dark:caret-white"
                        aria-label="Create a new todo"
                        autoComplete="off"
                        required
                    />
                </form>
                <TodoItems todos={todos} setTodos={setTodos} />
            </div>
            {todos.length > 0 && (
                <small className="relative z-10 mt-10 block text-center transition-colors dark:text-very-light-grayish-blue">
                    Drag and drop to reorder list
                </small>
            )}
        </div>
    );
}
