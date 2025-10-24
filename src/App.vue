<template>
  <div class="app-container" :class="{'app-container__overflow': isMenuOpen}">
    <Header class="header-app" @categorySelected="handleCategory" @querySelected="handleQuery"
      @languageSelected="handleLanguage" @serverSelected="handleServer" @menuHandled="handleMenu"></Header>
    <Menu v-if="isMenuOpen"></Menu>
    <Main class="main-app" :category="selectedCategory" :query="selectedQuery" :language="selectedLanguage"
      :server="selectedServer">
    </Main>
    <Footer class="footer-app"></Footer>
  </div>
</template>

<script setup>
// base
import { ref } from "vue";

// components
import Main from "./body/Main.vue";
import Header from "./body/Header.vue";
import Footer from "./body/Footer.vue";
import Menu from "./body/Menu.vue";


// search parameters
const selectedCategory = ref(null);
const selectedQuery = ref(null);
const selectedLanguage = ref(null);
const selectedServer = ref(null);
const isMenuOpen = ref(false);


// functions emits handlers
function handleCategory(cat) {
  selectedCategory.value = cat;
}

function handleQuery(q) {
  selectedQuery.value = q;
}

function handleLanguage(lang) {
  selectedLanguage.value = lang;
}

function handleServer(serv) {
  selectedServer.value = serv;
}

function handleMenu(state) {
  isMenuOpen.value = state;
}
</script>

<style>
@import "./css/app.css";
</style>
