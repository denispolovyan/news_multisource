<template>
  <div class="container">
    <header class="header">
      <!-- Логотип -->
      <div class="header__logo">Feedlyx</div>
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
            <option v-for="(lang, index) in LANGUAGES" :key="index" :value="lang">
              {{ lang[1] }}
            </option>
          </select>
        </div>
        <!-- Вибір категорії -->
        <div v-if="serverValue == 'NewsData'">
          <select class="header__category header__button" @click="selectCategory($event.target.value)">
            <option v-for="(cat, index) in CATEGORIES" :key="index" :value="cat">
              {{ cat[1] }}
            </option>
          </select>
        </div>
        <!-- Вибір пошуку -->
        <div>
          <input v-model="inputValue" type="text" :placeholder="searchParams.isQueryRequired ? 'Введіть ключові слова' : 'Ключові слова'"
            :class="['header__button', { 'header__input--error': searchParams.isQueryRequired }]" maxlength="20" @focus="searchParams.setIsQueryRequired(false)"
            @input="selectInput(inputValue)" />
        </div>

      </div>
    </header>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { CATEGORIES, LANGUAGES, SERVER } from "@/constants.js";
import { searchParamsStore } from "@/stores/searchParams";

const emit = defineEmits([
  "categorySelected",
  "querySelected",
  "languageSelected",
  "serverSelected"
]);

const searchParams = searchParamsStore();
// const isQueryRequired = searchParams.isQueryRequired();

const inputValue = ref("");
let serverValue = ref("NewsData");

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

function selectServer(serv) {
  emit("serverSelected", serv);
  serverValue.value = serv;
}
</script>

<style scoped src="../css/header/header.css"></style>
