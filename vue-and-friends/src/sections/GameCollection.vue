<template>
  <div>
    <h1>Games</h1>

    <div class="games">
      <div class="game--card">
        <div class="card">
          <div class="card__face card__face--front">Flipped</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "GameCollection",
});
</script>

<style scoped>
.games {
  display: flex;
}

.game--card {
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
  font-size: 20px;
  backface-visibility: hidden;
}

.card__face--front {
  background: #5d4e9b;
}
</style>
