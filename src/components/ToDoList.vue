<template>
  <div>
    <va-input v-model="searchQuery"
      type="search"
      id="todo-search"
      aria-label="Search through todos"
    />
    <ul>
      <li v-for="todo in searchTodos" :key="todo.id">
        <div class="todo_container">
          <input
            type="checkbox"
            v-model="todo.completed"
            v-on:change="removeTodo"
            :id="todo.id"
          />
          <router-link :to="'/todo/' + todo.id">
            {{ todo.title }}
          </router-link>
        </div>
      </li>
    </ul>
    <button @click="addTodo">Add Todo</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { store } from "@/store";
import { search } from "@/utils";

export default defineComponent({
  name: "ToDoList",
  data: () => {
    return {
      todos: store.state.todos,
      searchQuery: "",
    };
  },
  methods: {
    addTodo() {
      store.addTodo();
    },
    removeTodo(event: Event) {
      store.removeTodo(event!.target!.id);
    },
  },
  computed: {
    searchTodos() {
      if (this.searchQuery && this.searchQuery.length > 3) {
        return search(this.todos, this.searchQuery);
      }

      return this.todos;
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.todo_container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 40px;
  width: 270px;
  border: 1px solid #ccc;
  padding: 0.5em;

  input[type="checkbox"] {
    margin-right: 0.5em;
    transform: scale(1.5);
  }
}

input[type="search"] {
  height: 40px;
  width: 200px;
  padding: 0.5em;

  &:focus {
    outline: none;
  }
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
