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
      edit: this.$route.query.edit === "true",
      currentId: this.$route.params.id,
      todo: todo
        ? todo
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
      if (
        isNaN(Number(id)) ||
        Number(this.$route.params.id) > store.state.todos.length
      ) {
        this.$router.push("/404");
      }
    },
    removeTodo() {
      store.removeTodo(`${this!.todo!.id}`);
      this.$router.push({ name: "Home" });
    },
    editTodo() {
      //check if todo exists in store, if not add new one
      if (!store.state.todos.find((ele) => `${ele.id}` === `${this.todo.id}`)) {
        store.addTodo(this.todo);
      }
      store.saveTodos();
      this.edit = !this.edit;
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
</style>
