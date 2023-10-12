import BackgroundImage from "@/Components/BackgroundImage";
import PrimaryButton from "@/Components/PrimaryButton";
import TodoItem from "@/Components/TodoItem";
import { Link, Head, useForm } from "@inertiajs/react";

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
        <div className="font-josefin">
            <Head title="Todo App" />
            <BackgroundImage />
            <div className="flex max-w-sm w-full justify-between items-center mx-auto mt-12">
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
            <div>
                <form onSubmit={submit}>
                    <input
                        type="text"
                        name="task"
                        id="task"
                        value={data.task}
                        onChange={(e) => setData("task", e.target.value)}
                    />
                </form>

                {todos.map((todo) => (
                    <TodoItem task={todo.task} key={todo.id} />
                ))}
            </div>
        </div>
    );
}
