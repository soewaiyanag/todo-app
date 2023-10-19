import BackgroundImage from "@/Components/BackgroundImage";
import ControlPanel from "@/Components/ControlPanel";
import PrimaryButton from "@/Components/PrimaryButton";
import TodoItem from "@/Components/TodoItem";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Todo({ auth, todos, filterCompleted }) {
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
        <div className="font-josefin min-h-screen bg-very-light-gray dark:bg-very-dark-blue px-6 pb-40">
            <Head title="Todo App" />
            <BackgroundImage />
            <div className="flex max-w-sm md:max-w-md w-full justify-between items-center mx-auto mt-12 relative z-20">
                <Link href="/">
                    <h1 className="text-3xl font-bold text-white tracking-[.35em]">
                        TODO
                    </h1>
                </Link>
                <img
                    onClick={toggleDarkMode}
                    className="w-6 h-6 cursor-pointer hidden dark:block"
                    src="/images/icon-sun.svg"
                    aria-label="Light Mode"
                />
                <img
                    onClick={toggleDarkMode}
                    className="w-6 h-6 cursor-pointer block dark:hidden"
                    src="/images/icon-moon.svg"
                    aria-label="Dark Mode"
                />
            </div>
            <div className="relative z-20">
                <form onSubmit={submit} className="todo-form">
                    <div className="todo-checkbox border absolute"></div>
                    <input
                        type="text"
                        name="task"
                        id="task"
                        value={data.task}
                        onChange={(e) => setData("task", e.target.value)}
                        placeholder="Create a new todo..."
                        className="absolute min-w-full h-12 pl-[3.25rem] inset-0 outline-none rounded-md border-none bg-transparent dark:caret-white dark:text-very-light-grayish-blue"
                        aria-label="Create a new todo"
                        autoComplete="off"
                    />
                </form>

                <div className="rounded-md bg-white dark:bg-very-dark-desaturated-blue text-very-dark-grayish-blue dark:very-light-gray shadow-all max-w-sm md:max-w-md w-full mx-auto">
                    {todos.map((todo) => {
                        if (filterCompleted === null) {
                            return <TodoItem key={todo.id} todo={todo} />;
                        } else if (filterCompleted && todo.completed) {
                            return <TodoItem key={todo.id} todo={todo} />;
                        } else if (!filterCompleted && !todo.completed) {
                            return <TodoItem key={todo.id} todo={todo} />;
                        }
                        return null;
                    })}
                    {todos.length > 0 && <ControlPanel />}
                </div>
            </div>
            {todos.length > 0 && (
                <small className="text-center relative z-10 block mt-10 dark:text-very-light-grayish-blue">
                    Drag and drop to reorder list
                </small>
            )}
        </div>
    );
}
