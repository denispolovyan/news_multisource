<template>
  <button class="footer__button footer__top" :class="{ 'darkThemeFooter__button': darkTheme == 'true' }"
    @click="scrollToTop()">
    <img src="@/images/footer/arrow-up.png" alt="arrow up" class="footer__icon" />
  </button>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { themeValueStore } from '@/stores/themeValue';
import { scrollToTop } from '@/functions.js'

const themeStore = themeValueStore();
const darkTheme = ref();

watch(
  () => themeStore.theme,
  (newVal) => {
    darkTheme.value = newVal;
  }
)

onMounted(() => {
  darkTheme.value = localStorage.getItem('theme');
});
</script>

<style scoped>
@import "@/css/footer/footer.css";
@import "@/css/dark.css";
</style>