<template>
  <header class="header">
    <div class="header__container">
      <!-- Логотип -->
      <h1 class="header__logo">Multisource News</h1>

      <div class="header__parameters">
        <!-- Вибір категорії -->
        <div class="header__select">
          <select
            class="header__select"
            @click="selectCategory($event.target.value)"
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
        <!-- Вибір пошуку -->
        <div class="header__input">
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

  const emit = defineEmits(["categorySelected", "querySelected"]);
  const inputValue = ref("");

  // Масив категорій: [Назва, Код]
  const categories = [
    ["Не обрано", ""],
    ["Спорт", "sports"],
    ["Політика", "politics"],
    ["Технології", "technology"],
  ];

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
  border-bottom: 1px solid #e5e7eb;
  font-family: "Poppins", "Inter", "Helvetica Neue", Arial, sans-serif;
  transition: background 0.3s, color 0.3s;
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

/* --- Контейнер для параметрів (категорія + інпут) --- */
.header__parameters {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  margin-left: auto;
}

/* --- Вибір категорії --- */
.header__select {
  display: flex;
  align-items: center;
}

.header__select select {
  padding: 6px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: #ffffff;
  color: #111827;
  cursor: pointer;
  font-size: 14px;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.header__select select:hover,
.header__select select:focus {
  border-color: #2563eb;
  outline: none;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
}

/* --- Інпут + кнопка з галочкою --- */
.header__input {
  display: flex;
  align-items: center;
  gap: 6px;
}

.header__input input {
  padding: 6px 10px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  width: 95px;
}

.header__input input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
}

.header__check-btn {
  padding: 6px 10px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: #f3f4f6;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}

.header__check-btn:hover {
  background: #e5e7eb;
  transform: scale(1.05);
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

.header.dark select,
.header.dark input,
.header.dark .header__check-btn {
  background: #374151;
  color: #f9fafb;
  border-color: #9ca3af;
}


</style>