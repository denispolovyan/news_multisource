<template>
  <div class="news">
    <div class="news__container">
      <!-- Кнопка отримання новин -->
      <div class="news_button">
        <div>
          <button @click="getNews" class="news__button">Отримати новини</button>
        </div>
        <div class="news__category">
          <span>Категорія: </span>{{ detalizedCategory[1] || "-" }}
        </div>
        <div class="news__search">
          <span>Пошук за словами: </span>{{ QUERY || "-" }}
        </div>
        <div class="news__language">
          <span>Мова: </span>{{ detalizedLanguage[1] || "-" }}
        </div>
      </div>

      <!-- Список новин -->
      <div v-if="news.length" class="news__list">
        <div v-for="(item, index) in news" :key="index" class="news__card">
          <!-- Зображення та джерело -->
          <div class="news__image-wrapper">
            <img
              :src="item.image_url || placeholder"
              alt="Зображення новини"
              class="news__image"
            />
            <div
              class="news__source"
              v-if="item.source_name && item.source_url"
            >
              <a :href="item.source_url" target="_blank">{{
                item.source_name
              }}</a>
            </div>
          </div>

          <!-- Тіло картки: заголовок + опис -->
          <div class="news__body">
            <h4 class="news__title">
              {{
                !item.title
                  ? ""
                  : item.title.length > 80
                    ? item.title.slice(0, 80) + "..."
                    : item.title
              }}
            </h4>
            <p class="news__description">
              {{
                !item.description
                  ? ""
                  : item.description.length > 300
                    ? item.description.slice(0, 300) + "..."
                    : item.description
              }}
            </p>
          </div>

          <!-- Посилання "Читати далі" -->
          <a :href="item.link" target="_blank" class="news__link"
            >Читати далі</a
          >
        </div>
      </div>

      <!-- Повідомлення якщо новин немає -->
      <p v-else class="news__empty">
        {{
          returnIfParameters()
            ? "За пошуковин запитом новин не знайдено"
            : "Здійсніть пошук новин, щоб відобразити їх"
        }}
      </p>
    </div>
  </div>
</template>

<script setup>
  import { ref, watch, defineProps } from "vue";
  import placeholder from "@/images/placeholder.jpeg";
  import { API_KEY, API_BASE_URL, LANGUAGES, CATEGORIES } from "@/constants.js";

  // Props
  const props = defineProps({
    category: {
      type: String,
      default: null,
    },
    query: {
      type: String,
      default: null,
    },
    language: {
      type: String,
      default: null,
    },
  });

  // Константи
  const CATEGORY = ref(props.category);
  const QUERY = ref(props.query);
  const LANGUAGE = ref(props.language);

  let detalizedLanguage = ref(LANGUAGES[0]);
  let detalizedCategory = ref(CATEGORIES[0]);

  const news = ref([]);

  // Watch для props
  watch(
    () => props.category,
    (newVal) => {
      CATEGORY.value = newVal;
      detalizedCategory = CATEGORY._value.split(",");
    },
  );

  watch(
    () => props.query,
    (newVal) => {
      QUERY.value = newVal;
    },
  );

  watch(
    () => props.language,
    (newVal) => {
      LANGUAGE.value = newVal;
      detalizedLanguage = LANGUAGE._value.split(",");
    },
  );

  // Отримання новин
  async function getNews() {
    const url = returnUrlStr();

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.results) {
        news.value = data.results;
      } else {
        console.warn("Новини не знайдені або API обмежене.");
      }
    } catch (error) {
      console.error("Помилка при отриманні даних:", error);
    }
  }

  // Отримання url
  function returnUrlStr() {
    detalizedLanguage = LANGUAGE._value.split(",");
    detalizedCategory = CATEGORY._value.split(",");

    let url = `${API_BASE_URL}${API_KEY}`;

    if (detalizedCategory[0]) url += `&category=${detalizedCategory[0]}`;
    if (detalizedLanguage[0]) url += `&language=${detalizedLanguage[0]}`;
    if (QUERY.value) url += `&q=${QUERY.value}`;

    console.log(url);

    return url;
  }

  //  Чи є параметри пошуку
  function returnIfParameters() {
    if (CATEGORY.value || QUERY.value) {
      return 1;
    } else {
      return 0;
    }
  }
