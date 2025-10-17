<template>
  <Header @categorySelected="handleCategory" @querySelected="handleQuery"></Header>
  <Main :category="selectedCategory" :query="selectedQuery"></Main>
</template>

<script setup>
  import { ref } from "vue";
  import Main from "./body/Main.vue";
  import Header from "./body/Header.vue";

  const selectedCategory = ref(null);
  const selectedQuery = ref(null);


  function handleCategory(cat) {
    selectedCategory.value = cat;
  }

  function handleQuery(q) {
    selectedQuery.value = q;
  }
</script>
