<template>
  <div class="wrapper" :class="{ 'darkThemeMain': darkTheme == 'true' }">
    <div class="news container">
      <div class="news__container">
        <!-- Кнопка отримання новин -->
        <div class="news__button" :class="{ 'darkThemeMain__button': darkTheme == 'true' }">
          <button @click="getNews">
            Отримати новини
          </button>
        </div>

        <!-- Список новин -->
        <div v-if="news?.length" class="news__list">
          <div v-for="(item, index) in news" :key="index" class="news__card"
            :class="{ 'darkThemeMain__card': darkTheme == 'true' }">

            <!-- Зображення -->
            <div class="news__image-wrapper" :class="{ 'darkThemeMain__image-wrapper': darkTheme == 'true' }">
              <img :src="item.image_url || placeholder" @error="item.image_url = placeholder" class="news__image">

              <div class="news__source" v-if="item.source_name && item.source_url">
                <a :href="item.source_url" target="_blank">{{ item.source_name }}</a>
              </div>
            </div>

            <!-- Тіло картки -->
            <div class="news__body" :class="{ 'darkThemeMain__body': darkTheme == 'true' }">
              <h4 class="news__title" :class="{ 'darkThemeMain__title': darkTheme == 'true' }">
                {{
                  !item.title
                    ? ""
                    : item.title.length > 80
                      ? item.title.slice(0, 80) + "..."
                      : item.title
                }}
              </h4>
              <p class="news__description" :class="{ 'darkThemeMain__description': darkTheme == 'true' }">
                {{
                  !item.description
                    ? ""
                    : item.description.length > 300
                      ? item.description.slice(0, 300) + "..."
                      : item.description
                }}
              </p>
            </div>

            <!-- Посилання -->
            <a :href="item.link" target="_blank" class="news__link"
              :class="{ 'darkThemeMain__link': darkTheme == 'true' }">
              Читати далі
            </a>
          </div>
        </div>

        <!-- Якщо новин немає -->
        <p v-else class="news__empty" :class="{ 'darkThemeMain__empty': darkTheme == 'true' }">
          {{ isResponseEmpty ? UNSUCCESSFUL_SEARCH_MESSAGE[1] : UNSUCCESSFUL_SEARCH_MESSAGE[0] }}
        </p>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, watch } from "vue";
import placeholder from "@/images/placeholder.jpeg";
import { API_KEY_NEWSDATA, API_BASE_URL_NEWSDATA, API_KEY_GNEWS, API_BASE_URL_GNEWS, API_KEY_NEWSAPI, API_BASE_URL_NEWSAPI, API_KEY_THENEWSAPI, API_BASE_URL_THENEWSAPI, API_KEY_WORLDNEWS, API_BASE_URL_WORLDNEWS, API_KEY_CURRENTS, API_BASE_URL_CURRENTS } from "@/constants.js";
import { LANGUAGES, CATEGORIES, QUANTITY_OF_REQUESTS, RESPONSE_DATA_PATH, UNSUCCESSFUL_SEARCH_MESSAGE, } from "@/constants.js";
import { returnUrlStr, returnMappedResponse, isParametersDifferent, getSavedData, saveSearchData } from '@/functions.js'
import { onMounted } from "vue";
import { themeValueStore } from '@/stores/themeValue'

import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

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
  quantity: {
    type: String,
    default: null,
  },
});

// Константи
const CATEGORY = ref(props.category || 'general,Усі категорії');
const QUERY = ref(props.query);
const LANGUAGE = ref(props.language || 'uk,Українська');
const SERVER = ref(props.server || 'NewsData');

// Тема
const themeStore = themeValueStore();
let darkTheme = ref(false);

// Параметри пошуку
let detalizedLanguage = ref(LANGUAGES[0]);
let detalizedCategory = ref(CATEGORIES[0]);

// Минулий юрл пошуку
let previousUrl = ref('');

// Набитий масив новин
const news = ref([]);
let isResponseEmpty = false;

// Пуш повідомлення
const notyf = new Notyf({
  duration: 2500,
  position: {
    x: 'right',
    y: 'top',
  },
  types: [
    {
      type: 'error',
      background: 'red',
      duration: 2500,
      dismissible: true,
    },
    {
      type: 'success',
      background: 'green',
      duration: 2500,
      dismissible: true
    },
    {
      type: 'info',
      background: '#2196f3',
      duration: 8000,
      dismissible: true
    }
  ]
});