</script>

<style scoped>
  .news {
    text-align: left;
    font-family: system-ui, sans-serif;
  }

  .news__container {
    margin: 0 auto;
    max-width: 1200px;
  }

  /* --------------------------------------------
  Кнопка отримання новин
--------------------------------------------- */

  .news_button {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 16px;
    flex-wrap: wrap;
    margin: 16px 0;
    font-family: "Inter", "Helvetica Neue", Arial, sans-serif;
  }

  /* --- Основна кнопка --- */
  .news__button {
    background-color: #2563eb;
    color: #ffffff;
    padding: 10px 18px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.25s ease;
  }

  .news__button:hover {
    background-color: #1e40af;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(37, 99, 235, 0.3);
  }

  /* --- Категорія та пошук у стилі кнопок --- */
  .news__category,
  .news__search,
  .news__language {
    display: inline-flex;
    align-items: center;
    background-color: #e5e7eb;
    color: #111827;
    padding: 10px 16px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.25s ease;
    cursor: default;
    user-select: none;
  }

  .news__category span,
  .news__search span,
  .news__language span {
    font-weight: 700;
    margin-right: 6px;
    color: #2563eb;
  }

  /* --- Ефект при наведенні --- */
  .news__category:hover,
  .news__search:hover {
    background-color: #dbeafe;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(37, 99, 235, 0.2);
  }

  /* --- Адаптивність --- */
  @media (max-width: 768px) {
    .news_button {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }

    .news__category,
    .news__search {
      width: 100%;
      justify-content: flex-start;
    }

    .news__button {
      width: 100%;
      text-align: center;
    }
  }

  /* --------------------------------------------
  Список новин: Grid
--------------------------------------------- */
  .news__list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 25px 15px;
  }

  /* --------------------------------------------
  Картка новини
--------------------------------------------- */
  .news__card {
    display: flex;
    flex-direction: column;
    background-color: #f9fafb;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    /* height: 100%; */
    padding: 10px 10px 20px 10px;
  }

  /* --------------------------------------------
  Зображення та джерело
--------------------------------------------- */
  .news__image-wrapper {
    position: relative;
    width: 100%;
    height: 180px;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 10px;
    background-color: #e5e7eb;
  }

  .news__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .news__source {
    position: absolute;
    top: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
  }

  .news__source a {
    color: #fff;
    text-decoration: none;
  }

  .news__source a:hover {
    text-decoration: underline;
  }

  /* --------------------------------------------
  Тіло картки: заголовок + опис
--------------------------------------------- */
  .news__body {
    display: flex;
    flex-direction: column;
    flex-grow: 1; /* займати весь простір між зображенням і кнопкою */
  }

  .news__title {
    font-size: 15px;
    font-weight: 600;
    color: #111827;
    margin-bottom: 6px;
    height: 45px;
  }

  .news__description {
    font-size: 14px;
    color: #374151;
    margin-bottom: 8px;

    overflow: hidden; /* обрізання надлишку тексту */
  }

  /* --------------------------------------------
  Посилання "Читати далі"
--------------------------------------------- */
  .news__link {
    color: #2563eb;
    font-weight: 600;
    text-decoration: none;
    align-self: flex-start;
  }

  .news__link:hover {
    text-decoration: underline;
  }

  /* --------------------------------------------
  Повідомлення якщо новин немає
--------------------------------------------- */
  .news__empty {
    margin-top: 20px;
    color: #6b7280;
  }

  /* --------------------------------------------
  Адаптивність
--------------------------------------------- */
  @media (max-width: 611px) {
    /* .news__list {
      grid-template-columns: 1fr;
    } */

    .news__title {
      margin: 0px;
      height: 60px;
    }

    .news__description {
      padding: 10px 0px;
      margin: 0px;
    }

    .news__body {
      flex-grow: 0;
    }

    .news__card {
      display: flex;
      flex-grow: 0;
      /* padding: 10px 10px 15px 10px; */
    }
  }

  @media (max-width: 480px) {
    .news__button {
      width: 100%;
      font-size: 14px;
      padding: 6px 12px;
    }
    .news__title {
      font-size: 16px;
    }
    .news__description {
      font-size: 13px;
    }
  }
</style>
