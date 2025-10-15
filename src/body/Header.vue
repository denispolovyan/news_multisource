<template>
  <div class="container">
    <header class="header">
      <!-- Логотип -->
      <div class="header__logo">News bag <img src="../images/logo.png" alt="bag logo"></div>
      <div class="header__parameters">
        <!-- Вибір сервера -->
        <div>
          <select class="header__server header__button" @click="selectServer($event.target.value)">
            <option v-for="(serv, index) in SERVER" :key="index" :value="serv">
              {{ serv }}
            </option>
          </select>
        </div>
        <!-- Вибір мови -->
        <div>
          <select class="header__language header__button" @click="selectLanguage($event.target.value)">
            <option v-for="(lang, index) in languagesValues" :key="index" :value="lang">
              {{ lang[1] }}
            </option>
          </select>
        </div>
        <!-- Вибір категорії -->
        <div>
          <select class="header__category header__button" @click="selectCategory($event.target.value)">
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
// import { serverValueStore } from "@/stores/serverValue";
import { onMounted } from "vue";

const emit = defineEmits([
  "categorySelected",
  "querySelected",
  "languageSelected",
  "serverSelected"
]);

// const SERVER_VALUE = serverValueStore();
const inputValue = ref("");
let serverValue = ref("NewsData");

let languagesValues = ref(LANGUAGES);
let categoriesValues = ref(CATEGORIES);

function actualizeSearchParameters() {
  languagesValues.value = LANGUAGES
  categoriesValues.value = CATEGORIES;

  if (serverValue.value == 'NewsData') {
    categoriesValues.value = categoriesValues.value.filter(cat => cat[0] !== "general");
  } else if (serverValue.value == 'NewsApi') {
    categoriesValues.value = categoriesValues.value.filter(cat => cat[0] !== "politics");
    languagesValues.value = languagesValues.value.filter(lang => lang[0] !== "uk");
  } else if (serverValue.value == 'GNews') {
    categoriesValues.value = categoriesValues.value.filter(cat => cat[0] !== "politics");
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
  serverValue.value = serv;
  actualizeSearchParameters();
}

onMounted(() => {
  selectServer('NewsData');
  actualizeSearchParameters();
});
</script>

<style scoped src="../css/header/header.css"></style>
