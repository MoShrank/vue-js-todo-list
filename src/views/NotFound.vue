<template>
  <div class="not_found_container">
    <back-to-home />
    <p>&nbsp;404. ToDo could not be found :(</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BackToHome from "@/components/BackToHome.vue";

export default defineComponent({
  name: "NotFound",
  components: {
    BackToHome: BackToHome,
  },
});
</script>

<style scoped lang="less">
.not_found_container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 50%;
  margin: 50px auto 0 auto;

  p {
    font-size: 1.3em;
    margin-bottom: 4px;
  }
}

@media screen and (max-width: 900px) {
  .not_found_container {
    flex-direction: column;
    width: 80%;

    p {
      margin-top: 20px;
    }
  }
}
</style>
