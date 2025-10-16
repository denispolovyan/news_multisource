<template>
  <Header @categorySelected="handleCategory"></Header>
  <Main :category="selectedCategory"></Main>
</template>

<script setup>
import { ref } from "vue";
import Main from "./body/Main.vue";
import Header from "./body/Header.vue";

const selectedCategory = ref(null);

function handleCategory(code) {
  console.log("Вибрана категорія:", code);
  selectedCategory.value = code; 
}
</script>
