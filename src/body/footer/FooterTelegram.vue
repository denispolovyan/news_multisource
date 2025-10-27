<template>
    <!-- Telegram -->
    <a href="https://t.me/multisource_news" target="_blank" class="footer__button footer-donate"
        :class="{ 'darkThemeFooter__button': darkTheme == 'true' }">
        <img src="@/images/footer/telegram.png" alt="telegram" class="footer__icon" />
    </a>
</template>

<script setup>
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