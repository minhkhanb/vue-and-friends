<template>
  <div>
    <h1>Anim</h1>
    <button @click="onStart">Start</button>

    <div class="container">
      <div
        class="item"
        v-for="item in items"
        :key="item.id"
        :style="{
          position: 'absolute',
          top: `${item.y}px`,
          left: `${item.x}px`,
        }"
        @animationstart="onLoad(item)"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface Item {
  id: string;
  name: string;
  x: number;
  y: number;
}

export default defineComponent({
  name: "AnimGame",
  data() {
    return {
      lockBoard: false,
      items: [] as Item[],
      timer: 0,
    };
  },
  methods: {
    onLoad(item: Item) {
      this.$nextTick(() => {
        console.log("load: ", JSON.parse(JSON.stringify(item)));
        const index = this.items.findIndex((e) => e.id == item.id);

        if (index !== -1) {
          this.items[index] = {
            id: item.id,
            name: item.name,
            x: Math.floor(Math.random() * (1250 - 40)) + 1,
            y: Math.floor(Math.random() * (750 - 40)) + 1,
          };
        }
      });
    },
    generateItems() {
      const item: Item = {
        id: this.items.length.toString(),
        name: this.items.length.toString(),
        x: 1250 / 2,
        y: 750 / 2,
      };

      this.items.push(item);
    },
    onStart() {
      if (this.lockBoard) {
        return;
      }

      if (this.timer) {
        clearTimeout(this.timer);
      }

      this.generateItems();

      // this.lockBoard = true;
      this.timer = setTimeout(() => this.onStart(), 800);
    },
  },
});
</script>

<style scoped lang="scss">
.container {
  position: relative;
  border: 1px solid gray;
  width: 1250px;
  height: 750px;
  overflow: hidden;
}

.item {
  width: 40px;
  height: 40px;
  background: #dbdbdb;
  border: 1px solid gray;
  transition: all 0.3s;
  animation: move 0.5s;
}

@keyframes move {
  0% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
}
</style>
