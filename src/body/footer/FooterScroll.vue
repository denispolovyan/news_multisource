<template>
  <button class="footer__button footer__top" :class="{ 'darkThemeFooter__button': darkTheme == 'true' }"
    @click="scrollToTop()">
    <img src="@/images/footer/arrow-up.png" alt="arrow up" class="footer__icon" />
  </button>
</template>

<script setup>
import { scrollToTop } from '@/functions.js'

const props = defineProps({
    darkTheme: {
    type: String,
    default: null,
  }
});
</script>

<style scoped>
@import "@/css/footer/footer.css";
@import "@/css/dark.css";
</style>