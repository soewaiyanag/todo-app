import { router, usePage } from "@inertiajs/react";
import ControlPanel from "@/Components/ControlPanel";
import TodoItem from "@/Components/TodoItem";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import reorderTodos from "@/utilities/reorderTodos";

export default function TodoItems({ todos, setTodos }) {
    const { props } = usePage();
    const { filterCompleted } = props;

    const filteredTodos = todos.filter((todo) => {
        if (filterCompleted === null) return true;
        if (filterCompleted && todo.completed) return true;
        if (!filterCompleted && !todo.completed) return true;
        return false;
    });

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
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="mx-auto w-full max-w-sm rounded-md bg-white text-very-dark-grayish-blue shadow-all transition-colors dark:bg-very-dark-desaturated-blue dark:text-very-light-gray md:max-w-md">
                <Droppable droppableId="todo-container">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {filteredTodos.map((filteredTodo, index) => (
                                <TodoItem
                                    setTodos={setTodos}
                                    key={filteredTodo.id}
                                    todo={filteredTodo}
                                    index={index}
                                />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                {todos.length > 0 && <ControlPanel setTodos={setTodos} />}
            </div>
        </DragDropContext>
    );
}
