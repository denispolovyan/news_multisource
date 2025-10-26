<template>
    <a href="mailto:multisourcenews@gmail.com" class="footer__link footer-mail"
        :class="{ 'darkThemeFooter__button_mail': darkTheme == 'true' }">
        multisource@gmail.com
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