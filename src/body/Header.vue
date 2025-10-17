<template>
  <header :class="['header', theme]">
    <div class="header__container">
      <!-- Логотип -->
      <h1 class="header__logo">Multisource News</h1>
      <div class="header__input-wrapper">
        <input
          v-model="inputValue"
          type="text"
          placeholder="Пошуковий запит"
          class="header__input"
        />
        <button @click="selectInput(inputValue)" class="header__check-btn">✔</button>
      </div>

      <!-- Вибір категорії -->
      <div class="header__select-wrapper">
        <select
          class="header__select"
          @change="selectCategory($event.target.value)"
        >
          <option
            v-for="(cat, index) in categories"
            :key="index"
            :value="cat[1]"
          >
            {{ cat[0] }}
          </option>
        </select>
      </div>

      <!-- Кнопка перемикання теми -->
      <button @click="toggleTheme" class="header__theme-btn">
        {{ theme === "light" ? "Night" : "Day" }}
      </button>
    </div>
  </header>
</template>

<script setup>
  import { ref, defineEmits } from "vue";

  const emit = defineEmits(["categorySelected", "querySelected"]);
  const theme = ref("light");
  const inputValue = ref("");

  // Масив категорій: [Назва, Код]
  const categories = [
    ["Спорт", "sports"],
    ["Політика", "politics"],
    ["Технології", "technology"],
  ];

  // Зміна теми
  function toggleTheme() {
    theme.value = theme.value === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme.value);
  }

  // Передаємо код категорії у батьківський компонент
  function selectCategory(code) {
    emit("categorySelected", code);
  }

  // Передаємо введений текст
  function selectInput(q) {
    emit("querySelected", q);
  }
</script>

<style scoped>
  /* --- Основний стиль Header --- */
  .header {
    width: 100%;
    /* padding: 12px 16px; */
    border-bottom: 1px solid #e5e7eb;
    font-family: "Inter", "Helvetica Neue", Arial, sans-serif;
    transition:
      background 0.3s,
      color 0.3s;
  }

  .header__container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding: 10px 0px;
  }

  /* Логотип */
  .header__logo {
    font-size: 20px;
    font-weight: 700;
  }

  /* Вибір категорії */
  .header__select-wrapper {
    display: flex;
    align-items: center;
    margin-left: auto; /* прибиваємо праворуч */
  }

  .header__select {
    padding: 6px 12px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    background: #ffffff;
    color: #111827;
    cursor: pointer;
    font-size: 16px;
    transition:
      border-color 0.2s,
      box-shadow 0.2s;
  }

  .header__select:hover,
  .header__select:focus {
    border-color: #2563eb;
    outline: none;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }

  /* Кнопка перемикання теми */
  .header__theme-btn {
    margin-left: 12px;
    padding: 6px 12px;
    border-radius: 6px;
    border: 1px solid #d1d5db;
    background: #f3f4f6;
    font-weight: 500;
    cursor: pointer;
    transition:
      background 0.3s,
      transform 0.2s;
  }

  .header__theme-btn:hover {
    background: #e5e7eb;
    transform: scale(1.02);
  }

  /* --- Теми --- */
  .header.light {
    background: #ffffff;
    color: #111827;
  }

  .header.dark {
    background: #1f2937;
    color: #f9fafb;
  }

  .header.dark .header__select {
    background: #374151;
    color: #f9fafb;
    border-color: #9ca3af;
  }

  .header.dark .header__theme-btn {
    background: #374151;
    color: #f9fafb;
    border-color: #9ca3af;
  }

  /* input  */

  .header__input-wrapper {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-left: auto;
  }

  .header__input {
    padding: 6px 10px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 16px;
    outline: none;
    transition:
      border-color 0.2s,
      box-shadow 0.2s;
  }

  .header__input:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }

  .header__check-btn {
    border: none;
    background: #2563eb;
    color: white;
    border-radius: 6px;
    cursor: pointer;
    padding: 6px 10px;
    transition:
      background 0.3s,
      transform 0.2s;
  }

  .header__check-btn:hover {
    background: #1d4ed8;
    transform: scale(1.05);
  }

  /* --- Адаптивність --- */
  @media (max-width: 611px) {
    .header__logo {
      font-size: 16px;
    }
  }

  @media (max-width: 480px) {
    .header__select {
      font-size: 14px;
      padding: 5px 10px;
    }

    .header__theme-btn {
      font-size: 14px;
      padding: 5px 10px;
    }
  }
</style>
