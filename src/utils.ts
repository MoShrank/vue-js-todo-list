import { todoI } from "@/store";

export const search = (todos: Array<todoI>, query: string | null): Array<todoI> => {
    if (!query || query.length <= 3) {
        return todos;
    }

    return todos.filter(todo => {
        return todo.title.toLowerCase().includes(query.toLowerCase());
    });
}