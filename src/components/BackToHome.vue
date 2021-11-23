<template>
  <router-link class="arrow_container" to="/">
    <div class="arrow_content_container">
      <div>
        <i class="arrow" />
      </div>
      <p>go back</p>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BackToHome",
});
</script>

<style scoped lang="less">
.arrow_container {
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
}

.arrow_content_container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.arrow_container:hover {
  cursor: pointer;
}

.arrow_content_container > p {
  font-size: 1.3em;
  margin: 0 0 4px 4px;
}

.arrow {
  border: solid black;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 5px;
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
}
</style>
