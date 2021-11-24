<template>
  <div class="todo_detail_container">
    <back-to-home />
    <div class="button_container">
      <va-button
        :rounded="false"
        :color="edit ? '#09ff00' : 'info'"
        @click="editTodo"
        >{{ edit ? "Save" : "Edit" }}</va-button
      >
      <va-button :rounded="false" color="danger" @click="removeTodo"
        >Remove</va-button
      >
    </div>
    <va-input
      :autosize="true"
      v-model="todo.title"
      :readonly="!edit"
      placeholder="title"
      :error="error"
      :error-message="errorMessage"
    ></va-input>
    <va-input
      :autosize="true"
      v-model="todo.description"
      :readonly="!edit"
      type="textarea"
      placeholder="description"
    ></va-input>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { store } from "@/store";
import BackToHome from "@/components/BackToHome.vue";

export default defineComponent({
  name: "ToDoDetailView",
  data: function () {
    const todo = store.state.todos.find(
      (ele) => `${ele.id}` === this.$route.params.id
    );
    return {
      error: false,
      errorMessage: "Title is required",
      edit: this.$route.query.edit === "true",
      currentId: this.$route.params.id,
      todo: todo
        ? { ...todo }
        : {
            title: "",
            description: "",
            completed: false,
            id: Number(this.$route.params.id),
          },
    };
  },
  created: function () {
    this.checkIfIdIsValid(this.currentId);
  },
  updated: function () {
    this.checkIfIdIsValid(this.currentId);
  },
  methods: {
    checkIfIdIsValid(id: any) {
      /*
        check that id is a valid number and that id is either a valid id within the todos array or
        that id is a new id, where new id is max(id) + 1 or id is 0. If no id exists, then max(id) is undefined, therefore
        we also need to check if id is 0.
      */
      if (
        isNaN(Number(id)) ||
        (!store.state.todos.find((todo) => todo.id === Number(id)) &&
          Math.max(...store.state.todos.map((todo) => todo.id)) + 1 !==
            Number(id) &&
          Number(id) !== 0)
      ) {
        this.$router.push("/404");
      }
    },
    removeTodo() {
      store.removeTodo(`${this!.todo!.id}`);
      this.$router.push("/");
    },
    editTodo() {
      if (this.edit) {
        if (!this.todo.title) {
          this.error = true;
          return;
        }

        //check if todo exists in store, if not add new one
        if (
          !store.state.todos.find((ele) => `${ele.id}` === `${this.todo.id}`)
        ) {
          store.addTodo(this.todo);
        }
        store.updateTodo(this.todo);
        this.error = false;
        this.edit = !this.edit;
        this.$router.push("/");
      } else {
        this.edit = !this.edit;
      }
    },
  },
  watch: {
    "$route.params": {
      handler() {
        const todo = store.state.todos.find(
          (ele) => `${ele.id}` === this.$route.params.id
        );

        (this.error = false),
          (this.edit = this.$route.query.edit === "true"),
          (this.currentId = this.$route.params.id),
          (this.todo = todo
            ? { ...todo }
            : {
                title: "",
                description: "",
                completed: false,
                id: Number(this.$route.params.id),
              });
      },
      immediate: true,
    },
  },
  components: {
    BackToHome,
  },
});
</script>

<style scoped lang="less">
.todo_detail_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  margin: 50px auto 0 auto;

  .va-input-wrapper {
    width: 100%;
  }

  > *:not(:last-child) {
    margin-bottom: 10px;
  }

  & > :first-child {
    align-self: flex-start;
  }
}

.button_container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  > :first-child {
    margin-right: 10px;
  }

  button {
    width: 100%;
  }
}

@media screen and (max-width: 900px) {
  .todo_detail_container {
    width: 80%;
  }
}
</style>
