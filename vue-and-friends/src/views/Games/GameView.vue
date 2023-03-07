<template>
  <GameCollection />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GameCollection from "../../sections/GameCollection.vue";

export default defineComponent({
  name: "GameView",
  components: {
    GameCollection,
  },
});
</script>
