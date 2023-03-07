<template>
  <div class="cards" v-if="products.length > 0">
    <div
      v-for="(card, index) in products"
      :key="index"
      class="scene scene--card"
    >
      <div
        class="card"
        @click="onCardClick(card.id)"
        v-bind:class="{ flipme: card.status == 'Flipped' }"
      >
        <div class="card__face card__face--front">{{ card.name }}</div>
        <div class="card__face card__face--back">{{ card.name }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

enum enumStatus {
  Start = "Start",
  Flipped = "Flipped",
}

interface Card {
  id: string;
  name: string;
  status: string;
}

export default defineComponent({
  name: "HomeView",
  data() {
    return {
      products: [] as Card[],
      pair: [],
    };
  },

  created() {
    this.getProducts();
  },

  methods: {
    getProducts() {
      this.products = Array.from(Array(10)).map((item, index) => ({
        id: index.toString(),
        name: index.toString(),
        status: enumStatus.Start,
      }));
    },
    onCardClick(cardId: string) {
      const currentCard = this.products.find((product) => product.id == cardId);

      if (currentCard) {
        const currentCardIndex = this.products.indexOf(currentCard);

        if (currentCard.status === enumStatus.Start) {
          currentCard.status = enumStatus.Flipped;
        }

        this.products[currentCardIndex] = currentCard;
      }
    },
  },
});
</script>

<style scoped>
body {
  font-family: sans-serif;
}

.cards {
  display: flex;
  flex-wrap: wrap;
}

.scene {
  width: 200px;
  height: 200px;
  border: 1px solid #ccc;
  margin: 0;
  perspective: 600px;
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
  line-height: 200px;
  color: white;
  text-align: center;
  font-weight: bold;
  font-size: 40px;
  backface-visibility: hidden;
}

.card__face--front {
  background: red;
}

.card__face--back {
  background: blue;
  transform: rotateY(180deg);
}

/* this style is applied when the card is clicked */
.flipme {
  transform: rotateY(180deg);
}
</style>
