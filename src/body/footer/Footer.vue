<template>
  <div class="wrapper" :class="{ 'darkThemeFooter': darkTheme == 'true' }">
    <footer class="container footer">
      <div class="footer__container">
        <div class="footer__left">
          <FooterMail />
        </div>
        <div class="footer__right">
          <FooterTelegram />
          <FooterDonate />
          <FooterScroll />
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { themeValueStore } from '@/stores/themeValue';

import FooterMail from "@/body/footer/FooterMail.vue";
import FooterTelegram from "@/body/footer/FooterTelegram.vue";
import FooterScroll from "@/body/footer/FooterScroll.vue";
import FooterDonate from "@/body/footer/FooterDonate.vue";


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