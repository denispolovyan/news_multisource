<template>
  <div class="wrapper" :class="{ 'darkThemeFooter': darkTheme == 'true' }">
    <footer class="container footer">
      <div class="footer__container">
        <div class="footer__left">
          <FooterMail :darkTheme="darkTheme"/>
        </div>
        <div class="footer__right">
          <FooterTelegram :darkTheme="darkTheme"/>
          <FooterDonate :darkTheme="darkTheme"/>
          <FooterScroll :darkTheme="darkTheme"/>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
// base
import { ref, onMounted, watch } from "vue";

// store
import { themeValueStore } from '@/stores/themeValue';

// compomemts
import FooterMail from "@/body/footer/FooterMail.vue";
import FooterTelegram from "@/body/footer/FooterTelegram.vue";
import FooterScroll from "@/body/footer/FooterScroll.vue";
import FooterDonate from "@/body/footer/FooterDonate.vue";

// theme
const themeStore = themeValueStore();
const darkTheme = ref('false');

// watch
watch(
  () => themeStore.theme,
  (newVal) => {
    darkTheme.value = newVal;
  }
)

// ONMOUNTED
onMounted(() => {
  darkTheme.value = localStorage.getItem('theme');
});
</script>

<style scoped>
@import "@/css/footer/footer.css";
@import "@/css/dark.css";
</style>