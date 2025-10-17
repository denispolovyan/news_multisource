<template>
  <header class="header">
    <div class="header__container">
      <!-- Логотип -->
      <h1 class="header__logo">Multisource News</h1>

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
              {{ lang[0] }}
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
              {{ cat[0] }}
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
            @input="selectInput(inputValue)"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
  import { ref, defineEmits } from "vue";
  import { CATEGORIES, LANGUAGES } from "@/constants.js";


  const emit = defineEmits(["categorySelected", "querySelected", "languageSelected"]);
  const inputValue = ref("");


  // Передаємо код категорії у батьківський компонент
  function selectCategory(cat) {
    emit("categorySelected", cat);
    console.log(cat);
  }

  // Передаємо введений текст
  function selectInput(q) {
    emit("querySelected", q);
  }

  // Передаємо мову
  function selectLanguage(lang) {
    emit("languageSelected", lang);
  }
</script>

<style scoped>
  /* --- Основний стиль Header --- */
  .header {
    width: 100%;
    border-bottom: 1px solid #e5e7eb;
    font-family: "Poppins", "Inter", "Helvetica Neue", Arial, sans-serif;
    transition:
      background 0.3s,
      color 0.3s;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .header__container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding: 10px 0;
  }

  /* --- Логотип --- */
  .header__logo {
    font-size: 20px;
    font-weight: 700;
  }

  .header__parameters {
  display: flex;
  justify-content: flex-end; /* всі елементи праворуч */
  align-items: center;
  gap: 12px; /* відстань між select і input */
  flex-wrap: wrap; /* переносить на маленьких екранах */
  margin-left: auto; /* щоб блок притискався праворуч */
}

/* --- Загальні стилі для select --- */
.header__parameters select {
  padding: 6px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: #ffffff;
  color: #111827;
  cursor: pointer;
  font-size: 16px;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.header__parameters select:hover,
.header__parameters select:focus {
  border-color: #2563eb;
  outline: none;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
}

/* --- Стилі для input --- */
.header__parameters .header__input {
  padding: 6px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.header__parameters .header__input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
}

/* --- Адаптивність --- */
@media (max-width: 768px) {
  .header__parameters {
    justify-content: flex-start; /* на маленьких екранах ліворуч */
    gap: 8px;
  }
  
  .header__parameters select,
  .header__parameters .header__input {
    font-size: 14px;
    padding: 5px 8px;
  }
}

@media (max-width: 480px) {
  .header__parameters {
    flex-direction: column;
    align-items: stretch;
    gap: 6px;
  }
  
  .header__parameters select,
  .header__parameters .header__input {
    width: 100%;
  }
}

</style>
