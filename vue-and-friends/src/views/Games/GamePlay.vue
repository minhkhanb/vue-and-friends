<template>
  <div class="game-play">
    <h1>Playing</h1>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "GamePlay",
});
</script>
