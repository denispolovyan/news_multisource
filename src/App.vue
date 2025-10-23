<template>
<div class="app-container">
    <Header class="header-app" @categorySelected="handleCategory" @querySelected="handleQuery" @languageSelected="handleLanguage"
      @serverSelected="handleServer"></Header>
    <Main class="main-app" :category="selectedCategory" :query="selectedQuery" :language="selectedLanguage" :server="selectedServer">
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

// search parameters
const selectedCategory = ref(null);
const selectedQuery = ref(null);
const selectedLanguage = ref(null);
const selectedServer = ref(null);

// functions
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
</script>

<style>
@import "./css/app.css";
</style>
