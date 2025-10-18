<template>
  <div class="container">
    <div class="news">
      <div class="news__container">
        <!-- Кнопка отримання новин -->
        <div class="news__parameters">
          <div class="news__button">
            <button @click="getNews">Отримати новини</button>
          </div>
          <div class="news__parameters-buttons">
            <div class="news__search" v-if="QUERY">
              <span>Пошук за словами: </span>{{ QUERY }}
            </div>
            <div class="news__category" v-if="detalizedCategory[0]">
              <span>Категорія: </span>{{ detalizedCategory[1] }}
            </div>
            <div class="news__language" v-if="detalizedLanguage[0]">
              <span>Мова: </span>{{ detalizedLanguage[1] }}
            </div>
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
  </div>
</template>

<script setup>
  import { ref, watch, defineProps } from "vue";
  import placeholder from "@/images/placeholder.jpeg";
  import { API_KEY_NEWSDATA, API_BASE_URL_NEWSDATA, LANGUAGES, CATEGORIES } from "@/constants.js";

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
    detalizedLanguage = isParameterSelected(LANGUAGE);
    detalizedCategory = isParameterSelected(CATEGORY);

    let url = `${API_BASE_URL_NEWSDATA}${API_KEY_NEWSDATA}`;

    if (detalizedCategory[0]) url += `&category=${detalizedCategory[0]}`;
    if (detalizedLanguage[0]) url += `&language=${detalizedLanguage[0]}`;
    if (QUERY.value) url += `&q=${QUERY.value}`;

    return url;
  }

  function isParameterSelected(val) {
    try {
      return val._value.split(",");
    } catch (e) {
      return [];
    }
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

<style scoped src="../css/main/news.css"></style>
<style scoped src="../css/main/search.css"></style>

<style scoped>
  .news__container {
    margin: 20px 0px;
  }
</style>
