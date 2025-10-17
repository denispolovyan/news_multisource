<template>
  <div class="container">
    <header class="header">
      <!-- Логотип -->
      <div class="header__logo">News bag <img src="../images/logo.png" alt="bag logo"></div>
      <div class="header__parameters">
        <!-- Вибір сервера -->
        <div>
          <select class="header__server header__button" @change="selectServer($event.target.value)">
            <option v-for="(serv, index) in SERVER" :key="index" :value="serv">
              {{ serv }}
            </option>
          </select>
        </div>
        <!-- Вибір мови -->
        <div>
          <select v-model="languageValue" class="header__language header__button"
            @change="selectLanguage($event.target.value)">
            <option v-for="(lang, index) in languagesValues" :key="index" :value="lang">
              {{ lang[1] }}
            </option>
          </select>
        </div>
        <!-- Вибір категорії -->
        <div>
          <select v-model="categoryValue" class="header__category header__button"
            @change="selectCategory($event.target.value)">
            <option v-for="(cat, index) in categoriesValues" :key="index" :value="cat">
              {{ cat[1] }}
            </option>
          </select>
        </div>
        <!-- Вибір пошуку -->
        <div>
          <input v-model="inputValue" type="text" placeholder="Ключові слова" class="header__button" maxlength="20"
            @input="selectInput(inputValue)" />
        </div>

      </div>
    </header>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { CATEGORIES, LANGUAGES, SERVER } from "@/constants.js";
import { onMounted } from "vue";

const emit = defineEmits([
  "categorySelected",
  "querySelected",
  "languageSelected",
  "serverSelected"
]);

const categoryValue = ref(CATEGORIES[0]);
const languageValue = ref(LANGUAGES[0]);
const inputValue = ref("");

let previousServerValue = ref("NewsData");
let languagesValues = ref(LANGUAGES);
let categoriesValues = ref(CATEGORIES);

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

onMounted(() => {
  selectServer('NewsData');
  sortSearchParameters();
});
</script>

<style scoped src="../css/header/header.css"></style>
