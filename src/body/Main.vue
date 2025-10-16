<template>
  <div class="news">
    <div class="news__container">
        <div class="news_button">
        <button @click="getNews" class="news__button">Отримати новини</button>
      </div>

    <div v-if="news.length" class="news__list">
      <div v-for="(item, index) in news" :key="index" class="news__card">
  <div class="news__image-wrapper">
    <img
      :src="item.image_url || placeholder"
      alt="Зображення новини"
      class="news__image"
    />
    <div class="news__source">
      <a :href="item.source_url" target="_blank">{{ item.source_name }}</a>
    </div>
  </div>

  <h3 class="news__title">{{ item.title }}</h3>
  <p class="news__description">{{ item.description }}</p>
  <a :href="item.link" target="_blank" class="news__link">Читати далі</a>
</div>

    </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps } from "vue";
import placeholder from '@/images/placeholder.jpeg'

// props 
const props = defineProps({
  category: {
    type: String,
    default: null
  }
});
// end props 

// const 
const API_KEY = "pub_937f45933a914c54bd902b3244edd2b7";
const LANGUAGE = "uk";
const CATEGORY = ref(props.category || "sports");
const news = ref([]);
// end const

// watch
watch(
  () => props.category,
  (newVal) => {
    CATEGORY.value = newVal;
  }
);
// end watch

async function getNews() {
  const url = `https://newsdata.io/api/1/latest?apikey=${API_KEY}&language=${LANGUAGE}&category=${CATEGORY.value}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("Результат запиту:", data);

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
.news {
  text-align: center;
  font-family: system-ui, sans-serif;
}

.news__container{
    margin: 0px auto;
    max-width: 1200px;
}

/* --- Верхній блок: кнопка + категорія --- */
.news_button {
  display: flex;
  justify-content: space-between; /* кнопка ліворуч, категорія праворуч */
  align-items: center;
  flex-wrap: wrap; /* переносить на маленьких екранах */
  gap: 12px;
  margin: 16px 0px;
}

/* Кнопка */
.news__button {
  background-color: #2563eb; /* приємний синій */
  color: #ffffff;
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s, transform 0.2s;
}

.news__button:hover {
  background-color: #1e40af;
  transform: scale(1.03);
}

/* Категорія */
.news__category {
  font-weight: 600;
  color: #2563eb;
  white-space: nowrap;
}

.news__category-name {
  font-weight: 700;
}

/* --- Список новин --- */
.news__list {
  margin-top: 24px;
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

/* --- Картка новини --- */
.news__card {
  background-color: #f9fafb;
  border-radius: 10px;
  padding: 25px 10px 20px 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: left;
  display: flex;
  flex-direction: column;
}

/* --- Зображення --- */
.news__image {
  width: 100%;
  height: 180px; /* фіксована висота */
  object-fit: cover; /* щоб не спотворювалося */
  border-radius: 8px;
  margin-bottom: 10px;
  background-color: #e5e7eb; /* якщо фото немає, блок все одно видно */
}

/* --- Текст --- */
.news__title {
  font-size: 18px;
  font-weight: 700;
  color: #111827;
}

.news__description {
  font-size: 14px;
  color: #374151;
  margin-bottom: 8px;
  flex-grow: 1;
}

/* --- Посилання --- */
.news__link {
  color: #2563eb;
  font-weight: 600;
  text-decoration: none;
  align-self: flex-start;
}
.news__link:hover {
  text-decoration: underline;
}

/* --- Текст, якщо немає новин --- */
.news__empty {
  margin-top: 20px;
  color: #6b7280;
}

.news__card {
  position: relative;
  overflow: hidden;
  /* твої існуючі стилі */
}

.news__source {
  position: absolute;
  top: 0px;
  right: 0px;
  background: rgba(0, 0, 0, 0.5); /* напівпрозорий чорний фон */
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  z-index: 10;
}

.news__source a {
  color: #fff;
  text-decoration: none;
}

.news__source a:hover {
  text-decoration: underline;
}


/* --- Адаптивність --- */
@media (max-width: 1024px) {
  .news_button {
    gap: 10px;
  }
  .news__category {
    font-size: 0.95rem;
  }
}

@media (max-width: 768px) {
  .news_button {
    flex-direction: column; /* кнопка і категорія підряд */
    align-items: flex-start;
  }
  .news__category {
    margin-top: 8px;
  }
}

@media (max-width: 480px) {
  .news__button {
    width: 100%;
    font-size: 14px;
    padding: 6px 12px;
  }
  .news__category {
    width: 100%;
    margin-top: 6px;
    font-size: 13px;
  }
  .news__title {
    font-size: 16px;
  }
  .news__description {
    font-size: 13px;
  }
}
</style>