// Watch
watch(
  () => themeStore.theme,
  (newVal) => {
    darkTheme.value = newVal;
  }
)

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
  setActualParams();

  // отримання url для запиту
  switch (SERVER.value) {
    case "NewsData":
      const newsDataUrl = `${API_BASE_URL_NEWSDATA}${API_KEY_NEWSDATA}`
      url = returnUrlStr(newsDataUrl, 'NewsData', detalizedCategory, detalizedLanguage, QUERY);
      break;
    case "GNews":
      const gnewsUrl = `${API_BASE_URL_GNEWS}${API_KEY_GNEWS}`
      url = returnUrlStr(gnewsUrl, 'GNews', detalizedCategory, detalizedLanguage, QUERY);
      break;
    case "NewsApi":
      const newsApiUrl = `${API_BASE_URL_NEWSAPI}${API_KEY_NEWSAPI}`
      url = returnUrlStr(newsApiUrl, 'NewsApi', detalizedCategory, detalizedLanguage, QUERY);
      break;
    case "TheNewsApi":
      const theNewsApiUrl = `${API_BASE_URL_THENEWSAPI}${API_KEY_THENEWSAPI}`
      url = returnUrlStr(theNewsApiUrl, 'TheNewsApi', detalizedCategory, detalizedLanguage, QUERY);
      break;
    case "WorldNews":
      const worldNewsApiUrl = `${API_BASE_URL_WORLDNEWS}${API_KEY_WORLDNEWS}`
      url = returnUrlStr(worldNewsApiUrl, 'WorldNews', detalizedCategory, detalizedLanguage, QUERY);
      break;
    case "Currents":
      const CurrentsUrl = `${API_BASE_URL_CURRENTS}${API_KEY_CURRENTS}`
      url = returnUrlStr(CurrentsUrl, 'Currents', detalizedCategory, detalizedLanguage, QUERY);
      break;
  }

  // перевіряємо чи змінились параметри пошуку (перериваємо виконання якщо ні)
  if (!isParametersDifferent(url, previousUrl.value)) {
    notyf.error('Оновіть параметри');
    return;
  } else {
    previousUrl.value = url;
  }

  // отримання даних від сервера
  try {
    let requests = '';
    let response = '';
    let data = '';

    // робимо необхідну кількість запитів, з якої формуємо результат
    switch (SERVER.value) {
      case 'TheNewsApi':
        requests = Array.from({ length: QUANTITY_OF_REQUESTS[SERVER.value] }, (_, i) =>
          fetch(`${url}&page=${i + 1}`)
        );
        response = await Promise.all((await Promise.all(requests)).map(r => r.json()));
        data = { ...response[0], data: [...response[0].data] };

        // Додаємо всі елементи data з інших об'єктів
        for (let i = 1; i < response.length; i++) {
          if (response[i].data && Array.isArray(response[i].data)) {
            data.data.push(...response[i].data);
          }
        }
        break;
      default:
        response = await fetch(url);
        data = await response.json();
        break;
    }

    news.value = returnMappedResponse(data[RESPONSE_DATA_PATH[SERVER.value]], SERVER.value);
    news.value.length ? notyf.success('Успішний пошук') : notyf.error('Новини не знайдені');
    saveSearchData(detalizedCategory, QUERY.value, detalizedLanguage, SERVER.value, news.value);

    setIsResponseEmpty();
  } catch (error) {
    console.error("Помилка при отриманні даних:", error);
    return [];
  }
}

// актуалізувати параметри пошуку
function setActualParams() {
  detalizedLanguage = LANGUAGE._value.split(",");
  detalizedCategory = CATEGORY._value.split(",");
}

// встановлюємо чи була відповідь від сервера після запиту
function setIsResponseEmpty() {
  if (news.value && news.value.length) {
    isResponseEmpty = false;
  } else {
    isResponseEmpty = true;
    news.value = [];
  }
}

// ONMOUNTED
onMounted(() => {
  news.value = JSON.parse(localStorage.getItem('articles'));
  darkTheme.value = localStorage.getItem('theme');

  // виводимо останній пошук
  if (news.value && news.value.length) {
    notyf.open({
      type: 'info',
      message: `Відновлено результати останнього пошуку за параметрами: ${getSavedData()}`
    });
  }

});
</script>

<style scoped>
@import "../css/main/news.css";
@import "../css/main/search.css";
@import "../css/dark.css";

.news__container {
  margin: 10px 0;
}
</style>
