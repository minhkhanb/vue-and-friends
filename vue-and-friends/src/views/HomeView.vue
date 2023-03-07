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
  status: enumStatus;
}

const cardNum = 40;

export default defineComponent({
  name: "HomeView",
  data() {
    return {
      products: [] as Card[],
      pair: [],
      haveIt: [] as number[],
    };
  },

  created() {
    this.getProducts();
  },

  methods: {
    generateUniqueRandom(n: number): number {
      //Generate random number
      let randomNumber = (Math.random() * n).toFixed();

      //Coerce to number by boxing
      const boxNumber = Number(randomNumber);

      if (!this.haveIt.includes(boxNumber)) {
        this.haveIt.push(boxNumber);

        return boxNumber;
      } else {
        if (this.haveIt.length < n) {
          //Recursively generate number
          return this.generateUniqueRandom(n);
        } else {
          console.log("No more numbers available.");
          return 0;
        }
      }
    },

    shuffle(arr: number[]): number[] {
      return arr.sort(() => 0.5 - Math.random());
    },

    getProducts() {
      const cardsGenerated: number[] = Array.from(Array(cardNum / 2)).map(() =>
        this.generateUniqueRandom(cardNum)
      );

      const boxes: number[] = this.shuffle(
        cardsGenerated.concat(cardsGenerated)
      );

      this.products = boxes.map((box, index) => ({
        id: index.toString(),
        name: box.toString(),
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
  watch: {
    products(value: string) {
      console.log("products", JSON.stringify(value, null, 2));
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
  width: 150px;
  height: 150px;
  border: 1px solid #ccc;
  margin: 1px;
  perspective: 600px;
  user-select: none;
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
