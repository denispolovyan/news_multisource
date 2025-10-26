<template>
    <!-- Donate -->
    <button class="footer__button footer-donate" :class="{ 'darkThemeFooter__button': darkTheme == 'true' }"
        @click="openDonate()">
        <img src="@/images/footer/donate.png" alt="donate" class="footer__icon" />
    </button>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { themeValueStore } from '@/stores/themeValue';
import { donateStateStore } from '@/stores/donateState'

// theme const
const themeStore = themeValueStore();
const darkTheme = ref();

// donate const
const donateStore = donateStateStore();
const donateState = ref(false);

// show or hide donate module
function openDonate(){
    donateState.value = !donateState.value;
    donateStore.setDonateState(donateState.value);
}

// watch theme
watch(
    () => themeStore.theme,
    (newVal) => {
        darkTheme.value = newVal;
    }
)

// watch donate
watch(
  () => donateStore.donateState,
  (newVal) => {
    donateState.value = newVal;

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