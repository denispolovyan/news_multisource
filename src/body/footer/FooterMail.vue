<template>
    <a href="mailto:multisourcenews@gmail.com" class="footer__link footer-mail"
        :class="{ 'darkThemeFooter__button_mail': darkTheme == 'true' }">
        multisource@gmail.com
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