<template>
  <div class="app-container">
    <Header class="header-app" @categorySelected="handleCategory" @querySelected="handleQuery" @languageSelected="handleLanguage"
      @serverSelected="handleServer" @quantitySelected="handleQuantity"></Header>
    <Main class="main-app" :category="selectedCategory" :query="selectedQuery" :language="selectedLanguage" :server="selectedServer" :quantity="selectedQuantity">
    </Main>
    <Footer class="footer-app"></Footer>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Main from "./body/Main.vue";
import Header from "./body/Header.vue";
import Footer from "./body/Footer.vue";


const selectedCategory = ref(null);
const selectedQuery = ref(null);
const selectedLanguage = ref(null);
const selectedServer = ref(null);
const selectedQuantity = ref(null);

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

function handleQuantity(quantity){
  selectedQuantity.value = quantity;
}

</script>

<style>
.container {
  margin: 0px auto;
  max-width: 1200px;
  padding: 0px 15px;
}

@media (max-width: 768px) {
  .container {
    padding: 0px 10px;
  }
}

/* притиснути футер до низу  */

.app-container{
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.header-app,
.main-app,
.footer-app {
  width: 100%;
  box-sizing: border-box;
}

.main-app {
  flex-grow: 1;
  /* займає весь доступний простір між Header і Footer */
}
</style>
