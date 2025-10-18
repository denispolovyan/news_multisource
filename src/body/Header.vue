<template>
  <div class="container">
    <header class="header">
      <!-- Логотип -->
      <div class="header__logo">Multisource</div>
      <div class="header__parameters">
        <!-- Вибір мови -->
        <div>
          <select
            class="header__language"
            @click="selectLanguage($event.target.value)"
          >
            <option
              v-for="(lang, index) in LANGUAGES"
              :key="index"
              :value="lang"
            >
              {{ lang[1] }}
            </option>
          </select>
        </div>
        <!-- Вибір категорії -->
        <div>
          <select
            class="header__category"
            @click="selectCategory($event.target.value)"
          >
            <option
              v-for="(cat, index) in CATEGORIES"
              :key="index"
              :value="cat"
            >
              {{ cat[1] }}
            </option>
          </select>
        </div>
        <!-- Вибір пошуку -->
        <div>
          <input
            v-model="inputValue"
            type="text"
            placeholder="Ключові слова"
            class="header__input"
            maxlength="20"
            @input="selectInput(inputValue)"
          />
        </div>
      </div>
    </header>
  </div>
</template>

<script setup>
  import { ref, defineEmits } from "vue";
  import { CATEGORIES, LANGUAGES } from "@/constants.js";

  const emit = defineEmits([
    "categorySelected",
    "querySelected",
    "languageSelected",
  ]);
  const inputValue = ref("");

  // Передаємо код категорії у батьківський компонент
  function selectCategory(cat) {
    emit("categorySelected", cat);
    // console.log(cat);
  }

  // Передаємо введений текст
  function selectInput(q) {
    emit("querySelected", q);
  }

  // Передаємо мову
  function selectLanguage(lang) {
    emit("languageSelected", lang);
    // console.log(lang);
  }
</script>

<style scoped src="../css/header/header.css"></style>
