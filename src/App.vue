<template>
  <div class="app-container" :class="{'app-container__overflow': isMenuOpen || donateState}">
    <Header class="header-app" @categorySelected="handleCategory" @querySelected="handleQuery"
      @languageSelected="handleLanguage" @serverSelected="handleServer" @menuHandled="handleMenu"></Header>
    <Menu v-if="isMenuOpen"></Menu>
    <Main class="main-app" :category="selectedCategory" :query="selectedQuery" :language="selectedLanguage"
      :server="selectedServer">
    </Main>
    <Footer class="footer-app"></Footer>
    <Donate v-if="donateState"></Donate>

  </div>
</template>

<script setup>
// base
import { ref, watch, onMounted } from "vue";

// functions
import { setCookie, getCookie} from '@/functions.js'


// components
import Main from "./body/Main.vue";
import Header from "./body/Header.vue";
import Footer from "./body/footer/Footer.vue";
import Menu from "./body/Menu.vue";
import Donate from "./body/Donate.vue";

// donate store
import { donateStateStore } from '@/stores/donateState';

// donate const
const donateStore = donateStateStore();
const donateState = ref(false);

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

// menu visibility handler
function handleMenu(state) {
  isMenuOpen.value = state;
}

// donate visibility handler
function handleDonate(state) {
  donateStore.donateState = state;
}

// donate visibility watch
watch(
  () => donateStore.donateState,
  (newVal) => {
    donateState.value = newVal;
  }
)

onMounted(() => {
  // set cookie & optionally show donate
  const cookieValue = getCookie('donate-showed');

  if (!cookieValue) {
    setCookie('donate-showed', 'true', 2880);
    handleDonate(true);
  }
});
</script>

<style>
@import "./css/app.css";
</style>
