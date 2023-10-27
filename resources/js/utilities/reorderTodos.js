const reorderTodos = (todos, startIndex, endIndex) => {
    const result = [...todos];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

export default reorderTodos;
