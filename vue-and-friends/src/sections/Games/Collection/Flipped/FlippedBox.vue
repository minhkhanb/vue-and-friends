<template>
  <div class="scene scene--card">
    <div
      class="card"
      @click="flipCard($event, box)"
      v-bind:class="{ flipme: box.status == 'Flipped' }"
    >
      <div class="card__face card__face--front"></div>
      <div class="card__face card__face--back">{{ box.name }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Card } from "@/utils/games/flipped";
import { defineComponent } from "vue";

export default defineComponent({
  name: "FlippedBox",
  props: {
    modelValue: String,
    card: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      box: this.card as Card,
    };
  },
  methods: {
    flipCard(evt: Event, card: Card) {
      this.$emit("input", card);
    },
  },
});
</script>

<style scoped lang="scss">
.scene {
  width: 150px;
  height: 150px;
  border: 1px solid #ccc;
  margin: 1px;
  perspective: 600px;
  user-select: none;
  animation: anim 0.5s;
}

.card {
  width: 100%;
  height: 100%;
  transition: transform 1s;
  transform-style: preserve-3d;
  cursor: pointer;
  position: relative;
}

.card__face {
  position: absolute;
  width: 100%;
  height: 100%;
  line-height: 150px;
  color: white;
  text-align: center;
  font-weight: bold;
  font-size: 40px;
  backface-visibility: hidden;
}

.card__face--front {
  background: #5d4e9b;
}

.card__face--back {
  background: #0095ff;
  transform: rotateY(180deg);
}

/* this style is applied when the card is clicked */
.flipme {
  transform: rotateY(180deg);
}
</style>
