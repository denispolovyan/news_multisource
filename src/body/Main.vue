<template>
  <div class="container">
    <div class="news">
      <div class="news__container">
        <!-- Кнопка отримання новин -->
        <div class="news__button">
          <button @click="getNews">Отримати новини</button>
        </div>
        <!-- Список новин NEWSDATA -->
        <div v-if="news.length" class="news__list">
          <div v-for="(item, index) in news" :key="index" class="news__card">
            <!-- Зображення та джерело -->
            <div class="news__image-wrapper">
              <img :src="item.image_url || placeholder" alt="Зображення" class="news__image" />
              <div class="news__source" v-if="item.source_name && item.source_url">
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
            <a :href="item.link" target="_blank" class="news__link">Читати далі</a>
          </div>
        </div>
        <!-- Повідомлення якщо новин немає -->
        <p v-else class="news__empty">
          {{ 'Новини не знайдені' }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import placeholder from "@/images/placeholder.jpeg";
import { API_KEY_NEWSDATA, API_BASE_URL_NEWSDATA, API_KEY_GNEWS, API_BASE_URL_GNEWS, API_KEY_NEWSAPI, API_BASE_URL_NEWSAPI } from "@/constants.js";
import { LANGUAGES, CATEGORIES } from "@/constants.js";

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
  server: {
    type: String,
    default: null,
  },
});

// Константи
const CATEGORY = ref(props.category || 'general,Усі категорії');
const QUERY = ref(props.query);
const LANGUAGE = ref(props.language || 'en,Англійська');
const SERVER = ref(props.server || 'NewsData');

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

watch(
  () => props.server,
  (newVal) => {
    SERVER.value = newVal;
    if (newVal != 'GNews') {
      setActualParams();
    }
  },
);

// Отримання новин GNEWS
async function getNews() {
  let url = "";

  // отримання url для запиту
  switch (SERVER.value) {
    case "NewsData":
      const newsDataUrl = `${API_BASE_URL_NEWSDATA}${API_KEY_NEWSDATA}`
      url = returnUrlStr(newsDataUrl, 'NewsData');
      break;

    case "GNews":
      const gnewsUrl = `${API_BASE_URL_GNEWS}${API_KEY_GNEWS}`
      url = returnUrlStr(gnewsUrl, 'GNews');
      break;

    case "NewsApi":
      const newsApiUrl = `${API_BASE_URL_NEWSAPI}${API_KEY_NEWSAPI}`
      url = returnUrlStr(newsApiUrl, 'NewsApi');
      break;
  }

  // отримання даних від сервера
  try {
    let response = '';
    let data = '';

      response = await fetch(url);
      data = await response.json();


    if (data && (data.results || data.articles || data.sources)) {
      switch (SERVER.value) {
        case "NewsData":
          news.value = data.results.map(article => ({
            image_url: article.image_url || "",
            title: article.title || "",
            description: article.description || "",
            source_name: article.source_name || "",
            source_url: article.source_url || "",
            link: article.link || ""
          }));
          break;
        case "GNews":
          news.value = data.articles.map(article => ({
            image_url: article.image || "",
            title: article.title || "",
            description: article.description || "",
            source_name: article.source?.name || "",
            source_url: article.source?.url || "",
            link: article.url || ""
          }));
          break;
        case "NewsApi":
          news.value = data.articles.map(article => ({
            image_url: article.urlToImage || "",
            title: article.title || "",
            description: article.description || "",
            source_name: article.source.name || "",
            source_url: " ", // не існує, тому ставимо заглушку
            link: article.url || ""
          }));
          break;
      }
    }

  } catch (error) {
    console.error("Помилка при отриманні даних:", error);
    return [];
  }
}

// функція отримання url для запиту
function returnUrlStr(str, api) {
  let detalizedUrl = str;
  setActualParams();

  switch (api) {
    case "NewsData":
      if (detalizedCategory[0] && detalizedCategory[0] != 'general'){
        detalizedUrl += `&category=${detalizedCategory[0]}`;
      }
      if (detalizedLanguage[0]) detalizedUrl += `&language=${detalizedLanguage[0]}`;
      if (QUERY.value) detalizedUrl += `&q=${QUERY.value}`;
      break;

    case "GNews":
      if (detalizedLanguage[0]) detalizedUrl += `&lang=${detalizedLanguage[0]}`;
      if (detalizedCategory[0]) detalizedUrl += `&category=${detalizedCategory[0]}`;
      if (QUERY.value) detalizedUrl += `&q=${QUERY.value}`;
      detalizedUrl = `https://corsproxy.io/?${encodeURIComponent(detalizedUrl)}`;
      break;

    case "NewsApi":
      if (detalizedCategory[0]) detalizedUrl += `&category=${detalizedCategory[0]}`;
      if (detalizedLanguage[0]) detalizedUrl += `&language=${detalizedLanguage[0]}`;
      if (QUERY.value) detalizedUrl += `&q=${QUERY.value}`;
      detalizedUrl = `https://corsproxy.io/?${encodeURIComponent(detalizedUrl)}`;
      break;

  }
  return detalizedUrl;
}

// актуалізувати параметри пошуку
function setActualParams() {
  detalizedLanguage = LANGUAGE._value.split(",");
  detalizedCategory = CATEGORY._value.split(",");
}

</script>

<style scoped src="../css/main/news.css"></style>
<style scoped src="../css/main/search.css"></style>
<style scoped>
.news__container {
  margin: 20px 0px;
}
</style>
