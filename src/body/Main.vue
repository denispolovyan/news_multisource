<template>
  <div class="news">
    <div class="news__container">
      <!-- Кнопка отримання новин -->
      <div class="news_button">
        <button @click="getNews" class="news__button">Отримати новини</button>
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
                (!item.title ? '' : (item.title.length > 80 ? item.title.slice(0, 80) + "..." : item.title))
              }}
            </h4>
            <p class="news__description">
              {{
                (!item.description ? '' : (item.description.length > 300 ? item.description.slice(0, 300) + "..." : item.description))

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
      <p v-else class="news__empty">Новин поки що немає.</p>
    </div>
  </div>
</template>

<script setup>
  import { ref, watch, defineProps } from "vue";
  import placeholder from "@/images/placeholder.jpeg";

  // Props
  const props = defineProps({
    category: {
      type: String,
      default: null,
    },
  });

  // Константи
  const API_KEY = "pub_937f45933a914c54bd902b3244edd2b7";
  const LANGUAGE = "uk";
  const CATEGORY = ref(props.category || "sports");
  const news = ref([]);

  // Watch для props.category
  watch(
    () => props.category,
    (newVal) => {
      CATEGORY.value = newVal;
    },
  );

  // Отримання новин
  async function getNews() {
    const url = `https://newsdata.io/api/1/latest?apikey=${API_KEY}&language=${LANGUAGE}&category=${CATEGORY.value}`;
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
</script>

<style scoped>
  /* --------------------------------------------
  Загальні стилі
--------------------------------------------- */
  .news {
    text-align: left;
    font-family: system-ui, sans-serif;
  }

  .news__container {
    margin: 0 auto;
    max-width: 1200px;
    padding: 0 10px;
  }

  /* --------------------------------------------
  Кнопка отримання новин
--------------------------------------------- */
  .news_button {
    margin: 16px 0;
  }

  .news__button {
    background-color: #2563eb;
    color: #ffffff;
    padding: 10px 18px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition:
      background 0.2s,
      transform 0.2s;
  }

  .news__button:hover {
    background-color: #1e40af;
    transform: scale(1.03);
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
