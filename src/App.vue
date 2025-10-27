<template>
  <div class="app-container" :class="{'app-container__overflow': isMenuOpen || donateState}">
    <Header class="header-app" @categorySelected="handleCategory" @querySelected="handleQuery"
      @languageSelected="handleLanguage" @serverSelected="handleServer"></Header>
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
import Main from "./body/main/Main.vue";
import Header from "./body/header/Header.vue";
import Footer from "./body/footer/Footer.vue";
import Menu from "./body/Menu.vue";
import Donate from "./body/Donate.vue";

// store
import { donateStateStore } from '@/stores/donateState';
import { menuStateStore } from '@/stores/menuState';

// donate const
const donateStore = donateStateStore();
const donateState = ref(false);

// menu const
const menuStore = menuStateStore();
const isMenuOpen = ref(false);

// search parameters
const selectedCategory = ref(null);
const selectedQuery = ref(null);
const selectedLanguage = ref(null);
const selectedServer = ref(null);

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

// menu visibility watch
watch(
  () => menuStore.menuState,
  (newVal) => {
    isMenuOpen.value = newVal;
  }
)

// set cookies
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
