import { reactive, transformVNodeArgs } from "vue";

import { search } from "@/utils";

interface todoI {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

interface stateI {
    todos: Array<todoI>;
}

const state: stateI = {
    todos: [{
        id: 0,
        title: 'Learn Vue',
        description: 'Learn Vue.js',
        completed: false
    },
    {
        id: 1,
        title: 'Learn Vue',
        description: 'Learn Vue.js',
        completed: false
    },
    {
        id: 2,
        title: 'Learn Vue',
        description: 'Learn Vue.js',
        completed: false
    },{
        id: 3,
        title: 'Learn Vue',
        description: 'Learn Vue.js',
        completed: false
    }],
};

const store = { 
    state: reactive(state),
    addTodo() {
        this.state.todos.push({
            id: state.todos.length + 1,
            title: '',
            description: '',
            completed: false
        });
    },
    removeTodo(id: string) {
        this.state.todos = this.state.todos.filter(todo => `${todo.id}` !== id);
    }
}

export { store, todoI };
