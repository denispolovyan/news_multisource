<template>
    <!-- Telegram -->
    <a href="https://t.me/multisource_news" target="_blank" class="footer__button footer-donate"
        :class="{ 'darkThemeFooter__button': darkTheme == 'true' }">
        <img src="@/images/footer/telegram.png" alt="telegram" class="footer__icon" />
    </a>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { themeValueStore } from '@/stores/themeValue';

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