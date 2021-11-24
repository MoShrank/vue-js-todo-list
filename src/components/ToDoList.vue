<template>
  <div class="container">
    <va-input
      v-model="searchQuery"
      placeholder="Search ToDos"
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
            @change="onCheck"
            :id="todo.id"
          />
          <router-link :to="'/todo/' + todo.id">
            {{ todo.title }}
          </router-link>
        </div>
      </li>
    </ul>
    <va-button :rounded="false" @click="addTodo">Add Todo</va-button>
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
      const id = Math.max(...store.state.todos.map((todo) => todo.id)) + 1;
      this.$router.push({
        name: "todo",
        params: { id },
        query: { edit: "true" },
      });
    },
    onCheck() {
      store.saveTodos();
    },
  },
  computed: {
    searchTodos() {
      let todos;
      if (this.searchQuery && this.searchQuery.length > 3) {
        todos = search(this.todos, this.searchQuery);
      } else {
        todos = this.todos;
      }

      return todos.filter((todo) => !todo.completed);
    },
  },
});
</script>

<style scoped lang="less">
.container {
  width: 50%;
  padding-top: 50px;
  margin: auto;

  > *:not(:last-child) {
    margin-bottom: 20px;
  }
}

.todo_container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 40px;
  width: 100%;
  border: 2px solid #ccc;
  border-top: none;
  padding: 0.5em;
  border-radius: 2px;
  overflow: hidden;

  input[type="checkbox"] {
    margin-right: 0.5em;
    transform: scale(1.5);
  }
}

ul > li:first-child {
  border-top: 2px solid #ccc;
}

input[type="search"] {
  height: 40px;
  width: 200px;
  padding: 0.5em;

  &:focus {
    outline: none;
  }
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
  color: black;
}

@media screen and (max-width: 900px) {
  .container {
    width: 80%;
  }
}
</style>
