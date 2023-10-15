import BackgroundImage from "@/Components/BackgroundImage";
import PrimaryButton from "@/Components/PrimaryButton";
import TodoItem from "@/Components/TodoItem";
import { Head, useForm } from "@inertiajs/react";
import clsx from "clsx";

export default function Todo({ auth, todos }) {
    const { data, setData, post, reset } = useForm({
        task: "",
    });

    const toggleDarkMode = () => {
        document.body.classList.toggle("dark");
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("todos.store"), { onSuccess: () => reset() });
    };

    return (
        <div className="font-josefin min-h-screen bg-very-light-gray dark:bg-very-dark-blue">
            <Head title="Todo App" />
            <BackgroundImage />
            <div className="flex max-w-sm w-full justify-between items-center mx-auto mt-12 relative z-20">
                <h1 className="text-3xl font-bold text-white tracking-[.35em]">
                    TODO
                </h1>
                <img
                    onClick={toggleDarkMode}
                    className="w-6 h-6 cursor-pointer hidden dark:block"
                    src="/images/icon-sun.svg"
                />
                <img
                    onClick={toggleDarkMode}
                    className="w-6 h-6 cursor-pointer block dark:hidden"
                    src="/images/icon-moon.svg"
                />
            </div>
            <div className="relative z-20">
                <form
                    onSubmit={submit}
                    className={clsx(
                        "px-4 py-4 mb-4 mt-8 flex items-center h-12",
                        "max-w-sm mx-auto relative rounded-md",
                        "bg-white dark:bg-very-dark-desaturated-blue"
                    )}
                >
                    <div className="todo-checkbox border absolute"></div>
                    <input
                        type="text"
                        name="task"
                        id="task"
                        value={data.task}
                        onChange={(e) => setData("task", e.target.value)}
                        placeholder="Create a new todo..."
                        className="absolute min-w-full h-12 pl-12 inset-0 outline-none rounded-md border-none bg-transparent dark:caret-white dark:text-very-light-grayish-blue"
                    />
                </form>

                <div className="rounded-md overflow-hidden shadow-md max-w-sm w-full mx-auto">
                    {todos.map((todo) => (
                        <TodoItem key={todo.id} todo={todo} />
                    ))}
                </div>
            </div>
        </div>
    );
}
