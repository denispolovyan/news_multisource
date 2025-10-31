<template>
  <!-- Верхня частина -->
  <div class="header__up">
    <div class="header__up_left">
      <div class="header__logo" :class="{ 'darkThemeHeader__logo': darkTheme == 'true' }">
        News bag
        <img src="@/images/header/logo.png" alt="bag logo"/>
      </div>
    </div>

    <div class="header__up_right">
      <!-- Перемикач теми -->
      <div class="theme-toggle" :class="{ 'darkThemeHeader__button': darkTheme == 'true' }">
        <input type="checkbox" id="theme-switch" class="theme-checkbox" v-model="darkThemeSwitch"
          @click="changeTheme($event.target.checked)" />
        <label for="theme-switch" class="theme-toggle-label">
          <div class="theme-icons">
            <svg class="icon sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12 18a6 6 0 100-12 6 6 0 000 12zM12 1v2m0 18v2m11-11h-2M3 12H1m16.95 7.07l1.41 1.41M4.64 4.64L3.22 3.22m0 17.56l1.42-1.42M19.36 4.64l1.42-1.42" />
            </svg>
            <svg class="icon moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
            </svg>
          </div>
          <div class="toggle-slider"></div>
        </label>
      </div>

      <!-- Бургер -->
      <div :class="{ 'darkThemeHeader__burger': darkTheme == 'true' }" @click="openMenu()">
        <div class="burger" :class="[{ active: isMenuOpen }]">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// base
import { ref, onMounted, watch } from "vue";
// functions
import { returnStringifiedTheme } from "@/functions";
// store
import { themeValueStore } from '@/stores/themeValue';
import { menuStateStore } from '@/stores/menuState';

// props
const props = defineProps({
  darkTheme: {
    type: String,
    default: null,
  }
});

// store consts
const themeStore = themeValueStore();
const menuStore = menuStateStore();

// consts 
const darkTheme = ref();
const darkThemeSwitch = ref();

let isMenuOpen = ref(false);

// Передаємо стан меню
function openMenu() {
  isMenuOpen.value = !isMenuOpen.value;
  menuStore.setMenuState(isMenuOpen.value);
}

// змінюємо значення теми 
function changeTheme(theme) {
  localStorage.setItem('theme', returnStringifiedTheme(theme));
  themeStore.setTheme(returnStringifiedTheme(theme));
}

// watch
watch(
  () => themeStore.theme,
  (newVal) => {
    darkTheme.value = newVal;
  }
)
watch(
  () => menuStore.menuState,
  (newVal) => {
    isMenuOpen.value = newVal;
  }
)

// ONMOUNTED
onMounted(() => {
  // підтягнути тему і положення світча
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme == null) {
    themeStore.theme = 'false';
  } else {
    darkThemeSwitch.value = (savedTheme === 'true') ? true : false;
    themeStore.setTheme(savedTheme);
    
  }
});
</script>

<style scoped>
@import "@/css/header/header.css";
@import "@/css/dark.css";
</style>
