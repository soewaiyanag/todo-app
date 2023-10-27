import BackgroundImage from "@/Components/BackgroundImage";
import ControlPanel from "@/Components/ControlPanel";
import TodoItem from "@/Components/TodoItem";
import { Head, Link, useForm, router } from "@inertiajs/react";
import { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const reorderTodos = (todos, startIndex, endIndex) => {
    const result = [...todos];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

export default function Todo({ auth, todos: initialTodos, filterCompleted }) {
    const [todos, setTodos] = useState(initialTodos);

    const { data, setData, post, reset } = useForm({
        task: "",
    });
    const toggleDarkMode = () => {
        document.body.classList.toggle("dark");
    };

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

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (destination === null) return;

        const isSamePosition =
            destination.droppableId === source.droppableId &&
            destination.index === source.index;

        if (isSamePosition) return;

        setTodos(reorderTodos(todos, source.index, destination.index));

        router.patch(route("todos.update-order"), {
            draggableId,
            sourceIndex: source.index,
            destinationIndex: destination.index,
        });
    };

    const filteredTodos = todos.filter((todo) => {
        if (filterCompleted === null) return true;
        if (filterCompleted && todo.completed) return true;
        if (!filterCompleted && !todo.completed) return true;
        return false;
    });

    return (
        <div className="min-h-screen bg-very-light-gray px-6 pb-40 font-josefin transition-colors dark:bg-very-dark-blue">
            <Head title="Todo App" />
            <BackgroundImage />
            <div className="relative z-20 mx-auto mt-12 flex w-full max-w-sm items-center justify-between md:max-w-md">
                <Link href="/">
                    <h1 className="text-3xl font-bold tracking-[.35em] text-white">
                        TODO
                    </h1>
                </Link>
                <img
                    onClick={toggleDarkMode}
                    className="hidden h-6 w-6 cursor-pointer dark:block"
                    src="/images/icon-sun.svg"
                    aria-label="Light Mode"
                />
                <img
                    onClick={toggleDarkMode}
                    className="block h-6 w-6 cursor-pointer dark:hidden"
                    src="/images/icon-moon.svg"
                    aria-label="Dark Mode"
                />
            </div>
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

                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="mx-auto w-full max-w-sm rounded-md bg-white text-very-dark-grayish-blue shadow-all transition-colors dark:bg-very-dark-desaturated-blue dark:text-very-light-gray md:max-w-md">
                        <Droppable droppableId="todo-container">
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {filteredTodos.map(
                                        (filteredTodo, index) => (
                                            <TodoItem
                                                setTodos={setTodos}
                                                key={filteredTodo.id}
                                                todo={filteredTodo}
                                                index={index}
                                            />
                                        ),
                                    )}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                        {todos.length > 0 && (
                            <ControlPanel setTodos={setTodos} />
                        )}
                    </div>
                </DragDropContext>
            </div>
            {todos.length > 0 && (
                <small className="relative z-10 mt-10 block text-center transition-colors dark:text-very-light-grayish-blue">
                    Drag and drop to reorder list
                </small>
            )}
        </div>
    );
}
