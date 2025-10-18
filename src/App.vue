<template>
  <Header @categorySelected="handleCategory" @querySelected="handleQuery" @languageSelected="handleLanguage"></Header>
  <Main :category="selectedCategory" :query="selectedQuery" :language="selectedLanguage"></Main>
</template>

<script setup>
  import { ref } from "vue";
  import Main from "./body/Main.vue";
  import Header from "./body/Header.vue";

  const selectedCategory = ref(null);
  const selectedQuery = ref(null);
  const selectedLanguage = ref(null);

  function handleCategory(cat) {
    selectedCategory.value = cat;
  }

  function handleQuery(q) {
    selectedQuery.value = q;
  }

  function handleLanguage(lang){
    selectedLanguage.value = lang;
  }
</script>

<style>
.container{
  margin: 0px auto;
  max-width: 1200px;
  padding: 0px 15px;
}

  @media (max-width: 768px) {
  .container {
    padding: 0px 10px;
  }
  }
</style>
