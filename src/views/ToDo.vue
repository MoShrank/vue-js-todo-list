<template>
  <div class="">
    <input type="text" />
    <textarea></textarea>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { store } from "@/store";

export default defineComponent({
  name: "ToDoDetailView",
  data: function() {
    return {
      todo: store.state.todos.find((ele) => `${ele.id}` === this.$route.params.id),
    };
  },
  methods: {},
});
</script>
