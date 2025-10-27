<template>
    <!-- Нижня частина -->
    <div class="header__down">
        <div>
          <select tabindex="1" class="header__server header__button" @change="selectServer($event.target.value)">
            <option v-for="(serv, index) in SERVER" :key="index" :value="serv">
              {{ serv }}
            </option>
          </select>
        </div>

        <div>
          <select tabindex="2" v-model="languageValue" class="header__language header__button"
            @change="selectLanguage($event.target.value)">
            <option v-for="(lang, index) in languagesValues" :key="index" :value="lang">
              {{ lang[1] }}
            </option>
          </select>
        </div>

        <div>
          <select tabindex="3" v-model="categoryValue" class="header__category header__button"
            @change="selectCategory($event.target.value)">
            <option v-for="(cat, index) in categoriesValues" :key="index" :value="cat">
              {{ cat[1] }}
            </option>
          </select>
        </div>

        <div>
          <input tabindex="4" v-model="inputValue" type="text" placeholder="Ключові слова" class="header__button" maxlength="20"
            @input="selectInput(inputValue)" />
        </div>
    </div>
</template>

<script setup>
// base
import { ref, onMounted } from "vue";

// constants
import { CATEGORIES, LANGUAGES, SERVER } from "@/constants.js";


// emits
const emit = defineEmits([
  "categorySelected",
  "querySelected",
  "languageSelected",
  "serverSelected",
]);

let categoryValue = ref(CATEGORIES[0]);
let languageValue = ref(LANGUAGES[0]);
let inputValue = ref("");

let previousServerValue = ref(SERVER[0]);
let languagesValues = ref(LANGUAGES);
let categoriesValues = ref(CATEGORIES);

// functions
function sortSearchParameters(serv) {
  languagesValues.value = LANGUAGES
  categoriesValues.value = CATEGORIES;

  if (serv == 'NewsData' && previousServerValue.value != 'NewsData') {
    // categoriesValues.value = categoriesValues.value.filter(cat => cat[0] !== "general");
    // setSortedCategory();
  } else if (serv == 'NewsApi' && previousServerValue.value != 'NewsApi') {
    categoriesValues.value = categoriesValues.value.filter(cat => cat[0] !== "politics");
    languagesValues.value = languagesValues.value.filter(lang => lang[0] !== "uk");
    setSortedCategory();
    setSortedLanguage();
  } else if (serv == 'GNews' && previousServerValue.value != 'GNews') {
    categoriesValues.value = categoriesValues.value.filter(cat => cat[0] !== "politics");
    setSortedCategory();
  } else if (serv == 'TheNewsApi' && previousServerValue.value != 'GNews') {
    categoriesValues.value = categoriesValues.value.filter(cat => cat[0] !== "politics");
    setSortedCategory();
  } else if (serv == 'WorldNews' && previousServerValue.value != 'WorldNews') {
    const excludedCategories = ["business", "science", "health"];
    categoriesValues.value = categoriesValues.value.filter(
      cat => !excludedCategories.includes(cat[0])
    );
    setSortedCategory();
  } else if (serv == 'Currents' && previousServerValue.value != 'Currents') {
    languagesValues.value = languagesValues.value.filter(lang => lang[0] !== "uk");
    setSortedLanguage();
  }
}

// Передаємо код категорії у батьківський компонент
function selectCategory(cat) {
  emit("categorySelected", cat);
}

// Передаємо введений текст
function selectInput(q) {
  emit("querySelected", q);
}

// Передаємо мову
function selectLanguage(lang) {
  emit("languageSelected", lang);
}

// Передаємо сервер
function selectServer(serv) {
  emit("serverSelected", serv);
  sortSearchParameters(serv);
  previousServerValue.value = serv;
}

// встановлюємо першу категорію після сортування
function setSortedCategory() {
  categoryValue.value = categoriesValues.value[0];
  emit("categorySelected", Object.values(categoryValue.value).join(','));
}

// встановлюємо першу мову після сортування
function setSortedLanguage() {
  languageValue.value = languagesValues.value[0];
  emit("languageSelected", Object.values(languageValue.value).join(','));
}

// onMounted
onMounted(() => {
  setSortedCategory();
});
</script>

<style scoped>
@import "@/css/header/header.css";
@import "@/css/dark.css";
</style>
