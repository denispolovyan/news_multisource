<template>
  <div class="wrapper" :class="{ 'darkThemeMain': darkTheme == 'true' }">
    <div class="container">
      <div class="news__container">
        <!-- Кнопка отримання новин -->
        <MainSearch @click="simpleSearch == 'true' ? getSimpleSearchNews() : getNews()" :darkTheme="darkTheme" />
        <!-- Список новин -->
        <MainNews v-if="news?.length" :news="paginatedNews" :catsPlaceholders="catsPlaceholders"
          :darkTheme="darkTheme" />
        <!-- Якщо новин немає -->
        <MainEmpty v-else :isResponseEmpty="isResponseEmpty" :darkTheme="darkTheme" />
        <!-- Довантажити новини  -->
        <MainLoadMore v-if="news?.length && (viewedAllNews == 'false')" @click="increaseNewsQuantity()"
          :darkTheme="darkTheme" />
      </div>
    </div>
  </div>
</template>

<script setup>
// base
import { ref, watch, onMounted } from "vue";

// constants
import { API_KEY_NEWSDATA, API_BASE_URL_NEWSDATA, API_KEY_GNEWS, API_BASE_URL_GNEWS, API_KEY_NEWSAPI, API_BASE_URL_NEWSAPI, API_KEY_THENEWSAPI, API_BASE_URL_THENEWSAPI, API_KEY_WORLDNEWS, API_BASE_URL_WORLDNEWS, API_KEY_CURRENTS, API_BASE_URL_CURRENTS, API_BASE_URL_CAT, API_KEY_CAT } from "@/constants.js";
import { LANGUAGES, CATEGORIES, SERVERS, QUANTITY_OF_REQUESTS, RESPONSE_DATA_PATH, PAGINATED_NEWS_LENGTH } from "@/constants.js";
import { notyf } from "@/constants.js";

// functions
import { returnUrlStr, returnMappedResponse, isParametersDifferent, getSavedData, saveSearchData, getPlaceholderPhoto, setActualServers, setIsResponseEmpty } from '@/functions.js'

// store
import { themeValueStore } from '@/stores/themeValue';
import { simpleSearchStateStore } from '@/stores/simpleSearchState';

// components
import MainNews from "./MainNews.vue";
import MainSearch from "./MainSearch.vue";
import MainEmpty from "./MainEmpty.vue";
import MainLoadMore from "./MainLoadMore.vue";

// props
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

// const
const CATEGORY = ref(props.category || 'general,Усі категорії');
const QUERY = ref(props.query);
const LANGUAGE = ref(props.language || 'uk,Українська');
const SERVER = ref(props.server || 'NewsData');

// theme
const themeStore = themeValueStore();
let darkTheme = ref('false');

// Параметри пошуку
let detalizedLanguage = ref(LANGUAGES[0]);
let detalizedCategory = ref(CATEGORIES[0]);

// Минулий юрл пошуку
let previousUrl = ref('');

let previousCategory = ref('');
let previousQuery = ref('');
let previousLanguage = ref('');


// Набитий масив новин
const news = ref([]);

// змінні для кнопки Завантажити ще
const viewedAllNews = ref('false');
let paginatedNews = ref([]);
let newsCounter = ref(0);

const simpleSearchStore = simpleSearchStateStore();
const simpleSearch = ref('true')
const simpleSearchServers = ref(SERVERS);

// чи відповідь від сервера пуста
let isResponseEmpty = ref(false);

// Набитий масив з котиків-плейсхолдерів
const catsPlaceholders = ref([]);

