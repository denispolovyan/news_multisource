<template>
  <div class="wrapper" :class="{ 'darkThemeHeader': darkTheme == 'true' }" id="header-container">
    <header class="header container">
      <!-- Верхня частина -->
      <div class="header__up">
        <div class="header__up_left">
          <div class="header__logo" :class="{ 'darkThemeHeader__logo': darkTheme == 'true' }">
            News bag
            <img src="../images/logo.png" alt="bag logo" />
          </div>
        </div>

        <div class="header__up_right">
          <!-- Перемикач теми -->
          <div class="theme-toggle" :class="{ 'darkThemeHeader__button': darkTheme == 'true' }">
            <input
              type="checkbox"
              id="theme-switch"
              class="theme-checkbox"
              v-model="darkThemeSwitch"
              @click="changeTheme($event.target.checked)"
            />
            <label for="theme-switch" class="theme-toggle-label">
              <div class="theme-icons">
                <svg class="icon sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12 18a6 6 0 100-12 6 6 0 000 12zM12 1v2m0 18v2m11-11h-2M3 12H1m16.95 7.07l1.41 1.41M4.64 4.64L3.22 3.22m0 17.56l1.42-1.42M19.36 4.64l1.42-1.42"
                  />
                </svg>
                <svg class="icon moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
                </svg>
              </div>
              <div class="toggle-slider"></div>
            </label>
          </div>

          <!-- Бургер -->
          <div :class="{ 'darkThemeHeader__burger': darkTheme == 'true' }">
            <div class="burger" @click="isMenuOpen = !isMenuOpen" :class="[{ active: isMenuOpen }]">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>

      <!-- Нижня частина -->
      <div class="header__down">
        <div>
          <select class="header__server header__button" @change="selectServer($event.target.value)">
            <option v-for="(serv, index) in SERVER" :key="index" :value="serv">
              {{ serv }}
            </option>
          </select>
        </div>

        <div>
          <select
            v-model="languageValue"
            class="header__language header__button"
            @change="selectLanguage($event.target.value)"
          >
            <option v-for="(lang, index) in languagesValues" :key="index" :value="lang">
              {{ lang[1] }}
            </option>
          </select>
        </div>

        <div>
          <select
            v-model="categoryValue"
            class="header__category header__button"
            @change="selectCategory($event.target.value)"
          >
            <option v-for="(cat, index) in categoriesValues" :key="index" :value="cat">
              {{ cat[1] }}
            </option>
          </select>
        </div>

        <div>
          <input
            v-model="inputValue"
            type="text"
            placeholder="Ключові слова"
            class="header__button"
            maxlength="20"
            @input="selectInput(inputValue)"
          />
        </div>
      </div>
    </header>
  </div>
</template>


<script setup>
import { ref, onMounted, watch } from "vue";
import { CATEGORIES, LANGUAGES, SERVER } from "@/constants.js";
import { returnStringifiedTheme } from "@/functions.js";

import { themeValueStore } from '@/stores/themeValue';


const emit = defineEmits([
  "categorySelected",
  "querySelected",
  "languageSelected",
  "serverSelected",
]);

const themeStore = themeValueStore()
const isMenuOpen = ref(false);
const darkThemeSwitch = ref();
const darkTheme = ref();

let categoryValue = ref(CATEGORIES[0]);
let languageValue = ref(LANGUAGES[0]);
let inputValue = ref("");

let previousServerValue = ref(SERVER[0]);
let languagesValues = ref(LANGUAGES);
let categoriesValues = ref(CATEGORIES);

// Слідкуємо за значенням теми
watch(
  () => themeStore.theme,
  (newVal) => {
    darkThemeSwitch.value = newVal;
  }
)
watch(
  () => themeStore.theme,
  (newVal) => {
    darkTheme.value = newVal;
  }
)


function sortSearchParameters(serv) {
  languagesValues.value = LANGUAGES
  categoriesValues.value = CATEGORIES;

  if (serv == 'NewsData' && previousServerValue.value != 'NewsData') {
    // categoriesValues.value = categoriesValues.value.filter(cat => cat[0] !== "general");
    // setSortedCategory();
  } else if (serv == 'NewsApi' && previousServerValue.value != 'NewsApi') {
    categoriesValues.value = categoriesValues.value.filter(cat => cat[0] !== "politics");
    languagesValues.value = languagesValues.value.filter(lang => lang[0] !== "uk");
    setSortedCategory();
    setSortedLanguage();
  } else if (serv == 'GNews' && previousServerValue.value != 'GNews') {
    categoriesValues.value = categoriesValues.value.filter(cat => cat[0] !== "politics");
    setSortedCategory();
  } else if (serv == 'TheNewsApi' && previousServerValue.value != 'GNews') {
    categoriesValues.value = categoriesValues.value.filter(cat => cat[0] !== "politics");
    setSortedCategory();
  } else if (serv == 'WorldNews' && previousServerValue.value != 'WorldNews') {
    const excludedCategories = ["business", "science", "health"];
    categoriesValues.value = categoriesValues.value.filter(
      cat => !excludedCategories.includes(cat[0])
    );
    setSortedCategory();
  } else if (serv == 'Currents' && previousServerValue.value != 'Currents') {
    languagesValues.value = languagesValues.value.filter(lang => lang[0] !== "uk");
    setSortedLanguage();
  }
}

// Передаємо код категорії у батьківський компонент
function selectCategory(cat) {
  emit("categorySelected", cat);
}

// Передаємо введений текст
function selectInput(q) {
  emit("querySelected", q);
}

// Передаємо мову
function selectLanguage(lang) {
  emit("languageSelected", lang);
}

// Передаємо сервер
function selectServer(serv) {
  emit("serverSelected", serv);
  sortSearchParameters(serv);
  previousServerValue.value = serv;
}

// встановлюємо першу категорію після сортування
function setSortedCategory() {
  categoryValue.value = categoriesValues.value[0];
  emit("categorySelected", Object.values(categoryValue.value).join(','));
}

// встановлюємо першу мову після сортування
function setSortedLanguage() {
  languageValue.value = languagesValues.value[0];
  emit("languageSelected", Object.values(languageValue.value).join(','));
}

// змінюємо значення теми 
function changeTheme(theme) {
  localStorage.setItem('theme', returnStringifiedTheme(theme));
  themeStore.theme = returnStringifiedTheme(theme);
}


onMounted(() => {
  setSortedCategory();

  // встановленн теми
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme == null) {
    themeStore.theme = 'false';
  } else {
    darkThemeSwitch.value = savedTheme;
    darkTheme.value = savedTheme;
  }
});
</script>

<style scoped>
@import "../css/header/header.css";
@import "../css/dark.css";
</style>
