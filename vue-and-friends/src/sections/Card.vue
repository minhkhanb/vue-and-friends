<template>
  <div class="card" @click="onClick">
    <h1>This is an card</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CardComponent",
  emits: ["cardClick"],
  props: {
    msg: String,
    dataId: String,
  },
  methods: {
    onClick() {
      console.log("onClick: ", this.dataId);
      this.$emit("cardClick", {
        dataId: this.dataId, // Type error!
      });
    },
  },
});
</script>