// Отримання новин розширеним пошуком
async function getNews() {
  let url = "";
  viewedAllNews.value = 'true';

  setActualParams();

  // отримання url для запиту
  switch (SERVER.value) {
    case "NewsData":
      const newsDataUrl = `${API_BASE_URL_NEWSDATA}${API_KEY_NEWSDATA}`
      url = returnUrlStr(newsDataUrl, 'NewsData', detalizedCategory.value, detalizedLanguage.value, QUERY);
      break;
    case "GNews":
      const gnewsUrl = `${API_BASE_URL_GNEWS}${API_KEY_GNEWS}`
      url = returnUrlStr(gnewsUrl, 'GNews', detalizedCategory.value, detalizedLanguage.value, QUERY);
      break;
    case "NewsApi":
      const newsApiUrl = `${API_BASE_URL_NEWSAPI}${API_KEY_NEWSAPI}`
      url = returnUrlStr(newsApiUrl, 'NewsApi', detalizedCategory.value, detalizedLanguage.value, QUERY);
      break;
    case "TheNewsApi":
      const theNewsApiUrl = `${API_BASE_URL_THENEWSAPI}${API_KEY_THENEWSAPI}`
      url = returnUrlStr(theNewsApiUrl, 'TheNewsApi', detalizedCategory.value, detalizedLanguage.value, QUERY);
      break;
    case "WorldNews":
      const worldNewsApiUrl = `${API_BASE_URL_WORLDNEWS}${API_KEY_WORLDNEWS}`
      url = returnUrlStr(worldNewsApiUrl, 'WorldNews', detalizedCategory.value, detalizedLanguage.value, QUERY);
      break;
    case "Currents":
      const CurrentsUrl = `${API_BASE_URL_CURRENTS}${API_KEY_CURRENTS}`
      url = returnUrlStr(CurrentsUrl, 'Currents', detalizedCategory.value, detalizedLanguage.value, QUERY);
      break;
  }

  // перевіряємо чи змінились параметри пошуку (перериваємо виконання якщо ні)
  if (!isParametersDifferent(url, previousUrl.value)) {
    notyf.error('Оновіть параметри');
    return;
  } else {
    // виводимо пуш пошуку
    notyf.open({
      type: 'load',
      message: `Пошук новин ...`
    });

    previousUrl.value = url;

    newsCounter.value = 0;
    localStorage.setItem('news-counter', newsCounter.value);

    paginatedNews.value = [];
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

    catsPlaceholders.value = await getPlaceholderPhoto(API_BASE_URL_CAT, API_KEY_CAT);
    if (catsPlaceholders.value) localStorage.setItem('cat-placeholders', JSON.stringify(catsPlaceholders.value));

    news.value = returnMappedResponse(data[RESPONSE_DATA_PATH[SERVER.value]], SERVER.value);
    news.value.length ? notyf.success('Успішний пошук') : notyf.error('Новини не знайдені');
    increaseNewsQuantity();
    saveSearchData(detalizedCategory.value, QUERY.value, detalizedLanguage.value, SERVER.value, news.value);

    isResponseEmpty.value = setIsResponseEmpty(news.value);
  } catch (error) {
    console.error("Помилка при отриманні даних:", error);
    return [];
  }
}

