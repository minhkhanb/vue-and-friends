<template>
  <div>
    <h1>Score {{ score }}</h1>

    <div class="cards" v-if="products.length > 0">
      <FlippedBox
        :key="index"
        v-for="(card, index) in products"
        :card="card"
        @input="flipCard"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Card, enumStatus } from "@/utils/games/flipped";
import { defineComponent } from "vue";
import FlippedBox from "./FlippedBox.vue";

const cardNum = 40;

export default defineComponent({
  name: "FlippedSection",
  components: {
    FlippedBox,
  },
  data() {
    return {
      products: [] as Card[],
      haveIt: [] as number[],
      level: 0,
      lockBoard: false,
      firstCard: null as Card | null,
      secondCard: null as Card | null,
      score: 0,
      time: 0,
      step: 0,
      interval: 0,
      timer: 0,
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
      return arr.sort(() => Math.round(Math.random()) - 0.5);
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

      this.haveIt = [];
    },
    disableCards() {
      this.resetBoard();

      this.score++;
      //   checkWin();
    },
    resetBoard() {
      this.lockBoard = false;
      this.firstCard = null;
      this.secondCard = null;

      if (this.timer) {
        clearTimeout(this.timer);
      }
    },
    reverseFlip(card: Card | null) {
      if (!card) return;

      this.lockBoard = true;

      const currentCard = this.products.find((item) => item.id === card.id);

      if (currentCard) {
        const currentCardIndex = this.products.indexOf(currentCard);

        if (currentCard.status === enumStatus.Flipped) {
          currentCard.status = enumStatus.Start;
        }

        this.products[currentCardIndex] = currentCard;
      }
    },
    reverseFlipCards() {
      this.lockBoard = true;

      this.timer = setTimeout(() => {
        this.reverseFlip(this.firstCard);
        this.reverseFlip(this.secondCard);

        this.resetBoard();
      }, 1000);
    },
    checkForMatch() {
      // Ki???m tra xem NAME c???a 2 CARD c?? gi???ng nhau kh??ng?
      let isMatch = this.firstCard?.name === this.secondCard?.name;
      // isMatch = true => x??a s??? ki???n click ??? 2 CARD ????
      // isMatch = false => ??p CARD xu???ng
      isMatch ? this.disableCards() : this.reverseFlipCards();
    },
    flipCard(card: Card) {
      if (this.lockBoard) {
        return;
      }

      //so we can not click twice on the same card
      if (card === this.firstCard) {
        return;
      }

      const currentCard = this.products.find((item) => item.id === card.id);

      if (currentCard) {
        const currentCardIndex = this.products.indexOf(currentCard);

        if (currentCard.status === enumStatus.Start) {
          currentCard.status = enumStatus.Flipped;
        }

        this.products[currentCardIndex] = currentCard;

        // Khi click CARD ?????u ti??n
        if (!this.firstCard) {
          this.firstCard = currentCard;
          return;
        }

        // Khi click CARD th??? 2
        this.secondCard = currentCard;
        this.checkForMatch();

        // Update step
        //   this.updateStep();
      }
    },
  },
  watch: {
    firstCard(value: Card) {
      console.log("firstCard", JSON.parse(JSON.stringify(value)));
    },
    secondCard(value: Card) {
      console.log("secondCard", JSON.parse(JSON.stringify(value)));
    },
  },
});
</script>

<style scoped lang="scss">
.cards {
  display: flex;
  flex-wrap: wrap;
}
</style>
