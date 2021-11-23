import { reactive } from "vue";

interface todoI {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface stateI {
  todos: Array<todoI>;
}

const storage = window.localStorage;
const todosString = storage.getItem("todos");

let todos = [];

if (todosString) {
  try {
    todos = JSON.parse(todosString);
  } catch (_) {
    todos = [];
  }
}

const state: stateI = {
  todos: todos,
};

const store = {
  state: reactive(state),
  saveTodos(todos: Array<todoI>): void {
    const todosString = JSON.stringify(todos);
    storage.setItem("todos", todosString);
  },
  addTodo(todo: todoI): void {
    this.state.todos.push(todo);
    this.saveTodos(this.state.todos);
  },
  removeTodo(id: string): void {
    // remove element from array in place matching certain condition
    const idx = this.state.todos.findIndex((todo) => todo.id === Number(id));
    this.state.todos.splice(idx, 1);
    this.saveTodos(this.state.todos);
  },
};

export { store, todoI };