// Отримання новин спрощеним пошуком
async function getSimpleSearchNews() {
  let url = "";
  news.value = [];

  // виводимо пуш пошуку
  if ((previousCategory.value == detalizedCategory.value) && (previousQuery.value == QUERY.value) && (previousLanguage.value == detalizedLanguage.value)) {
    notyf.error('Оновіть параметри');
    return;
  } else {
    setPreviousParams();
    notyf.open({
      type: 'load',
      message: `Пошук новин ...`,
      duration: 4000
    });
  }

  // приїовуємо кнопку завантажити ще перед пошуком
  viewedAllNews.value = 'true';

  // set servers for cycle and params for search
  setActualParams();
  simpleSearchServers.value = setActualServers(SERVERS, detalizedCategory.value, detalizedLanguage.value);

  // set amount of news loaded (+6)
  newsCounter.value = 0;
  paginatedNews.value = [];

  try {
    for (const simpleServer of simpleSearchServers.value) {
      // отримання url для запиту
      switch (simpleServer) {
        case "NewsData":
          const newsDataUrl = `${API_BASE_URL_NEWSDATA}${API_KEY_NEWSDATA}`
          url = returnUrlStr(newsDataUrl, 'NewsData', detalizedCategory.value, detalizedLanguage.value, QUERY);
          break;
        case "GNews":
          const gnewsUrl = `${API_BASE_URL_GNEWS}${API_KEY_GNEWS}`
          url = returnUrlStr(gnewsUrl, 'GNews', detalizedCategory.value, detalizedLanguage.value, QUERY);
          break;
        case "NewsApi":
          const newsApiUrl = `${API_BASE_URL_NEWSAPI}${API_KEY_NEWSAPI}`
          url = returnUrlStr(newsApiUrl, 'NewsApi', detalizedCategory.value, detalizedLanguage.value, QUERY);
          break;
        case "TheNewsApi":
          const theNewsApiUrl = `${API_BASE_URL_THENEWSAPI}${API_KEY_THENEWSAPI}`
          url = returnUrlStr(theNewsApiUrl, 'TheNewsApi', detalizedCategory.value, detalizedLanguage.value, QUERY);
          break;
        case "WorldNews":
          const worldNewsApiUrl = `${API_BASE_URL_WORLDNEWS}${API_KEY_WORLDNEWS}`
          url = returnUrlStr(worldNewsApiUrl, 'WorldNews', detalizedCategory.value, detalizedLanguage.value, QUERY);
          break;
        case "Currents":
          const CurrentsUrl = `${API_BASE_URL_CURRENTS}${API_KEY_CURRENTS}`
          url = returnUrlStr(CurrentsUrl, 'Currents', detalizedCategory.value, detalizedLanguage.value, QUERY);
          break;
      }

      // отримання даних від сервера
      let requests = '';
      let response = '';
      let data = '';

      // робимо необхідну кількість запитів, з якої формуємо результат
      switch (simpleServer) {
        case 'TheNewsApi':
          requests = Array.from({ length: QUANTITY_OF_REQUESTS[simpleServer] }, (_, i) =>
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

      news.value.push(
        ...returnMappedResponse(data[RESPONSE_DATA_PATH[simpleServer]], simpleServer)
      );
    }

    catsPlaceholders.value = await getPlaceholderPhoto(API_BASE_URL_CAT, API_KEY_CAT);
    if (catsPlaceholders.value) localStorage.setItem('cat-placeholders', JSON.stringify(catsPlaceholders.value));
    news.value.length ? notyf.success('Успішний пошук') : notyf.error('Новини не знайдені');
    increaseNewsQuantity();
    saveSearchData(detalizedCategory.value, QUERY.value, detalizedLanguage.value, 'спрощений пошук', news.value);
    isResponseEmpty.value = setIsResponseEmpty();

  } catch (error) {
    console.error("Помилка при отриманні даних:", error);
    return [];
  }
}

// актуалізувати параметри пошуку
function setActualParams() {
  detalizedLanguage.value = LANGUAGE.value.split(",");
  detalizedCategory.value = CATEGORY.value.split(",");

}

// шукаємо новини по enter
function handleEnter(event) {
  if (event.key === 'Enter') {
    getNews();
  }
}

// наповнюємо масив новин при натисканні на Більше новин
function increaseNewsQuantity() {
  if (news.value.length) {
    newsCounter.value = Number(newsCounter.value) + PAGINATED_NEWS_LENGTH;

    if (newsCounter.value >= news.value.length) {
      const moved = news.value.slice(newsCounter.value - PAGINATED_NEWS_LENGTH, news.value.length);
      paginatedNews.value.push(...moved);

      viewedAllNews.value = 'true';
      localStorage.setItem('news-counter', news.value.length)
    } else {
      const moved = news.value.slice(newsCounter.value - PAGINATED_NEWS_LENGTH, newsCounter.value);
      paginatedNews.value.push(...moved);
      viewedAllNews.value = 'false';
      localStorage.setItem('news-counter', newsCounter.value);
    }

    localStorage.setItem('viewed-all-news', viewedAllNews.value);
  }
}

function setPreviousParams() {
  previousQuery.value = QUERY.value;
  previousLanguage.value = LANGUAGE.value;
  previousCategory.value = CATEGORY.value;
}

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
    detalizedLanguage = LANGUAGE.value.split(",");
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

watch(
  () => simpleSearchStore.simpleSearch,
  (newVal) => {
    simpleSearch.value = newVal;
  }
)

// onmounted
onMounted(() => {
  catsPlaceholders.value = JSON.parse(localStorage.getItem('cat-placeholders'));

  news.value = JSON.parse(localStorage.getItem('articles'));
  darkTheme.value = localStorage.getItem('theme');

  // виводимо останній пошук
  if (news.value && news.value.length) {
    if (darkTheme.value != 'true') {
      notyf.open({
        type: 'info',
        message: `Відновлено результати останнього пошуку за параметрами: ${getSavedData()}`
      });
    } else {
      notyf.open({
        type: 'info-dark',
        message: `Відновлено результати останнього пошуку за параметрами: ${getSavedData()}`
      });
    }
  }

  // вирізаємо з отриманих новин певну кількість новин, щоб показати клієнту
  viewedAllNews.value = localStorage.getItem('viewed-all-news');
  newsCounter.value = localStorage.getItem('news-counter');
  if (news.value?.length && news.value.length) {
    paginatedNews.value.push(...news.value.slice(0, newsCounter.value));
  }

  // вішаємо відслідковування ентер
  window.addEventListener('keydown', handleEnter);

  // встановити простий пошук
  simpleSearch.value = localStorage.getItem('simple-search');
});

</script>

<style scoped>
@import "@/css/dark.css";

.news__container {
  margin: 15px 0;
}
</style>
