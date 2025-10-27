<template>
  <div class="wrapper" :class="{ 'darkThemeHeader': darkTheme == 'true' }" id="header-container">
    <header class="header container">
      <HeaderTop :darkTheme="darkTheme"/>
      <HeaderParams :darkTheme="darkTheme" @categorySelected="handleCategory" @querySelected="handleQuery"
      @languageSelected="handleLanguage" @serverSelected="handleServer"/>
    </header>
  </div>
</template>

<script setup>
// base
import { ref, watch } from "vue";

// stores
import { themeValueStore } from '@/stores/themeValue';

// components
import HeaderTop from "./HeaderTop.vue";
import HeaderParams from "./HeaderParams.vue";

// emits
const emit = defineEmits([
  "categorySelected",
  "querySelected",
  "languageSelected",
  "serverSelected",
]);

// store consts
const themeStore = themeValueStore();

// consts 
const darkTheme = ref();

// Передаємо категорію
function handleCategory(cat) {
  emit("categorySelected", cat);
}

// Передаємо введений текст
function handleQuery(q) {
  emit("querySelected", q);
}

// Передаємо мову
function handleLanguage(lang) {
  emit("languageSelected", lang);
}

// Передаємо сервер
function handleServer(serv) {
  emit("serverSelected", serv);
}

// watch
watch(
  () => themeStore.theme,
  (newVal) => {
    darkTheme.value = newVal;
  }
)

</script>

<style scoped>
@import "@/css/header/header.css";
@import "@/css/dark.css";
</style>
