<template>
  <div class="container">
    <header class="header">
      <!-- Логотип -->
      <div class="header__logo">Multisource</div>
      <div class="header__parameters">
        <!-- Вибір сервера -->
        <div>
          <select class="header__server" @click="selectServer($event.target.value)">
            <option v-for="(serv, index) in SERVER" :key="index" :value="serv">
              {{ serv }}
            </option>
          </select>
        </div>
        <!-- Вибір мови -->
        <div>
          <select class="header__language" @click="selectLanguage($event.target.value)">
            <option v-for="(lang, index) in LANGUAGES" :key="index" :value="lang">
              {{ lang[1] }}
            </option>
          </select>
        </div>
        <!-- Вибір категорії -->
        <div v-if="serverValue == 'NewsData'">
          <select class="header__category" @click="selectCategory($event.target.value)">
            <option v-for="(cat, index) in CATEGORIES" :key="index" :value="cat">
              {{ cat[1] }}
            </option>
          </select>
        </div>
        <!-- Вибір пошуку -->
        <div>
          <input v-model="inputValue" type="text" placeholder="Ключові слова" class="header__input" maxlength="20"
            @input="selectInput(inputValue)" />
        </div>
      </div>
    </header>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import { CATEGORIES, LANGUAGES, SERVER } from "@/constants.js";

const emit = defineEmits([
  "categorySelected",
  "querySelected",
  "languageSelected",
  "serverSelected"
]);
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
  console.log(serverValue)
}
</script>

<style scoped src="../css/header/header.css"></style>
