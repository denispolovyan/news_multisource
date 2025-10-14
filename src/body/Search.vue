<template>
  <div class="news__button">
    <button @click="getNews">Отримати новини</button>
  </div>
  <div class="news__parameters-buttons">
    <div class="news__category" v-if="category[0]">
      <span>Категорія: </span>{{ category[1] }}
    </div>
    <div class="news__search" v-if="QUERY">
      <span>Пошук за словами: </span>{{ query }}
    </div>
    <div class="news__language" v-if="language[0]">
      <span>Мова: </span>{{ language[1] }}
    </div>
  </div>
</template>

<script>
import { ref, watch, defineProps } from "vue";

const props = defineProps({
  category: {
    type: Array,
    default: null,
  },
  query: {
    type: String,
    default: null,
  },
  language: {
    type: Array,
    default: null,
  },
});

const CATEGORY = ref(props.category);
const query = ref(props.query);
const language = ref(props.language);

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
</script>
