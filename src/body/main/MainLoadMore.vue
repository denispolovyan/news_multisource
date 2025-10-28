<template>
  <div class="load-more">
    <button class="load-more__button" @click="loadMore">
      БІЛЬШЕ НОВИН
    </button>
  </div>
</template>

<script setup>
function loadMore() {
  console.log("Кнопку 'Завантажити більше' натиснуто!");
}
</script>

<style scoped>
@import "@/css/main/loadMore.css";
</style>
